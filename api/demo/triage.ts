// Triage & route demo — turns any inbound customer message into a routing
// decision (department, priority, sentiment, language, SLA) plus a ready-to-send
// acknowledgement. The kind of thing that auto-files a helpdesk ticket. Returns
// a validated object via the AI SDK's generateObject + a Zod schema.
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { MODEL_STRUCTURED, preflight, errorResponse, clamp, json, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const TriageSchema = z.object({
  department: z
    .enum(["sales", "support", "billing", "complaint", "general"])
    .describe("The team this message should be routed to"),
  priority: z
    .enum(["low", "medium", "high", "urgent"])
    .describe("How urgently this needs a human response"),
  sentiment: z
    .enum(["positive", "neutral", "negative"])
    .describe("The emotional tone of the sender"),
  language: z.string().describe("The detected language of the message, e.g. 'English' or 'Arabic'"),
  sla: z.string().describe("A suggested response time, phrased like 'within 1 hour' or 'within 1 business day'"),
  ackDraft: z
    .string()
    .describe("A short, warm acknowledgement reply the business could send immediately to confirm receipt"),
});

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { message?: string };
  try {
    body = (await req.json()) as { message?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const message = clamp(body.message, 4000).trim();
  if (message.length < 10) return errorResponse("Paste a message to triage.");

  try {
    const { object } = await generateObject({
      model: groq(MODEL_STRUCTURED),
      schema: TriageSchema,
      maxOutputTokens: 1200,
      prompt:
        "You are an inbox-routing assistant for a customer support team. Read this inbound message and " +
        "decide which department should handle it, how urgent it is, the sender's sentiment, the language " +
        "it's written in, and a sensible response-time SLA. Then write a short, warm acknowledgement reply " +
        "to send immediately. Match the acknowledgement to the message's language. Do not invent details.\n\n" +
        `MESSAGE:\n"""\n${message}\n"""`,
    });
    return json(object);
  } catch (e) {
    logAiError("triage", e);
    return errorResponse("The model couldn't triage that — try a clearer message.", 502);
  }
}
