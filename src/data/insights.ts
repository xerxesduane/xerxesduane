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
  /** Service-page slugs to cross-link from this post (internal linking). */
  relatedServices?: string[];
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
    relatedServices: ["odoo-erp-dubai"],
  },
  {
    slug: "odoo-vs-zoho-uae",
    title: "Odoo vs Zoho for a UAE small business: which actually fits?",
    description:
      "A practical comparison of Odoo and Zoho for small businesses in the UAE, where each one wins, where each one hurts, and how to choose without the sales spin.",
    date: "2026-05-26",
    author: "Xerxes Magdaluyo",
    readingMinutes: 7,
    body: [
      {
        type: "p",
        text: "Both Odoo and Zoho promise to run your whole business from one place. Both can. The right answer depends less on features and more on how you actually work, and how much you want connected. Here's the honest version.",
      },
      { type: "h2", text: "Where Zoho tends to win" },
      {
        type: "ul",
        items: [
          "You mostly need CRM, email, and a few light apps, fast.",
          "You want predictable per-app pricing and a gentle learning curve.",
          "You don't need deep manufacturing, complex inventory, or heavy customization.",
        ],
      },
      { type: "h2", text: "Where Odoo tends to win" },
      {
        type: "ul",
        items: [
          "You want one tightly integrated system: sales, inventory, purchasing, accounting, and a website that all talk.",
          "You need real operational depth, manufacturing, multi-step inventory, project costing.",
          "You want to own and customize the system around your exact workflow.",
        ],
      },
      {
        type: "quote",
        text: "Zoho is often faster to switch on. Odoo usually goes deeper once your operations get complex. Neither is 'better', they're built for different stages.",
      },
      { type: "h2", text: "The questions that actually decide it" },
      {
        type: "ul",
        items: [
          "How many of your tools do you want in one system, two, or ten?",
          "Is inventory or manufacturing central to your business, or a side concern?",
          "Do you want to customize deeply, or keep it simple and standard?",
          "What's your in-house appetite to administer it (or do you want it run for you)?",
        ],
      },
      {
        type: "p",
        text: "We work hands-on with Odoo, so we'll tell you honestly when Zoho (or even a lighter setup) is the smarter fit for where you are. The audit exists to answer exactly this, before you spend a dirham on licenses.",
      },
    ],
    relatedServices: ["odoo-erp-dubai"],
  },
  {
    slug: "signs-outgrown-spreadsheets",
    title: "5 signs your business has outgrown spreadsheets",
    description:
      "Spreadsheets quietly cost growing businesses hours and lost revenue. Five clear signs it's time to move to a proper system, and what to do about it.",
    date: "2026-05-19",
    author: "Xerxes Magdaluyo",
    readingMinutes: 5,
    body: [
      {
        type: "p",
        text: "Spreadsheets are brilliant until they aren't. For most growing businesses, the moment they become the bottleneck creeps up quietly. Here are the five signs we see most often.",
      },
      { type: "h2", text: "1. The same number lives in three places" },
      {
        type: "p",
        text: "Stock levels in one sheet, sales in another, invoices in a third, and they never quite agree. If your team re-keys the same data between files, you're paying for that twice and trusting it less each time.",
      },
      { type: "h2", text: "2. Only one person really understands 'the file'" },
      {
        type: "p",
        text: "When a single master spreadsheet is held together by one person's formulas, you have a single point of failure, not a system. Holidays and resignations become emergencies.",
      },
      { type: "h2", text: "3. You find out about problems too late" },
      {
        type: "p",
        text: "Stockouts, overdue invoices, leads that went cold, by the time they show up in a sheet, the damage is done. A real system surfaces them while you can still act.",
      },
      { type: "h2", text: "4. Reporting takes hours, not clicks" },
      {
        type: "p",
        text: "If pulling a simple month-end picture means an afternoon of copy-paste, you're spending your most expensive hours on admin instead of decisions.",
      },
      { type: "h2", text: "5. Growth makes it worse, not easier" },
      {
        type: "p",
        text: "More orders, staff, or products should feel like progress. If each one adds spreadsheet pain, the tools are now working against the growth.",
      },
      {
        type: "quote",
        text: "You don't need more spreadsheets. You need them to become one system that tells you the truth in real time.",
      },
      {
        type: "p",
        text: "If two or more of these sound familiar, a free systems audit will show you exactly where the time and money are leaking, and the fastest way to fix it.",
      },
    ],
    relatedServices: ["odoo-erp-dubai", "ai-automation-dubai"],
  },
  {
    slug: "what-a-systems-audit-covers",
    title: "What a free systems audit actually covers",
    description:
      "No jargon, no sales pitch: exactly what happens in a free 60-minute systems audit with Threshold Works, and the plain-English map you walk away with.",
    date: "2026-05-12",
    author: "Xerxes Magdaluyo",
    readingMinutes: 4,
    body: [
      {
        type: "p",
        text: "Free audit can sound like code for a sales call. Ours isn't. Here's exactly what the 60 minutes covers and what you leave with, whether or not you ever hire us.",
      },
      { type: "h2", text: "Before the call" },
      {
        type: "p",
        text: "We confirm a time on WhatsApp and ask one question: what's the tech thing on your mind right now? That's it. No forms, no prep homework.",
      },
      { type: "h2", text: "During the 60 minutes" },
      {
        type: "ul",
        items: [
          "A screen-share walk through your current website, tools, and workflow.",
          "Where your systems don't talk to each other, and what that's costing you.",
          "The quick wins you can action immediately, in order of impact.",
          "Honest answers, including 'you don't need us for that' where it's true.",
        ],
      },
      { type: "h2", text: "What you walk away with" },
      {
        type: "ul",
        items: [
          "A plain-English map of how your systems connect (or don't).",
          "Your top three quick wins, prioritized.",
          "A fixed-price plan, only if you want us to build it.",
        ],
      },
      {
        type: "quote",
        text: "The map and the quick wins are yours to keep. No obligation, no jargon, no hard sell.",
      },
      {
        type: "p",
        text: "That's the whole thing. If it's useful, we'll talk about building it. If it's not, you still leave with a clearer picture than you came in with.",
      },
    ],
    relatedServices: ["odoo-erp-dubai", "web-development-dubai", "ai-automation-dubai", "seo-dubai"],
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
