import { useState } from "react";
import { m } from "framer-motion";
import { Bot, UserRoundCheck, FileSearch, Braces, Languages, Send, Star, Sparkles, CornerDownLeft, Search, ListChecks } from "lucide-react";
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
    id: "whatsapp",
    category: "convert",
    icon: Send,
    eyebrow: "Outreach on autopilot",
    title: "WhatsApp outreach, personalized by AI",
    blurb: "Point it at your contact leads and it writes a unique, on-brand WhatsApp opener for each one — then sends the whole list while you sleep.",
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
  const visible = filter === "all" ? DEMOS : DEMOS.filter((d) => d.category === filter);

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
              Live AI lab · 11 tools
            </m.span>
            <Kinetic as="h1" className="mt-7 text-4xl leading-[1.06] sm:text-5xl md:text-6xl">
              Try the AI. <span className="text-gradient-gold italic">Not just read about it.</span>
            </Kinetic>
            <m.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              Eleven real, working tools — the same AI I build into client products. Powered by Llama 3
              on Groq, running live. Type into them, they respond for real.
            </m.p>
            <m.p variants={fadeUp} className="mx-auto mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-dark">
              Nothing here is canned · No sign-up · Your input isn't stored
            </m.p>
          </m.div>
        </div>
      </section>

      {/* category filter */}
      <section className="pb-2">
        <div className="container-bl">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
              All <span className="opacity-50">{DEMOS.length}</span>
            </FilterPill>
            {CATEGORIES.map((c) => {
              const n = DEMOS.filter((d) => d.category === c.id).length;
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
