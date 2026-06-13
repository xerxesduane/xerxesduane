import { m } from "framer-motion";
import { ArrowUpRight, Bot, Send, Search, Sparkles } from "lucide-react";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import Reveal from "./ui/Reveal";

const demos = [
  {
    icon: Bot,
    label: "Website assistant",
    text: "Answers customers and qualifies leads in your tone, around the clock.",
  },
  {
    icon: Send,
    label: "WhatsApp outreach",
    text: "Writes a personal opener for every lead, then sends the whole list.",
  },
  {
    icon: Search,
    label: "Content & SEO",
    text: "Captions, review replies, and search metadata — drafted in seconds.",
  },
];

export default function AILabPreview() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28" aria-labelledby="ai-lab-heading">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_50%_45%_at_50%_0%,rgba(218,164,66,0.13),transparent_70%)]" />
      <div className="container-bl">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-gold">
              <Sparkles size={14} />
              Xerxes Duane AI Lab
            </span>
            <h2 id="ai-lab-heading" className="mt-5 text-4xl leading-tight sm:text-5xl">
              Try the AI. <span className="text-gradient-gold italic">Not just read about it.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              A whole toolkit of live, working tools — the exact assistants, WhatsApp automations, and
              content engines I install for clients. What you type here is what your customers would get.
            </p>
            <a
              href="/ai-lab"
              data-cursor="link"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink-deep shadow-[0_14px_50px_-18px_rgba(218,164,66,0.8)] transition-colors hover:bg-gold-soft"
            >
              Enter the AI Lab
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>

          <m.div variants={stagger} initial="hidden" whileInView="show" viewport={VIEWPORT} className="grid gap-3 sm:grid-cols-3">
            {demos.map((demo, index) => {
              const Icon = demo.icon;
              return (
                <m.a
                  key={demo.label}
                  href="/ai-lab"
                  variants={fadeUp}
                  data-cursor="view"
                  className="glass glass-hover group relative flex min-h-56 flex-col overflow-hidden rounded-2xl p-5"
                >
                  <span className="absolute right-4 top-4 font-mono text-[10px] text-muted-dark">{String(index + 1).padStart(2, "0")}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/20 transition-colors group-hover:bg-gold group-hover:text-ink">
                    <Icon size={19} />
                  </span>
                  <h3 className="mt-8 text-lg text-cream transition-colors group-hover:text-gold">{demo.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{demo.text}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-mono text-[10px] uppercase tracking-wider text-gold">
                    Try live <ArrowUpRight size={11} />
                  </span>
                </m.a>
              );
            })}
          </m.div>
        </div>
      </div>
    </section>
  );
}
