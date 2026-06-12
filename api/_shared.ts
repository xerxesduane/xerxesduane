// Shared helpers for the live-AI demo endpoints (/api/demo/*).
//
// These run on Vercel's Edge runtime. The Anthropic call happens here, server
// side, so the API key is never exposed to the browser. Everything is sized
// for a PUBLIC, unauthenticated demo: cheap models, tight output caps, short
// input caps, and a best-effort per-IP rate limit. Pair this with a hard
// monthly spend cap set in the Anthropic console — the rate limit below is
// in-memory and resets per edge isolate, so it slows abuse but is not a
// guarantee. For a hard guarantee, swap `rateLimit` for Vercel KV / Upstash.

// Cheap, fast model for the conversational + extraction demos.
export const MODEL_FAST = "claude-haiku-4-5";
// A step up in reasoning for grounded document Q&A.
export const MODEL_SMART = "claude-sonnet-4-6";

/** Per-IP sliding-window limiter (best-effort; see file header). */
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_HITS = 15;

export function rateLimit(ip: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const recent = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - recent[0])) / 1000);
    return { ok: false, retryAfter };
  }
  recent.push(now);
  HITS.set(ip, recent);
  // Opportunistic cleanup so the map can't grow unbounded across isolates.
  if (HITS.size > 5000) {
    for (const [k, v] of HITS) if (v.every((t) => now - t >= WINDOW_MS)) HITS.delete(k);
  }
  return { ok: true, retryAfter: 0 };
}

export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  return (xff?.split(",")[0] ?? "").trim() || "anon";
}

export function hasKey(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
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
export function preflight(req: Request): Response | null {
  if (req.method !== "POST") return errorResponse("Method not allowed.", 405);
  if (!hasKey()) {
    return errorResponse(
      "This demo isn't configured yet — the site owner needs to add an ANTHROPIC_API_KEY.",
      503,
    );
  }
  const { ok, retryAfter } = rateLimit(clientIp(req));
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
