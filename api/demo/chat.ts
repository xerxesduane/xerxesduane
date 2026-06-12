// Streaming chat demo — two personas selected by `demo`:
//   "assistant" — a generic small-business support/sales bot (the kind I deploy)
//   "lead"      — a lead-qualifying assistant for Xerxes Duane
// Streams plain text tokens back to the browser (see src/lib/demoClient.ts).
import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { MODEL_FAST, preflight, errorResponse, clamp } from "../_shared";

export const config = { runtime: "edge" };

type Turn = { role: "user" | "assistant"; content: string };

const SYSTEM: Record<string, string> = {
  assistant:
    "You are the AI assistant embedded on a small business's website — a live demo of the kind of assistant Xerxes Duane builds for clients. " +
    "Play the part of a friendly, capable support-and-sales rep for a generic small business (assume a service business unless the user says otherwise). " +
    "Be warm, concrete, and brief — under 80 words. Never invent specific prices, addresses, or policies; offer to connect them with a human for specifics. " +
    "If asked what you are, say you're a live demo built by Xerxes Duane to show what an AI assistant can do.",
  lead:
    "You are a lead-qualification assistant for Xerxes Duane, a one-person tech studio in Dubai (websites, apps, Odoo/ERP, automation, AI). " +
    "Your job: have a short, friendly conversation to understand the visitor's business, their main bottleneck, and what they'd want built. " +
    "Ask ONE focused question per reply. Keep each reply under 70 words. After roughly four exchanges, briefly summarise what you learned and warmly suggest booking a free 60-minute audit. " +
    "Serve first — be genuinely helpful, never pushy.",
};

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { demo?: string; messages?: Turn[] };
  try {
    body = (await req.json()) as { demo?: string; messages?: Turn[] };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const system = SYSTEM[body.demo ?? "assistant"] ?? SYSTEM.assistant;
  const raw = Array.isArray(body.messages) ? body.messages : [];
  // Keep the last 10 turns, drop empties, clamp each, and cap total input.
  const messages = raw
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-10)
    .map((m) => ({ role: m.role, content: clamp(m.content, 1500) }))
    .filter((m) => m.content.trim().length > 0);

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return errorResponse("Send a message to start.");
  }
  const totalChars = messages.reduce((n, m) => n + m.content.length, 0);
  if (totalChars > 6000) return errorResponse("That conversation is too long for the demo.");

  const result = streamText({
    model: anthropic(MODEL_FAST),
    system,
    messages,
    maxOutputTokens: 500,
    temperature: 0.5,
  });

  return result.toTextStreamResponse({ headers: { "cache-control": "no-store" } });
}
