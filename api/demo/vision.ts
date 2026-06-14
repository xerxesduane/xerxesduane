// Vision / multimodal demo: an uploaded photo -> a structured result. Two modes:
//   "receipt" -> an itemized expense line (merchant, date, total, 5% VAT, category)
//   "product" -> a store-ready description + SEO + a suggested AED price
// Uses Llama 4 Scout (image input, Preview on Groq). Llama models lack
// json_schema on Groq, so we prompt for strict JSON and recover it with
// parseLooseJson rather than generateObject. Images are processed in memory
// and never stored.
import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import {
  MODEL_VISION,
  preflight,
  errorResponse,
  json,
  parseLooseJson,
  logAiError,
} from "../_shared";

export const config = { runtime: "edge" };

// ~2.6MB of base64 ≈ ~1.9MB image. The client downscales to ~1100px first, so
// real payloads are far smaller; this is the abuse ceiling.
const MAX_IMG_B64 = 2_600_000;

const PROMPTS: Record<string, string> = {
  receipt:
    "You are an expenses assistant for a UAE business. Read this receipt or invoice photo and return ONLY minified JSON, no prose: " +
    '{"merchant":string,"date":string,"currency":string,"category":string,"subtotal":number,"vat":number,"total":number,"items":[{"name":string,"price":number}],"note":string}. ' +
    "Use AED if no currency is shown. If a value is unreadable use an empty string or 0. Never invent line items you cannot see. 'category' is a bookkeeping category (e.g. Meals, Fuel, Office, Software).",
  product:
    "You are an e-commerce copywriter for a UAE store. Look at this product photo and return ONLY minified JSON, no prose: " +
    '{"title":string,"description":string,"bullets":[string,string,string],"seoTitle":string,"metaDescription":string,"suggestedPriceAed":number,"tags":[string],"note":string}. ' +
    "Write a polished, store-ready description (2-3 sentences). Base 'suggestedPriceAed' on what the item visibly appears to be and note in 'note' that it is an estimate.",
};

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { image?: string; mode?: string };
  try {
    body = (await req.json()) as { image?: string; mode?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const image = typeof body.image === "string" ? body.image : "";
  if (!image) return errorResponse("Upload a photo first.");
  if (image.length > MAX_IMG_B64) {
    return errorResponse("That image is a bit large — try a smaller or more compressed photo.");
  }
  const mode = body.mode === "product" ? "product" : "receipt";

  try {
    const { text } = await generateText({
      model: groq(MODEL_VISION),
      maxOutputTokens: 900,
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: PROMPTS[mode] },
            { type: "image", image },
          ],
        },
      ],
    });
    const data = parseLooseJson(text);
    if (!data) {
      logAiError("vision", new Error(`unparseable (${mode}): ${text.slice(0, 200)}`));
      return errorResponse("The model couldn't read that clearly — try a sharper, well-lit photo.", 422);
    }
    return json({ mode, data });
  } catch (e) {
    logAiError("vision", e);
    return errorResponse("The vision model couldn't process that image — please try another.", 502);
  }
}
