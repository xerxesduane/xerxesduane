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
    slug: "website-cost-dubai",
    title: "How much does a website really cost in Dubai? (2026)",
    description:
      "An honest, no-spin breakdown of what a website actually costs in Dubai in 2026: real AED ranges by type, what drives the price, the costs people forget, and how to avoid overpaying.",
    date: "2026-06-06",
    author: "Xerxes Duane",
    readingMinutes: 7,
    body: [
      {
        type: "p",
        text: "Short answer: a professional website in Dubai usually costs anywhere from around AED 1,500 for a simple landing page to AED 50,000+ for a complex custom build, with most small-business sites landing in the AED 5,000–15,000 range. The honest longer answer, what you are actually paying for and where people quietly overpay, is below.",
      },
      { type: "h2", text: "What you are actually paying for" },
      {
        type: "p",
        text: "A website is not just a design file. The price covers strategy (what the site is for), copywriting, the design itself, the build, making it fast and mobile-friendly, basic SEO so it can be found, and testing. When one quote is a tenth of another, it is almost always because one of these is missing, usually the strategy, the copy, or the SEO.",
      },
      { type: "h2", text: "Website cost in Dubai by type (2026)" },
      {
        type: "ul",
        items: [
          "Landing page / one-pager — AED 1,500–5,000. One focused page to capture leads or launch a campaign.",
          "Standard business website — AED 5,000–15,000. Five to ten pages, mobile-friendly, an editor you can update yourself, basic SEO. Where most Dubai SMEs sit.",
          "E-commerce store — AED 12,000–40,000+. Product catalogue, online payments, shipping, and VAT-ready invoicing.",
          "Custom site or web app — AED 25,000–80,000+. Bespoke design plus integrations (CRM, ERP, bookings) and custom functionality.",
        ],
      },
      { type: "h2", text: "The costs people forget" },
      {
        type: "ul",
        items: [
          "Domain — roughly AED 40–120 per year.",
          "Hosting — roughly AED 100–1,000 per month, depending on traffic and stack.",
          "Content — professional photos, copywriting, and Arabic translation often cost more than the build if you outsource them.",
          "Maintenance — updates, security, and backups; budget around 10–20% of the build cost per year.",
          "Getting found — a site nobody visits does not pay for itself, so SEO or ads are part of the real cost.",
        ],
      },
      { type: "h2", text: "Why two quotes for 'a website' can differ 10×" },
      {
        type: "p",
        text: "A cheap template filled in over a weekend and a strategic build designed to bring in leads are both called 'a website', but they do very different jobs. The cheap option often costs more in the end: it does not rank, it does not convert, and you end up paying again to rebuild it properly a year later.",
      },
      {
        type: "quote",
        text: "A website is either a salesperson that works 24/7 or a brochure nobody reads. The price difference is usually the difference between the two.",
      },
      { type: "h2", text: "How to avoid overpaying" },
      {
        type: "ul",
        items: [
          "Get clear on the goal first, leads, sales, or credibility, before you ask anyone for a quote.",
          "Always own your domain, hosting, and accounts yourself. Never get locked in to an agency.",
          "Ask exactly what is included: copy, SEO, revisions, training, and who owns the code at the end.",
          "Match the build to your stage. Do not buy a custom web app to test an idea a landing page could validate.",
        ],
      },
      { type: "h2", text: "How long does a website take in Dubai?" },
      {
        type: "p",
        text: "A landing page can be live in a few days. A standard business website is typically two to six weeks, depending on how quickly content and feedback come back, that part is usually the bottleneck, not the build.",
      },
      { type: "h2", text: "Do I have to pay monthly?" },
      {
        type: "p",
        text: "The build itself is usually a one-off cost. Hosting and maintenance are ongoing but small. Be wary of anyone who only offers an open-ended monthly fee with no clear deliverable, and make sure you are never locked out of your own site.",
      },
      { type: "h2", text: "What it costs with Xerxes Duane" },
      {
        type: "p",
        text: "We give you a fixed quote after a free 60-minute audit, so you only pay for what actually moves your business, and you own the domain, hosting, and code. No surprise invoices, no lock-in. If a simple page is all you need, we will tell you that. Book a free audit and we will map exactly what your site should do, and what it should cost.",
      },
    ],
    relatedServices: ["web-development-dubai", "seo-dubai", "landing-page-design-dubai", "ecommerce-development-dubai"],
  },
  {
    slug: "crm-setup-mistakes-dubai",
    title: "CRM setup mistakes that cost Dubai businesses leads",
    description:
      "The CRM mistakes we see most often in Dubai small businesses, how each one quietly loses you leads, and what a CRM that actually works looks like.",
    date: "2026-06-01",
    author: "Xerxes Duane",
    readingMinutes: 6,
    body: [
      {
        type: "p",
        text: "A CRM is supposed to make sure no lead slips through the cracks. Set up badly, it does the opposite: it becomes a graveyard nobody updates. Here are the mistakes that cost Dubai businesses real revenue, and how to avoid them.",
      },
      { type: "h2", text: "1. Treating it as a contact list, not a process" },
      {
        type: "p",
        text: "A CRM isn't a fancy address book. If it doesn't reflect your actual sales stages, new lead, contacted, quoted, won, your team has no shared definition of what to do next, and leads stall in limbo.",
      },
      { type: "h2", text: "2. Leads that never enter the system" },
      {
        type: "p",
        text: "WhatsApp enquiries, website forms, walk-ins, and Instagram DMs that live in five inboxes never get followed up consistently. If capture isn't automatic, you're losing leads before the CRM even sees them.",
      },
      { type: "h2", text: "3. No follow-up automation" },
      {
        type: "p",
        text: "Most sales happen after several touches, but manual follow-up is the first thing that drops when everyone's busy. Without automated reminders or sequences, your hottest leads go cold while you're heads-down on delivery.",
      },
      { type: "h2", text: "4. Nobody can see the pipeline" },
      {
        type: "p",
        text: "If the owner can't glance at a dashboard and see what's in play and what's stuck, you're flying blind. Reporting that lives in someone's head isn't reporting.",
      },
      { type: "h2", text: "5. Too complex to actually use" },
      {
        type: "p",
        text: "An over-engineered CRM with 40 required fields gets abandoned. The best CRM is the one your team will actually keep updated, which usually means fewer fields, clearer stages, and automation doing the boring parts.",
      },
      {
        type: "quote",
        text: "A CRM only works when capture is automatic, the pipeline is visible, and follow-up happens whether or not anyone remembers.",
      },
      {
        type: "p",
        text: "We set up CRM (often inside Odoo) so leads capture themselves, follow-ups send themselves, and you can see the whole pipeline at a glance. A free audit will show you exactly where leads are leaking today.",
      },
    ],
    relatedServices: ["odoo-erp-dubai", "web-development-dubai", "crm-development-dubai", "custom-software-development-dubai"],
  },
  {
    slug: "odoo-enterprise-vs-community",
    title: "Do you need Odoo Enterprise, or is Community enough?",
    description:
      "A no-spin guide to choosing between Odoo Community and Enterprise for a small business: what you get, what you give up, and how to decide without overpaying.",
    date: "2026-05-30",
    author: "Xerxes Duane",
    readingMinutes: 5,
    body: [
      {
        type: "p",
        text: "Odoo comes in two editions, and the choice trips up a lot of small businesses. Pick wrong and you either overpay for licenses you don't use, or fight Community to do something Enterprise handles out of the box. Here's the honest breakdown.",
      },
      { type: "h2", text: "What Community gives you (free)" },
      {
        type: "p",
        text: "Odoo Community is open-source and genuinely capable: CRM, sales, invoicing, basic inventory, website, and more. For many small businesses starting out, it covers the essentials without a per-user license fee.",
      },
      { type: "h2", text: "What Enterprise adds (paid)" },
      {
        type: "ul",
        items: [
          "Polished, faster interfaces and mobile apps.",
          "Studio (low-code customization) and more advanced accounting.",
          "Official Odoo support and hosting options.",
          "Features like full double-entry accounting, advanced reporting, and more integrations.",
        ],
      },
      { type: "h2", text: "How to actually decide" },
      {
        type: "ul",
        items: [
          "Will you rely on advanced accounting or just basic invoicing?",
          "Do you need official support, or a consultant who runs it for you?",
          "How many users, and is the per-user cost justified by the time it saves?",
          "Do the Enterprise-only modules map to things you'll genuinely use?",
        ],
      },
      {
        type: "quote",
        text: "The right edition is the one that fits how you work today, with room to grow, not the one with the longest feature list.",
      },
      {
        type: "p",
        text: "We're not an official Odoo Partner, which means we have no incentive to push you toward Enterprise. In a free audit we'll tell you honestly which edition fits, and what it'll actually cost.",
      },
    ],
    relatedServices: ["odoo-erp-dubai", "custom-software-development-dubai"],
  },
  {
    slug: "choosing-a-web-developer-dubai",
    title: "How to choose a web developer in Dubai (without getting burned)",
    description:
      "The questions to ask, the red flags to avoid, and what good looks like when hiring a web developer in Dubai, so you own your site and it actually performs.",
    date: "2026-05-28",
    author: "Xerxes Duane",
    readingMinutes: 6,
    body: [
      {
        type: "p",
        text: "Plenty of Dubai businesses have been burned by a web project, locked out of their own site, ghosted after launch, or handed something pretty that brings in nothing. Here's how to choose well.",
      },
      { type: "h2", text: "Ask: do I own everything?" },
      {
        type: "p",
        text: "Your domain, hosting, code, and accounts should all be in your name. If a developer keeps you locked out 'for convenience,' that's a red flag. Ownership is non-negotiable.",
      },
      { type: "h2", text: "Ask: what happens after launch?" },
      {
        type: "p",
        text: "Launch is the start, not the finish. Ask who fixes things, who you call, and what support looks like in month six. A good partner is still reachable years later.",
      },
      { type: "h2", text: "Ask: is it built to be found?" },
      {
        type: "p",
        text: "A site that isn't fast, mobile-first, and structured for search is a brochure nobody reads. Ask how they handle performance and SEO from day one, not as an afterthought.",
      },
      { type: "h2", text: "Red flags to watch for" },
      {
        type: "ul",
        items: [
          "No fixed quote, or pricing that keeps moving.",
          "Vague answers about ownership and access.",
          "All style, no questions about your business goals.",
          "No examples of work that actually performs.",
        ],
      },
      {
        type: "quote",
        text: "A good web partner asks about your business before they talk about design, and hands you the keys when it's done.",
      },
      {
        type: "p",
        text: "We quote fixed, build fast, and set everything up in your name, start to finish. If you're weighing up a web project, a free audit will tell you what's worth keeping and what isn't.",
      },
    ],
    relatedServices: ["web-development-dubai", "seo-dubai", "landing-page-design-dubai", "mobile-app-development-dubai"],
  },
  {
    slug: "how-much-does-odoo-cost-dubai",
    title: "How much does Odoo cost for a small business in Dubai?",
    description:
      "A plain-English breakdown of what Odoo actually costs a Dubai small business, licenses, implementation, and the hidden costs, so you can budget without surprises.",
    date: "2026-06-01",
    author: "Xerxes Duane",
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
    relatedServices: ["odoo-erp-dubai", "custom-software-development-dubai"],
  },
  {
    slug: "odoo-vs-zoho-uae",
    title: "Odoo vs Zoho for a UAE small business: which actually fits?",
    description:
      "A practical comparison of Odoo and Zoho for small businesses in the UAE, where each one wins, where each one hurts, and how to choose without the sales spin.",
    date: "2026-05-26",
    author: "Xerxes Duane",
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
    relatedServices: ["odoo-erp-dubai", "crm-development-dubai"],
  },
  {
    slug: "signs-outgrown-spreadsheets",
    title: "5 signs your business has outgrown spreadsheets",
    description:
      "Spreadsheets quietly cost growing businesses hours and lost revenue. Five clear signs it's time to move to a proper system, and what to do about it.",
    date: "2026-05-19",
    author: "Xerxes Duane",
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
    relatedServices: ["odoo-erp-dubai", "ai-automation-dubai", "crm-development-dubai", "custom-software-development-dubai"],
  },
  {
    slug: "what-a-systems-audit-covers",
    title: "What a free systems audit actually covers",
    description:
      "No jargon, no sales pitch: exactly what happens in a free 60-minute systems audit with Xerxes Duane, and the plain-English map you walk away with.",
    date: "2026-05-12",
    author: "Xerxes Duane",
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
    relatedServices: ["odoo-erp-dubai", "web-development-dubai", "ai-automation-dubai", "seo-dubai", "crm-development-dubai", "custom-software-development-dubai"],
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
