// Content-repurposing demo — turns one long-form message/article into a concise
// email, a single social post, and a short-video outline. Showcases the
// content/video side. Returns JSON via generateObject.
import { z } from "zod";
import { structured, preflight, errorResponse, clamp, json, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const RepurposeSchema = z.object({
  email: z
    .object({
      subject: z.string().describe("A short, compelling email subject line"),
      body: z.string().describe("A concise email body (2-4 short paragraphs)"),
    })
    .describe("The content reworked as an email"),
  socialPost: z.string().describe("A single ready-to-post social media post with a hook and a CTA"),
  videoOutline: z
    .object({
      hook: z.string().describe("An attention-grabbing opening line for a short video"),
      beats: z.array(z.string()).describe("3-6 ordered talking-point beats for the video"),
      cta: z.string().describe("A clear closing call-to-action"),
    })
    .describe("An outline for a short-form video / reel"),
});

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { content?: string };
  try {
    body = (await req.json()) as { content?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const content = clamp(body.content, 4000).trim();
  if (content.length < 40) return errorResponse("Paste a longer message or article to repurpose.");

  try {
    const object = await structured({
      schema: RepurposeSchema,
      prompt:
        "Repurpose the message below into three formats: a concise email (subject + body), a single " +
        "ready-to-post social media post, and a short-form video outline (a hook, 3-6 talking-point " +
        "beats, and a closing call-to-action). Keep the same facts and tone, but make each format " +
        "native to its channel.\n\n" +
        `MESSAGE:\n"""\n${content}\n"""`,
    });
    return json(object);
  } catch (e) {
    logAiError("repurpose", e);
    return errorResponse("The model couldn't repurpose that — try a clearer or shorter message.", 502);
  }
}
