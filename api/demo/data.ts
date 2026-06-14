// Data-insights demo: paste a small business CSV -> three insights, a chart
// spec, and a recommended next action. Text-only, so it uses generateObject
// with the structured model. The chart is rendered client-side as inline SVG
// (no chart library). Nothing is stored.
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { MODEL_STRUCTURED, preflight, errorResponse, clamp, json, logAiError } from "../_shared";

export const config = { runtime: "edge" };

const DataSchema = z.object({
  headline: z.string().describe("One-line headline takeaway about the data"),
  insights: z
    .array(z.object({ title: z.string(), detail: z.string() }))
    .describe("Exactly three specific, non-obvious insights grounded in the numbers"),
  chart: z
    .object({
      type: z.enum(["bar", "line"]),
      title: z.string(),
      unit: z.string().describe("Unit for the values, e.g. AED, orders, %"),
      labels: z.array(z.string()).describe("X-axis labels"),
      values: z.array(z.number()).describe("Values, same length as labels"),
    })
    .describe("The single most meaningful series to visualise"),
  nextAction: z.string().describe("One concrete, recommended next action"),
});

export default async function handler(req: Request): Promise<Response> {
  const blocked = await preflight(req);
  if (blocked) return blocked;

  let body: { csv?: string };
  try {
    body = (await req.json()) as { csv?: string };
  } catch {
    return errorResponse("Invalid request body.");
  }

  const csv = clamp(body.csv, 4000).trim();
  if (csv.length < 20) return errorResponse("Paste a small CSV — a header row plus a few rows.");

  try {
    const { object } = await generateObject({
      model: groq(MODEL_STRUCTURED),
      schema: DataSchema,
      maxOutputTokens: 1100,
      prompt:
        "Analyse this small CSV of business data. Return exactly three specific insights, a single chart spec " +
        "(pick the most meaningful series; labels and values arrays MUST be the same length and in order), and one " +
        "recommended next action. Keep all numbers consistent with the data.\n\n" +
        `CSV:\n"""\n${csv}\n"""`,
    });
    // Defend the renderer: keep labels/values aligned even if the model drifts.
    const n = Math.min(object.chart.labels.length, object.chart.values.length);
    object.chart.labels = object.chart.labels.slice(0, n);
    object.chart.values = object.chart.values.slice(0, n);
    if (n === 0) return errorResponse("That data didn't have a clear series to chart — try a different sample.", 422);
    return json(object);
  } catch (e) {
    logAiError("data", e);
    return errorResponse("The model couldn't analyse that data — check the CSV and try again.", 502);
  }
}
