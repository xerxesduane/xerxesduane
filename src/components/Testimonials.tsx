import { m } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

// Real client voice is the strongest proof there is — and the one thing the site
// was missing. These render from TESTIMONIALS; until Xerxes drops in real,
// attributable quotes they show as visibly-marked placeholders (no invented words).
export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28" aria-label="What clients say">
      <div className="container-bl">
        <SectionHeading
          eyebrow="In their words"
          title={
            <>
              What working together <span className="text-gradient-gold">feels like.</span>
            </>
          }
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-12 grid max-w-content gap-4 sm:gap-5 md:grid-cols-3"
        >
          {TESTIMONIALS.map((t, i) => (
            <m.figure
              key={i}
              variants={fadeUp}
              className={`flex flex-col rounded-2xl border p-6 ${
                t.placeholder ? "border-dashed border-cream/15" : "border-cream/10 bg-ink-surface/60"
              }`}
            >
              <Quote size={20} className="text-gold/60" aria-hidden />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-cream-dim">“{t.quote}”</blockquote>
              <figcaption className="mt-4 border-t border-cream/10 pt-3">
                <p className="text-sm font-semibold text-cream">{t.name}</p>
                <p className="text-xs text-muted">
                  {t.business} · {t.sector}
                </p>
                {t.placeholder && (
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-gold/50">
                    Placeholder · add a real quote
                  </p>
                )}
              </figcaption>
            </m.figure>
          ))}
        </m.div>
      </div>
    </section>
  );
}
