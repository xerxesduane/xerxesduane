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

export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "AI Lab", href: "/ai-lab" },
  { label: "Work", href: "/#work" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Showreel", href: "/showreel" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "FAQ", href: "/#faq" },
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
  worked?: string;
  /** Public client site for the `worked` reference, if any. */
  workedUrl?: string;
  mission?: boolean;
}

export const INDUSTRIES: Industry[] = [
  {
    icon: Languages,
    name: "Translation & Language",
    blurb: "Client portals, multilingual sites, and the admin systems that let your team stay focused on the work.",
    worked: "Lessan Translation",
    workedUrl: "https://lessantranslation.com/",
  },
  {
    icon: Accessibility,
    name: "Healthcare Mobility",
    blurb: "E-commerce for assistive products, CRM for patient relationships, and integrations built for real-world care.",
    worked: "Gilani Mobility",
    workedUrl: "https://www.gilanimobility.ae/",
  },
  {
    icon: GraduationCap,
    name: "Education & Training",
    blurb: "Custom e-learning platforms, automated registration, and QuickBooks-integrated invoicing, end to end.",
    worked: "We Aspire",
    workedUrl: "https://www.weaspire.ae/",
  },
  {
    icon: Car,
    name: "Automotive",
    blurb: "SEO that ranks for keywords that convert and Google Ads architectures that don't waste budget.",
    worked: "Wellington Cash for Cars",
    workedUrl: "https://wellingtoncashforcars.co.nz/",
  },
  {
    icon: Sparkles,
    name: "Wellness, Spa & Beauty",
    blurb: "Meta Ads that drive real conversations, booking systems that reduce no-shows, and brand visuals that match the experience.",
    worked: "AYA Home Spa",
    workedUrl: "https://www.ayahomespa.ae/",
  },
  {
    icon: PartyPopper,
    name: "Events & Hospitality",
    blurb: "Event-ready websites, social media, and professional video that turn attendees into repeat clients.",
    // HIDDEN (re-add later): worked: "Keystone Events Dubai",
  },
  {
    icon: Store,
    name: "E-Commerce & Retail",
    blurb: "Conversion-optimized stores, automated invoicing, and upsell flows that actually work.",
    worked: "Multiple clients",
  },
  {
    icon: Church,
    name: "Churches & Faith-Based",
    blurb: "Websites, Google Business Profile and local search, digital marketing, and social content, built with care for the mission.",
    // HIDDEN (re-add later): worked: "Fellowship Dubai", workedUrl: "https://fellowshipdubai.com/",
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
  /** Metric-based proof (ad campaigns). Mutually exclusive with `scope`. */
  stats?: { value: string; label: string }[];
  /** Scope-based proof (implementations) when there aren't vanity metrics. */
  scope?: string[];
  takeaway: string;
  /** Public client site to link out to, if any. */
  url?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "blocktec-odoo-erp",
    client: "Blocktec Philippines",
    location: "Philippines · Construction Materials",
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
    image: "/brand/clients/blocktec.png",
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
    slug: "saladmaster-crm-web",
    client: "Saladmaster UAE",
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
  /* HIDDEN (re-add later): Fellowship Dubai case study
  {
    client: "Fellowship Dubai",
    location: "Dubai · Church & Non-Profit",
    category: "Web · GMB · Social",
    challenge:
      "A multi-site church in Dubai needed to grow its reach and be easy to find, across a redesigned website, Google Business Profile and local search for both campuses, and a consistent content engine on Facebook and Instagram, working alongside their Communications Director.",
    stats: [
      { value: "16.8K", label: "Community followers" },
      { value: "60K+", label: "Monthly content views" },
      { value: "8.6K", label: "Google views / mo" },
      { value: "452", label: "Directions to campuses / mo" },
    ],
    takeaway: "A growing, easy-to-find digital presence, run end to end across web, search, and social.",
    url: "https://fellowshipdubai.com/",
  },
  */
  {
    slug: "aya-home-spa-meta-ads",
    client: "AYA Home Spa",
    location: "Dubai · Wellness",
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
    image: "/work/web/web-03-thumb.webp",
    stats: [
      { value: "54K", label: "People reached" },
      { value: "98K", label: "Video plays" },
      { value: "791", label: "Conversations" },
      { value: "117K", label: "Ad views" },
    ],
    takeaway: "Real visibility. Real conversations. Real growth.",
    url: "https://www.ayahomespa.ae/",
  },
  {
    slug: "wellington-cash-for-cars-google-ads",
    client: "Wellington Cash for Cars",
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
    image: "/brand/clients/wellington.png",
    stats: [
      { value: "1,530+", label: "Clicks" },
      { value: "610", label: "Conversions" },
      { value: "8.28%", label: "Top-ad CTR" },
      { value: "$6.89", label: "Avg. CPC" },
    ],
    takeaway: "Real ad spend, real ROI, managed internationally from Dubai.",
    url: "https://wellingtoncashforcars.co.nz/",
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
  { agency: "One service, one expert", bayt: "One studio, the whole stack" },
  { agency: "Hides pricing", bayt: 'Transparent "from AED X" pricing' },
];

export const STATS: { value: number; suffix: string; label: string }[] = [
  { value: 6, suffix: "+", label: "Years building for Dubai businesses" },
  { value: 117, suffix: "K+", label: "Ad impressions delivered" },
  { value: 20, suffix: "+", label: "Live AI tools you can try" },
  { value: 4, suffix: "", label: "Countries served" },
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
    "I'll tell you when you don't need me, and I mean it",
  ],
};

export const PACKAGES = [
  {
    name: "The Audit",
    price: "Free",
    note: "for a limited time",
    pitch: "Start here",
    body: "A 60-minute deep-dive into your tech stack, website, software, marketing, automation. You walk away with a plain-English roadmap of what to fix first.",
    cta: "Book your audit",
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
    body: "I become your outsourced tech team. Ongoing IT, maintenance, SEO, ads, and automation, one trusted number to call for everything.",
    cta: "Talk to me",
    featured: false,
  },
];

// Testimonials intentionally removed until real, attributable client quotes
// exist (see ProofBand.tsx, which points to the live AI Lab as proof instead).

export interface Client {
  name: string;
  sector: string;
  url: string;
  instagram?: string;
  facebook?: string;
}

export const CLIENTS: Client[] = [
  /* HIDDEN (re-add later): Fellowship Dubai client card
  {
    name: "Fellowship Dubai",
    sector: "Church & Non-Profit · Dubai",
    url: "https://fellowshipdubai.com/",
    facebook: "https://www.facebook.com/fellowshipdubai",
    instagram: "https://www.instagram.com/fellowshipdubai",
  },
  */
  {
    name: "AYA Home Spa",
    sector: "Wellness & Spa · Dubai",
    url: "https://www.ayahomespa.ae/",
    instagram: "https://www.instagram.com/aya.homespa.uae/",
  },
  {
    name: "Gilani Mobility",
    sector: "Healthcare Mobility · Dubai",
    url: "https://www.gilanimobility.ae/",
    instagram: "https://www.instagram.com/gilanimobilitydubai/",
  },
  {
    name: "We Aspire",
    sector: "Education & Training · Dubai",
    url: "https://www.weaspire.ae/",
    instagram: "https://www.instagram.com/weaspiredubai/",
  },
  {
    name: "Lessan Translation",
    sector: "Translation & Language · Dubai",
    url: "https://lessantranslation.com/",
  },
  {
    name: "Wellington Cash for Cars",
    sector: "Automotive · New Zealand",
    url: "https://wellingtoncashforcars.co.nz/",
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
    a: "Yes. Most of my clients are 2–10 person teams. That's literally who I built this studio for.",
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
