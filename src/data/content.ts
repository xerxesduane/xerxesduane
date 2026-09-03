import {
  Code2,
  Boxes,
  LayoutDashboard,
  Smartphone,
  ShoppingBag,
  Target,
  Bot,
  Video,
  Film,
  Palette,
  Languages,
  Accessibility,
  GraduationCap,
  Car,
  Sparkles,
  PartyPopper,
  Church,
  HeartHandshake,
  Store,
  ScanSearch,
  type LucideIcon,
} from "lucide-react";

export const CONTACT = {
  whatsapp: "971543281995",
  whatsappDisplay: "+971 54 328 1995",
  email: "hi@xerxesduane.com",
  location: "Dubai, UAE",
  calendar: "https://zcal.co/xerxesduane/audit",
  formspreeId: "xrednbek",
};

// The free-audit journey + what you actually receive — shared by the Contact
// section and the Packages "Audit" card so the promise never drifts between them.
export const AUDIT_STEPS = [
  "I confirm your audit time on WhatsApp within a few hours.",
  "We meet for 60 minutes: call, Zoom, or in person if you prefer.",
  "Within 5 business days, you get your plain-English roadmap.",
];
export const AUDIT_DELIVERABLES = [
  "A plain-English map of your current systems",
  "3 quick wins you can act on right away",
  "A prioritised next-step plan — yours to keep, hire me or not",
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "AI Lab", href: "/ai-lab" },
  { label: "About", href: "/about" },
];

export interface Service {
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  /** Indicative starting price, e.g. "from AED 4,500". */
  price?: string;
  featured?: boolean;
}

export const SERVICES: Service[] = [
  {
    icon: Bot,
    title: "AI Automation & Solutions",
    tagline: "The new advantage.",
    description:
      "AI workflows, chatbots, and custom assistants that quietly run your business in the background, answering questions, qualifying leads, and giving you back the hours you've been losing.",
    price: "from AED 6,000",
    featured: true,
  },
  {
    icon: Code2,
    title: "Custom System Development",
    tagline: "The foundation, built for you.",
    description:
      "Software tailored to how your business actually works, client portals, internal tools, and systems built around the way you run. No templates, no limitations.",
    price: "from AED 9,000",
  },
  {
    icon: Boxes,
    title: "ERP & Odoo",
    tagline: "One system to run on.",
    description:
      "Odoo ERP setup, administration, and support, wiring inventory, sales, purchasing, and accounting into a single source of truth. Configured and run for real businesses in the UAE and the Philippines.",
    price: "from AED 12,000",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards & CRM",
    tagline: "See your business clearly.",
    description:
      "Real-time dashboards, customer databases, and integrations that finally talk: HubSpot, QuickBooks, Zoho, all in one place.",
    price: "from AED 4,000",
  },
  {
    icon: Smartphone,
    title: "Mobile & Web Apps",
    tagline: "Sleek, scalable, built to grow.",
    description:
      "Custom iOS, Android, and web apps, booking platforms, member portals, internal tools, fast and ready for what's next.",
    price: "from AED 25,000",
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce & Stores",
    tagline: "Sell online without the headaches.",
    description:
      "Secure checkout, payment gateways, order tracking, and upsell flows, tailored to your products and your customers.",
    price: "from AED 9,000",
  },
  {
    icon: Target,
    title: "Landing Pages & Funnels",
    tagline: "Turn clicks into customers.",
    description:
      "Conversion-optimized pages and complete sales funnels, integrated with analytics, lead capture, and your CRM.",
    price: "from AED 2,500",
  },
  {
    icon: ScanSearch,
    title: "AEO — Answer Engine Optimization",
    tagline: "Be the answer, not a blue link.",
    description:
      "Optimize your content so voice assistants and Google's AI Overviews quote you directly, with structured data, concise answers, and FAQ schema that win featured snippets and 'position zero'.",
    price: "from AED 2,500/month",
  },
  {
    icon: Sparkles,
    title: "GEO — Generative Engine Optimization",
    tagline: "Get cited by ChatGPT & Perplexity.",
    description:
      "Make your business the source AI engines recommend. I shape your content, entities, and citations so ChatGPT, Gemini, and Perplexity surface and recommend you when buyers ask.",
    price: "from AED 3,000/month",
  },
  {
    icon: Video,
    title: "Videography & Photography",
    tagline: "Stories that sell.",
    description:
      "Professional video, product photography, reels, and brand films, created with the storytelling instincts of someone who's run real ad campaigns.",
    price: "from AED 1,500/day",
  },
  {
    icon: Film,
    title: "Video Editing",
    tagline: "Footage into scroll-stoppers.",
    description:
      "Reels, social clips, brand films, and ad cuts edited to hold attention, with captions, motion graphics, and platform-tuned pacing. Fast turnaround and clean revisions.",
    price: "from AED 750 per video",
  },
  {
    icon: Palette,
    title: "Graphic Design & Branding",
    tagline: "Look like the brand you are.",
    description:
      "Logos, brand identity, social graphics, and marketing collateral, designed to match the quality of the work behind it.",
    price: "from AED 1,500",
  },
];

export interface Outcome {
  no: string;
  title: string;
  promise: string;
  body: string;
  items: { label: string; href: string }[];
}

// The 12 services, reframed as the three business outcomes clients actually
// buy. Every link resolves to an existing service page — no new routes.
export const OUTCOMES: Outcome[] = [
  {
    no: "01",
    title: "Get more leads",
    promise: "Be found, be chosen, be contacted.",
    body: "A web presence engineered to bring enquiries in — not just to look good. Pages built to convert, and search work that puts you in front of buyers (and the AI engines they now ask).",
    items: [
      { label: "Websites that convert", href: "/web-development-dubai" },
      { label: "Landing pages & funnels", href: "/landing-page-design-dubai" },
      { label: "SEO · AEO · GEO", href: "/seo-dubai" },
      { label: "E-commerce & online stores", href: "/ecommerce-development-dubai" },
      { label: "Paid campaign support (Google & Meta)", href: "/landing-page-design-dubai" },
    ],
  },
  {
    no: "02",
    title: "Stop losing leads",
    promise: "Every enquiry captured, followed up, and visible.",
    body: "Most businesses don't have a lead problem — they have a leak problem. I connect your forms, WhatsApp, and CRM so nothing falls through, and dashboards show you exactly where every lead stands.",
    items: [
      { label: "CRM setup & pipelines", href: "/crm-development-dubai" },
      { label: "WhatsApp workflows & follow-ups", href: "/ai-automation-dubai" },
      { label: "Lead routing & automations", href: "/ai-automation-dubai" },
      { label: "Dashboards & reporting", href: "/crm-development-dubai" },
    ],
  },
  {
    no: "03",
    title: "Run the business better",
    promise: "One operating system instead of ten tools.",
    body: "Inventory, invoicing, projects, and people — wired into one place. From full Odoo/ERP rollouts to custom internal tools and practical AI that gives your team hours back every week.",
    items: [
      { label: "Odoo / ERP implementation", href: "/odoo-erp-dubai" },
      { label: "Custom internal systems", href: "/custom-software-development-dubai" },
      { label: "Mobile & web apps", href: "/mobile-app-development-dubai" },
      { label: "AI tools & process automation", href: "/ai-automation-dubai" },
    ],
  },
];

// Creative work that supports all three outcomes — kept visible, not equal-billed.
export const CREATIVE_SUPPORT: { label: string; href: string }[] = [
  { label: "Videography & photography", href: "/videography-photography-dubai" },
  { label: "Video editing", href: "/video-editing-dubai" },
  { label: "Branding & graphic design", href: "/branding-graphic-design-dubai" },
];

export interface Layer {
  no: string;
  name: string;
  items: string;
  blurb: string;
}

export const LAYERS: Layer[] = [
  {
    no: "01",
    name: "Foundation",
    items: "Websites · branding · hosting · email",
    blurb: "The base your business runs on, built to convert, built to last.",
  },
  {
    no: "02",
    name: "Engine",
    items: "ERP / Odoo · CRM · invoicing · automation",
    blurb: "The plumbing behind the scenes, so your tools finally talk to each other.",
  },
  {
    no: "03",
    name: "Growth",
    items: "SEO · Google & Meta Ads · content · email",
    blurb: "The marketing that brings customers in, and the data that proves it works.",
  },
  {
    no: "04",
    name: "Edge",
    items: "AI workflows · chatbots · custom assistants",
    blurb: "The advantage most small businesses don't have yet, and your edge over bigger competitors.",
  },
];

export interface Industry {
  icon: LucideIcon;
  name: string;
  blurb: string;
  /**
   * What was delivered in this sector, or the measured result — never a client
   * name. Sector proof is stated by the work, not by named attribution.
   */
  proof?: string;
  mission?: boolean;
}

export const INDUSTRIES: Industry[] = [
  {
    icon: Languages,
    name: "Translation & Language",
    blurb: "Client portals, multilingual sites, and the admin systems that let your team stay focused on the work.",
    proof: "Multilingual site & client portal delivered",
  },
  {
    icon: Accessibility,
    name: "Healthcare Mobility",
    blurb: "E-commerce for assistive products, CRM for patient relationships, and integrations built for real-world care.",
    proof: "E-commerce store & product catalogue delivered",
  },
  {
    icon: GraduationCap,
    name: "Education & Training",
    blurb: "Custom e-learning platforms, automated registration, and QuickBooks-integrated invoicing, end to end.",
    proof: "E-learning platform & invoicing integration delivered",
  },
  {
    icon: Car,
    name: "Automotive",
    blurb: "SEO that ranks for keywords that convert and Google Ads architectures that don't waste budget.",
    proof: "610 conversions from 1,530+ clicks",
  },
  {
    icon: Sparkles,
    name: "Wellness, Spa & Beauty",
    blurb: "Meta Ads that drive real conversations, booking systems that reduce no-shows, and brand visuals that match the experience.",
    proof: "791 customer conversations from paid social",
  },
  {
    icon: PartyPopper,
    name: "Events & Hospitality",
    blurb: "Event-ready websites, social media, and professional video that turn attendees into repeat clients.",
    proof: "Operations dashboards across two sites",
  },
  {
    icon: Store,
    name: "E-Commerce & Retail",
    blurb: "Conversion-optimized stores, automated invoicing, and upsell flows that actually work.",
    proof: "Multiple stores delivered",
  },
  {
    icon: Church,
    name: "Churches & Faith-Based",
    blurb: "Websites, Google Business Profile and local search, digital marketing, and social content, built with care for the mission.",
    proof: "60K+ monthly content views",
    mission: true,
  },
  {
    icon: HeartHandshake,
    name: "Non-Profits & PoD",
    blurb: "Enterprise-grade systems at thoughtful rates, because mission-driven work deserves mission-grade tools.",
    mission: true,
  },
];

export interface CaseStudy {
  slug: string;
  client: string;
  location: string;
  category: string;
  challenge: string;
  summary: string;
  approach: string[];
  relatedServices: string[];
  image?: string;
  /** Headline KPI tiles. Every figure must be measured, never estimated. */
  stats?: { value: string; label: string }[];
  /** Delivered scope — what was actually built, alongside or instead of KPIs. */
  scope?: string[];
  takeaway: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "construction-manufacturer-odoo-erp",
    client: "Construction Materials Manufacturer",
    location: "Philippines · Construction & Manufacturing",
    category: "Odoo ERP",
    challenge:
      "A construction materials and AAC wall-systems company ran on disconnected spreadsheets, manual tracking, and fragmented communication between departments. The goal: one platform for the whole operation.",
    summary:
      "A connected Odoo operating system designed around the flow from first enquiry through quotation, purchasing, inventory, project delivery, and online sales.",
    approach: [
      "Mapped the existing handoffs and duplicate work before configuring any modules",
      "Phased the rollout around the team's day-to-day operations",
      "Connected commercial, inventory, purchasing, and project workflows",
      "Built a foundation that can expand without replacing the system again",
    ],
    relatedServices: ["odoo-erp-dubai", "custom-software-development-dubai", "crm-development-dubai"],
    stats: [
      { value: "8 → 1", label: "Workflows consolidated" },
      { value: "8", label: "Departments on one platform" },
      { value: "1", label: "Source of truth" },
      { value: "0", label: "Spreadsheet handoffs left" },
    ],
    scope: [
      "CRM & lead management",
      "Sales & quotation workflows",
      "Inventory management",
      "Purchasing operations",
      "Accounting integration",
      "Project management",
      "Website & e-commerce",
      "Marketing automation",
    ],
    takeaway:
      "Customer inquiries, quotations, inventory, purchasing, and online operations, run from one unified Odoo platform.",
  },
  {
    slug: "multi-site-operations-dashboards",
    client: "Multi-Site Events & Operations Group",
    location: "Dubai · Events & Multi-Site Operations",
    category: "Dashboards & Systems",
    challenge:
      "A multinational, multi-site organisation of around 6,000 members ran its operations, scheduling, and reporting across disconnected tools and spreadsheets. Team leads across two sites could not see the same picture at the same time, so coordinating people, rosters, and events meant chasing information rather than reading it.",
    summary:
      "Dashboards and the digital infrastructure underneath them, built so operations, scheduling, and data coordination across both sites read from one shared source rather than a dozen separate files.",
    approach: [
      "Mapped how scheduling and reporting actually moved between sites and teams before building anything",
      "Built dashboards around the decisions leads make weekly, not around whatever the tools could export",
      "Connected scheduling and volunteer data through Planning Center Online so records stay current at the source",
      "Set up reporting that supports large outreach cycles of 100-150 participants across multiple sites",
      "Trained team leads to run their own cycles from the dashboards without needing a technical hand",
    ],
    relatedServices: [
      "crm-development-dubai",
      "custom-software-development-dubai",
      "web-development-dubai",
    ],
    stats: [
      { value: "~6,000", label: "Members supported" },
      { value: "2", label: "Sites on one shared view" },
      { value: "100-150", label: "Participants per outreach cycle" },
      { value: "1", label: "Source of truth for scheduling" },
    ],
    scope: [
      "Operations & scheduling dashboards",
      "Cross-site data coordination",
      "Planning Center Online administration",
      "Website design & maintenance",
      "Event & outreach reporting",
      "Social, video & photo content",
    ],
    takeaway:
      "One shared view of operations across two sites, so coordinating around 6,000 members is a matter of reading the dashboard instead of chasing the answer.",
  },
  {
    slug: "cookware-brand-crm-web",
    client: "Premium Cookware & Direct-Sales Brand",
    location: "UAE · Premium Cookware",
    category: "CRM & Web",
    challenge:
      "A premium cookware and direct-sales brand needed a smoother customer journey, from first inquiry through cooking demo to sale, with real visibility into follow-ups.",
    summary:
      "A clearer lead-to-demo journey, with customer information and follow-up activity organized around the way the sales team actually works.",
    approach: [
      "Mapped the journey from enquiry to cooking demo and sale",
      "Structured lead capture and follow-up around real sales conversations",
      "Connected the website and booking experience to customer management",
      "Created clearer visibility for the team without adding admin overhead",
    ],
    relatedServices: ["crm-development-dubai", "web-development-dubai", "landing-page-design-dubai"],
    scope: [
      "Lead capture & inquiries",
      "Booking for cooking demos",
      "Customer relationship management",
      "Website management",
      "Sales process organization",
      "Marketing & engagement",
    ],
    takeaway:
      "Centralized lead management and a clearer path from inquiry to demo to conversion across sales and engagement.",
  },
  {
    slug: "community-organisation-web-search-social",
    client: "Multi-Site Community Organisation",
    location: "Dubai · Community & Non-Profit",
    category: "Web · Local Search · Social",
    challenge:
      "A multi-site church in Dubai needed to grow its reach and be easy to find, across a redesigned website, Google Business Profile and local search for both campuses, and a consistent content engine on Facebook and Instagram, working alongside their Communications Director.",
    summary:
      "A redesigned website, both campuses properly set up in local search, and a steady content engine across Facebook and Instagram, run as one connected presence rather than three separate efforts.",
    approach: [
      "Rebuilt the website around what a first-time visitor actually needs to find",
      "Set up and maintained Google Business Profile and local search for both campuses",
      "Ran a consistent weekly content cycle across Facebook and Instagram",
      "Produced the video and photography the content engine runs on",
      "Worked alongside their Communications Director rather than around them",
    ],
    relatedServices: [
      "web-development-dubai",
      "seo-dubai",
      "videography-photography-dubai",
    ],
    stats: [
      { value: "16.8K", label: "Community followers" },
      { value: "60K+", label: "Monthly content views" },
      { value: "8.6K", label: "Google views / mo" },
      { value: "452", label: "Directions to campuses / mo" },
    ],
    takeaway: "A growing, easy-to-find digital presence, run end to end across web, search, and social.",
  },
  {
    slug: "wellness-brand-meta-ads",
    client: "Home-Service Wellness Brand",
    location: "Dubai · Wellness & Beauty",
    category: "Meta Ads",
    challenge:
      "A growing Dubai wellness brand needed real digital visibility in a crowded market.",
    summary:
      "A focused paid-social campaign that translated strong creative into measurable reach, video attention, and customer conversations.",
    approach: [
      "Built campaign creative around the service experience rather than generic offers",
      "Tested audience and message combinations against real response",
      "Optimized toward conversations instead of vanity engagement",
      "Used campaign learning to improve the next creative cycle",
    ],
    relatedServices: ["landing-page-design-dubai", "videography-photography-dubai", "video-editing-dubai"],
    stats: [
      { value: "54K", label: "People reached" },
      { value: "98K", label: "Video plays" },
      { value: "791", label: "Conversations" },
      { value: "117K", label: "Ad views" },
    ],
    takeaway: "Real visibility. Real conversations. Real growth.",
  },
  {
    slug: "vehicle-removal-google-ads",
    client: "Vehicle-Removal Service",
    location: "New Zealand · Automotive",
    category: "Google Ads",
    challenge:
      "A vehicle-removal service needed to dominate a competitive search market while keeping cost-per-acquisition low.",
    summary:
      "A search campaign architecture built around high-intent queries, disciplined spend, and conversion visibility.",
    approach: [
      "Separated high-intent search themes to control budget and messaging",
      "Aligned ads and landing-page intent for stronger conversion",
      "Removed wasted spend through ongoing query and placement review",
      "Managed performance remotely with clear reporting and decisions",
    ],
    relatedServices: ["landing-page-design-dubai", "seo-dubai", "answer-engine-optimization-dubai"],
    stats: [
      { value: "1,530+", label: "Clicks" },
      { value: "610", label: "Conversions" },
      { value: "8.28%", label: "Top-ad CTR" },
      { value: "$6.89", label: "Avg. CPC" },
    ],
    takeaway: "Real ad spend, real ROI, managed internationally from Dubai.",
  },
];

export interface Step {
  no: string;
  title: string;
  body: string;
}

export const PROCESS: Step[] = [
  {
    no: "01",
    title: "Discover",
    body: "I sit down with you and listen. What's working? What's broken? What's quietly costing you money? No pitching, just questions and clarity.",
  },
  {
    no: "02",
    title: "Plan",
    body: "I turn your goals into a real roadmap: what I'll build, in what order, with clear timelines and transparent pricing. No jargon.",
  },
  {
    no: "03",
    title: "Build",
    body: "I design, develop, and integrate, with regular updates, working previews, and zero surprises. I move fast because I plan well.",
  },
  {
    no: "04",
    title: "Test & Refine",
    body: "I test everything, speed, security, mobile, integrations. Nothing ships until it's solid and you're the final word on 'ready'.",
  },
  {
    no: "05",
    title: "Launch & Support",
    body: "I deploy, train your team, and stick around. Launching is the start, not the end, I'm one message away for years.",
  },
];

export const COMPARISON: { agency: string; bayt: string }[] = [
  { agency: "Sells you tools", bayt: "Sells you clarity" },
  { agency: "Long-term lock-in contracts", bayt: "Month-to-month, cancel anytime" },
  { agency: "Disappears after launch", bayt: "Picks up the phone five years later" },
  { agency: "Upsells everything", bayt: "Tells you when you don't need me" },
  { agency: "One service, one expert", bayt: "One consultant, the whole stack" },
  { agency: "Hides pricing", bayt: 'Transparent "from AED X" pricing' },
];

export const STATS: { value: number; suffix: string; label: string }[] = [
  { value: 6, suffix: "+", label: "Years building for Dubai businesses" },
  { value: 117, suffix: "K+", label: "Ad impressions delivered" },
  { value: 30, suffix: "+", label: "Live AI tools you can try" },
  { value: 4, suffix: "", label: "Countries served" },
];

export interface Result {
  /** Anonymous business category, e.g. "Wellness business · Dubai". */
  category: string;
  /** The initial problem, in one line. */
  problem: string;
  /** Headline figure, e.g. "791", "$6.89", "8 → 1". */
  value: string;
  /** What the figure measures. */
  label: string;
  /** Short, honest explanation of what changed — no over-claimed causation. */
  whatChanged: string;
  /** Credibility/context label, e.g. "Verified campaign data · Meta Ads". */
  proof: string;
  /** Relevant service page to deep-link to. */
  serviceHref: string;
}

// REAL numbers from delivered projects, presented WITHOUT naming clients —
// which is now how the whole site works, so there is no named counterpart
// anywhere. Every figure is verified from CASE_STUDIES; nothing here is
// invented or inflated, and no causation is claimed beyond what was measured.
export const RESULTS: Result[] = [
  {
    category: "Wellness business · Dubai",
    problem: "Needed real digital visibility in a crowded market.",
    value: "791",
    label: "customer conversations",
    whatChanged:
      "A focused paid-social campaign reached more than 54,000 people and produced 98,000 video plays. The goal wasn't passive engagement — it was starting real conversations with potential customers.",
    proof: "Verified campaign data · Meta Ads",
    serviceHref: "/landing-page-design-dubai",
  },
  {
    category: "Automotive service · International campaign",
    problem: "A competitive search market, with pressure to keep cost-per-acquisition low.",
    value: "610",
    label: "tracked conversions from 1,530+ clicks",
    whatChanged:
      "A disciplined search campaign focused budget on high-intent searches, holding an 8.28% top-ad click-through rate at an average cost per click of $6.89 — managed remotely from Dubai.",
    proof: "Verified campaign data · Google Ads",
    serviceHref: "/seo-dubai",
  },
  {
    category: "Multi-location organization · Dubai",
    problem: "Hard to find across locations, with an inconsistent presence on web, search, and social.",
    value: "452",
    label: "direction requests in one month",
    whatChanged:
      "Website improvements, local-search optimization, and better-managed business profiles helped more people discover locations and take a measurable next step — alongside 60,000+ monthly content views.",
    proof: "Measured monthly activity · Web · GMB · Social",
    serviceHref: "/web-development-dubai",
  },
  {
    category: "Construction & manufacturing business",
    problem: "Eight disconnected workflows on spreadsheets, manual tracking, and fragmented department communication.",
    value: "8 → 1",
    label: "workflows in one operating system",
    whatChanged:
      "CRM, quotations, purchasing, inventory, accounting, project management, e-commerce, and automation — connected through one structured Odoo ERP platform.",
    proof: "Delivered scope · Odoo ERP",
    serviceHref: "/odoo-erp-dubai",
  },
  {
    category: "SEO campaign · UAE",
    problem: "Low organic visibility in search.",
    value: "800%",
    label: "increase in organic visits",
    whatChanged:
      "A long-term SEO campaign — technical fixes, content, and targeted keywords — also grew new users by 270%, page views by 200%, and put 115 keywords on page one.",
    proof: "Campaign result · SEO",
    serviceHref: "/seo-dubai",
  },
  {
    category: "Lead generation · Dubai",
    problem: "Not enough inbound enquiries and leads coming in.",
    value: "300%",
    label: "increase in leads",
    whatChanged:
      "A focused ads-and-social push tripled inbound leads — including a 300% rise in daily Facebook enquiries.",
    proof: "Campaign result · Growth",
    serviceHref: "/crm-development-dubai",
  },
  {
    category: "Growth campaign · UAE",
    problem: "Sales had plateaued.",
    value: "50%+",
    label: "increase in overall sales",
    whatChanged:
      "A connected marketing-and-systems push lifted overall sales by more than half.",
    proof: "Campaign result · Growth",
    serviceHref: "/landing-page-design-dubai",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  business: string;
  sector: string;
  /** Visibly-marked slot Xerxes fills with a real, attributable quote. */
  placeholder?: boolean;
}

// Placeholders only — replace with REAL, attributable client quotes (with
// permission) before production. DO NOT invent quotes. Rendered as visibly
// marked placeholders so the section can be reviewed and filled in.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Add a real client quote here — ideally what changed for their business, in their own words.",
    name: "[Client name]",
    business: "[Business]",
    sector: "[Sector · Dubai]",
    placeholder: true,
  },
  {
    quote: "A second short, specific quote — the more concrete the result, the more it persuades.",
    name: "[Client name]",
    business: "[Business]",
    sector: "[Sector · UAE]",
    placeholder: true,
  },
  {
    quote: "A third quote, ideally from a different sector, to show range across the GCC.",
    name: "[Client name]",
    business: "[Business]",
    sector: "[Sector · GCC]",
    placeholder: true,
  },
];

export const PROMISE = {
  never: [
    "Upsells you don't need",
    "Pressure to sign long contracts",
    "Tools you're paying for and don't use",
    "Freelancers who disappear after the invoice",
  ],
  always: [
    "Honest answers, even when they cost me money",
    "One trusted person who picks up the phone",
    "A real audit before any recommendation",
    "You own everything I build — code, accounts, and data",
    "I'll tell you when you don't need me, and I mean it",
  ],
};

export const PACKAGES = [
  {
    name: "The Systems Audit",
    price: "Free",
    note: "for a limited time",
    pitch: "Start here",
    body: "A 60-minute diagnostic of your whole stack — website, leads, CRM, WhatsApp, spreadsheets, automation. You leave with a plain-English map of what's disconnected and a prioritised roadmap of what to fix first. No pressure, no lock-in.",
    cta: "Book your free systems audit",
    featured: true,
  },
  {
    name: "The Build",
    price: "from AED 5,000",
    note: "project-based",
    pitch: "Fix what's broken",
    body: "A defined-scope project. Website rebuild, CRM setup, automation, SEO overhaul, or a tech-stack consolidation. I scope it, build it, ship it.",
    cta: "See if we're a fit",
    featured: false,
  },
  {
    name: "The Partner",
    price: "from AED 2,500",
    note: "per month",
    pitch: "Your long-term tech partner",
    body: "I become your practical systems partner. Ongoing IT, maintenance, SEO, ads, and automation, one trusted number to call for everything.",
    cta: "Talk to me",
    featured: false,
  },
];

// Testimonials intentionally removed until real, attributable client quotes
// exist (see ProofBand.tsx, which points to the live AI Lab as proof instead).

/** One delivered engagement, described by sector and work — never by name. */
export interface Engagement {
  /** Anonymous sector + market, e.g. "Wellness & spa · Dubai". */
  sector: string;
  /** What was actually built or run for them. */
  delivered: string;
  /** A measured result, where one exists. Omit rather than estimate. */
  kpi?: string;
}

// Client names are deliberately absent site-wide. What a prospect needs to know
// is the sector, the work, and the measured outcome — all of which are here.
// Named attribution only ever goes out with written permission, case by case.
export const ENGAGEMENTS: Engagement[] = [
  {
    sector: "Community & non-profit · Dubai",
    delivered: "Website rebuild, local search for two sites, and a weekly content engine",
    kpi: "60K+ monthly content views · 452 direction requests / mo",
  },
  {
    sector: "Events & multi-site operations · Dubai",
    delivered: "Operations and scheduling dashboards with cross-site data coordination",
    kpi: "~6,000 members supported across 2 sites",
  },
  {
    sector: "Wellness & spa · Dubai",
    delivered: "Paid-social campaign, landing pages, and brand video",
    kpi: "791 customer conversations from 54K reach",
  },
  {
    sector: "Healthcare mobility · Dubai",
    delivered: "E-commerce store, product catalogue, and customer management",
  },
  {
    sector: "Education & training · Dubai",
    delivered: "E-learning platform, automated registration, and invoicing integration",
  },
  {
    sector: "Translation & language · Dubai",
    delivered: "Multilingual website and client portal",
  },
  {
    sector: "Automotive · New Zealand",
    delivered: "Google Ads architecture and conversion tracking, managed from Dubai",
    kpi: "610 conversions at $6.89 avg. CPC",
  },
  {
    sector: "Construction & manufacturing · Philippines",
    delivered: "Full Odoo ERP across sales, purchasing, inventory, accounting, and e-commerce",
    kpi: "8 disconnected workflows → 1 platform",
  },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Is the audit really free?",
    a: "Yes, for now. I'm keeping it free while I onboard my founding clients. Eventually it'll be AED 750–1,500, but you're early.",
  },
  {
    q: "Do you sign long contracts?",
    a: "No. The Partner retainer is month-to-month. Cancel anytime, no penalties. I earn your business every month, not just the first one.",
  },
  {
    q: "What if I just need IT support, not a whole rebuild?",
    a: "Perfectly fine. Many clients start with simple IT support and grow into the full Partner retainer over time. I meet you where you are.",
  },
  {
    q: "Do you work with very small businesses?",
    a: "Yes. Most of my clients are 2-10 person teams. That's literally who I built this work for.",
  },
  {
    q: "Do you support Arabic-speaking clients or bilingual sites?",
    a: "Yes. I work in English and deliver bilingual websites and content as needed.",
  },
  {
    q: "What if I'm in a different country?",
    a: "I've delivered for clients in Dubai, the wider GCC, New Zealand, and the Philippines. WhatsApp, Zoom, and the right tools make distance irrelevant.",
  },
  {
    q: "Will you try to upsell me?",
    a: "No. The audit is the audit. If you don't need me, I'll tell you, and I mean that.",
  },
  {
    q: "How quickly can you start?",
    a: "Audit calls usually happen within 3–5 days of booking. Builds typically start 1–2 weeks after the audit. The Partner retainer can begin immediately.",
  },
];
