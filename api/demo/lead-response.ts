// Lead Response Assistant — reads a pasted customer enquiry, classifies its
// intent + urgency, summarises it, and drafts a ready-to-send professional reply
// plus the recommended next step. Showcases CRM/lead-handling automation. JSON.
import { z } from "zod";
import { structured, preflight, errorResponse, clamp, json, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const LeadResponseSchema = z.object({
  intent: z.string().describe("Short label for what the enquiry is about, e.g. 'New booking request'"),
  urgency: z.enum(["low", "medium", "high"]).describe("How quickly this needs a reply"),
  summary: z.string().describe("One or two sentences summarising the enquiry"),
  suggestedReply: z.string().describe("A clear, professional, ready-to-send reply to the customer"),
  nextStep: z.string().describe("The single recommended next step for the business"),
});

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { enquiry?: string };
  try {
    body = (await req.json()) as { enquiry?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const enquiry = clamp(body.enquiry, 2000).trim();
  if (enquiry.length < 10) return errorResponse("Paste a customer enquiry to respond to.");

  try {
    const object = await structured({
      schema: LeadResponseSchema,
      prompt:
        "Read this inbound customer enquiry. Classify its intent and urgency, summarise it briefly, " +
        "then write a clear, professional, ready-to-send reply and the single recommended next step for " +
        "the business. Keep the reply warm and concrete; don't invent specific prices or commitments.\n\n" +
        `ENQUIRY:\n"""\n${enquiry}\n"""`,
    });
    return json(object);
  } catch (e) {
    logAiError("lead-response", e);
    return errorResponse("The model couldn't process that enquiry — try pasting it more plainly.", 502);
  }
}
