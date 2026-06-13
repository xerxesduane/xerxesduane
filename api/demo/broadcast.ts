// WhatsApp Broadcast Campaign Builder — turns a plain-English promo into a
// Meta-template-style opt-in broadcast plus two gentle follow-up nudges and a
// recommended audience segment. Showcases WhatsApp marketing automation.
// Returns a validated object via the AI SDK's generateObject + a Zod schema.
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { MODEL_STRUCTURED, preflight, errorResponse, clamp, json, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const BroadcastSchema = z.object({
  templateBody: z
    .string()
    .describe(
      "A Meta-template-style opt-in WhatsApp broadcast message for the promo, with a clear call to action and a short opt-out line at the end (e.g. 'Reply STOP to opt out')",
    ),
  followUp1: z.string().describe("A gentle day-2 nudge message for people who haven't responded yet"),
  followUp2: z.string().describe("A final-call day-4 nudge message that adds friendly urgency"),
  audience: z.string().describe("The recommended audience segment to send this broadcast to"),
});

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { promo?: string };
  try {
    body = (await req.json()) as { promo?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const promo = clamp(body.promo, 1500).trim();
  if (promo.length < 8) return errorResponse("Describe the promo to broadcast.");

  try {
    const { object } = await generateObject({
      model: groq(MODEL_STRUCTURED),
      schema: BroadcastSchema,
      maxOutputTokens: 1200,
      prompt:
        "Build a WhatsApp broadcast campaign from this promo. Write a warm, on-brand opt-in broadcast " +
        "message with a clear call to action and a short opt-out line, then two follow-up nudges (a gentle " +
        "day-2 reminder and a final-call day-4 reminder), and recommend the audience segment to send to. " +
        "Keep the tone friendly and conversational. Do not invent offers, dates, or details that aren't given.\n\n" +
        `PROMO:\n"""\n${promo}\n"""`,
    });
    return json(object);
  } catch (e) {
    logAiError("broadcast", e);
    return errorResponse("The model couldn't build that campaign — try describing the promo more plainly.", 502);
  }
}
