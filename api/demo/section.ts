// Instant section generator: describe a business -> a structured landing-page
// hero section that the client renders as a live, on-brand preview. We return
// STRUCTURED fields (not raw HTML) so the preview is rendered into safe,
// branded markup — no dangerouslySetInnerHTML, no CSP risk. Text-only ->
// generateObject. Not stored.
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { MODEL_STRUCTURED, preflight, errorResponse, clamp, json, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const SectionSchema = z.object({
  eyebrow: z.string().describe("Short mono-style kicker, 2-4 words"),
  headline: z.string().describe("Punchy hero headline, <11 words"),
  subhead: z.string().describe("One-sentence supporting line"),
  bullets: z
    .array(z.object({ title: z.string(), text: z.string() }))
    .describe("Exactly three value bullets"),
  primaryCta: z.string().describe("Primary button label"),
  secondaryCta: z.string().describe("Secondary button label"),
  stat: z.object({ value: z.string(), label: z.string() }).describe("One proof stat, value + label"),
});

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { business?: string };
  try {
    body = (await req.json()) as { business?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const business = clamp(body.business, 800).trim();
  if (business.length < 10) return errorResponse("Describe the business or offer in a sentence.");

  try {
    const { object } = await generateObject({
      model: groq(MODEL_STRUCTURED),
      schema: SectionSchema,
      maxOutputTokens: 800,
      prompt:
        "Write a high-converting landing-page hero section for this business. Confident, benefit-led, no fluff. " +
        "Exactly three bullets. Keep it concise. Assume a UAE/Dubai audience unless told otherwise.\n\n" +
        `BUSINESS:\n"""\n${business}\n"""`,
    });
    return json(object);
  } catch (e) {
    logAiError("section", e);
    return errorResponse("The model couldn't draft that section — try a clearer description.", 502);
  }
}
