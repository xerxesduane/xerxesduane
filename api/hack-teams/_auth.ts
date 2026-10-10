// Champion sign-in for the team panel (/ht): a username and password each,
// set by the owner from the panel, as an alternative to a co-Champion's
// secret panel link.
//
//   - Passwords are never stored: only a PBKDF2-SHA-256 hash (210,000
//     rounds) with a random salt, under hackt:v1:logins.
//   - Sign-in is rate-limited per address and per username, and a wrong
//     username takes as long as a wrong password.
//   - The session is an HttpOnly, Secure, SameSite=Strict cookie, signed with
//     a key derived from the site's owner secret. Every request also checks
//     the login still exists, so removing a login signs that Champion out at
//     once. Sessions last 30 days.
import { K, parse, redis } from "./_lib";

export const COOKIE = "hackt_champion";
const SESSION_SECONDS = 30 * 24 * 60 * 60;
const ROUNDS = 210_000;
export const USERNAME = /^[a-z0-9][a-z0-9._-]{1,31}$/;

export type Login = { username: string; name: string; salt: string; hash: string; createdAt: number };

const enc = new TextEncoder();
const b64 = (bytes: ArrayBuffer | Uint8Array) => {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (const b of arr) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

async function pbkdf2(password: string, salt: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: enc.encode(salt), iterations: ROUNDS }, key, 256);
  return b64(bits);
}

/** Constant time over equal-length strings. */
function same(a: string, b: string): boolean {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

export async function makeLogin(username: string, name: string, password: string): Promise<Login> {
  const salt = b64(crypto.getRandomValues(new Uint8Array(16)));
  return { username, name, salt, hash: await pbkdf2(password, salt), createdAt: Date.now() };
}

export async function getLogin(username: string): Promise<Login | null> {
  if (!USERNAME.test(username)) return null;
  const [raw] = await redis([["HGET", `${K}logins`, username]]);
  return parse<Login>(raw);
}

/** The login if the password is right. A missing user still does the full hash, so timing says nothing. */
export async function checkPassword(username: string, password: string): Promise<Login | null> {
  const login = await getLogin(username);
  const hash = await pbkdf2(password, login?.salt ?? "no-such-user-salt");
  return login && same(hash, login.hash) ? login : null;
}

/** The signing key: derived from the owner secret, so nothing new has to be configured. */
async function signKey(): Promise<Awaited<ReturnType<typeof crypto.subtle.importKey>> | null> {
  const secret = process.env.WORK_PASSWORD;
  if (!secret || secret.length < 8) return null;
  const base = await crypto.subtle.importKey("raw", enc.encode(`hackt-champion-session|${secret}`), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const raw = await crypto.subtle.sign("HMAC", base, enc.encode("v1"));
  return crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
}

async function sign(payload: string): Promise<string | null> {
  const key = await signKey();
  return key ? b64(await crypto.subtle.sign("HMAC", key, enc.encode(payload))) : null;
}

export async function sessionCookie(login: Login): Promise<string | null> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  // The hash's tail is in the signed payload: a new password ends old sessions.
  const payload = `${login.username}.${exp}.${login.hash.slice(-8)}`;
  const sig = await sign(payload);
  return sig ? `${COOKIE}=${payload}.${sig}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}` : null;
}

export const clearCookie = () => `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

/** The Champion's first name for a valid session cookie, or null. */
export async function championFromCookie(req: Request): Promise<string | null> {
  const raw = (req.headers.get("cookie") ?? "")
    .split(/;\s*/)
    .find((c) => c.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  if (!raw) return null;
  const [username, expStr, tail, sig] = raw.split(".");
  if (!username || !expStr || !tail || !sig || Number(expStr) * 1000 < Date.now()) return null;
  const want = await sign(`${username}.${expStr}.${tail}`);
  if (!want || !same(want, sig)) return null;
  const login = await getLogin(username);
  if (!login || login.hash.slice(-8) !== tail) return null;
  return login.name;
}
