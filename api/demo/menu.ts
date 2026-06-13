// Menu-to-delivery listing generator — turns a rough restaurant menu into
// appetizing, structured listings ready for Talabat/Deliveroo/Noon. Each dish
// gets a polished name, a mouth-watering description, tags, and an upsell
// pairing. Returns a validated object via generateObject + a Zod schema.
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { MODEL_STRUCTURED, preflight, errorResponse, clamp, json, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const MenuSchema = z.object({
  items: z
    .array(
      z.object({
        name: z.string().describe("An appetizing, polished dish name"),
        description: z
          .string()
          .describe("A mouth-watering description of the dish in one or two sentences"),
        tags: z
          .array(z.string())
          .describe("Short descriptive tags such as spicy, vegetarian, or contains nuts; may be empty"),
        pairing: z.string().describe("A suggested upsell or pairing to go with the dish"),
      }),
    )
    .describe("The dishes from the menu, rewritten as delivery-ready listings"),
});

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { menu?: string };
  try {
    body = (await req.json()) as { menu?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const menu = clamp(body.menu, 4000).trim();
  if (menu.length < 10) return errorResponse("Paste a menu to rewrite.");

  try {
    const { object } = await generateObject({
      model: groq(MODEL_STRUCTURED),
      schema: MenuSchema,
      maxOutputTokens: 1500,
      prompt:
        "You are a food copywriter for UAE delivery apps (Talabat, Deliveroo, Noon). " +
        "Rewrite this rough restaurant menu into appetizing, delivery-ready listings. " +
        "For each dish give a polished name, a mouth-watering description, helpful tags " +
        "(like spicy, vegetarian, contains nuts), and a tempting pairing or upsell. " +
        "Use an empty array for tags when none apply. Do not invent dishes that aren't in the menu.\n\n" +
        `MENU:\n"""\n${menu}\n"""`,
    });
    return json(object);
  } catch (e) {
    logAiError("menu", e);
    return errorResponse("The model couldn't rewrite that menu — try listing the dishes more plainly.", 502);
  }
}
