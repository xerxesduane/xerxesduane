// Champion sign-in for /ht (see _auth.ts).
//
//   POST {username, password}   sign in: sets the session cookie
//   DELETE                      sign out
import { checkPassword, clearCookie, sessionCookie, USERNAME } from "./_auth";
import { K, handle, redis, reply, sameOrigin, underLimit } from "./_lib";

export const config = { runtime: "edge" };

const WRONG = "That username and password don't match.";

export default handle(async (req) => {
  if (!sameOrigin(req) && req.method !== "DELETE") return reply({ error: "Blocked." }, 403);
  if (req.method === "DELETE") {
    return new Response(JSON.stringify({ ok: true }), { headers: { "content-type": "application/json", "set-cookie": clearCookie(), "cache-control": "no-store" } });
  }
  if (req.method !== "POST") return reply({ error: "Method not allowed." }, 405);
  // Ten tries per address per quarter hour.
  if (!(await underLimit("hackt-login", req, 10, 900))) return reply({ error: "Too many tries. Wait 15 minutes and try again." }, 429);

  let b: Record<string, unknown> = {};
  try {
    b = (await req.json()) as Record<string, unknown>;
  } catch {
    /* empty body */
  }
  const username = String(b.username ?? "").trim().toLowerCase();
  const password = String(b.password ?? "");
  if (!USERNAME.test(username) || !password || password.length > 200) return reply({ error: WRONG }, 401);

  // And twenty failures per username per hour, wherever they come from.
  const lockKey = `${K}login-fails:${username}:${Math.floor(Date.now() / 3_600_000)}`;
  const [fails] = await redis([["GET", lockKey]]);
  if (Number(fails) >= 20) return reply({ error: "This login is paused for an hour after too many wrong passwords. Ask Xerxes if it wasn't you." }, 429);

  const login = await checkPassword(username, password);
  if (!login) {
    await redis([
      ["INCR", lockKey],
      ["EXPIRE", lockKey, 3600],
    ]);
    return reply({ error: WRONG }, 401);
  }
  const cookie = await sessionCookie(login);
  if (!cookie) return reply({ error: "Sign-in isn't set up on this site yet." }, 503);
  return new Response(JSON.stringify({ ok: true, name: login.name }), {
    headers: { "content-type": "application/json", "set-cookie": cookie, "cache-control": "no-store", "referrer-policy": "no-referrer" },
  });
});
