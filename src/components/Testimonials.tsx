import { m } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28" aria-label="Client testimonials">
      <div className="container-bl">
        <SectionHeading
          eyebrow="In their words"
          title={
            <>
              Trusted by the people <span className="text-gradient-gold">we've worked with.</span>
            </>
          }
          subtitle="No vanity metrics here, just what it's actually like to work together."
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-14 grid gap-4 md:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <m.figure
              key={t.name}
              variants={fadeUp}
              className="glass glass-hover flex flex-col rounded-2xl p-6"
            >
              <Quote size={22} className="text-gold/50" strokeWidth={1.8} aria-hidden />
              <div className="mt-3 flex items-center gap-0.5 text-gold" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-cream-dim">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-cream/10 pt-4">
                <div className="font-display text-base text-cream">{t.name}</div>
                <div className="text-sm text-muted">{t.role}</div>
                <div className="mt-0.5 font-mono text-xs uppercase tracking-wider text-gold/70">
                  {t.context}
                </div>
              </figcaption>
            </m.figure>
          ))}
        </m.div>
      </div>
    </section>
  );
}
