// Structured-extraction demo — turns a messy inbound message into clean,
// typed JSON (the kind of thing that auto-files a lead into a CRM). Returns a
// validated object via the AI SDK's generateObject + a Zod schema.
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { MODEL_FAST, preflight, errorResponse, clamp, json, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const LeadSchema = z.object({
  name: z.string().describe("Person's full name, or empty string if absent"),
  email: z.string().describe("Email address, or empty string if absent"),
  phone: z.string().describe("Phone number, or empty string if absent"),
  company: z.string().describe("Company or business name, or empty string if absent"),
  intent: z
    .enum(["buy", "support", "partnership", "hiring", "other", "unknown"])
    .describe("Primary reason they reached out"),
  services: z.array(z.string()).describe("Services or products they mention wanting, may be empty"),
  urgency: z.enum(["low", "medium", "high", "unknown"]).describe("How time-sensitive the request reads"),
  summary: z.string().describe("One-sentence summary of what they want"),
  suggestedReply: z.string().describe("A short, friendly first reply (under 50 words) the business could send back"),
});

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { text?: string };
  try {
    body = (await req.json()) as { text?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const text = clamp(body.text, 4000).trim();
  if (text.length < 10) return errorResponse("Paste a message to extract from.");

  try {
    const { object } = await generateObject({
      model: google(MODEL_FAST),
      schema: LeadSchema,
      maxOutputTokens: 500,
      prompt:
        "Extract structured lead details from this inbound message. " +
        "Use empty strings for missing text fields and an empty array for missing services. Do not invent information.\n\n" +
        `MESSAGE:\n"""\n${text}\n"""`,
    });
    return json(object);
  } catch (e) {
    logAiError("extract", e);
    return errorResponse("The model couldn't extract that — try a clearer message.", 502);
  }
}
