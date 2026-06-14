// Reply-drafter demo — paste an inbound email or message, pick a tone, get a
// ready-to-send draft. Showcases inbox/support automation. Streams plain text.
import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import { MODEL_FAST, preflight, errorResponse, clamp, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const TONES: Record<string, string> = {
  friendly: "Friendly and approachable, warm but still professional.",
  formal: "Formal and polished, suitable for a corporate client.",
  brief: "Brief and to the point — a few short sentences, no fluff.",
};

const SYSTEM =
  "You draft replies to inbound business messages (emails, WhatsApp, DMs) for a small business " +
  "owner. Read the incoming message, address every question or request in it, and write a clear, " +
  "helpful reply the owner could send as-is. If something needs info the owner must fill in, leave " +
  "a short [bracketed placeholder]. No subject line. Output ONLY the reply body.";

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { message?: string; tone?: string };
  try {
    body = (await req.json()) as { message?: string; tone?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const message = clamp(body.message, 3000).trim();
  if (message.length < 5) return errorResponse("Paste the message you want to reply to.");
  const tone = TONES[body.tone ?? "friendly"] ?? TONES.friendly;

  const result = streamText({
    model: groq(MODEL_FAST),
    system: `${SYSTEM}\nTone: ${tone}`,
    messages: [{ role: "user", content: `Draft a reply to this message:\n"""\n${message}\n"""` }],
    maxOutputTokens: 500,
    temperature: 0.6,
    onError: ({ error }) => logAiError("reply", error),
  });

  return result.toTextStreamResponse({ headers: { "cache-control": "no-store" } });
}
