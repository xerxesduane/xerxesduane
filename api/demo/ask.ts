// Grounded Q&A demo — answers a question strictly from pasted text or a fetched
// URL. Demonstrates the "answers from your own content" capability. Streams
// plain text tokens back to the browser.
import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import { MODEL_SMART, preflight, errorResponse, clamp, logAiError } from "../_shared";
import { isFetchableUrl, fetchUrlText } from "../_fetchUrl";

export const config = { runtime: "edge" };

const MAX_CONTEXT = 14000;

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
    model: groq(MODEL_SMART),
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
