import { useState } from "react";
import { m } from "framer-motion";
import { Bot, UserRoundCheck, FileSearch, Braces, Languages, Send, Star, Sparkles, CornerDownLeft, Search, ListChecks, FileSpreadsheet, Inbox, ArrowRight, ShieldCheck, Headset, ReceiptText, Megaphone, ShoppingBag, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Kinetic from "../components/fx/Kinetic";
import Reveal from "../components/ui/Reveal";
import Contact from "../components/Contact";
import DemoChat from "../components/demos/DemoChat";
import DemoAsk from "../components/demos/DemoAsk";
import DemoExtract from "../components/demos/DemoExtract";
import DemoTranslate from "../components/demos/DemoTranslate";
import DemoWhatsApp from "../components/demos/DemoWhatsApp";
import DemoReview from "../components/demos/DemoReview";
import DemoReply from "../components/demos/DemoReply";
import DemoSocial from "../components/demos/DemoSocial";
import DemoSeo from "../components/demos/DemoSeo";
import DemoSummarize from "../components/demos/DemoSummarize";
import DemoLeadCapture from "../components/demos/DemoLeadCapture";
import DemoQuote from "../components/demos/DemoQuote";
import DemoAds from "../components/demos/DemoAds";
import DemoProduct from "../components/demos/DemoProduct";
import { fadeUp, stagger } from "../lib/motion";

type CatId = "convert" | "comms" | "create" | "automate";

const CATEGORIES: { id: CatId; label: string }[] = [
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
];

function catLabel(id: CatId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? "";
}

function DemoCard({ demo }: { demo: Demo }) {
  const Icon = demo.icon;
  return (
    <div className="glass border-glow rounded-3xl p-6 sm:p-8">
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
      <div className="mt-6">{demo.node}</div>
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
          Book a free automation audit
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
        <div className="relative mt-7">{demo.node}</div>
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

export default function Demos() {
  const [filter, setFilter] = useState<CatId | "all">("all");
  const featured = DEMOS.find((d) => d.featured);
  const rest = DEMOS.filter((d) => !d.featured);
  const visible = filter === "all" ? rest : rest.filter((d) => d.category === filter);

  return (
    <>
      <section id="top" className="relative overflow-hidden pt-36 pb-10 sm:pt-44 sm:pb-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-10 -z-10 h-96 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(218,164,66,0.13),transparent_68%)]"
        />
        <div className="container-bl">
          <m.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-3xl text-center">
            <m.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-gold"
            >
              Live AI lab · {DEMOS.length} tools
            </m.span>
            <Kinetic as="h1" className="mt-7 text-4xl leading-[1.06] sm:text-5xl md:text-6xl">
              Try the AI. <span className="text-gradient-gold italic">Not just read about it.</span>
            </Kinetic>
            <m.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              {DEMOS.length} real, working tools — the same AI I build into client products. Powered by Llama 3
              on Groq, running live. Type into them, they respond for real.
            </m.p>
            <m.p variants={fadeUp} className="mx-auto mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-dark">
              Nothing here is canned · No sign-up · Your input isn't stored
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
        </div>
      </section>

      <section className="pt-6 pb-8">
        <div className="container-bl">
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
            <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-dark">
              Like one of these? I build them tuned to your business, your data, and your tone —
              then wire them into the tools you already use.{" "}
              <a href="/#contact" className="text-gold underline decoration-gold/50 underline-offset-2 hover:text-gold-soft">
                Book a free audit →
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <Contact />
    </>
  );
}
