// Business process analyzer — takes a free-text description of a manual workflow
// and returns the workflow broken into steps, its bottlenecks, a concrete
// automation plan, and a rough time-saved estimate. Showcases AI automation
// scoping. Returns JSON (structured output).
import { z } from "zod";
import { structured, preflight, errorResponse, clamp, json, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const ProcessSchema = z.object({
  steps: z.array(z.string()).describe("The manual workflow broken into clear, ordered steps"),
  bottlenecks: z
    .array(
      z.object({
        step: z.string().describe("Which step or part of the workflow this bottleneck is in"),
        problem: z.string().describe("The repeated work, delay, or friction in plain language"),
        impact: z.string().describe("Why it hurts — wasted time, errors, lost leads, etc."),
      }),
    )
    .describe("The biggest bottlenecks and sources of repeated work"),
  automationPlan: z
    .array(
      z.object({
        task: z.string().describe("The concrete thing to automate"),
        tool: z.string().describe("A realistic tool or approach (e.g. Odoo, Zapier, a custom AI step)"),
        effort: z.enum(["low", "medium", "high"]).describe("Rough implementation effort"),
      }),
    )
    .describe("Concrete, prioritised automation opportunities"),
  estimatedTimeSaved: z
    .string()
    .describe("A clearly-rough estimate of time saved, e.g. 'roughly 6-8 hours/week'"),
});

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { workflow?: string };
  try {
    body = (await req.json()) as { workflow?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const workflow = clamp(body.workflow, 3000).trim();
  if (workflow.length < 20) return errorResponse("Describe the manual workflow in a bit more detail.");

  try {
    const object = await structured({
      schema: ProcessSchema,
      prompt:
        "You analyse a small business's manual workflow. Break it into clear ordered steps, then find the " +
        "bottlenecks and repeated work, and propose concrete, realistic automation opportunities (name a " +
        "plausible tool or approach for each and rate the effort). estimatedTimeSaved is a ROUGH estimate only " +
        "— make it sound like an estimate, never a guarantee.\n\n" +
        `WORKFLOW:\n"""\n${workflow}\n"""`,
    });
    return json(object);
  } catch (e) {
    logAiError("process", e);
    return errorResponse("The model couldn't analyse that workflow — try describing it more plainly.", 502);
  }
}
