import { m } from "framer-motion";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import { AI_LAB_CARDS, AI_LAB_TRUST } from "../data/aiLabHome";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";

export default function AILabPreview() {
  return (
    <section id="ai-lab" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28" aria-label="AI Labs — try working AI before you hire me">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_50%_45%_at_50%_0%,rgba(218,164,66,0.13),transparent_70%)]"
      />
      <div className="container-bl">
        <SectionHeading
          eyebrow="AI Labs"
          title={
            <>
              Try working AI <span className="text-gradient-gold italic">before you hire me.</span>
            </>
          }
          subtitle="Most Dubai businesses don't need AI as a buzzword. They need faster replies, cleaner quotes, fewer missed WhatsApp leads, better customer follow-up, and systems that finally talk to each other. The AI Lab shows what that looks like in practice."
        />

        {/* six business-outcome cards, each a live demo */}
        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {AI_LAB_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <m.a
                key={card.demoId}
                href={`/ai-lab#${card.demoId}`}
                variants={fadeUp}
                data-cursor="view"
                className="glass glass-hover group relative flex flex-col overflow-hidden rounded-2xl p-6 outline-offset-4"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/20 transition-colors group-hover:bg-gold group-hover:text-ink">
                  <Icon size={19} strokeWidth={1.8} aria-hidden />
                </span>

                <h3 className="mt-5 text-lg text-cream transition-colors group-hover:text-gold">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{card.problem}</p>
                <p className="mt-2 text-sm leading-relaxed text-cream-dim">{card.whatItDoes}</p>

                <p className="mt-4 border-t border-cream/8 pt-4 font-mono text-[11px] leading-relaxed text-muted-dark">
                  <span className="text-gold/70">Try it with:</span> {card.example}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-gold">
                  {card.cta}
                  <ArrowUpRight
                    size={12}
                    strokeWidth={2.2}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </m.a>
            );
          })}
        </m.div>

        {/* trust row */}
        <m.ul
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center font-mono text-xs uppercase tracking-wider text-muted-dark"
        >
          {AI_LAB_TRUST.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <span aria-hidden className="h-1 w-1 rounded-full bg-gold/60" />
              {point}
            </li>
          ))}
        </m.ul>

        {/* CTAs */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button href="/ai-lab" className="w-full sm:w-auto">
            Enter the AI Lab
            <ArrowUpRight size={16} strokeWidth={2.4} />
          </Button>
          <Button variant="ghost" href="#contact" className="w-full sm:w-auto">
            Book a free systems audit
          </Button>
        </m.div>

        {/* privacy/trust + disclaimer */}
        <p className="mx-auto mt-6 flex max-w-xl items-start justify-center gap-2 text-center text-xs leading-relaxed text-muted-dark">
          <ShieldCheck size={14} className="mt-0.5 shrink-0 text-gold/60" aria-hidden />
          These tools are demos, not legal, tax, or compliance advice. Nothing you type is stored — for
          sensitive business data, use sample information only.
        </p>
      </div>
    </section>
  );
}
