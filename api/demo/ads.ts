// Ad-copy generator — turns a product/offer into ready-to-paste ad copy for
// Google or Meta. Showcases the paid-ads service. Streams plain text.
import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import { MODEL_FAST, preflight, errorResponse, clamp, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const PLATFORM: Record<string, string> = {
  google:
    "Google Search ads. Produce: 3 headlines (each roughly 30 characters, punchy, one with the offer), " +
    "then 2 descriptions (each roughly 90 characters, benefit-led with a call to action). Label them " +
    "Headlines: and Descriptions:.",
  meta:
    "Meta (Facebook/Instagram) ads. Produce: a scroll-stopping Primary text (2-3 short lines with one " +
    "emoji), a short Headline, and a one-line Description. Label each part.",
};

const SYSTEM =
  "You are a senior performance-marketing copywriter. Write high-converting ad copy for the requested " +
  "platform and offer. Be specific and benefit-led, no fluff or clichés. Output ONLY the labeled ad " +
  "copy — no commentary, no explanations.";

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { product?: string; platform?: string };
  try {
    body = (await req.json()) as { product?: string; platform?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const product = clamp(body.product, 600).trim();
  if (product.length < 4) return errorResponse("Describe what you're advertising.");
  const platform = PLATFORM[body.platform ?? "google"] ?? PLATFORM.google;

  const result = streamText({
    model: groq(MODEL_FAST),
    system: `${SYSTEM}\nPlatform — ${platform}`,
    messages: [{ role: "user", content: `Offer / product: ${product}` }],
    maxOutputTokens: 500,
    temperature: 0.85,
    onError: ({ error }) => logAiError("ads", error),
  });

  return result.toTextStreamResponse({ headers: { "cache-control": "no-store" } });
}
