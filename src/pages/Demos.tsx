import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { Bot, UserRoundCheck, FileSearch, Braces, Languages, Send, Star, Sparkles, CornerDownLeft, Search, ListChecks, FileSpreadsheet, Inbox, ArrowRight, ShieldCheck, Headset, ReceiptText, Megaphone, ShoppingBag, ChevronDown, Building2, UtensilsCrossed, Split, FileText, Wand2, CalendarClock, Wrench, Mic, Camera, Workflow, BarChart3, ScanSearch, LayoutTemplate, Cpu, Route, GitBranch, Calculator, Recycle, MessageSquareReply, ClipboardList } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Reveal from "../components/ui/Reveal";
import Contact from "../components/Contact";
import { fadeUp, stagger } from "../lib/motion";
import { track } from "../lib/analytics";

// Every demo widget is code-split and only fetched when its card scrolls into
// view (see <LazyDemo/>), so landing on /ai-lab doesn't download ~35 tools'
// worth of JS up front.
const DemoChat = lazy(() => import("../components/demos/DemoChat"));
const DemoAsk = lazy(() => import("../components/demos/DemoAsk"));
const DemoExtract = lazy(() => import("../components/demos/DemoExtract"));
const DemoTranslate = lazy(() => import("../components/demos/DemoTranslate"));
const DemoWhatsApp = lazy(() => import("../components/demos/DemoWhatsApp"));
const DemoReview = lazy(() => import("../components/demos/DemoReview"));
const DemoReply = lazy(() => import("../components/demos/DemoReply"));
const DemoSocial = lazy(() => import("../components/demos/DemoSocial"));
const DemoSeo = lazy(() => import("../components/demos/DemoSeo"));
const DemoSummarize = lazy(() => import("../components/demos/DemoSummarize"));
const DemoLeadCapture = lazy(() => import("../components/demos/DemoLeadCapture"));
const DemoQuote = lazy(() => import("../components/demos/DemoQuote"));
const DemoAds = lazy(() => import("../components/demos/DemoAds"));
const DemoProduct = lazy(() => import("../components/demos/DemoProduct"));
const DemoProperty = lazy(() => import("../components/demos/DemoProperty"));
const DemoMenu = lazy(() => import("../components/demos/DemoMenu"));
const DemoBroadcast = lazy(() => import("../components/demos/DemoBroadcast"));
const DemoTriage = lazy(() => import("../components/demos/DemoTriage"));
const DemoInvoice = lazy(() => import("../components/demos/DemoInvoice"));
const DemoTone = lazy(() => import("../components/demos/DemoTone"));
const DemoAgent = lazy(() => import("../components/demos/DemoAgent"));
const DemoVoice = lazy(() => import("../components/demos/DemoVoice"));
const DemoReceipt = lazy(() => import("../components/demos/DemoReceipt"));
const DemoVisionProduct = lazy(() => import("../components/demos/DemoVisionProduct"));
const DemoOnDevice = lazy(() => import("../components/demos/DemoOnDevice"));
const DemoData = lazy(() => import("../components/demos/DemoData"));
const DemoAeo = lazy(() => import("../components/demos/DemoAeo"));
const DemoSection = lazy(() => import("../components/demos/DemoSection"));
const DemoProcess = lazy(() => import("../components/demos/DemoProcess"));
const DemoPipeline = lazy(() => import("../components/demos/DemoPipeline"));
const DemoRoi = lazy(() => import("../components/demos/DemoRoi"));
const DemoRepurpose = lazy(() => import("../components/demos/DemoRepurpose"));
const DemoLeadResponse = lazy(() => import("../components/demos/DemoLeadResponse"));
const DemoCritique = lazy(() => import("../components/demos/DemoCritique"));

type CatId = "frontier" | "convert" | "comms" | "create" | "automate";

const CATEGORIES: { id: CatId; label: string }[] = [
  { id: "frontier", label: "Multimodal & agentic" },
  { id: "convert", label: "Win customers" },
  { id: "comms", label: "Communicate" },
  { id: "create", label: "Create content" },
  { id: "automate", label: "Automate the busywork" },
];

type Demo = {
  id: string;
  category: CatId;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  blurb: string;
  node: ReactNode;
  featured?: boolean;
};

const DEMOS: Demo[] = [
  {
    id: "agent",
    category: "frontier",
    icon: Workflow,
    eyebrow: "Agentic workflow",
    title: "Watch an AI agent work a lead, step by step",
    blurb:
      "Paste an inbound enquiry and the agent reads it, enriches the contact, scores the fit, drafts a reply, offers a time and updates the CRM — every step and tool-call shown live. The visible reasoning is the point.",
    node: <DemoAgent />,
  },
  {
    id: "voice",
    category: "frontier",
    icon: Mic,
    eyebrow: "Voice receptionist · EN/AR",
    title: "Talk to an AI receptionist — out loud",
    blurb:
      "Tap, speak in Arabic or English, and it transcribes you, replies, and talks back — a real bilingual front desk you can hold a conversation with. Prefer to type? There's always a text box.",
    node: <DemoVoice />,
  },
  {
    id: "vision-receipt",
    category: "frontier",
    icon: ReceiptText,
    eyebrow: "Vision · bookkeeping",
    title: "Snap a receipt → a clean expense line",
    blurb:
      "Photograph any receipt or invoice and the AI reads it into a tidy expense record — merchant, date, category, line items and 5% VAT — ready to push into Odoo or your books.",
    node: <DemoReceipt />,
  },
  {
    id: "vision-product",
    category: "frontier",
    icon: Camera,
    eyebrow: "Vision · e-commerce",
    title: "Photograph a product → a full listing",
    blurb:
      "Point your camera at a product and get a store-ready description, highlight bullets, SEO title + meta, tags and a suggested AED price — straight from the photo.",
    node: <DemoVisionProduct />,
  },
  {
    id: "ondevice",
    category: "frontier",
    icon: Cpu,
    eyebrow: "On-device · private",
    title: "AI that runs entirely in your browser",
    blurb:
      "A real embedding model loads once into your browser, then answers questions semantically — fully on your device, nothing sent to a server. The privacy-first option for sensitive data.",
    node: <DemoOnDevice />,
  },
  {
    id: "data",
    category: "automate",
    icon: BarChart3,
    eyebrow: "Data → insight",
    title: "Turn a CSV into insights + a chart",
    blurb:
      "Paste or upload a small sales CSV and get three specific insights, a generated chart, and a recommended next move — the analyst layer on top of your numbers.",
    node: <DemoData />,
  },
  {
    id: "aeo",
    category: "convert",
    icon: ScanSearch,
    eyebrow: "AEO/GEO · AI search",
    title: "See how AI describes your business",
    blurb:
      "Describe your business and see how an AI engine would summarise it today, what's hurting your AI visibility, and the schema + fixes to get accurately cited by ChatGPT and Perplexity.",
    node: <DemoAeo />,
  },
  {
    id: "section",
    category: "create",
    icon: LayoutTemplate,
    eyebrow: "Instant landing section",
    title: "Describe a business → a live landing section",
    blurb:
      "Type a business or offer and watch a complete, on-brand hero section render live — headline, value bullets, CTAs and a proof stat — the way I'd ship it.",
    node: <DemoSection />,
  },
  {
    id: "process",
    category: "automate",
    icon: Route,
    eyebrow: "Process analyzer",
    title: "Find the automation in your busywork",
    blurb:
      "Describe a manual workflow and the AI maps the steps, flags the bottlenecks and repeated work, and returns a concrete automation plan with a rough time-saved estimate.",
    node: <DemoProcess />,
  },
  {
    id: "pipeline",
    category: "automate",
    icon: GitBranch,
    eyebrow: "CRM pipeline designer",
    title: "Design your sales pipeline in seconds",
    blurb:
      "Describe how you sell and the AI proposes practical pipeline stages, the fields to capture, and the automations worth setting up — the blueprint for a CRM that fits how you work.",
    node: <DemoPipeline />,
  },
  {
    id: "roi",
    category: "automate",
    icon: Calculator,
    eyebrow: "Automation ROI calculator",
    title: "See what a repeated task really costs",
    blurb:
      "Enter how often a manual task runs and what it costs, and get an estimate of the hours and money you'd win back by automating it. Runs entirely in your browser — just math, no AI.",
    node: <DemoRoi />,
  },
  {
    id: "repurpose",
    category: "create",
    icon: Recycle,
    eyebrow: "Content repurposing",
    title: "One message → email, social & a video",
    blurb:
      "Paste a long update and get a concise email, a ready-to-post social caption, and a short-video outline — the same idea, reshaped for every channel in one go.",
    node: <DemoRepurpose />,
  },
  {
    id: "leadresponse",
    category: "convert",
    icon: MessageSquareReply,
    eyebrow: "Lead response assistant",
    title: "Reply to an enquiry the right way",
    blurb:
      "Paste a customer enquiry and get a clear, professional reply plus a read on their intent, urgency, and the best next step — so no lead waits or gets a weak answer.",
    node: <DemoLeadResponse />,
  },
  {
    id: "critique",
    category: "convert",
    icon: ClipboardList,
    eyebrow: "Conversion critique",
    title: "Find what's costing you conversions",
    blurb:
      "Enter a page URL or paste your copy and get a prioritized critique — unclear messaging, missing trust signals, weak CTAs, and the friction to fix first. Suggestions, never guarantees.",
    node: <DemoCritique />,
  },
  {
    id: "assistant",
    category: "convert",
    icon: Bot,
    eyebrow: "Business assistant",
    title: "An AI rep for your website",
    blurb: "The kind of always-on assistant I'd embed on your site to answer customers and never miss a question.",
    node: (
      <DemoChat
        demo="assistant"
        greeting="Hi! I'm a demo assistant for a small business. Ask me anything a customer might — hours, services, getting a quote…"
        placeholder="Ask the assistant a question…"
        suggestions={["What services do you offer?", "Are you open on weekends?", "Can I get a quote?"]}
      />
    ),
  },
  {
    id: "lead",
    category: "convert",
    icon: UserRoundCheck,
    eyebrow: "Lead qualifier",
    title: "A bot that qualifies your leads",
    blurb: "It chats with a visitor, figures out what they need, and hands you a warm, ready-to-act lead.",
    node: (
      <DemoChat
        demo="lead"
        greeting="Hey — tell me a bit about your business and what's slowing you down, and I'll figure out how I can help."
        placeholder="Tell it about your business…"
        suggestions={[
          "I run a small e-commerce store",
          "My tools don't talk to each other",
          "I need a website that converts",
        ]}
      />
    ),
  },
  {
    id: "receptionist",
    category: "convert",
    icon: Headset,
    eyebrow: "Bilingual front desk",
    title: "An AI receptionist that speaks Arabic & English",
    blurb: "Write to it in Arabic or English — it answers in the same language, handles your FAQs, and books appointments. The 24/7 front desk every Dubai business needs.",
    node: (
      <>
        <DemoChat
          demo="receptionist"
          greeting="Hi! I'm a bilingual AI receptionist — اسألني بالعربي أو بالإنجليزي 🙂 I can answer questions or book you an appointment. How can I help?"
          placeholder="Type in English or بالعربية…"
          suggestions={["I'd like to book an appointment", "ما هي ساعات العمل؟", "Where are you located?"]}
        />
        <DemoLeadCapture
          demo="receptionist"
          prompt="Want a bilingual receptionist like this?"
          sub="Drop your WhatsApp or email — I'll show you how it'd handle your customers, in Arabic and English."
        />
      </>
    ),
  },
  {
    id: "booking",
    category: "convert",
    icon: CalendarClock,
    eyebrow: "Bookings, hands-free",
    title: "An AI concierge that books appointments",
    blurb: "It chats with a customer, collects the service, day, time and number, then confirms the booking — a front desk that never sleeps, in Arabic or English.",
    node: (
      <DemoChat
        demo="booking"
        greeting="Hi! I can book you in 💆 Tell me what you'd like and when — أو راسلني بالعربي."
        placeholder="e.g. a haircut on Saturday afternoon…"
        suggestions={["Book a haircut for Saturday", "أبغى موعد تنظيف بشرة", "Do you have evening slots?"]}
      />
    ),
  },
  {
    id: "trades",
    category: "convert",
    icon: Wrench,
    eyebrow: "Trades lead qualifier",
    title: "Qualify a repair job, capture the callback",
    blurb: "A homeowner describes the problem; the AI asks the right questions, gives a likely cause and a ballpark, and takes their number — a dispatcher that pre-qualifies every job.",
    node: (
      <DemoChat
        demo="trades"
        greeting="Hi! Tell me what's going on and where, and I'll help sort it — AC, plumbing, handyman…"
        placeholder="e.g. AC not cooling, 2BR in JLT…"
        suggestions={["My AC isn't cooling, JLT", "Kitchen sink is leaking", "Need a handyman this week"]}
      />
    ),
  },
  {
    id: "broadcast",
    category: "convert",
    icon: Megaphone,
    eyebrow: "WhatsApp campaigns",
    title: "Build a WhatsApp broadcast campaign",
    blurb: "Describe a promo and get a Meta-ready opt-in template, two follow-up nudges, and the audience to send it to — a full campaign, drafted in seconds.",
    node: <DemoBroadcast />,
  },
  {
    id: "whatsapp",
    category: "convert",
    icon: Send,
    featured: true,
    eyebrow: "Flagship · WhatsApp marketing automation",
    title: "Turn your lead list into personal WhatsApp messages",
    blurb: "Import your leads from Google Sheets or Excel and the AI writes a unique, on-brand WhatsApp opener for every one — then, when they reply, it answers, qualifies, and books the appointment. A full two-way conversation at scale, on the channel people actually read.",
    node: <DemoWhatsApp />,
  },
  {
    id: "reply",
    category: "comms",
    icon: CornerDownLeft,
    eyebrow: "Inbox on autopilot",
    title: "Draft replies to any message",
    blurb: "Paste an email, WhatsApp, or DM and pick a tone — get a ready-to-send reply that answers every question in it.",
    node: <DemoReply />,
  },
  {
    id: "review",
    category: "comms",
    icon: Star,
    eyebrow: "Reputation, handled",
    title: "Reply to reviews the right way",
    blurb: "Paste any Google review — glowing or brutal — and it writes a calm, on-brand public response in seconds.",
    node: <DemoReview />,
  },
  {
    id: "translate",
    category: "comms",
    icon: Languages,
    eyebrow: "Arabic ⇄ English",
    title: "Translate either direction, instantly",
    blurb: "Bilingual is the default in Dubai. Paste Arabic or English and get a natural translation — handy for sites, support, and content.",
    node: <DemoTranslate />,
  },
  {
    id: "triage",
    category: "comms",
    icon: Split,
    eyebrow: "Inbox routing",
    title: "Triage & route any inbound message",
    blurb: "Paste a customer message and it tags the department, priority, sentiment, language, and a suggested SLA — plus a ready acknowledgement. The brain behind a shared inbox.",
    node: <DemoTriage />,
  },
  {
    id: "social",
    category: "create",
    icon: Sparkles,
    eyebrow: "Content in seconds",
    title: "Social captions, tuned per platform",
    blurb: "One idea in, a scroll-stopping caption out — written natively for Instagram, LinkedIn, or TikTok, hashtags included.",
    node: <DemoSocial />,
  },
  {
    id: "seo",
    category: "create",
    icon: Search,
    eyebrow: "SEO & answer-engine ready",
    title: "Generate search metadata that ranks",
    blurb: "Describe a page and get an optimized title, meta description, slug, keywords, and FAQ schema — the groundwork for SEO and AI search.",
    node: <DemoSeo />,
  },
  {
    id: "ads",
    category: "create",
    icon: Megaphone,
    eyebrow: "Paid ads, written fast",
    title: "Ad copy for Google & Meta",
    blurb: "Describe your offer and get conversion-ready headlines and descriptions, sized for Google Search or Facebook & Instagram.",
    node: <DemoAds />,
  },
  {
    id: "product",
    category: "create",
    icon: ShoppingBag,
    eyebrow: "E-commerce copy",
    title: "Product descriptions that sell",
    blurb: "A few notes in, a polished store-ready description with highlight bullets out — in the tone your brand wants.",
    node: <DemoProduct />,
  },
  {
    id: "property",
    category: "create",
    icon: Building2,
    eyebrow: "Real estate listings",
    title: "Turn bullet facts into a property listing",
    blurb: "Drop in the basics — beds, area, size, price — and get a polished portal listing, a punchy headline, and a ready-to-send WhatsApp blurb in English and Arabic.",
    node: <DemoProperty />,
  },
  {
    id: "menu",
    category: "create",
    icon: UtensilsCrossed,
    eyebrow: "Delivery-app menus",
    title: "Make your menu sell on Talabat & Deliveroo",
    blurb: "Paste a rough menu and get appetizing dish names, mouth-watering descriptions, allergen tags, and upsell pairings — formatted to convert on the delivery apps.",
    node: <DemoMenu />,
  },
  {
    id: "tone",
    category: "create",
    icon: Wand2,
    eyebrow: "Brand voice",
    title: "Rewrite anything in your brand voice",
    blurb: "Paste any text and pick a voice — luxury, playful, corporate, or Gulf-warm — and watch it get rewritten on-brand, live.",
    node: <DemoTone />,
  },
  {
    id: "ask",
    category: "automate",
    icon: FileSearch,
    eyebrow: "Answers from your content",
    title: "Ask questions about any document",
    blurb: "Paste text or point it at a page, then ask — it answers only from what's there, not the open internet.",
    node: <DemoAsk />,
  },
  {
    id: "extract",
    category: "automate",
    icon: Braces,
    eyebrow: "Structured extraction",
    title: "Turn messy messages into clean data",
    blurb: "Drop in a rambling enquiry and watch it become a tidy, typed record — the first step of any automation.",
    node: <DemoExtract />,
  },
  {
    id: "summarize",
    category: "automate",
    icon: ListChecks,
    eyebrow: "From chaos to clarity",
    title: "Turn meeting notes into action items",
    blurb: "Drop in messy notes or a voice-note transcript and get a clean summary, the decisions made, and who owns what.",
    node: <DemoSummarize />,
  },
  {
    id: "quote",
    category: "automate",
    icon: ReceiptText,
    eyebrow: "Quotes in seconds",
    title: "Turn a job into a priced quote",
    blurb: "Describe the work and get an itemized quote with line items, 5% UAE VAT, and a total — the kind of thing your Odoo/CRM can send automatically.",
    node: <DemoQuote />,
  },
  {
    id: "invoice",
    category: "automate",
    icon: FileText,
    eyebrow: "Bookkeeping automation",
    title: "Parse a messy invoice into clean data",
    blurb: "Paste a supplier invoice or statement and get structured line items with 5% VAT and totals computed — ready to push into Odoo or Zoho Books.",
    node: <DemoInvoice />,
  },
];

function catLabel(id: CatId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? "";
}

/** Neutral placeholder shown while a demo's chunk hasn't been fetched yet. */
function DemoSkeleton() {
  return (
    <div
      aria-hidden
      className="min-h-[180px] animate-pulse rounded-2xl border border-cream/10 bg-ink-deep/40"
    />
  );
}

/**
 * Mounts (and therefore downloads) a demo widget only once its card is within
 * ~500px of the viewport. Keeps the initial /ai-lab payload small. Also fires
 * a one-time `demo_engage` analytics event on the first interaction.
 */
function LazyDemo({ id, children }: { id: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // Deep links (#demo-id) land on the demo instantly; mount it right away.
  const [show, setShow] = useState(
    () => typeof window !== "undefined" && window.location.hash === `#${id}`,
  );
  const engaged = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "500px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id]);

  const onEngage = () => {
    if (engaged.current) return;
    engaged.current = true;
    track("demo_engage", { demo: id });
  };

  return (
    <div ref={ref} onPointerDown={onEngage} onKeyDown={onEngage}>
      {show ? <Suspense fallback={<DemoSkeleton />}>{children}</Suspense> : <DemoSkeleton />}
    </div>
  );
}

/** Per-demo conversion link: "build this for my business". */
function DemoCta({ demo }: { demo: Demo }) {
  return (
    <a
      href="/#contact"
      data-cursor="link"
      onClick={() => track("demo_cta", { demo: demo.id })}
      className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-soft"
    >
      Build this for my business
      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

function DemoCard({ demo }: { demo: Demo }) {
  const Icon = demo.icon;
  return (
    <div id={demo.id} className="demo-card-shell scroll-mt-28 glass border-glow rounded-3xl p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold ring-1 ring-gold/20">
          <Icon size={22} strokeWidth={1.7} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold/80">{demo.eyebrow}</p>
            <span className="hidden shrink-0 rounded-full border border-cream/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-dark sm:inline">
              {catLabel(demo.category)}
            </span>
          </div>
          <h2 className="mt-1 text-2xl text-cream sm:text-[1.7rem]">{demo.title}</h2>
          <p className="mt-2 text-sm text-muted">{demo.blurb}</p>
        </div>
      </div>
      <div className="mt-6">
        <LazyDemo id={demo.id}>{demo.node}</LazyDemo>
      </div>
      <DemoCta demo={demo} />
    </div>
  );
}

const PIPELINE: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: FileSpreadsheet, title: "Your leads", text: "Connect the Google Sheet, Excel, or CRM your contacts already live in — no migration." },
  { icon: Sparkles, title: "AI personalizes", text: "Every lead gets a unique, on-brand opener with their name, interest and city woven in." },
  { icon: Send, title: "Sent on WhatsApp", text: "Delivered through the official WhatsApp Business API with your pre-approved templates." },
  { icon: Inbox, title: "AI handles replies", text: "Two-way — the AI answers questions, qualifies, and books, then hands you a warm lead. Status synced to your CRM." },
];

function ProductionPipeline() {
  return (
    <div className="relative mt-8 border-t border-cream/10 pt-7">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold/80">How it works in production</p>
      <h3 className="mt-1.5 text-lg text-cream sm:text-xl">From your spreadsheet to their WhatsApp — on autopilot</h3>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PIPELINE.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="relative rounded-2xl border border-cream/10 bg-ink-deep/40 p-4">
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/20">
                  <Icon size={17} strokeWidth={1.7} />
                </span>
                <span className="font-mono text-[11px] text-muted-dark">0{i + 1}</span>
              </div>
              <h4 className="mt-3 text-sm font-semibold text-cream">{s.title}</h4>
              <p className="mt-1 text-[12.5px] leading-snug text-muted">{s.text}</p>
              {i < PIPELINE.length - 1 && (
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="absolute -right-[11px] top-1/2 hidden -translate-y-1/2 text-gold/50 lg:block"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-dark">
          <ShieldCheck size={15} className="mt-px shrink-0 text-gold/70" />
          Runs on the <span className="text-cream-dim">official WhatsApp Business Cloud API</span> — opt-in contacts,
          Meta-approved templates, billed per conversation. Built for you in days, wired into the tools you already use.
        </p>
        <a
          href="/#contact"
          data-cursor="link"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition-colors hover:bg-gold-soft"
        >
          Book your free audit
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

const FLAGSHIP_FAQ = [
  {
    q: "Will my WhatsApp number get banned?",
    a: "No. It runs on the official WhatsApp Business Cloud API with Meta-approved templates and opt-in contacts — the compliant route, not a grey-market blaster.",
  },
  {
    q: "Isn't this just spam?",
    a: "Only people who opted in get messaged, every message is personalized 1:1, and opting out is one tap. It reads like a person because the AI writes for each lead.",
  },
  {
    q: "What does it cost to run?",
    a: "You pay Meta a small per-conversation fee (cents, not dirhams). The build itself is a one-off — I'll scope it precisely in your free audit.",
  },
  {
    q: "How fast can it go live?",
    a: "Once your WhatsApp number is verified with Meta, a working pilot runs in days, not months.",
  },
];

function FlagshipFAQ() {
  return (
    <div className="relative mt-8 border-t border-cream/10 pt-7">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold/80">Questions you're probably asking</p>
      <div className="mt-4 flex flex-col gap-2">
        {FLAGSHIP_FAQ.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-cream/10 bg-ink-deep/40 px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-cream [&::-webkit-details-marker]:hidden">
              {f.q}
              <ChevronDown size={16} className="shrink-0 text-gold/70 transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

function FeaturedDemo({ demo }: { demo: Demo }) {
  const Icon = demo.icon;
  return (
    <Reveal>
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[26px] border border-gold/30 bg-[linear-gradient(180deg,rgba(218,164,66,0.10),rgba(218,164,66,0.02)_40%,transparent)] p-6 shadow-[0_40px_120px_-50px_rgba(218,164,66,0.55)] sm:p-9">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/20 blur-3xl" />
        <span className="relative inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-deep">
          <Sparkles size={12} /> Flagship offer
        </span>
        <div className="relative mt-5 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold ring-1 ring-gold/30">
            <Icon size={24} strokeWidth={1.7} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold/80">{demo.eyebrow}</p>
            <h2 className="mt-1.5 text-2xl leading-tight text-cream sm:text-[2rem]">{demo.title}</h2>
            <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-muted">{demo.blurb}</p>
          </div>
        </div>
        <div className="relative mt-7">
          <LazyDemo id={demo.id}>{demo.node}</LazyDemo>
        </div>
        <ProductionPipeline />
        <FlagshipFAQ />
        <div className="relative">
          <DemoLeadCapture
            demo="whatsapp"
            prompt="Want this running on your lead list?"
            sub="Drop your WhatsApp or email and I'll show you exactly what it takes to set up for your business — free."
          />
        </div>
      </div>
    </Reveal>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <m.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-gold text-ink-deep shadow-[0_10px_30px_-12px_rgba(218,164,66,0.8)]"
          : "border border-cream/12 bg-cream/5 text-cream-dim hover:border-gold/40 hover:text-gold"
      }`}
    >
      {children}
    </m.button>
  );
}

const CAT_IDS = new Set<string>(CATEGORIES.map((c) => c.id));

/** Initial filter from ?cat= so filtered views are shareable/deep-linkable. */
function initialFilter(): CatId | "all" {
  if (typeof window === "undefined") return "all";
  const cat = new URLSearchParams(window.location.search).get("cat");
  return cat && CAT_IDS.has(cat) ? (cat as CatId) : "all";
}

export default function Demos() {
  const [filter, setFilterState] = useState<CatId | "all">(initialFilter);
  const [query, setQuery] = useState("");
  const featured = DEMOS.find((d) => d.featured);
  const rest = DEMOS.filter((d) => !d.featured);
  const q = query.trim().toLowerCase();
  const visible = rest.filter(
    (d) =>
      (filter === "all" || d.category === filter) &&
      (q === "" ||
        d.title.toLowerCase().includes(q) ||
        d.blurb.toLowerCase().includes(q) ||
        d.eyebrow.toLowerCase().includes(q)),
  );

  // Keep ?cat= in the URL in sync (shareable) and report filter usage.
  const setFilter = (next: CatId | "all") => {
    setFilterState(next);
    track("ai_lab_filter", { category: next });
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (next === "all") url.searchParams.delete("cat");
      else url.searchParams.set("cat", next);
      window.history.replaceState(null, "", url);
    }
  };

  return (
    <>
      <section id="top" className="studio-reference-page studio-reference-section studio-grain relative overflow-hidden pt-36 pb-12 sm:pt-44 sm:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-10 -z-10 h-96 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(218,164,66,0.13),transparent_68%)]"
        />
        <div className="container-bl relative z-10">
          <m.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-3xl text-center">
            <m.span
              variants={fadeUp}
              className="studio-reference-eyebrow mx-auto"
            >
              AI LAB - {DEMOS.length} TOOLS
            </m.span>
            <m.h1
              variants={fadeUp}
              className="mt-7 text-5xl font-semibold leading-[0.98] tracking-tight text-[color:var(--studio-cream)] sm:text-6xl md:text-7xl"
            >
              Try the AI. <span className="studio-accent">Not just read about it.</span>
            </m.h1>
            <m.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-[color:var(--studio-cream-dim)]">
              Practical AI tools for real business workflows. Type into them and see what useful AI can do inside sales, service, content, operations, and reporting work.
            </m.p>
            <m.p variants={fadeUp} className="mx-auto mt-3 font-pixel text-[11px] uppercase text-[color:var(--studio-muted)]">
              Practical demos - No sign-up - Your input isn't stored
            </m.p>
          </m.div>
        </div>
      </section>

      {/* flagship offer */}
      {featured && (
        <section className="pb-12">
          <div className="container-bl">
            <FeaturedDemo demo={featured} />
          </div>
        </section>
      )}

      {/* category filter */}
      <section className="pb-2">
        <div className="container-bl">
          <Reveal>
            <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-dark">
              And {rest.length} more live tools
            </p>
          </Reveal>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
              All <span className="opacity-50">{rest.length}</span>
            </FilterPill>
            {CATEGORIES.map((c) => {
              const n = rest.filter((d) => d.category === c.id).length;
              return (
                <FilterPill key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
                  {c.label} <span className="opacity-50">{n}</span>
                </FilterPill>
              );
            })}
          </div>
          <div className="mx-auto mt-5 max-w-md">
            <label htmlFor="ai-lab-search" className="sr-only">
              Search the AI Lab tools
            </label>
            <div className="relative">
              <Search
                size={16}
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-dark"
              />
              <input
                id="ai-lab-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools — e.g. WhatsApp, Arabic, invoice…"
                className="w-full rounded-full border border-cream/12 bg-cream/5 py-2.5 pl-11 pr-4 text-sm text-cream placeholder:text-muted-dark focus:border-gold/50 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-6 pb-8">
        <div className="container-bl">
          {visible.length === 0 && (
            <div className="mx-auto max-w-md rounded-3xl border border-cream/10 bg-ink-deep/40 p-8 text-center">
              <p className="text-cream">No tools match “{query.trim()}”.</p>
              <p className="mt-2 text-sm text-muted">
                Try another word — or{" "}
                <a href="/#contact" className="text-gold underline underline-offset-2 hover:text-gold-soft">
                  tell me what you need
                </a>{" "}
                and I'll build it.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}
                className="mt-5 rounded-full border border-cream/12 bg-cream/5 px-4 py-2 text-sm text-cream-dim transition-colors hover:border-gold/40 hover:text-gold"
              >
                Clear search
              </button>
            </div>
          )}
          {/* keyed by filter so the list re-staggers in on each change */}
          <m.div
            key={filter}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mx-auto flex max-w-3xl flex-col gap-6"
          >
            {visible.map((demo) => (
              <m.div key={demo.id} variants={fadeUp}>
                <DemoCard demo={demo} />
              </m.div>
            ))}
          </m.div>

          <Reveal>
            <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-gold/20 bg-[linear-gradient(180deg,rgba(218,164,66,0.08),transparent)] p-8 text-center sm:p-10">
              <h2 className="text-2xl text-cream sm:text-3xl">Like one of these? Let's build yours.</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted">
                Every tool here is live and real — and I tune them to your business, your data, and your
                tone, then wire them into what you already use.
              </p>
              <a
                href="/#contact"
                data-cursor="link"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink-deep shadow-[0_14px_50px_-18px_rgba(218,164,66,0.8)] transition-colors hover:bg-gold-soft"
              >
                Book your free audit
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Contact />
    </>
  );
}
