// CRM pipeline designer: turns a plain-English description of a sales process
// into a practical CRM blueprint — ordered stages (purpose + exit criteria),
// the deal/contact fields worth tracking, and a few automations. Text-only, so
// it uses generateObject with the structured model. Nothing is stored.
import { z } from "zod";
import { structured, preflight, errorResponse, clamp, json, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const PipelineSchema = z.object({
  stages: z
    .array(
      z.object({
        name: z.string().describe("Short stage name, e.g. 'Qualified'"),
        purpose: z.string().describe("What happens in this stage and why it exists"),
        exitCriteria: z.string().describe("The condition that moves a deal to the next stage"),
      }),
    )
    .describe("The ordered pipeline stages, first to last"),
  fields: z
    .array(
      z.object({
        name: z.string().describe("Field label, e.g. 'Deal value'"),
        type: z.string().describe("Field type, e.g. text, number, currency, date, dropdown, phone, email"),
        required: z.boolean().describe("Whether the field is mandatory"),
      }),
    )
    .describe("The deal/contact fields worth tracking in this pipeline"),
  automations: z
    .array(
      z.object({
        trigger: z.string().describe("The event that fires the automation"),
        action: z.string().describe("What the CRM should do when triggered"),
      }),
    )
    .describe("A few high-value automations for this pipeline"),
});

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { process?: string };
  try {
    body = (await req.json()) as { process?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const process = clamp(body.process, 3000).trim();
  if (process.length < 20) return errorResponse("Describe your sales process in a sentence or two.");

  try {
    const object = await structured({
      schema: PipelineSchema,
      prompt:
        "Design a practical CRM pipeline for the sales process below. Return ordered stages (each with a clear " +
        "purpose and concrete exit criteria), the deal/contact fields worth tracking (with sensible types and which " +
        "are required), and a few high-value automations (trigger -> action). Keep it lean and realistic for a small " +
        "business — prefer 4-6 stages and the fields that actually matter.\n\n" +
        `SALES PROCESS:\n"""\n${process}\n"""`,
    });
    if (object.stages.length === 0) {
      return errorResponse("Couldn't map that into stages — try describing the steps you take more plainly.", 422);
    }
    return json(object);
  } catch (e) {
    logAiError("pipeline", e);
    return errorResponse("The model couldn't design that pipeline — try describing your process more plainly.", 502);
  }
}
