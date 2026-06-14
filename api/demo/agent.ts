// Visible agentic-workflow demo. An inbound lead arrives and the agent runs a
// multi-step pipeline — read -> enrich -> qualify -> draft -> book -> sync CRM —
// streaming each step (and its "tool call") as NDJSON so the reasoning appears
// on screen as it happens. The CRM/calendar tools are clearly framed as a
// simulation for the demo; the qualification + reply are real LLM output. One
// model call powers the whole run (cheap + rate-limit friendly); the steps are
// then executed and streamed. Nothing is stored.
import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { MODEL_FAST, preflight, errorResponse, clamp, parseLooseJson, logAiError } from "../_shared";

export const config = { runtime: "edge" };

type Plan = {
  name: string;
  company: string;
  industry: string;
  intent: string;
  score: number;
  scoreReason: string;
  reply: string;
  suggestedSlot: string;
};

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { lead?: string };
  try {
    body = (await req.json()) as { lead?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const lead = clamp(body.lead, 1200).trim();
  if (lead.length < 12) return errorResponse("Paste an inbound lead message to run the agent.");

  let raw: string;
  try {
    const { text } = await generateText({
      model: groq(MODEL_FAST),
      maxOutputTokens: 700,
      temperature: 0.4,
      prompt:
        "You are a sales-ops AI agent for a Dubai tech studio. Read this inbound lead and return ONLY minified JSON, no prose: " +
        '{"name":string,"company":string,"industry":string,"intent":string,"score":number,"scoreReason":string,"reply":string,"suggestedSlot":string}. ' +
        "score is 0-100 fit. scoreReason is one short clause. reply is a warm WhatsApp-style message (<55 words) that answers them and proposes the slot. suggestedSlot is a concrete day+time in GST.\n\n" +
        `LEAD:\n"""\n${lead}\n"""`,
    });
    raw = text;
  } catch (e) {
    logAiError("agent", e);
    return errorResponse("The agent couldn't process that lead — please try again.", 502);
  }

  const plan = parseLooseJson<Plan>(raw);
  if (!plan) return errorResponse("The agent couldn't read that lead clearly — try rephrasing it.", 422);

  const p = plan;
  const steps = [
    { id: "ingest", label: "Read the inbound message", tool: "inbox.receive()", detail: `Lead from ${p.name || "unknown sender"}` },
    { id: "enrich", label: "Enrich the contact", tool: "crm.lookup(email) · simulated", detail: `${p.company || "—"} · ${p.industry || "—"}` },
    { id: "qualify", label: "Qualify & score the fit", tool: "score.fit()", detail: `Fit ${p.score}/100 — ${p.scoreReason}` },
    { id: "draft", label: "Draft a personal reply", tool: "llm.compose()", detail: p.reply },
    { id: "book", label: "Offer a time", tool: "calendar.findSlot() · simulated", detail: p.suggestedSlot },
    { id: "crm", label: "Update the CRM", tool: "crm.upsert() · simulated", detail: "Stage → Qualified · owner assigned · follow-up set" },
  ];

  const enc = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (o: unknown) => controller.enqueue(enc.encode(JSON.stringify(o) + "\n"));
      try {
        for (const s of steps) {
          send({ type: "step", ...s, status: "running" });
          await new Promise((r) => setTimeout(r, 430));
          send({ type: "step", ...s, status: "done" });
        }
        send({ type: "summary", score: p.score, reply: p.reply, slot: p.suggestedSlot });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "content-type": "application/x-ndjson; charset=utf-8", "cache-control": "no-store" },
  });
}
