import {
  Boxes,
  Code2,
  Bot,
  Search,
  type LucideIcon,
} from "lucide-react";

export interface ServiceBullet {
  title: string;
  body: string;
}

export interface ServicePageData {
  slug: string;
  navLabel: string;
  icon: LucideIcon;
  /** <title> tag */
  metaTitle: string;
  /** meta description + og/twitter description */
  metaDescription: string;
  /** og:title / twitter:title */
  ogTitle: string;
  /** Service schema name for JSON-LD */
  jsonLdName: string;
  eyebrow: string;
  h1Lead: string;
  h1Accent: string;
  lede: string;
  bulletsHeading: string;
  bullets: ServiceBullet[];
  forWhoHeading: string;
  forWho: string[];
  /** Matches a CASE_STUDIES client name to show as proof, if any. */
  caseStudyClient?: string;
}

export const SERVICE_PAGES: ServicePageData[] = [
  {
    slug: "odoo-erp-dubai",
    navLabel: "Odoo / ERP",
    icon: Boxes,
    metaTitle: "Odoo ERP Implementation in Dubai | Threshold Works",
    metaDescription:
      "Odoo ERP setup, configuration, and support for small businesses in Dubai. One system for inventory, sales, invoicing, and CRM, run by a hands-on Odoo administrator. Book a free systems audit.",
    ogTitle: "Odoo ERP Implementation in Dubai",
    jsonLdName: "Odoo ERP Implementation & Administration",
    eyebrow: "Odoo & ERP · Dubai",
    h1Lead: "Run your whole business on one system,",
    h1Accent: "not five that don't talk.",
    lede: "Odoo ERP implementation in Dubai, set up and run properly. We wire inventory, sales, purchasing, invoicing, and CRM into a single source of truth, then stay on to support it. No bloated rollout you can't use, no consultant who disappears after go-live.",
    bulletsHeading: "What an Odoo build with us looks like",
    bullets: [
      {
        title: "Scoped to how you actually work",
        body: "We configure Odoo around your real workflow, not a generic template. Only the modules you need, switched on in the right order.",
      },
      {
        title: "One source of truth",
        body: "Inventory, sales, purchasing, accounting, and customer data finally live in one place, so nothing falls through the cracks and you stop re-keying the same numbers.",
      },
      {
        title: "Migrated without the chaos",
        body: "We move your existing data in cleanly and test it before launch. Your team keeps working while we build in the background.",
      },
      {
        title: "Run and supported, not abandoned",
        body: "As your Odoo systems administrator, we handle updates, fixes, and new modules as you grow. One number to call, for years.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Small businesses outgrowing spreadsheets and disconnected apps",
      "Trading, retail, and service companies in the UAE",
      "Teams that need inventory, invoicing, and CRM in one place",
      "Owners who want Odoo run for them, not dumped on them",
    ],
  },
  {
    slug: "web-development-dubai",
    navLabel: "Web Development",
    icon: Code2,
    metaTitle: "Web Development in Dubai | Threshold Works",
    metaDescription:
      "Custom websites, web apps, and high-converting landing pages for Dubai small businesses. Fast, mobile-first, SEO-ready, with fixed quotes and no lock-in. Book a free systems audit.",
    ogTitle: "Web Development in Dubai",
    jsonLdName: "Web Development & Web Applications",
    eyebrow: "Web Development · Dubai",
    h1Lead: "A website that brings in customers,",
    h1Accent: "not one that just sits there.",
    lede: "Web development in Dubai for small businesses that need their site to do real work. Fast, mobile-first websites, custom web apps, and landing pages that load quickly, rank well, and turn visitors into booked enquiries, built honestly, by one trusted partner.",
    bulletsHeading: "What we build",
    bullets: [
      {
        title: "Websites that convert",
        body: "Clear, fast, mobile-first sites designed around one job: turning the right visitor into a lead. Built on solid foundations you own outright.",
      },
      {
        title: "Custom web apps",
        body: "Booking platforms, client portals, member areas, and internal tools, built around the way you run instead of forcing you into someone else's software.",
      },
      {
        title: "Landing pages & funnels",
        body: "Conversion-optimised pages wired to analytics, lead capture, and your CRM, so you can see exactly what your ad spend is doing.",
      },
      {
        title: "Built to be found",
        body: "Server-rendered, fast, and structured for search from day one. The site you're reading is built the same way.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Businesses whose current site brings in nothing",
      "Owners launching a new product, service, or location",
      "Teams that need a web app or portal, not just a brochure site",
      "Anyone tired of agencies who lock them out of their own site",
    ],
  },
  {
    slug: "ai-automation-dubai",
    navLabel: "AI Automation",
    icon: Bot,
    metaTitle: "AI Automation in Dubai | Threshold Works",
    metaDescription:
      "AI automation in Dubai for small businesses: chatbots, AI workflows, and custom assistants that qualify leads, answer questions, and remove repetitive work. Book a free systems audit.",
    ogTitle: "AI Automation in Dubai",
    jsonLdName: "AI Automation & Custom AI Workflows",
    eyebrow: "AI & Automation · Dubai",
    h1Lead: "Let AI do the repetitive work,",
    h1Accent: "so you can do the real work.",
    lede: "AI automation in Dubai, built around your business instead of bolted on for show. We design AI workflows, chatbots, and custom assistants that quietly run in the background, answering questions, qualifying leads, and giving you back the hours you've been losing.",
    bulletsHeading: "Where AI actually pays off",
    bullets: [
      {
        title: "Lead qualification on autopilot",
        body: "An assistant that answers common questions, captures details, and routes hot leads to you, day and night, so nothing sits unanswered.",
      },
      {
        title: "Workflows that remove busywork",
        body: "Automate the copy-paste between your tools: enquiries to CRM, invoices to accounting, follow-ups that send themselves.",
      },
      {
        title: "Custom assistants for your team",
        body: "Internal AI tools trained on how your business works, so your staff get answers in seconds instead of digging through documents.",
      },
      {
        title: "Honest about what AI can't do",
        body: "We'll tell you where AI helps and where it's hype. You get the advantage without paying for buzzwords.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Owners drowning in repetitive admin and enquiries",
      "Teams losing leads because nobody replies fast enough",
      "Businesses curious about AI but unsure where it's worth it",
      "Anyone who wants automation that's actually maintained",
    ],
  },
  {
    slug: "seo-dubai",
    navLabel: "SEO",
    icon: Search,
    metaTitle: "SEO Services in Dubai | Threshold Works",
    metaDescription:
      "SEO in Dubai that targets keywords that convert, not vanity rankings. Technical SEO, local search, and content for small businesses, with transparent reporting. Book a free systems audit.",
    ogTitle: "SEO Services in Dubai",
    jsonLdName: "Search Engine Optimisation (SEO)",
    eyebrow: "SEO · Dubai",
    h1Lead: "Get found by people ready to buy,",
    h1Accent: "not just ready to browse.",
    lede: "SEO in Dubai focused on the keywords that actually bring in customers. We fix the technical foundations, sharpen your local search presence, and build content that ranks, then show you, in plain numbers, what it's doing for the business.",
    bulletsHeading: "How we approach SEO",
    bullets: [
      {
        title: "Technical foundations first",
        body: "Fast load times, crawlable pages, clean structured data, and mobile-first builds. The boring fixes that quietly decide whether you rank at all.",
      },
      {
        title: "Local search that wins Dubai",
        body: "Google Business Profile, local landing pages, and the on-page signals that put you in front of nearby customers searching right now.",
      },
      {
        title: "Keywords that convert",
        body: "We target search terms with real buying intent, the ones your competitors waste, instead of chasing traffic that never becomes a customer.",
      },
      {
        title: "Reporting in plain English",
        body: "You see rankings, traffic, and leads in numbers that mean something, with no jargon and no smoke and mirrors.",
      },
    ],
    forWhoHeading: "Who this is for",
    forWho: [
      "Local Dubai businesses invisible in search results",
      "Owners paying for ads but with no organic foundation",
      "Sites that look fine but never get found",
      "Anyone burned by SEO agencies that promised page one",
    ],
    caseStudyClient: "Wellington Cash for Cars",
  },
];

export function getServicePage(slug: string): ServicePageData | undefined {
  return SERVICE_PAGES.find((p) => p.slug === slug);
}
