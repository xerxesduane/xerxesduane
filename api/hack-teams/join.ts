// The open challenge form: POST /api/hack-teams/join
//
// The one link the Champions share with everyone who registered,
// ministry.xerxesduane.com/ht/join, in place of the Google Form. Whoever
// fills it in lands straight in the Champions' panel (/ht) with their answers,
// and gets their own private team link back, on screen and by email if they
// gave one. That link is the same kind a Champion makes by hand: it opens on
// two devices, can be revoked, and becomes their team page once teams are
// announced.
//
// It is open, so it is careful: same-origin posts only, five a minute per
// address, a hidden field bots fill in, a cap on how many people it takes,
// and it closes once the teams are announced. An email it already has changes
// nothing: the private link is emailed to that inbox again instead.
import { greetName } from "../../src/hackpartners/greet";
import {
  EMAIL,
  K,
  ORIGIN,
  alertOwner2 as alertOwner,
  clean,
  esc,
  handle,
  parse,
  randomToken,
  readPrefs,
  redis,
  reply,
  sameOrigin,
  underLimit,
  type Person,
} from "./_lib";

export const config = { runtime: "edge" };

/** Far more than the program can take; a full list means something is wrong. */
const MAX_PEOPLE = 150;

/** Sends the person their private link. Best effort: the link is on their screen anyway. */
async function sendLink(p: Person) {
  const api = process.env.RESEND_API_KEY;
  if (!api || !p.email) return;
  const fromAddress = /<([^>]+)>/.exec(process.env.LETTERS_FROM ?? "")?.[1] ?? "letters@xerxesduane.com";
  const link = `${ORIGIN}/ht/${p.code}`;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${api}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: `Xerxes Duane <${fromAddress}>`,
        to: [p.email],
        subject: "Your private team page",
        html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.55;color:#1a1a1a;max-width:520px">
<p>Hi ${esc(greetName(p.name))},</p>
<p>Thank you for choosing your challenges. Here is your own private page. You can change your answers there until the teams are announced, and after the dinner on Saturday 17 October it becomes your team page.</p>
<p><a href="${link}" style="display:inline-block;background:#131313;color:#EFE974;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:bold">Open your page</a></p>
<p style="color:#6a6a6a;font-size:13px">The link is private to you and opens on two devices only, so please don't forward this email.</p>
<p>Xerxes and Abel</p>
</div>`,
      }),
    });
  } catch {
    /* best effort */
  }
}

export default handle(async (req) => {
  if (req.method !== "POST") return reply({ error: "Method not allowed." }, 405);
  if (!sameOrigin(req)) return reply({ error: "Blocked." }, 403);
  if (!(await underLimit("hackt-join", req, 5, 60))) return reply({ error: "Too many tries. Wait a minute and send it again." }, 429);

  let b: Record<string, unknown> = {};
  try {
    b = (await req.json()) as Record<string, unknown>;
  } catch {
    /* empty body */
  }
  // The hidden field: a person never sees it, so anything in it is a bot. It gets a polite nothing.
  if (String(b.website ?? "")) return reply({ ok: true, name: "friend", link: "" });

  const [published] = await redis([["GET", `${K}published`]]);
  if (published === "1") return reply({ error: "The teams are already formed, so this form is closed. Message Xerxes or Abel and they'll place you." }, 409);

  const name = clean(b.name, 60).replace(/\n/g, " ");
  if (name.length < 2) return reply({ error: "Write your name." }, 400);
  const email = String(b.email ?? "").trim().toLowerCase();
  if (email && !EMAIL.test(email)) return reply({ error: "That email address doesn't look right." }, 400);
  const prefs = readPrefs(b);
  if (typeof prefs === "string") return reply({ error: prefs }, 400);

  const [all] = await redis([["HGETALL", `${K}people`]]);
  const flat = Array.isArray(all) ? (all as string[]) : [];
  const people: Person[] = [];
  for (let i = 0; i + 1 < flat.length; i += 2) {
    const p = parse<Person>(flat[i + 1]);
    if (p) people.push(p);
  }

  // An email we already have: someone else could type it, so nothing is
  // changed and no link is shown. The private link goes to that inbox again,
  // and its owner changes their answers there. (At most once an hour.)
  const known = email ? people.find((p) => p.email === email) : undefined;
  if (known) {
    const [first] = await redis([["SET", `${K}resent:${known.code}`, "1", "NX", "EX", 3600]]);
    if (first === "OK") await sendLink(known);
    return reply({ ok: true, name: greetName(name), link: "", known: true });
  }

  if (people.length >= MAX_PEOPLE) return reply({ error: "The form is full. Message Xerxes or Abel." }, 409);
  const person: Person = { code: randomToken(18), name, createdAt: Date.now(), openedAt: null, by: "form", prefs };
  if (email) person.email = email;
  await redis([["HSET", `${K}people`, person.code, JSON.stringify(person)]]);
  await sendLink(person);
  await alertOwner(
    `teams:join:${person.code}`,
    24,
    `${person.name} chose their #HACK challenges`,
    `<p><strong>${esc(person.name)}</strong> filled in the challenge form. Their answers are in your panel.</p>`);
  return reply({ ok: true, name: greetName(person.name), link: `${ORIGIN}/ht/${person.code}`, emailed: !!person.email });
});
