// Notes-to-action-items demo — turns messy meeting notes or a voice-note
// transcript into a clean summary, decisions, and owned action items. Showcases
// the kind of ops automation that saves hours. Returns validated JSON.
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { MODEL_STRUCTURED, preflight, errorResponse, clamp, json, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const NotesSchema = z.object({
  summary: z.string().describe("A 1-2 sentence plain-English summary of the discussion"),
  decisions: z.array(z.string()).describe("Concrete decisions that were made, may be empty"),
  actionItems: z
    .array(
      z.object({
        task: z.string().describe("What needs to be done, as a short imperative"),
        owner: z.string().describe("Who owns it — a name from the notes, or 'Unassigned'"),
      }),
    )
    .describe("Action items extracted from the notes"),
});

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { notes?: string };
  try {
    body = await req.json();
  } catch {
    return errorResponse("Invalid request body.");
  }

  const notes = clamp(body.notes, 6000).trim();
  if (notes.length < 15) return errorResponse("Paste some notes to summarize.");

  try {
    const { object } = await generateObject({
      model: groq(MODEL_STRUCTURED),
      schema: NotesSchema,
      maxOutputTokens: 700,
      prompt:
        "Turn these raw meeting notes into a clean summary, a list of decisions, and owned action " +
        "items. Only use information present in the notes — do not invent owners or tasks. Use " +
        "'Unassigned' when no owner is clear.\n\n" +
        `NOTES:\n"""\n${notes}\n"""`,
    });
    return json(object);
  } catch (e) {
    logAiError("summarize", e);
    return errorResponse("The model couldn't process those notes — try clearer text.", 502);
  }
}
