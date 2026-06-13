// SEO-metadata demo — turns a page topic into ready-to-ship search metadata:
// title tag, meta description, URL slug, and a couple of FAQ entries (the kind
// answer engines surface). Showcases the SEO/AEO service. Returns validated JSON.
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { MODEL_STRUCTURED, preflight, errorResponse, clamp, json, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const SeoSchema = z.object({
  title: z.string().describe("SEO <title>, compelling and under 60 characters, includes the main keyword"),
  metaDescription: z.string().describe("Meta description, 140-155 characters, benefit-led with a soft call to action"),
  slug: z.string().describe("Short URL slug, lowercase words separated by hyphens, no stop words"),
  keywords: z.array(z.string()).describe("4-6 target keywords / search phrases for this page"),
  faqs: z
    .array(z.object({ question: z.string(), answer: z.string().describe("A concise 1-2 sentence answer") }))
    .describe("Exactly 2 FAQ entries an answer engine could feature"),
});

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { topic?: string; keywords?: string };
  try {
    body = await req.json();
  } catch {
    return errorResponse("Invalid request body.");
  }

  const topic = clamp(body.topic, 400).trim();
  if (topic.length < 4) return errorResponse("Describe the page or business to optimize.");
  const hint = clamp(body.keywords, 200).trim();

  try {
    const { object } = await generateObject({
      model: groq(MODEL_STRUCTURED),
      schema: SeoSchema,
      maxOutputTokens: 700,
      prompt:
        "Generate search-engine metadata for a web page about the following. " +
        "Keep the title under 60 characters and the meta description between 140 and 155 characters. " +
        (hint ? `Prioritize these keywords if relevant: ${hint}.\n\n` : "\n") +
        `PAGE TOPIC:\n"""\n${topic}\n"""`,
    });
    return json(object);
  } catch (e) {
    logAiError("seo", e);
    return errorResponse("The model couldn't generate that — try a clearer topic.", 502);
  }
}
