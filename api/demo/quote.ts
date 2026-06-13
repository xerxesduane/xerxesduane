// Quote/invoice generator — turns a plain-English job description into itemized
// line items. The UI computes subtotal + 5% UAE VAT + total from the numbers,
// so the maths is always exact. Showcases finance/Odoo automation. Returns JSON.
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { MODEL_STRUCTURED, preflight, errorResponse, clamp, json, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const QuoteSchema = z.object({
  client: z.string().describe("Client or customer name; use 'Client' if none is given"),
  currency: z.string().describe("Three-letter currency code; default to AED for the UAE"),
  items: z
    .array(
      z.object({
        description: z.string().describe("What the line item is"),
        quantity: z.number().describe("Quantity as a number"),
        unitPrice: z.number().describe("Price per unit as a number, in the currency"),
      }),
    )
    .describe("Itemized line items for the quote"),
  notes: z.string().describe("A short payment term or note, may be empty"),
});

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { request?: string };
  try {
    body = (await req.json()) as { request?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const request = clamp(body.request, 1500).trim();
  if (request.length < 8) return errorResponse("Describe the job to quote for.");

  try {
    const { object } = await generateObject({
      model: groq(MODEL_STRUCTURED),
      schema: QuoteSchema,
      maxOutputTokens: 1200,
      prompt:
        "Turn this job description into a clear, itemized quote. Infer reasonable line items and fair " +
        "market unit prices in AED for the UAE when amounts aren't given. Do NOT add VAT or totals — " +
        "they're calculated separately from your numbers.\n\n" +
        `JOB:\n"""\n${request}\n"""`,
    });
    return json(object);
  } catch (e) {
    logAiError("quote", e);
    return errorResponse("The model couldn't build that quote — try describing the job more plainly.", 502);
  }
}
