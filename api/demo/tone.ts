// Tone & brand-voice rewriter — takes a block of text and rewrites it in a
// chosen brand voice. Showcases the copywriting / brand-voice service. Streams.
import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import { MODEL_FAST, preflight, errorResponse, clamp, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const VOICES: Record<string, string> = {
  luxury: "Luxury and refined — elegant, aspirational, understated confidence with a sense of prestige.",
  playful: "Playful and upbeat — fun, witty, energetic, light-hearted and full of personality.",
  corporate: "Corporate and professional — clear, credible, polished and authoritative.",
  "gulf-warm": "Warm and Gulf-hospitable — gracious, welcoming, generous in spirit, with regional warmth.",
};

const SYSTEM =
  "You are an expert brand-voice copywriter. Rewrite the user's text in the requested voice while keeping the " +
  "original meaning and intent intact. Preserve key facts; never invent claims that weren't provided. " +
  "Output ONLY the rewritten text — no headings, no quotes, no commentary.";

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { text?: string; voice?: string };
  try {
    body = (await req.json()) as { text?: string; voice?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const text = clamp(body.text, 1200).trim();
  if (text.length < 4) return errorResponse("Add some text to rewrite.");
  const voice = VOICES[body.voice ?? "luxury"] ?? VOICES.luxury;

  const result = streamText({
    model: groq(MODEL_FAST),
    system: `${SYSTEM}\nVoice: ${voice}`,
    messages: [{ role: "user", content: `Text to rewrite: ${text}` }],
    maxOutputTokens: 600,
    temperature: 0.8,
    onError: ({ error }) => logAiError("tone", error),
  });

  return result.toTextStreamResponse({ headers: { "cache-control": "no-store" } });
}
