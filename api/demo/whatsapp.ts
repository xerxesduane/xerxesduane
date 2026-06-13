// WhatsApp outreach demo — writes a short, warm first-contact WhatsApp message
// personalized to a single lead, then streams it back as plain text. This is the
// generation step behind an automation that reaches out to many leads at once.
import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import { MODEL_FAST, preflight, errorResponse, clamp, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const SYSTEM =
  "You write first-contact WhatsApp messages for a small business reaching out to a lead who " +
  "enquired about a product or service. Voice: warm, human, professional — never pushy or salesy. " +
  "Rules: address them by first name; reference what they're interested in and, if natural, their " +
  "city or how they enquired; keep it to 2 short sentences plus one soft call-to-action question; " +
  "at most one emoji; sound like a real person typing on their phone, not a marketing blast. " +
  "Output ONLY the message text — no quotes, no preamble, no sign-off, no subject line.";

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: {
    name?: string;
    company?: string;
    interest?: string;
    city?: string;
    source?: string;
  };
  try {
    body = await req.json();
  } catch {
    return errorResponse("Invalid request body.");
  }

  const name = clamp(body.name, 60).trim();
  const interest = clamp(body.interest, 160).trim();
  if (name.length < 1 || interest.length < 2) {
    return errorResponse("A lead needs at least a name and an interest.");
  }
  const company = clamp(body.company, 80).trim();
  const city = clamp(body.city, 60).trim();
  const source = clamp(body.source, 60).trim();

  const lead = [
    `Lead name: ${name}`,
    company && `Their business: ${company}`,
    `They're interested in: ${interest}`,
    city && `Their city: ${city}`,
    source && `How they enquired: ${source}`,
  ]
    .filter(Boolean)
    .join("\n");

  const result = streamText({
    model: groq(MODEL_FAST),
    system: SYSTEM,
    messages: [{ role: "user", content: `Write the outreach message for this lead.\n\n${lead}` }],
    maxOutputTokens: 160,
    temperature: 0.8,
    onError: ({ error }) => logAiError("whatsapp", error),
  });

  return result.toTextStreamResponse({ headers: { "cache-control": "no-store" } });
}
