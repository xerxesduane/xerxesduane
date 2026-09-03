// Shared helpers for the live-AI demo endpoints (/api/demo/*).
//
// These run on Vercel's Edge runtime. The model call happens here, server side,
// so the API key is never exposed to the browser. Everything is sized for a
// PUBLIC, unauthenticated demo: tight output caps, short input caps, and a
// per-IP rate limit.
//
// Provider details stay server-side. Public copy should describe the tools by business workflow, not by model vendor or infrastructure.
import { generateObject, generateText, streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import type { ModelMessage } from "ai";
import type { z } from "zod";

// --- Model chains ------------------------------------------------------------
// Each constant is an ORDERED list: the first entry is the primary, the rest are
// fallbacks tried in order if it fails. Every helper below walks the chain, so a
// single retired or overloaded model can no longer take the whole AI Lab down —
// which is exactly what happened when the previous primary was decommissioned
// and every demo started returning an empty stream.
//
// When a model here is retired, add its replacement at the FRONT of the chain
// and leave the old one in place until the provider actually stops serving it.

/** Short, conversational replies: chat, review replies, WhatsApp, tone, ads. */
export const MODELS_FAST = [
  "qwen/qwen3.6-27b",
  "openai/gpt-oss-20b",
  "openai/gpt-oss-120b",
] as const;

/** Longer reasoning over supplied context: grounded Q&A, copy critique. */
export const MODELS_SMART = [
  "openai/gpt-oss-120b",
  "qwen/qwen3.6-27b",
  "openai/gpt-oss-20b",
] as const;

/** Structured output (generateObject) — needs json_schema support. */
export const MODELS_STRUCTURED = [
  "openai/gpt-oss-20b",
  "qwen/qwen3.6-27b",
  "openai/gpt-oss-120b",
] as const;

/** Vision / multimodal — must accept image input. */
export const MODELS_VISION = ["qwen/qwen3.6-27b", "openai/gpt-oss-120b"] as const;

/** Speech-to-text: hosted speech-to-text (called over REST, see groqTranscribe). */
export const MODEL_TRANSCRIBE = "whisper-large-v3-turbo";

/**
 * Per-model provider options.
 *
 * Both current model families reason before answering, and those reasoning
 * tokens are billed against `maxOutputTokens`. On the tight caps these demos
 * use, unrestrained reasoning can consume the entire budget and leave no answer
 * at all — so reasoning is disabled where the provider allows it and kept short
 * (and out of the response) where it doesn't.
 */
type ModelOptions = { groq?: { reasoningEffort?: string; reasoningFormat?: string } };

function modelOptions(model: string): ModelOptions {
  // qwen3 accepts reasoning_effort "none" — these demos want the answer, not a
  // chain of thought.
  if (model.startsWith("qwen/")) return { groq: { reasoningEffort: "none" } };
  // gpt-oss can't switch reasoning off; "low" keeps it brief and "hidden" stops
  // the trace being generated at all.
  if (model.startsWith("openai/gpt-oss")) {
    return { groq: { reasoningEffort: "low", reasoningFormat: "hidden" } };
  }
  return {};
}

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
      "This demo isn't configured yet. Please try again later or book a free systems audit.",
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
 * models can't use generateObject (no json_schema in this runtime), so the endpoints
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
 * Transcribe audio with hosted speech-to-text via the REST endpoint. Kept as a
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
    throw new Error(`speech transcribe ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  return (await res.text()).trim();
}

/**
 * Walk a model chain until one call succeeds, returning that call's result.
 * Every attempt is logged with the provider's own error detail, so a retired
 * model or a bad key shows up in the function logs instead of silently
 * degrading. Throws the FIRST error if every model in the chain fails.
 */
async function withFallback<T>(
  where: string,
  models: readonly string[],
  run: (model: string) => Promise<T>,
): Promise<T> {
  let firstError: unknown;
  for (const model of models) {
    try {
      return await run(model);
    } catch (err) {
      logAiError(`${where}:${model}`, err);
      firstError ??= err;
    }
  }
  throw firstError ?? new Error(`${where}: no model available`);
}

/** User-facing message when no model in the chain could be reached. */
export const UNAVAILABLE_MESSAGE =
  "The AI service didn't respond just now. Please try again in a moment.";

/** One chunk off `streamText().fullStream` — text deltas, errors, step markers. */
type StreamPart = ReturnType<typeof streamText>["fullStream"] extends AsyncIterable<infer P>
  ? P
  : never;

/**
 * Stream a text answer to the browser, with model fallback.
 *
 * Two things here matter, and both are why the demos could fail silently.
 *
 * 1. WHEN the 200 is committed. `toTextStreamResponse()` commits it before the
 *    model has produced anything, so a provider failure closed the stream with
 *    zero bytes and a success status. This waits for the first real token, which
 *    keeps the failure recoverable: try the next model, and if the whole chain
 *    is down return an error status the UI can actually show.
 *
 * 2. WHERE the error appears. The AI SDK reports a provider failure as an
 *    `error` PART inside the stream rather than by rejecting it — and
 *    `textStream` only forwards text deltas, so it drops that part and simply
 *    ends. Reading `fullStream` instead is what makes the real cause (a retired
 *    model, a bad key, a 429) visible at all.
 */
export async function streamDemoText(opts: {
  /** Short endpoint name, used as the log prefix. */
  where: string;
  system: string;
  messages: ModelMessage[];
  maxOutputTokens: number;
  temperature?: number;
  /** Defaults to MODELS_FAST. */
  models?: readonly string[];
}): Promise<Response> {
  const models = opts.models ?? MODELS_FAST;
  let firstError: unknown;

  for (const model of models) {
    const result = streamText({
      model: groq(model),
      system: opts.system,
      messages: opts.messages,
      maxOutputTokens: opts.maxOutputTokens,
      temperature: opts.temperature,
      providerOptions: modelOptions(model),
      // One retry, not the SDK's default of two: the model chain below is the
      // real resilience, and stacking retries on top of it multiplies the wait
      // an edge function spends before falling back.
      maxRetries: 1,
      // The SDK's default handler dumps the whole error object (request body
      // included) to the log. Everything useful is captured below instead.
      onError: () => {},
    });

    const iterator = result.fullStream[Symbol.asyncIterator]();
    let first: string | undefined;
    try {
      first = await firstToken(iterator);
    } catch (err) {
      logAiError(`${opts.where}:${model}`, err);
      firstError ??= err;
      continue;
    }
    if (first === undefined) {
      // The stream ended without a single token. Usually reasoning tokens
      // consuming the whole output budget — the next model may have room.
      console.error(`[demo:${opts.where}:${model}] empty response`);
      firstError ??= new Error("empty response");
      continue;
    }
    return textStreamResponse(first, iterator, `${opts.where}:${model}`);
  }

  logAiError(opts.where, firstError);
  return errorResponse(UNAVAILABLE_MESSAGE, 502);
}

/**
 * Advance the stream to its first non-empty text delta. Returns undefined if the
 * stream ends without one; throws the provider's error if one arrives first.
 */
async function firstToken(iterator: AsyncIterator<StreamPart>): Promise<string | undefined> {
  for (;;) {
    const { done, value } = await iterator.next();
    if (done) return undefined;
    if (value.type === "error") throw value.error;
    if (value.type === "text-delta" && value.text) return value.text;
  }
}

/** Wrap an already-started stream as a plain-text streaming Response. */
function textStreamResponse(
  firstChunk: string,
  iterator: AsyncIterator<StreamPart>,
  where: string,
): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(firstChunk));
    },
    async pull(controller) {
      try {
        for (;;) {
          const { done, value } = await iterator.next();
          if (done) {
            controller.close();
            return;
          }
          // Bytes are already on the wire, so the status can't change now. Log
          // the cause and end cleanly — the visitor keeps the partial answer.
          if (value.type === "error") {
            logAiError(where, value.error);
            controller.close();
            return;
          }
          if (value.type === "text-delta" && value.text) {
            controller.enqueue(encoder.encode(value.text));
            return;
          }
        }
      } catch (err) {
        logAiError(where, err);
        controller.close();
      }
    },
    cancel() {
      void iterator.return?.();
    },
  });
  return new Response(stream, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}

/**
 * Non-streaming text generation with model fallback. Used where the endpoint
 * needs the whole answer before it can respond (the agentic pipeline, vision).
 * Throws if the whole chain fails.
 */
export async function generateDemoText(opts: {
  where: string;
  system?: string;
  messages: ModelMessage[];
  maxOutputTokens: number;
  temperature?: number;
  /** Defaults to MODELS_FAST. */
  models?: readonly string[];
}): Promise<string> {
  return withFallback(opts.where, opts.models ?? MODELS_FAST, async (model) => {
    const { text } = await generateText({
      model: groq(model),
      system: opts.system,
      messages: opts.messages,
      maxOutputTokens: opts.maxOutputTokens,
      temperature: opts.temperature,
      providerOptions: modelOptions(model),
      maxRetries: 1,
    });
    if (!text.trim()) throw new Error("empty response");
    return text;
  });
}

/**
 * Resilient structured generation for the demo endpoints.
 *
 * The structured models are *reasoning* models: they spend output tokens
 * "thinking" before they emit the JSON. With a tight token cap that reasoning
 * can eat the whole budget and truncate the JSON, so generateObject throws —
 * which is why some structured demos failed intermittently (and why two demos
 * with the same cap could behave differently run to run). This gives a generous
 * budget and, if the first attempt still throws, retries with even more room and
 * a terser instruction before moving down the model chain. generateObject is
 * used on EVERY attempt so the schema is always injected and the JSON keys stay
 * correct.
 */
export async function structured<T>(opts: {
  schema: z.ZodType<T>;
  prompt: string;
  maxOutputTokens?: number;
  /** Defaults to MODELS_STRUCTURED. */
  models?: readonly string[];
}): Promise<T> {
  const budget = opts.maxOutputTokens ?? 4000;
  return withFallback("structured", opts.models ?? MODELS_STRUCTURED, async (model) => {
    try {
      const { object } = await generateObject({
        model: groq(model),
        schema: opts.schema,
        prompt: opts.prompt,
        maxOutputTokens: budget,
        providerOptions: modelOptions(model),
        maxRetries: 1,
      });
      return object;
    } catch {
      const { object } = await generateObject({
        model: groq(model),
        schema: opts.schema,
        prompt: opts.prompt + "\n\nRespond concisely with just the structured result.",
        maxOutputTokens: Math.max(budget, 6000),
        providerOptions: modelOptions(model),
        maxRetries: 1,
      });
      return object;
    }
  });
}

/**
 * Probe one model with the smallest possible call. Used by /api/demo/health to
 * tell "the key is wrong" apart from "this particular model is gone" without
 * having to read function logs.
 */
export async function probeModel(model: string): Promise<{ model: string; ok: boolean; error?: string }> {
  try {
    const { text } = await generateText({
      model: groq(model),
      prompt: "Reply with the single word: ok",
      maxOutputTokens: 200,
      providerOptions: modelOptions(model),
    });
    return { model, ok: text.trim().length > 0 };
  } catch (err) {
    const detail = aiErrorDetail(err);
    return { model, ok: false, error: `${detail.status ?? "?"} ${String(detail.body ?? detail.message).slice(0, 200)}` };
  }
}
