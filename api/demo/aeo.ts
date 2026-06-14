// AEO/GEO "how AI sees your business" demo: enter a business description ->
// how an AI engine (ChatGPT/Perplexity) would summarise it today, the gaps that
// hurt its AI visibility, concrete improvements, and a ready-to-paste JSON-LD
// block. Ties to the AEO/GEO services. Text-only -> generateObject. Not stored.
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { MODEL_STRUCTURED, preflight, errorResponse, clamp, json, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const AeoSchema = z.object({
  summary: z
    .string()
    .describe("How an AI answer engine would describe this business today, in 2-3 sentences"),
  confidence: z
    .enum(["low", "medium", "high"])
    .describe("How confidently an AI engine could represent this business from public info"),
  gaps: z.array(z.string()).describe("Two to four things missing that hurt AI/answer-engine visibility"),
  improvements: z
    .array(z.string())
    .describe("Three concrete actions to get accurately cited by AI engines"),
  schema: z
    .string()
    .describe("A ready-to-paste JSON-LD LocalBusiness or Organization block, as a JSON string"),
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

  const business = clamp(body.business, 1200).trim();
  if (business.length < 15) return errorResponse("Describe the business in a sentence or two.");

  try {
    const { object } = await generateObject({
      model: groq(MODEL_STRUCTURED),
      schema: AeoSchema,
      maxOutputTokens: 1100,
      prompt:
        "Act as an answer-engine (AEO/GEO) auditor. Given this business description, write how an AI engine would " +
        "summarise it today, judge confidence, list the gaps hurting its AI visibility, give three concrete " +
        "improvements, and produce a ready-to-paste JSON-LD LocalBusiness/Organization block (valid JSON string). " +
        "Assume a UAE/Dubai context unless told otherwise.\n\n" +
        `BUSINESS:\n"""\n${business}\n"""`,
    });
    return json(object);
  } catch (e) {
    logAiError("aeo", e);
    return errorResponse("The model couldn't analyse that — try describing the business more plainly.", 502);
  }
}
