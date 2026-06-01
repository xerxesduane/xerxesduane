import {
  Code2,
  Boxes,
  LayoutDashboard,
  Smartphone,
  ShoppingBag,
  Target,
  Bot,
  Video,
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
  { label: "Work", href: "/#work" },
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
  featured?: boolean;
}

export const SERVICES: Service[] = [
  {
    icon: Bot,
    title: "AI Automation & Solutions",
    tagline: "The new advantage.",
    description:
      "AI workflows, chatbots, and custom assistants that quietly run your business in the background, answering questions, qualifying leads, and giving you back the hours you've been losing.",
    featured: true,
  },
  {
    icon: Code2,
    title: "Custom System Development",
    tagline: "The foundation, built for you.",
    description:
      "Software tailored to how your business actually works, client portals, internal tools, and systems built around the way you run. No templates, no limitations.",
  },
  {
    icon: Boxes,
    title: "ERP & Odoo",
    tagline: "One system to run on.",
    description:
      "Odoo ERP setup, administration, and support, wiring inventory, sales, purchasing, and accounting into a single source of truth. Configured and run for real businesses in the UAE and the Philippines.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards & CRM",
    tagline: "See your business clearly.",
    description:
      "Real-time dashboards, customer databases, and integrations that finally talk: HubSpot, QuickBooks, Zoho, all in one place.",
  },
  {
    icon: Smartphone,
    title: "Mobile & Web Apps",
    tagline: "Sleek, scalable, built to grow.",
    description:
      "Custom iOS, Android, and web apps, booking platforms, member portals, internal tools, fast and ready for what's next.",
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce & Stores",
    tagline: "Sell online without the headaches.",
    description:
      "Secure checkout, payment gateways, order tracking, and upsell flows, tailored to your products and your customers.",
  },
  {
    icon: Target,
    title: "Landing Pages & Funnels",
    tagline: "Turn clicks into customers.",
    description:
      "Conversion-optimized pages and complete sales funnels, integrated with analytics, lead capture, and your CRM.",
  },
  {
    icon: Video,
    title: "Videography & Photography",
    tagline: "Stories that sell.",
    description:
      "Professional video, product photography, reels, and brand films, created with the storytelling instincts of someone who's run real ad campaigns.",
  },
  {
    icon: Palette,
    title: "Graphic Design & Branding",
    tagline: "Look like the brand you are.",
    description:
      "Logos, brand identity, social graphics, and marketing collateral, designed to match the quality of the work behind it.",
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
    worked: "Lessan Translation · 5+ yr partnership",
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
    worked: "Keystone Events Dubai",
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
    blurb: "Member management, donations, event registration, and communication platforms built with care.",
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
  client: string;
  location: string;
  category: string;
  challenge: string;
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
    client: "Blocktec Philippines",
    location: "Philippines · Construction Materials",
    category: "Odoo ERP",
    challenge:
      "A construction materials and AAC wall-systems company ran on disconnected spreadsheets, manual tracking, and fragmented communication between departments. The goal: one platform for the whole operation.",
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
    client: "Saladmaster UAE",
    location: "UAE · Premium Cookware",
    category: "CRM & Web",
    challenge:
      "A premium cookware and direct-sales brand needed a smoother customer journey, from first inquiry through cooking demo to sale, with real visibility into follow-ups.",
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
    client: "AYA Home Spa",
    location: "Dubai · Wellness",
    category: "Meta Ads",
    challenge:
      "A growing Dubai wellness brand needed real digital visibility in a crowded market.",
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
    client: "Wellington Cash for Cars",
    location: "New Zealand · Automotive",
    category: "Google Ads",
    challenge:
      "A vehicle-removal service needed to dominate a competitive search market while keeping cost-per-acquisition low.",
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
    body: "We sit down and listen. What's working? What's broken? What's quietly costing you money? No pitching, just questions and clarity.",
  },
  {
    no: "02",
    title: "Plan",
    body: "We turn your goals into a real roadmap: what we'll build, in what order, with clear timelines and transparent pricing. No jargon.",
  },
  {
    no: "03",
    title: "Build",
    body: "We design, develop, and integrate, with regular updates, working previews, and zero surprises. We move fast because we plan well.",
  },
  {
    no: "04",
    title: "Test & Refine",
    body: "We test everything, speed, security, mobile, integrations. Nothing ships until it's solid and you're the final word on 'ready'.",
  },
  {
    no: "05",
    title: "Launch & Support",
    body: "We deploy, train your team, and stick around. Launching is the start, not the end, we're one message away for years.",
  },
];

export const COMPARISON: { agency: string; bayt: string }[] = [
  { agency: "Sells you tools", bayt: "Sells you clarity" },
  { agency: "Long-term lock-in contracts", bayt: "Month-to-month, cancel anytime" },
  { agency: "Disappears after launch", bayt: "Picks up the phone five years later" },
  { agency: "Upsells everything", bayt: "Tells you when you don't need us" },
  { agency: "One service, one expert", bayt: "One studio, the whole stack" },
  { agency: "Hides pricing", bayt: 'Transparent "from AED X" pricing' },
];

export const STATS: { value: number; suffix: string; label: string }[] = [
  { value: 6, suffix: "+", label: "Years building for Dubai businesses" },
  { value: 20, suffix: "+", label: "Businesses helped across industries" },
  { value: 117, suffix: "K+", label: "Ad impressions delivered" },
  { value: 100, suffix: "%", label: "Growth from referrals & word of mouth" },
];

export const PROMISE = {
  never: [
    "Upsells you don't need",
    "Pressure to sign long contracts",
    "Tools you're paying for and don't use",
    "Freelancers who disappear after the invoice",
  ],
  always: [
    "Honest answers, even when they cost us money",
    "One trusted person who picks up the phone",
    "A real audit before any recommendation",
    "We'll tell you when you don't need us, and we mean it",
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
    body: "A defined-scope project. Website rebuild, CRM setup, automation, SEO overhaul, or a tech-stack consolidation. We scope it, build it, ship it.",
    cta: "See if we're a fit",
    featured: false,
  },
  {
    name: "The Partner",
    price: "from AED 2,500",
    note: "per month",
    pitch: "Your long-term tech partner",
    body: "We become your outsourced tech team. Ongoing IT, maintenance, SEO, ads, and automation, one trusted number to call for everything.",
    cta: "Talk to us",
    featured: false,
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  context: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Xerxes doesn't just design, he solves communication problems. His work is clean, strategic, and always built around what the audience needs to understand. Whether it's branding, social media, or digital campaigns, he consistently delivers work that creates impact.",
    name: "Paul R.",
    role: "Marketing Manager",
    context: "Brand Strategy & Digital Marketing",
  },
  {
    quote:
      "Working with Xerxes brought clarity and consistency to our brand. He has a strong ability to transform rough ideas into polished visuals that feel professional, modern, and purposeful. His attention to detail and understanding of marketing make him a valuable creative partner.",
    name: "Sarah M.",
    role: "Communications Lead",
    context: "Content & Brand Development",
  },
  {
    quote:
      "Xerxes is creative, reliable, and highly skilled in both design and digital execution. He understands how visual design supports business goals, which makes his work practical, effective, and results-driven. Every project was delivered with professionalism and care.",
    name: "David L.",
    role: "Project Director",
    context: "Web Design & Creative Services",
  },
];

export interface Client {
  name: string;
  sector: string;
  url: string;
  instagram?: string;
}

export const CLIENTS: Client[] = [
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
    a: "Yes, for now. We're keeping it free while we onboard our founding clients. Eventually it'll be AED 750–1,500, but you're early.",
  },
  {
    q: "Do you sign long contracts?",
    a: "No. The Partner retainer is month-to-month. Cancel anytime, no penalties. We earn your business every month, not just the first one.",
  },
  {
    q: "What if I just need IT support, not a whole rebuild?",
    a: "Perfectly fine. Many clients start with simple IT support and grow into the full Partner retainer over time. We meet you where you are.",
  },
  {
    q: "Do you work with very small businesses?",
    a: "Yes. Most of our clients are 2–10 person teams. That's literally who we built Threshold Works for.",
  },
  {
    q: "Do you support Arabic-speaking clients or bilingual sites?",
    a: "Yes. We work in English and deliver bilingual websites and content as needed.",
  },
  {
    q: "What if I'm in a different country?",
    a: "We've delivered for clients in Dubai, the wider GCC, New Zealand, and the Philippines. WhatsApp, Zoom, and the right tools make distance irrelevant.",
  },
  {
    q: "Will you try to upsell me?",
    a: "No. The audit is the audit. If you don't need us, we'll tell you, and we mean that.",
  },
  {
    q: "How quickly can you start?",
    a: "Audit calls usually happen within 3–5 days of booking. Builds typically start 1–2 weeks after the audit. The Partner retainer can begin immediately.",
  },
];
