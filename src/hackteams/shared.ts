/**
 * Shared by the team pages and their API (api/hack-teams/_lib.ts imports
 * these), so the choices the page offers are exactly the ones the server
 * accepts. Keep this file free of imports: the edge functions import it too.
 */

/**
 * What a participant can say they bring, as the Champions' Google Form
 * "#HACK2026 Dubai: choose your challenge" lists them. Anything else goes in
 * the free "Other" answer.
 */
export const SKILLS = [
  "Developer",
  "Designer",
  "Videographer or video editor",
  "Photographer",
  "Social media",
  "AI and data",
  "Automation",
  "Marketing",
  "Writer",
  "Arabic writer or translator",
  "Editor or proofreader",
  "Tester",
  "Product lead or organiser",
  "Willing hands: I'll help wherever I'm needed",
] as const;
export type Skill = (typeof SKILLS)[number];

/** Hours a week they can give. No longer asked (the form doesn't), kept for answers saved before. */
export const HOURS = ["1 to 2", "3 to 5", "6 or more"] as const;
export type Hours = (typeof HOURS)[number];

/** Can they come to the team dinner on 17 October? */
export const DINNER = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No, please place me in a team" },
  { value: "unsure", label: "Not sure yet" },
] as const;
export type Dinner = (typeof DINNER)[number]["value"];

/** When answers are due, as the form says. */
export const ANSWER_BY = "Wednesday 14 October";
