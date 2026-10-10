// The Champions' Thursday summary: one email on the morning of each weekly
// check-in, so the call starts knowing who to ask about what. Every placed
// team's latest check-in, who asked for help, who has gone quiet, and where
// its safety check stands. Sent to the owner (forward it to Abel); the cron
// (digest.ts) sends it once per check-in date, the panel's button any time.
import { CHALLENGES, CHECK_IN_GOALS } from "../../src/data/hack";
import { OWNER_EMAIL } from "../work/_lib";
import { safetyItems } from "./_briefs";
import { CHALLENGE_NS, K, PANEL, esc, parse, redis, type CheckIn, type Person, type Safety } from "./_lib";

const dubaiDate = (t: number) => new Date(t + 4 * 60 * 60 * 1000).toISOString().slice(0, 10);

export async function sendDigest(force: boolean): Promise<{ sent: number; skipped: string; date?: string }> {
  const api = process.env.RESEND_API_KEY;
  if (!api) return { sent: 0, skipped: "Email isn't set up (RESEND_API_KEY)." };
  const [published, all] = await redis([
    ["GET", `${K}published`],
    ["HGETALL", `${K}people`],
  ]);
  if (published !== "1") return { sent: 0, skipped: "The teams aren't announced yet." };

  const now = Date.now();
  const today = dubaiDate(now);
  const dates = Object.keys(CHECK_IN_GOALS).sort();
  if (!force) {
    if (!dates.includes(today)) return { sent: 0, skipped: "Today isn't a check-in." };
    const [first] = await redis([["SET", `${K}digested:${today}`, "1", "NX", "EX", 14 * 24 * 3600]]);
    if (first !== "OK") return { sent: 0, skipped: "Already sent today.", date: today };
  }

  const flat = Array.isArray(all) ? (all as string[]) : [];
  const people: Person[] = [];
  for (let i = 0; i + 1 < flat.length; i += 2) {
    const p = parse<Person>(flat[i + 1]);
    if (p?.team) people.push(p);
  }
  const teams = CHALLENGE_NS.filter((n) => people.some((p) => p.team === n));
  const extra = await redis(teams.flatMap((n) => [["LRANGE", `${K}checkins:${n}`, 0, 2], ["GET", `${K}safety:${n}`]]));
  // "This week" is since the last check-in call before today, or since the dinner.
  const since = Math.max(Date.parse("2026-10-17T21:00:00+04:00"), ...dates.filter((d) => d < today).map((d) => Date.parse(`${d}T20:30:00+04:00`)));
  const goal = CHECK_IN_GOALS[dates.find((d) => d >= today) ?? ""] ?? "";

  const rows = teams.map((n, i) => {
    const checkins = (Array.isArray(extra[i * 2]) ? (extra[i * 2] as unknown[]) : []).map((r) => parse<CheckIn>(r)).filter((x): x is CheckIn => !!x);
    const safety = parse<Safety>(extra[i * 2 + 1]) ?? { ticks: {} };
    const items = safetyItems(n).length;
    const ticked = Object.keys(safety.ticks).length;
    const latest = checkins[0];
    const quiet = !latest || latest.at <= since;
    const help = checkins.filter((k) => k.help && k.at > since).map((k) => k.help);
    const title = CHALLENGES.find((c) => c.n === n)?.title ?? `Challenge ${n}`;
    const verdict = safety.review ? (safety.review.status === "passed" ? "passed" : "needs fixes") : "not reviewed";
    return { n, title, latest, quiet, help, ticked, items, verdict, size: people.filter((p) => p.team === n).length };
  });
  const quiet = rows.filter((r) => r.quiet).map((r) => r.title);
  const helping = rows.filter((r) => r.help.length);

  const day = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "Asia/Dubai" }).format(new Date(now));
  const block = (r: (typeof rows)[number]) => `<div style="border-top:1px solid #e8e4dc;padding:12px 0">
<p style="margin:0;font-weight:bold">${String(r.n).padStart(2, "0")} ${esc(r.title)} <span style="color:#8a7f75;font-weight:normal">· team of ${r.size}</span></p>
${r.quiet ? `<p style="margin:4px 0;color:#b91c1c;font-weight:bold">No check-in this week</p>` : ""}
${r.latest ? `<p style="margin:4px 0">Last check-in (${esc(r.latest.by)}): ${esc(r.latest.did || "")}${r.latest.next ? `<br>Next: ${esc(r.latest.next)}` : ""}</p>` : `<p style="margin:4px 0;color:#8a7f75">No check-ins yet.</p>`}
${r.help.map((h) => `<p style="margin:4px 0;background:#fde4dc;color:#7a2410;padding:6px 10px;border-radius:8px">Asked for help: ${esc(h)}</p>`).join("")}
<p style="margin:4px 0;color:#555">Safety check: ${r.ticked} of ${r.items} ticked, ${r.verdict}.</p>
</div>`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#1a1a1a;max-width:600px">
<p>Good morning! Here's where the teams are before tonight's check-in.</p>
${goal ? `<p><strong>Tonight's goal:</strong> ${esc(goal)}.</p>` : ""}
<p><strong>${helping.length ? `${helping.length} ${helping.length === 1 ? "team asked" : "teams asked"} for help` : "Nobody asked for help this week"}</strong>${quiet.length ? `, and <strong>${quiet.length} ${quiet.length === 1 ? "team has" : "teams have"} gone quiet</strong>: ${esc(quiet.join(", "))}` : ", and every team has checked in"}.</p>
${rows.map(block).join("")}
<p style="color:#8a7f75;font-size:13px">Forward this to Abel. Everything is also on ${PANEL}.</p>
</div>`;

  const fromAddress = /<([^>]+)>/.exec(process.env.LETTERS_FROM ?? "")?.[1] ?? "letters@xerxesduane.com";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${api}`, "content-type": "application/json" },
      body: JSON.stringify({ from: `#HACK teams <${fromAddress}>`, to: [OWNER_EMAIL], subject: `#HACK teams before the check-in, ${day}`, html }),
    });
    return res.ok ? { sent: 1, skipped: "", date: today } : { sent: 0, skipped: "The email service refused it." };
  } catch {
    return { sent: 0, skipped: "The email service couldn't be reached." };
  }
}
