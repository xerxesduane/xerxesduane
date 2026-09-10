// The monthly visit counter behind the number in the profile rail.
//
// The count is real or it is absent. There is no seeded starting figure and no
// client-side estimate: if this endpoint has nowhere to store a number it
// returns 503 and the rail renders nothing at all, because a made-up visitor
// count is worse than none.
//
// A number every visitor sees has to live somewhere shared and durable, so
// there is no version of this without a store — but there are two, and either
// will do:
//
//   1. Vercel KV / Upstash Redis. Nothing to paste: attaching a store in
//      Vercel injects KV_REST_API_URL and KV_REST_API_TOKEN, the same pair
//      _shared.ts already uses for rate limiting, so the counter lights up
//      with no extra configuration.
//   2. Supabase Postgres, via SUPABASE_URL + SUPABASE_PUBLISHABLE_KEY. More
//      to set up, but it keeps every past month as a row you can query.
//
// Supabase wins when both are set, because setting those two variables is a
// deliberate act, while a KV store might have been attached only for the rate
// limiter.
//
// Either way the month is keyed in Asia/Dubai, so it turns over at midnight in
// Dubai rather than 8pm the evening before, and nothing identifying is stored:
// no IP, no cookie, no visitor row. One integer per month.
import { clientIp, rateLimit, errorResponse, json } from "./_shared";

export const config = { runtime: "edge" };

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
const KV_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

/** Crawlers that do run JS. Most never reach here — this is client-triggered. */
const BOT = /bot|crawler|spider|crawl|slurp|headless|lighthouse|pingdom|preview|facebookexternalhit|bingpreview|curl|wget|python-requests|axios|node-fetch/i;

/** "YYYY-MM" in Dubai. The KV path needs this in JS; Postgres derives its own. */
export function dubaiPeriod(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dubai",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(now);
  const year = parts.find((p) => p.type === "year")?.value ?? "0000";
  const month = parts.find((p) => p.type === "month")?.value ?? "00";
  return `${year}-${month}`;
}

function withTimeout(ms: number): [AbortSignal, () => void] {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  return [ctrl.signal, () => clearTimeout(timer)];
}

/** Redis: INCR to count, GET to read. The key is never expired — past months
 *  cost a few bytes each and losing them would make the reset destructive. */
async function kvVisits(count: boolean): Promise<number> {
  const key = `site:visits:${dubaiPeriod()}`;
  const [signal, done] = withTimeout(4000);
  try {
    const res = await fetch(`${KV_URL}/pipeline`, {
      method: "POST",
      signal,
      headers: { authorization: `Bearer ${KV_TOKEN}`, "content-type": "application/json" },
      body: JSON.stringify([count ? ["INCR", key] : ["GET", key]]),
    });
    if (!res.ok) throw new Error(`kv ${res.status}`);
    const data = (await res.json()) as Array<{ result?: unknown }>;
    // INCR answers with a number, GET with a string, and GET on a month that
    // hasn't started yet with null — which is a legitimate zero.
    return Math.max(0, Math.floor(Number(data?.[0]?.result ?? 0)) || 0);
  } finally {
    done();
  }
}

/** Postgres: two functions, one that adds exactly 1 and one that only reads.
 *  The table has RLS on with no policies, so the key can reach nothing else. */
async function supabaseVisits(count: boolean): Promise<number> {
  const fn = count ? "bump_site_visits" : "get_site_visits";
  const [signal, done] = withTimeout(4000);
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
      method: "POST",
      signal,
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
    done();
  }
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return errorResponse("Method not allowed.", 405);

  const store =
    SUPABASE_URL && SUPABASE_KEY ? supabaseVisits : KV_URL && KV_TOKEN ? kvVisits : null;
  if (!store) return errorResponse("The visit counter isn't configured.", 503);

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
    return json({ visits: await store(allowed) });
  } catch (err) {
    console.error("[visits]", String(err).slice(0, 300));
    return errorResponse("The visit counter is unavailable.", 503);
  }
}
