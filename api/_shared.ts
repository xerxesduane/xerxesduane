// Shared helpers for the live-AI demo endpoints (/api/demo/*).
//
// These run on Vercel's Edge runtime. The model call happens here, server side,
// so the API key is never exposed to the browser. Everything is sized for a
// PUBLIC, unauthenticated demo: tight output caps, short input caps, and a
// per-IP rate limit.
//
// Provider: Groq's free tier (no card, no regional billing restriction, very
// fast). Free key from https://console.groq.com — set GROQ_API_KEY in Vercel.
// The @ai-sdk/groq provider reads that env var automatically.
//
// (We tried Gemini, but Google requires prepaid billing in this region, so its
// "free" tier 429s. @ai-sdk/anthropic + @ai-sdk/google are still installed for
// an easy switch — restore the import + model IDs in the handlers and here.)
export const MODEL_FAST = "llama-3.3-70b-versatile";
export const MODEL_SMART = "llama-3.3-70b-versatile";
// Structured output (generateObject) needs json_schema support, which Llama
// models lack on Groq — use a gpt-oss model for the extraction demo.
export const MODEL_STRUCTURED = "openai/gpt-oss-20b";
// Vision / multimodal: Llama 4 Scout accepts image input (Preview on Groq).
// Being a Llama model it also lacks json_schema, so the vision endpoints use
// generateText + parseLooseJson rather than generateObject.
export const MODEL_VISION = "meta-llama/llama-4-scout-17b-16e-instruct";
// Speech-to-text: Groq's hosted Whisper (called over REST, see groqTranscribe).
export const MODEL_TRANSCRIBE = "whisper-large-v3-turbo";

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
  return Boolean(process.env.GROQ_API_KEY);
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
      "This demo isn't configured yet — the site owner needs to add a GROQ_API_KEY.",
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
export function aiErrorDetail(err: unknown): Record<string, unknown> {
  const last = pick(err, "lastError") ?? err;
  return {
    name: pick(err, "name"),
    message: String(pick(err, "message") ?? "").slice(0, 400),
    status: pick(last, "statusCode"),
    url: pick(last, "url"),
    body: String(pick(last, "responseBody") ?? "").slice(0, 1200),
    cause: pick(pick(err, "cause"), "message"),
  };
}

export function logAiError(where: string, err: unknown): void {
  console.error(`[demo:${where}]`, JSON.stringify(aiErrorDetail(err)));
}

/**
 * Best-effort parse of a model's JSON output. Strips ```json fences and any
 * surrounding prose, then parses the first {...} or [...] block. Vision/voice
 * models can't use generateObject (no json_schema on Groq), so the endpoints
 * ask for JSON in the prompt and lean on this to recover a typed object.
 */
export function parseLooseJson<T = unknown>(text: string): T | null {
  if (typeof text !== "string") return null;
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const body = fenced ? fenced[1] : text;
  const objStart = body.indexOf("{");
  const arrStart = body.indexOf("[");
  const from =
    objStart === -1 ? arrStart : arrStart === -1 ? objStart : Math.min(objStart, arrStart);
  if (from === -1) return null;
  const end = Math.max(body.lastIndexOf("}"), body.lastIndexOf("]"));
  if (end <= from) return null;
  try {
    return JSON.parse(body.slice(from, end + 1)) as T;
  } catch {
    return null;
  }
}

/** Decode a base64 (or data-URL) string to raw bytes. Edge-runtime safe. */
export function base64ToBytes(b64: string): Uint8Array {
  const clean = b64.includes(",") ? b64.slice(b64.indexOf(",") + 1) : b64;
  const bin = atob(clean);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

/**
 * Transcribe audio with Groq's hosted Whisper via the REST endpoint. Kept as a
 * raw multipart fetch so it doesn't depend on AI-SDK transcription support.
 * `audio` is the raw bytes; returns the recognised text. `language` is an
 * optional ISO-639-1 hint ("en"/"ar").
 */
export async function groqTranscribe(
  audio: Uint8Array,
  mime: string,
  language?: string,
): Promise<string> {
  const ext = mime.includes("wav")
    ? "wav"
    : mime.includes("mp4") || mime.includes("m4a")
      ? "m4a"
      : mime.includes("mpeg") || mime.includes("mp3")
        ? "mp3"
        : mime.includes("ogg")
          ? "ogg"
          : "webm";
  const form = new FormData();
  form.append("file", new Blob([audio], { type: mime || "audio/webm" }), `clip.${ext}`);
  form.append("model", MODEL_TRANSCRIBE);
  form.append("response_format", "text");
  if (language) form.append("language", language);
  const res = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
    method: "POST",
    headers: { authorization: `Bearer ${process.env.GROQ_API_KEY}` },
    body: form,
  });
  if (!res.ok) {
    throw new Error(`groq transcribe ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  return (await res.text()).trim();
}
