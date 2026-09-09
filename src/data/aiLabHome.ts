import { AI_LAB_DEMOS, AI_LAB_TOOL_COUNT, type AiLabDemo } from "./aiLab";

/* ---------------------------------------------------------------------------
 * What the homepage says about the AI Lab.
 *
 * The picks are resolved against the real catalogue (src/data/aiLab.ts), so a
 * tool that is renamed or removed can't leave a dead pill on the homepage, and
 * the "all N tools" count is the catalogue's own length — never a typed-in
 * number. The short `label` exists only because the catalogue titles are full
 * sentences that don't fit a pill.
 * ------------------------------------------------------------------------- */

interface HomePick {
  demoId: string;
  /** Pill-length name for the same tool. */
  label: string;
}

const PICKS: HomePick[] = [
  { demoId: "leadresponse", label: "WhatsApp lead handler" },
  { demoId: "quote", label: "UAE VAT quotes" },
  { demoId: "reply", label: "Arabic ↔ English replies" },
  { demoId: "pipeline", label: "Odoo readiness scan" },
  { demoId: "aeo", label: "AI search visibility" },
  { demoId: "process", label: "Automation finder" },
];

export interface AiLabHomeCard extends HomePick {
  demo: AiLabDemo;
}

/** Only picks that still exist in the catalogue survive. */
export const AI_LAB_HOME_CARDS: AiLabHomeCard[] = PICKS.flatMap((pick) => {
  const demo = AI_LAB_DEMOS.find((d) => d.id === pick.demoId);
  return demo ? [{ ...pick, demo }] : [];
});

/**
 * The picks split into two rows, which the homepage card slides in opposite
 * directions. Split rather than hard-coded so removing a pick can't leave a
 * row empty.
 */
export const AI_LAB_HOME_ROWS: AiLabHomeCard[][] = [
  AI_LAB_HOME_CARDS.filter((_, i) => i % 2 === 0),
  AI_LAB_HOME_CARDS.filter((_, i) => i % 2 === 1),
].filter((row) => row.length > 0);

/** Total tools in the lab, straight from the catalogue. */
export const AI_LAB_COUNT = AI_LAB_TOOL_COUNT;

/** Factual notes about how the lab behaves — no claims, no metrics. */
export const AI_LAB_TRUST = ["No sign-up", "Sample data", "UAE workflows"];
