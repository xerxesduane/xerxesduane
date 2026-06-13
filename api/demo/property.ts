// Property listing writer — turns a few bullet facts about a real-estate unit
// into a polished portal listing, key highlights, and ready-to-send WhatsApp
// blurbs in English + Arabic. Showcases real-estate marketing automation.
// Returns a validated object via the AI SDK's generateObject + a Zod schema.
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { MODEL_STRUCTURED, preflight, errorResponse, clamp, json, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const ListingSchema = z.object({
  headline: z.string().describe("A punchy, portal-ready headline for the listing"),
  listing: z
    .string()
    .describe("A polished, professional English property listing of two to three paragraphs"),
  highlights: z
    .array(z.string())
    .describe("Key selling points of the property as short phrases"),
  whatsappEn: z
    .string()
    .describe("A short, friendly, ready-to-send WhatsApp blurb about the property in English"),
  whatsappAr: z
    .string()
    .describe("The same WhatsApp blurb translated into natural, fluent Arabic"),
});

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { facts?: string };
  try {
    body = (await req.json()) as { facts?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const facts = clamp(body.facts, 1500).trim();
  if (facts.length < 8) return errorResponse("List a few facts about the property.");

  try {
    const { object } = await generateObject({
      model: groq(MODEL_STRUCTURED),
      schema: ListingSchema,
      maxOutputTokens: 1400,
      prompt:
        "You are an expert UAE real-estate copywriter. From these bullet facts about a property, write a " +
        "compelling, accurate listing. Use only the facts provided — never invent amenities, prices, or " +
        "specs. Keep amounts and figures exactly as given (e.g. AED rents, sizes in sqft). Write the " +
        "Arabic blurb in natural, fluent Modern Standard Arabic, not a literal word-for-word translation.\n\n" +
        `PROPERTY FACTS:\n"""\n${facts}\n"""`,
    });
    return json(object);
  } catch (e) {
    logAiError("property", e);
    return errorResponse("The model couldn't write that listing — try listing the facts more plainly.", 502);
  }
}
