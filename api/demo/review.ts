// Review-responder demo — turns a customer review (good, bad, or mixed) into a
// warm, professional public reply. Showcases reputation management you can
// automate. Streams plain text back to the browser.
import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import { MODEL_FAST, preflight, errorResponse, clamp, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const TONES: Record<string, string> = {
  warm: "Warm and personable — sound like a real owner who cares.",
  professional: "Polished and professional, but never cold or corporate.",
  apologetic: "Especially gracious and apologetic — assume the customer is upset.",
};

const SYSTEM =
  "You write public replies to customer reviews on behalf of a small business owner. " +
  "First silently judge the sentiment (positive, mixed, or negative). " +
  "For positive reviews: thank them specifically and genuinely, reference a detail they mentioned. " +
  "For negative reviews: open with a sincere apology, never get defensive or make excuses, take it " +
  "offline (invite them to get in touch directly), and show you'll make it right. " +
  "Keep it to 2-4 short sentences. No hashtags, no emoji spam (one is fine), no corporate jargon. " +
  "Output ONLY the reply text.";

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { review?: string; tone?: string };
  try {
    body = await req.json();
  } catch {
    return errorResponse("Invalid request body.");
  }

  const review = clamp(body.review, 1500).trim();
  if (review.length < 5) return errorResponse("Paste a review to respond to.");
  const tone = TONES[body.tone ?? "warm"] ?? TONES.warm;

  const result = streamText({
    model: groq(MODEL_FAST),
    system: `${SYSTEM}\nTone: ${tone}`,
    messages: [{ role: "user", content: `Write a reply to this review:\n"""\n${review}\n"""` }],
    maxOutputTokens: 320,
    temperature: 0.7,
    onError: ({ error }) => logAiError("review", error),
  });

  return result.toTextStreamResponse({ headers: { "cache-control": "no-store" } });
}
