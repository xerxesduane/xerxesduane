// Arabic <-> English translator demo. On-brand for a bilingual Dubai audience.
// Streams the translation back as plain text.
import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import { MODEL_FAST, preflight, errorResponse, clamp, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const SYSTEM: Record<string, string> = {
  auto:
    "You are a professional translator. Detect the language of the user's text. " +
    "If it is Arabic, translate it into natural, fluent English. " +
    "If it is English (or any other language), translate it into natural Modern Standard Arabic. " +
    "Output ONLY the translation — no preamble, no quotes, no language labels, no notes.",
  ar2en:
    "You are a professional translator. Translate the user's text into natural, fluent English, " +
    "preserving tone and meaning. Output ONLY the translation — no preamble, quotes, or notes.",
  en2ar:
    "You are a professional translator. Translate the user's text into natural Modern Standard Arabic, " +
    "preserving tone and meaning. Output ONLY the translation — no preamble, quotes, or notes.",
};

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { text?: string; direction?: string };
  try {
    body = (await req.json()) as { text?: string; direction?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const text = clamp(body.text, 2000).trim();
  if (text.length < 1) return errorResponse("Enter some text to translate.");
  const system = SYSTEM[body.direction ?? "auto"] ?? SYSTEM.auto;

  const result = streamText({
    model: groq(MODEL_FAST),
    system,
    messages: [{ role: "user", content: text }],
    maxOutputTokens: 700,
    temperature: 0.2,
    onError: ({ error }) => logAiError("translate", error),
  });

  return result.toTextStreamResponse({ headers: { "cache-control": "no-store" } });
}
