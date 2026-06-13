// Invoice & statement parser — turns a messy supplier invoice or statement into
// clean, typed line items. The UI computes subtotal + 5% UAE VAT + total from the
// numbers, so the maths is always exact. Showcases bookkeeping/Odoo automation.
// Returns JSON via the AI SDK's generateObject + a Zod schema.
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { MODEL_STRUCTURED, preflight, errorResponse, clamp, json, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const InvoiceSchema = z.object({
  vendor: z.string().describe("Supplier or vendor name; use 'Vendor' if none is given"),
  invoiceDate: z.string().describe("Invoice or statement date as written, or empty string if absent"),
  currency: z.string().describe("Three-letter currency code; default to AED for the UAE"),
  items: z
    .array(
      z.object({
        description: z.string().describe("What the line item is"),
        quantity: z.number().describe("Quantity as a number; use 1 if not stated"),
        unitPrice: z.number().describe("Price per unit as a number, in the currency"),
      }),
    )
    .describe("Itemized line items parsed from the invoice"),
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
  if (text.length < 10) return errorResponse("Paste an invoice or statement to parse.");

  try {
    const { object } = await generateObject({
      model: groq(MODEL_STRUCTURED),
      schema: InvoiceSchema,
      maxOutputTokens: 1500,
      prompt:
        "Parse this messy supplier invoice or statement into clean, structured line items. " +
        "Extract each line's description, quantity, and unit price. Use an empty string for a " +
        "missing date and default the currency to AED for the UAE. Do NOT add VAT or totals — " +
        "they're calculated separately from your numbers. Do not invent information.\n\n" +
        `INVOICE:\n"""\n${text}\n"""`,
    });
    return json(object);
  } catch (e) {
    logAiError("invoice", e);
    return errorResponse("The model couldn't parse that invoice — try pasting cleaner text.", 502);
  }
}
