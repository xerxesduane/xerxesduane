// Shared helpers for the live-AI demo endpoints (/api/demo/*).
//
// These run on Vercel's Edge runtime. The model call happens here, server side,
// so the API key is never exposed to the browser. Everything is sized for a
// PUBLIC, unauthenticated demo: tight output caps, short input caps, and a
// per-IP rate limit.
//
// Provider: Google Gemini, on its free tier (no spend, generous rate limits).
// Free key from https://aistudio.google.com — set GOOGLE_GENERATIVE_AI_API_KEY
// in Vercel. The @ai-sdk/google provider reads that env var automatically.

// Gemini Flash is fast and free. To switch back to Claude, restore the
// @ai-sdk/anthropic imports in the handlers and use "claude-haiku-4-5" here.
export const MODEL_FAST = "gemini-2.0-flash";
export const MODEL_SMART = "gemini-2.0-flash";

const WINDOW_MS = 60_000;
const WINDOW_SEC = WINDOW_MS / 1000;
const MAX_HITS = 15;

type Limit = { ok: boolean; retryAfter: number };

// --- In-memory limiter (fallback) -------------------------------------------
// Best-effort: resets per edge isolate, so it slows abuse but isn't a hard cap.
// Used automatically whenever the KV env vars below are absent.
const HITS = new Map<string, number[]>();

function memRateLimit(ip: string): Limit {
  const now = Date.now();
  const recent = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    return { ok: false, retryAfter: Math.ceil((WINDOW_MS - (now - recent[0])) / 1000) };
  }
  recent.push(now);
  HITS.set(ip, recent);
  if (HITS.size > 5000) {
    for (const [k, v] of HITS) if (v.every((t) => now - t >= WINDOW_MS)) HITS.delete(k);
  }
  return { ok: true, retryAfter: 0 };
}

// --- Durable limiter (Vercel KV / Upstash, via REST) ------------------------
// A fixed-window counter shared across every edge isolate. Works the moment a
// KV store is provisioned in Vercel (which sets KV_REST_API_URL/TOKEN). On any
// KV error we fall back to the in-memory limiter so a KV blip never breaks the
// demos.
async function kvRateLimit(ip: string, url: string, token: string): Promise<Limit> {
  const key = `demo:rl:${ip}:${Math.floor(Date.now() / WINDOW_MS)}`;
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, WINDOW_SEC],
    ]),
  });
  if (!res.ok) throw new Error(`kv ${res.status}`);
  const data = (await res.json()) as Array<{ result?: number }>;
  const n = Array.isArray(data) ? Number(data[0]?.result) : NaN;
  if (!Number.isFinite(n)) throw new Error("kv bad response");
  if (n > MAX_HITS) {
    return { ok: false, retryAfter: Math.ceil((WINDOW_MS - (Date.now() % WINDOW_MS)) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

export async function rateLimit(ip: string): Promise<Limit> {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      return await kvRateLimit(ip, url, token);
    } catch {
      /* KV unavailable — degrade to the in-memory limiter */
    }
  }
  return memRateLimit(ip);
}

export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  return (xff?.split(",")[0] ?? "").trim() || "anon";
}

export function hasKey(): boolean {
  return Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
}

/** JSON response with no-store caching (demo responses must never be cached). */
export function json(data: unknown, status = 200, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers },
  });
}

export function errorResponse(message: string, status = 400, headers?: Record<string, string>): Response {
  return json({ error: message }, status, headers);
}

/** Guard the common preconditions: POST method, configured key, rate limit. */
export async function preflight(req: Request): Promise<Response | null> {
  if (req.method !== "POST") return errorResponse("Method not allowed.", 405);
  if (!hasKey()) {
    return errorResponse(
      "This demo isn't configured yet — the site owner needs to add a GOOGLE_GENERATIVE_AI_API_KEY.",
      503,
    );
  }
  const { ok, retryAfter } = await rateLimit(clientIp(req));
  if (!ok) {
    return errorResponse(`You're going a bit fast — try again in ${retryAfter}s.`, 429, {
      "retry-after": String(retryAfter),
    });
  }
  return null;
}

/** Clamp a string to a max length (defends token spend + payload abuse). */
export function clamp(text: unknown, max: number): string {
  return typeof text === "string" ? text.slice(0, max) : "";
}

function pick(o: unknown, k: string): unknown {
  return o && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined;
}

/**
 * Log the real cause behind an AI SDK failure. AI_RetryError wraps the final
 * APICallError in `.lastError`, whose `.statusCode` + `.responseBody` carry the
 * provider's exact error (e.g. Gemini's 429/permission/region message).
 */
export function logAiError(where: string, err: unknown): void {
  const last = pick(err, "lastError") ?? err;
  console.error(
    `[demo:${where}]`,
    JSON.stringify({
      name: pick(err, "name"),
      message: pick(err, "message"),
      status: pick(last, "statusCode"),
      url: pick(last, "url"),
      body: String(pick(last, "responseBody") ?? "").slice(0, 900),
      cause: pick(pick(err, "cause"), "message"),
    }),
  );
}
