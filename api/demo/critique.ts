// Website conversion critique demo — takes a landing-page URL (fetched + stripped
// to text) or pasted copy and streams a prioritized CRO critique: unclear
// messaging, missing trust signals, weak/missing CTAs, and friction. Streams
// plain text tokens back to the browser (see src/lib/demoClient.ts).
import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import { MODEL_FAST, preflight, errorResponse, clamp, logAiError } from "../_shared";
import { isFetchableUrl, fetchUrlText } from "../_fetchUrl";

export const config = { runtime: "edge" };

const MAX_PASTE = 6000;
const MAX_CONTEXT = 12000;

/** Resolve the page copy from a fetched URL or pasted text. */
async function resolveContent(body: {
  source?: string;
  content?: string;
}): Promise<{ content: string } | { error: Response }> {
  if (body.source === "url") {
    const url = isFetchableUrl(clamp(body.content, 2000).trim());
    if (!url) return { error: errorResponse("Enter a valid public https:// URL.") };
    try {
      return { content: (await fetchUrlText(url)).slice(0, MAX_CONTEXT) };
    } catch (e) {
      return {
        error: errorResponse(
          e instanceof Error ? `Couldn't read that URL — ${e.message}` : "Couldn't read that URL.",
          502,
        ),
      };
    }
  }
  return { content: clamp(body.content, MAX_PASTE).trim() };
}

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { source?: string; content?: string };
  try {
    body = (await req.json()) as { source?: string; content?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const resolved = await resolveContent(body);
  if ("error" in resolved) return resolved.error;
  const content = resolved.content;

  if (content.trim().length < 40) {
    return errorResponse("Add some landing-page copy (or a readable URL) to critique.");
  }

  const result = streamText({
    model: groq(MODEL_FAST),
    system:
      "You are a conversion-rate-optimization (CRO) reviewer auditing landing-page copy for a small business. " +
      "Review ONLY the page copy provided — do not invent features, prices, or claims that aren't in it. " +
      "Return a SHORT, prioritized list (most impactful first) of concrete, specific issues, grouped under these headings, " +
      "skipping any that don't apply: Unclear messaging, Missing trust signals, Weak or missing CTAs, Friction. " +
      "Under each heading give 1-3 terse bullet points, each naming the problem and a fix the owner can apply today. " +
      "Be direct and practical, not generic. Under 220 words total. " +
      "Never promise, guarantee, or estimate conversion-rate gains or specific results — only point out what to improve.",
    messages: [
      { role: "user", content: `LANDING PAGE COPY:\n"""\n${content}\n"""` },
    ],
    maxOutputTokens: 700,
    temperature: 0.3,
    onError: ({ error }) => logAiError("critique", error),
  });

  return result.toTextStreamResponse({ headers: { "cache-control": "no-store" } });
}
