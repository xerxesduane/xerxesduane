// Grounded Q&A demo — answers a question strictly from pasted text or a fetched
// URL. Demonstrates the "answers from your own content" capability. Streams
// plain text tokens back to the browser.
import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { MODEL_SMART, preflight, errorResponse, clamp, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const MAX_CONTEXT = 14000;

/** Best-effort HTML → text: drop scripts/styles/tags, decode a few entities. */
function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/(p|div|li|h[1-6]|br|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n\s*\n+/g, "\n\n")
    .trim();
}

/** Reject non-https and obvious internal/private targets (basic SSRF guard). */
function isFetchableUrl(raw: string): URL | null {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }
  if (u.protocol !== "https:") return null;
  const host = u.hostname.toLowerCase();
  if (
    host === "localhost" ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    /^(127\.|10\.|192\.168\.|169\.254\.|0\.0\.0\.0$|\[?::1\]?$)/.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host)
  ) {
    return null;
  }
  return u;
}

async function fetchUrlText(url: URL): Promise<string> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 7000);
  try {
    const res = await fetch(url.toString(), {
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "user-agent": "XerxesDuaneDemoBot/1.0 (+https://www.xerxesduane.com/demos)" },
    });
    if (!res.ok) throw new Error(`The page returned ${res.status}.`);
    const buf = await res.arrayBuffer();
    // Cap at ~400KB of raw HTML before stripping.
    const html = new TextDecoder("utf-8").decode(buf.slice(0, 400_000));
    return htmlToText(html);
  } finally {
    clearTimeout(timer);
  }
}

/** Resolve the source context from pasted text or a fetched URL. */
async function resolveContext(body: {
  source?: string;
  content?: string;
}): Promise<{ context: string } | { error: Response }> {
  if (body.source === "url") {
    const url = isFetchableUrl(clamp(body.content, 2000).trim());
    if (!url) return { error: errorResponse("Enter a valid public https:// URL.") };
    try {
      return { context: (await fetchUrlText(url)).slice(0, MAX_CONTEXT) };
    } catch (e) {
      return {
        error: errorResponse(
          e instanceof Error ? `Couldn't read that URL — ${e.message}` : "Couldn't read that URL.",
          502,
        ),
      };
    }
  }
  return { context: clamp(body.content, MAX_CONTEXT).trim() };
}

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { source?: string; content?: string; question?: string };
  try {
    body = (await req.json()) as { source?: string; content?: string; question?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const question = clamp(body.question, 500).trim();
  if (!question) return errorResponse("Add a question to ask.");

  const resolved = await resolveContext(body);
  if ("error" in resolved) return resolved.error;
  const context = resolved.context;

  if (context.trim().length < 20) {
    return errorResponse("Add some text (or a readable URL) to ask about.");
  }

  const result = streamText({
    model: google(MODEL_SMART),
    system:
      "You answer questions strictly from the provided CONTEXT. " +
      "If the answer isn't in the context, say so plainly — do not use outside knowledge or guess. " +
      "Be concise (under 110 words). When useful, quote a short phrase from the context.",
    messages: [
      { role: "user", content: `CONTEXT:\n"""\n${context}\n"""\n\nQUESTION: ${question}` },
    ],
    maxOutputTokens: 500,
    temperature: 0.2,
    onError: ({ error }) => logAiError("ask", error),
  });

  return result.toTextStreamResponse({ headers: { "cache-control": "no-store" } });
}
