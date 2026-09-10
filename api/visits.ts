// The monthly visit counter behind the number in the profile rail.
//
// The count is real or it is absent. There is no seeded starting figure and no
// client-side estimate: if this endpoint can't reach its store it returns 503
// and the rail renders no number at all, because a made-up visitor count is
// worse than none.
//
// Storage is Postgres (Supabase), one row per month keyed in Asia/Dubai so the
// month turns over at midnight in Dubai rather than 8pm the evening before.
// The table has RLS on with no policies, so the key used here cannot read or
// write it directly — only the two functions called below, one of which adds
// exactly 1 and the other of which only reads.
//
// Nothing identifying is stored or sent. The browser decides whether this load
// is a new visit (see src/lib/useVisitCount.ts) and the server stores an
// integer. No IP, no cookie, no visitor row.
import { clientIp, rateLimit, errorResponse, json } from "./_shared";

export const config = { runtime: "edge" };

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;

/** Crawlers that do run JS. Most never reach here — this is client-triggered. */
const BOT = /bot|crawler|spider|crawl|slurp|headless|lighthouse|pingdom|preview|facebookexternalhit|bingpreview|curl|wget|python-requests|axios|node-fetch/i;

async function rpc(fn: "bump_site_visits" | "get_site_visits"): Promise<number> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 4000);
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
      method: "POST",
      signal: ctrl.signal,
      headers: {
        apikey: SUPABASE_KEY as string,
        authorization: `Bearer ${SUPABASE_KEY}`,
        "content-type": "application/json",
      },
      body: "{}",
    });
    if (!res.ok) throw new Error(`${fn} ${res.status}: ${(await res.text()).slice(0, 200)}`);
    // A function returning a scalar comes back as a bare JSON value; bigint may
    // arrive as a string, so normalise rather than trusting the type.
    const n = Number(await res.json());
    if (!Number.isFinite(n) || n < 0) throw new Error(`${fn} returned ${n}`);
    return Math.floor(n);
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return errorResponse("Method not allowed.", 405);
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return errorResponse("The visit counter isn't configured.", 503);
  }

  let body: { count?: boolean };
  try {
    body = (await req.json()) as { count?: boolean };
  } catch {
    body = {};
  }

  // Three ways a request stops being a countable visit — a repeat load in the
  // same browser session, a crawler, or someone hammering the endpoint. All
  // three degrade to a plain read rather than an error, so the number on the
  // page stays correct either way and inflating it takes real effort.
  const ua = req.headers.get("user-agent") ?? "";
  const wanted = body.count === true && !BOT.test(ua);
  const allowed = wanted ? (await rateLimit(clientIp(req))).ok : false;

  try {
    const visits = await rpc(allowed ? "bump_site_visits" : "get_site_visits");
    return json({ visits });
  } catch (err) {
    console.error("[visits]", String(err).slice(0, 300));
    return errorResponse("The visit counter is unavailable.", 503);
  }
}
