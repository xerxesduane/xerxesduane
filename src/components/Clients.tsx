import { m } from "framer-motion";
import { ENGAGEMENTS } from "../data/content";
import { scaleIn, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

export default function Clients() {
  return (
    <section className="py-20 sm:py-28" aria-label="Delivered engagements">
      <div className="container-bl">
        <SectionHeading
          eyebrow="Engagements"
          title={
            <>
              The work, and what it{" "}
              <span className="text-gradient-gold">changed.</span>
            </>
          }
          subtitle="Delivered engagements across the UAE, New Zealand, and the Philippines. Client names stay private; the work and the numbers do not."
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ENGAGEMENTS.map((e) => (
            <m.article
              key={e.sector}
              variants={scaleIn}
              className="glass glass-hover flex flex-col rounded-2xl p-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/80">
                {e.sector}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-cream-dim">
                {e.delivered}
              </p>
              {e.kpi && (
                <p className="mt-4 border-t border-cream/8 pt-4 font-display text-base text-gold">
                  {e.kpi}
                </p>
              )}
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
