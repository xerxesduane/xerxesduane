import {
  BarChart3,
  Bot,
  Braces,
  Building2,
  Calculator,
  CalendarClock,
  Camera,
  ClipboardList,
  CornerDownLeft,
  Cpu,
  FileSearch,
  FileText,
  GitBranch,
  Headset,
  Languages,
  LayoutTemplate,
  ListChecks,
  Megaphone,
  MessageSquareReply,
  Mic,
  ReceiptText,
  Recycle,
  Route,
  ScanSearch,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Split,
  Star,
  UserRoundCheck,
  UtensilsCrossed,
  Wand2,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/* ---------------------------------------------------------------------------
 * AI Lab catalogue — the single source of truth for which tools exist.
 *
 * The interactive widget for each entry lives in src/pages/Demos.tsx, keyed by
 * `id`; everything a caller needs to *describe* the lab (count, titles, blurbs,
 * categories) lives here, so the homepage card and the lab page can never
 * disagree about how many tools there are.
 * ------------------------------------------------------------------------- */

export type AiLabCategoryId = "frontier" | "convert" | "comms" | "create" | "automate";

export const AI_LAB_CATEGORIES: { id: AiLabCategoryId; label: string }[] = [
  { id: "frontier", label: "Multimodal & agentic" },
  { id: "convert", label: "Win customers" },
  { id: "comms", label: "Communicate" },
  { id: "create", label: "Create content" },
  { id: "automate", label: "Automate the busywork" },
];

export interface AiLabDemo {
  /** Anchor id on /ai-lab — also the key of the widget in Demos.tsx. */
  id: string;
  category: AiLabCategoryId;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  blurb: string;
  featured?: boolean;
}

export const AI_LAB_DEMOS: AiLabDemo[] = [
  {
    id: "agent",
    category: "frontier",
    icon: Workflow,
    eyebrow: "Agentic workflow",
    title: "Watch an AI agent work a lead, step by step",
    blurb:
      "Paste an inbound enquiry and the agent reads it, enriches the contact, scores the fit, drafts a reply, offers a time and updates the CRM — every step and tool-call shown live. The visible reasoning is the point.",
  },
  {
    id: "voice",
    category: "frontier",
    icon: Mic,
    eyebrow: "Voice receptionist · EN/AR",
    title: "Talk to an AI receptionist — out loud",
    blurb:
      "Tap, speak in Arabic or English, and it transcribes you, replies, and talks back — a real bilingual front desk you can hold a conversation with. Prefer to type? There's always a text box.",
  },
  {
    id: "vision-receipt",
    category: "frontier",
    icon: ReceiptText,
    eyebrow: "Vision · bookkeeping",
    title: "Snap a receipt → a clean expense line",
    blurb:
      "Photograph any receipt or invoice and the AI reads it into a tidy expense record — merchant, date, category, line items and 5% VAT — ready to push into Odoo or your books.",
  },
  {
    id: "vision-product",
    category: "frontier",
    icon: Camera,
    eyebrow: "Vision · e-commerce",
    title: "Photograph a product → a full listing",
    blurb:
      "Point your camera at a product and get a store-ready description, highlight bullets, SEO title + meta, tags and a suggested AED price — straight from the photo.",
  },
  {
    id: "ondevice",
    category: "frontier",
    icon: Cpu,
    eyebrow: "On-device · private",
    title: "AI that runs entirely in your browser",
    blurb:
      "A real embedding model loads once into your browser, then answers questions semantically — fully on your device, nothing sent to a server. The privacy-first option for sensitive data.",
  },
  {
    id: "data",
    category: "automate",
    icon: BarChart3,
    eyebrow: "Data → insight",
    title: "Turn a CSV into insights + a chart",
    blurb:
      "Paste or upload a small sales CSV and get three specific insights, a generated chart, and a recommended next move — the analyst layer on top of your numbers.",
  },
  {
    id: "aeo",
    category: "convert",
    icon: ScanSearch,
    eyebrow: "AEO/GEO · AI search",
    title: "See how AI describes your business",
    blurb:
      "Describe your business and see how an AI engine would summarise it today, what's hurting your AI visibility, and the schema + fixes to get accurately cited by ChatGPT and Perplexity.",
  },
  {
    id: "section",
    category: "create",
    icon: LayoutTemplate,
    eyebrow: "Instant landing section",
    title: "Describe a business → a live landing section",
    blurb:
      "Type a business or offer and watch a complete, on-brand hero section render live — headline, value bullets, CTAs and a proof stat — the way I'd ship it.",
  },
  {
    id: "process",
    category: "automate",
    icon: Route,
    eyebrow: "Process analyzer",
    title: "Find the automation in your busywork",
    blurb:
      "Describe a manual workflow and the AI maps the steps, flags the bottlenecks and repeated work, and returns a concrete automation plan with a rough time-saved estimate.",
  },
  {
    id: "pipeline",
    category: "automate",
    icon: GitBranch,
    eyebrow: "CRM pipeline designer",
    title: "Design your sales pipeline in seconds",
    blurb:
      "Describe how you sell and the AI proposes practical pipeline stages, the fields to capture, and the automations worth setting up — the blueprint for a CRM that fits how you work.",
  },
  {
    id: "roi",
    category: "automate",
    icon: Calculator,
    eyebrow: "Automation ROI calculator",
    title: "See what a repeated task really costs",
    blurb:
      "Enter how often a manual task runs and what it costs, and get an estimate of the hours and money you'd win back by automating it. Runs entirely in your browser — just math, no AI.",
  },
  {
    id: "repurpose",
    category: "create",
    icon: Recycle,
    eyebrow: "Content repurposing",
    title: "One message → email, social & a video",
    blurb:
      "Paste a long update and get a concise email, a ready-to-post social caption, and a short-video outline — the same idea, reshaped for every channel in one go.",
  },
  {
    id: "leadresponse",
    category: "convert",
    icon: MessageSquareReply,
    eyebrow: "Lead response assistant",
    title: "Reply to an enquiry the right way",
    blurb:
      "Paste a customer enquiry and get a clear, professional reply plus a read on their intent, urgency, and the best next step — so no lead waits or gets a weak answer.",
  },
  {
    id: "critique",
    category: "convert",
    icon: ClipboardList,
    eyebrow: "Conversion critique",
    title: "Find what's costing you conversions",
    blurb:
      "Enter a page URL or paste your copy and get a prioritized critique — unclear messaging, missing trust signals, weak CTAs, and the friction to fix first. Suggestions, never guarantees.",
  },
  {
    id: "assistant",
    category: "convert",
    icon: Bot,
    eyebrow: "Business assistant",
    title: "An AI rep for your website",
    blurb: "The kind of always-on assistant I'd embed on your site to answer customers and never miss a question.",
  },
  {
    id: "lead",
    category: "convert",
    icon: UserRoundCheck,
    eyebrow: "Lead qualifier",
    title: "A bot that qualifies your leads",
    blurb: "It chats with a visitor, figures out what they need, and hands you a warm, ready-to-act lead.",
  },
  {
    id: "receptionist",
    category: "convert",
    icon: Headset,
    eyebrow: "Bilingual front desk",
    title: "An AI receptionist that speaks Arabic & English",
    blurb: "Write to it in Arabic or English — it answers in the same language, handles your FAQs, and books appointments. The 24/7 front desk every Dubai business needs.",
  },
  {
    id: "booking",
    category: "convert",
    icon: CalendarClock,
    eyebrow: "Bookings, hands-free",
    title: "An AI concierge that books appointments",
    blurb: "It chats with a customer, collects the service, day, time and number, then confirms the booking — a front desk that never sleeps, in Arabic or English.",
  },
  {
    id: "trades",
    category: "convert",
    icon: Wrench,
    eyebrow: "Trades lead qualifier",
    title: "Qualify a repair job, capture the callback",
    blurb: "A homeowner describes the problem; the AI asks the right questions, gives a likely cause and a ballpark, and takes their number — a dispatcher that pre-qualifies every job.",
  },
  {
    id: "broadcast",
    category: "convert",
    icon: Megaphone,
    eyebrow: "WhatsApp campaigns",
    title: "Build a WhatsApp broadcast campaign",
    blurb: "Describe a promo and get a Meta-ready opt-in template, two follow-up nudges, and the audience to send it to — a full campaign, drafted in seconds.",
  },
  {
    id: "whatsapp",
    category: "convert",
    icon: Send,
    featured: true,
    eyebrow: "Flagship · WhatsApp marketing automation",
    title: "Turn your lead list into personal WhatsApp messages",
    blurb: "Import your leads from Google Sheets or Excel and the AI writes a unique, on-brand WhatsApp opener for every one — then, when they reply, it answers, qualifies, and books the appointment. A full two-way conversation at scale, on the channel people actually read.",
  },
  {
    id: "reply",
    category: "comms",
    icon: CornerDownLeft,
    eyebrow: "Inbox on autopilot",
    title: "Draft replies to any message",
    blurb: "Paste an email, WhatsApp, or DM and pick a tone — get a ready-to-send reply that answers every question in it.",
  },
  {
    id: "review",
    category: "comms",
    icon: Star,
    eyebrow: "Reputation, handled",
    title: "Reply to reviews the right way",
    blurb: "Paste any Google review — glowing or brutal — and it writes a calm, on-brand public response in seconds.",
  },
  {
    id: "translate",
    category: "comms",
    icon: Languages,
    eyebrow: "Arabic ⇄ English",
    title: "Translate either direction, instantly",
    blurb: "Bilingual is the default in Dubai. Paste Arabic or English and get a natural translation — handy for sites, support, and content.",
  },
  {
    id: "triage",
    category: "comms",
    icon: Split,
    eyebrow: "Inbox routing",
    title: "Triage & route any inbound message",
    blurb: "Paste a customer message and it tags the department, priority, sentiment, language, and a suggested SLA — plus a ready acknowledgement. The brain behind a shared inbox.",
  },
  {
    id: "social",
    category: "create",
    icon: Sparkles,
    eyebrow: "Content in seconds",
    title: "Social captions, tuned per platform",
    blurb: "One idea in, a scroll-stopping caption out — written natively for Instagram, LinkedIn, or TikTok, hashtags included.",
  },
  {
    id: "seo",
    category: "create",
    icon: Search,
    eyebrow: "SEO & answer-engine ready",
    title: "Generate search metadata that ranks",
    blurb: "Describe a page and get an optimized title, meta description, slug, keywords, and FAQ schema — the groundwork for SEO and AI search.",
  },
  {
    id: "ads",
    category: "create",
    icon: Megaphone,
    eyebrow: "Paid ads, written fast",
    title: "Ad copy for Google & Meta",
    blurb: "Describe your offer and get conversion-ready headlines and descriptions, sized for Google Search or Facebook & Instagram.",
  },
  {
    id: "product",
    category: "create",
    icon: ShoppingBag,
    eyebrow: "E-commerce copy",
    title: "Product descriptions that sell",
    blurb: "A few notes in, a polished store-ready description with highlight bullets out — in the tone your brand wants.",
  },
  {
    id: "property",
    category: "create",
    icon: Building2,
    eyebrow: "Real estate listings",
    title: "Turn bullet facts into a property listing",
    blurb: "Drop in the basics — beds, area, size, price — and get a polished portal listing, a punchy headline, and a ready-to-send WhatsApp blurb in English and Arabic.",
  },
  {
    id: "menu",
    category: "create",
    icon: UtensilsCrossed,
    eyebrow: "Delivery-app menus",
    title: "Make your menu sell on Talabat & Deliveroo",
    blurb: "Paste a rough menu and get appetizing dish names, mouth-watering descriptions, allergen tags, and upsell pairings — formatted to convert on the delivery apps.",
  },
  {
    id: "tone",
    category: "create",
    icon: Wand2,
    eyebrow: "Brand voice",
    title: "Rewrite anything in your brand voice",
    blurb: "Paste any text and pick a voice — luxury, playful, corporate, or Gulf-warm — and watch it get rewritten on-brand, live.",
  },
  {
    id: "ask",
    category: "automate",
    icon: FileSearch,
    eyebrow: "Answers from your content",
    title: "Ask questions about any document",
    blurb: "Paste text or point it at a page, then ask — it answers only from what's there, not the open internet.",
  },
  {
    id: "extract",
    category: "automate",
    icon: Braces,
    eyebrow: "Structured extraction",
    title: "Turn messy messages into clean data",
    blurb: "Drop in a rambling enquiry and watch it become a tidy, typed record — the first step of any automation.",
  },
  {
    id: "summarize",
    category: "automate",
    icon: ListChecks,
    eyebrow: "From chaos to clarity",
    title: "Turn meeting notes into action items",
    blurb: "Drop in messy notes or a voice-note transcript and get a clean summary, the decisions made, and who owns what.",
  },
  {
    id: "quote",
    category: "automate",
    icon: ReceiptText,
    eyebrow: "Quotes in seconds",
    title: "Turn a job into a priced quote",
    blurb: "Describe the work and get an itemized quote with line items, 5% UAE VAT, and a total — the kind of thing your Odoo/CRM can send automatically.",
  },
  {
    id: "invoice",
    category: "automate",
    icon: FileText,
    eyebrow: "Bookkeeping automation",
    title: "Parse a messy invoice into clean data",
    blurb: "Paste a supplier invoice or statement and get structured line items with 5% VAT and totals computed — ready to push into Odoo or Zoho Books.",
  },
];

/** How many tools the lab actually ships. Never hard-code this number. */
export const AI_LAB_TOOL_COUNT = AI_LAB_DEMOS.length;
