// Insights (blog) content. Posts are authored as typed content blocks so they
// render cleanly in the prerendered HTML with zero markdown dependency.
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export interface InsightPost {
  slug: string;
  title: string;
  /** Meta description + card excerpt. */
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  author: string;
  readingMinutes: number;
  body: Block[];
}

export const INSIGHTS: InsightPost[] = [
  {
    slug: "how-much-does-odoo-cost-dubai",
    title: "How much does Odoo cost for a small business in Dubai?",
    description:
      "A plain-English breakdown of what Odoo actually costs a Dubai small business, licenses, implementation, and the hidden costs, so you can budget without surprises.",
    date: "2026-06-01",
    author: "Xerxes Magdaluyo",
    readingMinutes: 6,
    body: [
      {
        type: "p",
        text: "It's the first question almost every owner asks, and the honest answer is: it depends, but not as much as agencies make it sound. Here's how Odoo pricing actually breaks down for a small business in Dubai, in plain numbers, so you can budget with your eyes open.",
      },
      { type: "h2", text: "The three costs that actually matter" },
      {
        type: "p",
        text: "Most quotes blur these together so the total looks like one scary number. Separate them and it gets manageable:",
      },
      {
        type: "ul",
        items: [
          "Licenses, what you pay Odoo per user, per month.",
          "Implementation, the one-time cost to configure it around your business.",
          "Support, ongoing help once you're live (optional, but most small teams want it).",
        ],
      },
      { type: "h2", text: "1. Licenses: Community vs Enterprise" },
      {
        type: "p",
        text: "Odoo Community is free and open-source. For many small businesses it genuinely covers the basics: CRM, sales, inventory, and invoicing. Odoo Enterprise adds polished features, mobile apps, and official support, billed per user per month. The trap is paying for Enterprise when Community plus a little configuration would have done the job, or the reverse, forcing Community to do things that justify the Enterprise upgrade.",
      },
      {
        type: "quote",
        text: "The cheapest license is the one that fits, not the one with the lowest sticker. We'll tell you which edition you actually need.",
      },
      { type: "h2", text: "2. Implementation: where the real range is" },
      {
        type: "p",
        text: "This is the part that varies, because it depends on how much of your business you want connected. A single module configured cleanly is a modest, fixed-scope project. A full deployment, sales, inventory, purchasing, accounting, and a website talking to each other, is more, but it replaces the patchwork of apps and spreadsheets you're already paying for.",
      },
      {
        type: "p",
        text: "We scope this as a fixed quote up front, phased so you see value before everything is switched on. No open-ended hourly meters.",
      },
      { type: "h2", text: "3. The hidden costs nobody quotes" },
      {
        type: "ul",
        items: [
          "Data migration, getting your existing customers, products, and history in cleanly.",
          "Training, so your team actually uses the system instead of working around it.",
          "The cost of doing nothing, the hours lost every week to re-keying data between disconnected tools.",
        ],
      },
      { type: "h2", text: "So what should you budget?" },
      {
        type: "p",
        text: "Start with a free systems audit. We look at what you run today, tell you which Odoo edition fits, and give you a fixed-price plan for the implementation, before you commit to anything. You walk away with the numbers and a clear map, whether or not you hire us.",
      },
    ],
  },
];

export function getInsight(slug: string): InsightPost | undefined {
  return INSIGHTS.find((p) => p.slug === slug);
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Deterministic date format (no locale, so SSR and client always match). */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
