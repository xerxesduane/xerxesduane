import { m } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { CASE_STUDIES } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

export default function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-bl">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Real businesses. <span className="text-gradient-gold">Quiet wins.</span>
            </>
          }
          subtitle="From full Odoo deployments to ad campaigns that pay for themselves, a sample of recent work across the UAE, the Philippines, and beyond."
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-14 grid gap-5 lg:grid-cols-2"
        >
          {CASE_STUDIES.map((c) => (
            <m.article
              key={c.client}
              variants={fadeUp}
              className="glass glass-hover flex flex-col rounded-3xl p-7 sm:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-gold/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-gold">
                  {c.category}
                </span>
                <span className="font-mono text-xs text-muted-dark">
                  {c.location}
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl text-cream sm:text-3xl">
                {c.client}
              </h3>
              <p className="mt-3 text-sm text-muted">{c.challenge}</p>

              {c.stats && (
                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {c.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-cream/8 bg-ink-deep/40 p-3 text-center"
                    >
                      <div className="font-mono text-xl font-semibold text-gold sm:text-2xl">
                        {s.value}
                      </div>
                      <div className="mt-1 text-[11px] leading-tight text-muted">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {c.scope && (
                <ul className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {c.scope.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-cream-dim"
                    >
                      <Check size={15} className="shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-6 flex items-center gap-2 border-t border-cream/8 pt-5 font-display text-base italic text-cream-dim">
                <ArrowUpRight size={16} className="text-gold" />
                {c.takeaway}
              </p>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
