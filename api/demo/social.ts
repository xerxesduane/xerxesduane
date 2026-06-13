// Social-caption demo — turns a one-line idea into a platform-tuned caption with
// hashtags. Showcases the content/marketing side. Streams plain text.
import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import { MODEL_FAST, preflight, errorResponse, clamp, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const PLATFORM: Record<string, string> = {
  instagram:
    "Instagram: punchy and visual, a strong first line that stops the scroll, short lines with " +
    "line breaks, 1-3 tasteful emoji, then 6-10 relevant hashtags on their own line.",
  linkedin:
    "LinkedIn: professional and insightful, lead with a hook or a small insight, 2-3 short " +
    "paragraphs, almost no emoji, end with a question to drive comments and 3-5 hashtags.",
  tiktok:
    "TikTok: casual, energetic and trend-aware, very short, 1-2 emoji, a clear call-to-action, " +
    "then 5-8 punchy hashtags.",
};

const SYSTEM =
  "You are a sharp social media copywriter for small businesses. Write ONE ready-to-post caption " +
  "for the requested platform and idea. Match the platform's native style exactly. Do not add a " +
  "preamble, options, or commentary — output ONLY the caption (and its hashtags).";

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { topic?: string; platform?: string };
  try {
    body = await req.json();
  } catch {
    return errorResponse("Invalid request body.");
  }

  const topic = clamp(body.topic, 600).trim();
  if (topic.length < 3) return errorResponse("Describe what you want to post about.");
  const platform = PLATFORM[body.platform ?? "instagram"] ?? PLATFORM.instagram;

  const result = streamText({
    model: groq(MODEL_FAST),
    system: `${SYSTEM}\nPlatform style — ${platform}`,
    messages: [{ role: "user", content: `Post idea: ${topic}` }],
    maxOutputTokens: 400,
    temperature: 0.9,
    onError: ({ error }) => logAiError("social", error),
  });

  return result.toTextStreamResponse({ headers: { "cache-control": "no-store" } });
}
