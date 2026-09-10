/**
 * Every published price, in one place.
 *
 * The site went price-free for a while on the argument that a number set
 * before the scope is a guess. That is true of the *final* number and not of
 * the floor, and hiding the floor cost more than it saved: people who could
 * afford the work could not tell, people who could not afford it booked calls
 * anyway, and search engines and AI assistants had nothing to quote. A "from"
 * price answers the only question a stranger actually has, which is whether
 * they are in the right shop.
 *
 * ONE SOURCE, TWO OUTPUTS. Amounts are stored as numbers, and both the visible
 * label and the Schema.org offer are derived from them. Storing "from AED
 * 6,000" as a string instead would mean the page and the structured data could
 * drift apart, and the one that search engines read is the one nobody looks at.
 *
 * Keep every figure real. A price here is a commitment to a stranger, so
 * nothing in this file should ever be estimated, rounded for looks, or
 * invented to fill a gap.
 */

/** ISO 4217, for the structured data. Everything on the site is billed in it. */
export const CURRENCY = "AED";

/** What one "from" figure buys. */
export type PriceUnit = "project" | "month" | "day" | "video";

export interface PricePoint {
  /** Must match a title in SERVICES exactly, so the two can be joined. */
  service: string;
  /**
   * The matching service page, where one exists.
   *
   * A second key rather than a nicety: the service pages name the same work
   * differently for search ("Odoo ERP Implementation & Administration" against
   * "ERP & Odoo"), so joining those on the title silently matches nothing and
   * the pages ship an offer-free Service node. Two pages have no entry here on
   * purpose, SEO and general web development, because neither ever had a
   * published starting price.
   */
  pageSlug?: string;
  /** The floor, in whole dirhams. Real projects start here and go up. */
  from: number;
  unit: PriceUnit;
}

/**
 * The rate card.
 *
 * Ordered biggest commitment last, so someone scanning it meets the
 * approachable numbers first rather than bouncing off AED 25,000.
 */
export const RATE_CARD: PricePoint[] = [
  { service: "Video Editing", pageSlug: "video-editing-dubai", from: 750, unit: "video" },
  { service: "Graphic Design & Branding", pageSlug: "branding-graphic-design-dubai", from: 1500, unit: "project" },
  { service: "Videography & Photography", pageSlug: "videography-photography-dubai", from: 1500, unit: "day" },
  { service: "Landing Pages & Funnels", pageSlug: "landing-page-design-dubai", from: 2500, unit: "project" },
  { service: "AEO (Answer Engine Optimization)", pageSlug: "answer-engine-optimization-dubai", from: 2500, unit: "month" },
  { service: "GEO (Generative Engine Optimization)", pageSlug: "generative-engine-optimization-dubai", from: 3000, unit: "month" },
  { service: "Dashboards & CRM", pageSlug: "crm-development-dubai", from: 4000, unit: "project" },
  { service: "AI Automation & Solutions", pageSlug: "ai-automation-dubai", from: 6000, unit: "project" },
  { service: "Custom System Development", pageSlug: "custom-software-development-dubai", from: 9000, unit: "project" },
  { service: "E-Commerce & Stores", pageSlug: "ecommerce-development-dubai", from: 9000, unit: "project" },
  { service: "ERP & Odoo", pageSlug: "odoo-erp-dubai", from: 12000, unit: "project" },
  { service: "Mobile & Web Apps", pageSlug: "mobile-app-development-dubai", from: 25000, unit: "project" },
];

/**
 * Thousands separators without `toLocaleString`.
 *
 * These pages are prerendered in Node and then hydrated in a browser. ICU data
 * differs between the two, so a locale-formatted number can render one way in
 * the HTML and another way in React, which is a hydration mismatch on a string
 * a customer is reading. Doing it by hand is boring and identical everywhere.
 */
export function aed(amount: number): string {
  const digits = String(amount);
  let out = "";
  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && (digits.length - i) % 3 === 0) out += ",";
    out += digits[i];
  }
  return `${CURRENCY} ${out}`;
}

const UNIT_SUFFIX: Record<PriceUnit, string> = {
  project: "",
  month: " / month",
  day: " / day",
  video: " per video",
};

/** The visible label, e.g. "from AED 6,000" or "from AED 2,500 / month". */
export const priceLabel = (point: PricePoint): string =>
  `from ${aed(point.from)}${UNIT_SUFFIX[point.unit]}`;

/** Schema.org `unitCode`/`billingDuration` hints, for the offer nodes. */
export const UNIT_SCHEMA: Record<PriceUnit, { unitText: string; recurring: boolean }> = {
  project: { unitText: "project", recurring: false },
  month: { unitText: "month", recurring: true },
  day: { unitText: "day", recurring: false },
  video: { unitText: "video", recurring: false },
};

/** Look a service's price up by its title. Undefined when it has no floor. */
export const priceFor = (serviceTitle: string): PricePoint | undefined =>
  RATE_CARD.find((p) => p.service === serviceTitle);

/** The same, for a service page. Undefined when that page publishes no price. */
export const priceForSlug = (slug: string): PricePoint | undefined =>
  RATE_CARD.find((p) => p.pageSlug === slug);

/**
 * The reduced rate for organisations that are not trying to make money.
 *
 * Half price, stated as a rule rather than "get in touch and we'll see". A
 * discount you have to negotiate for is one most small charities will never
 * ask about, which defeats the point of having it.
 */
export const NONPROFIT = {
  /** Multiplier applied to every figure on the rate card. */
  rate: 0.5,
  label: "50% off",
  who: "Registered non-profits, churches and charities",
  body:
    "Half price on everything, the whole rate card, not a token discount on one thing. Registered non-profits, churches and charities pay 50% of every figure on this page. Send proof of registration with your enquiry and the proposal comes back at the reduced rate. Same work, same timeline, same support.",
  /** A worked example, so the discount is concrete rather than a percentage. */
  example: (point: PricePoint): string =>
    `${point.service} starts at ${aed(point.from)}, so ${aed(point.from * 0.5)} for a charity.`,
};

/**
 * How pricing is talked about in prose.
 *
 * Said the same way everywhere it appears, which is why it lives here rather
 * than being retyped per page. `answer` is the long form: the pricing FAQ, the
 * FAQPage schema, and what the site assistant reads when someone asks.
 */
export const PRICING = {
  /** Sits in a service page header, under the title. */
  meta: "Published starting prices · a fixed proposal after your free audit",
  /** Said once under the services grid. */
  line: "Every price on this site is a real starting point, published up front.",
  answer:
    "Starting prices are published, so you can work out whether we are a fit before you talk to anyone. A landing page starts at AED 2,500, a CRM or dashboard build at AED 4,000, AI automation at AED 6,000, and an Odoo rollout at AED 12,000. The Starter package is AED 2,500 if the budget is tight, and registered non-profits, churches and charities pay half of everything. Those are floors rather than quotes: the exact number depends on scope, which is what the free 60-minute audit is for. You leave it with a written proposal, fixed price, no guessing games.",
};
