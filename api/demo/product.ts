// Product-description writer — turns a few notes into a polished e-commerce
// description with highlight bullets. Showcases the e-commerce service. Streams.
import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import { MODEL_FAST, preflight, errorResponse, clamp, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const TONES: Record<string, string> = {
  premium: "Premium and aspirational — refined, confident, a touch of luxury.",
  friendly: "Friendly and upbeat — warm, approachable, easy to read.",
  minimal: "Clean and minimal — precise, modern, no hype.",
};

const SYSTEM =
  "You are an expert e-commerce copywriter. From a few product notes, write a store-ready description: " +
  "one short, vivid paragraph (2-4 sentences) that sells the benefit, then 3-5 punchy highlight bullets " +
  "(start each with '- '). Be concrete; never invent specs or claims that weren't provided. " +
  "Output ONLY the description and bullets — no headings, no commentary.";

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { product?: string; tone?: string };
  try {
    body = (await req.json()) as { product?: string; tone?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const product = clamp(body.product, 800).trim();
  if (product.length < 4) return errorResponse("Describe the product.");
  const tone = TONES[body.tone ?? "friendly"] ?? TONES.friendly;

  const result = streamText({
    model: groq(MODEL_FAST),
    system: `${SYSTEM}\nTone: ${tone}`,
    messages: [{ role: "user", content: `Product notes: ${product}` }],
    maxOutputTokens: 450,
    temperature: 0.8,
    onError: ({ error }) => logAiError("product", error),
  });

  return result.toTextStreamResponse({ headers: { "cache-control": "no-store" } });
}
