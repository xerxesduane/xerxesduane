import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { RESULTS } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

// Real outcomes, presented honestly and WITHOUT naming clients — the headline
// figure welded to an anonymous business category, the problem it solved, what
// actually changed, and a credibility label. Named attribution lives only in the
// logo wall. Every number is verified from real projects; none are invented.
export default function ResultsBand() {
  return (
    <section className="py-20 sm:py-28" aria-label="Real numbers from real projects">
      <div className="container-bl">
        <SectionHeading
          eyebrow="Results, not adjectives"
          title={
            <>
              Real numbers from <span className="text-gradient-gold">real projects.</span>
            </>
          }
          subtitle="Verified outcomes from delivered work — kept anonymous on purpose. The figures are real; the names stay private."
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-12 grid max-w-content gap-4 sm:gap-5 lg:grid-cols-2"
        >
          {RESULTS.map((r, i) => (
            <m.article
              key={i}
              variants={fadeUp}
              className="flex flex-col rounded-2xl border border-cream/10 bg-ink-surface/60 p-6 sm:p-7"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold/80">{r.category}</p>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-mono text-4xl leading-none text-gold tabular-nums sm:text-5xl">{r.value}</span>
                <span className="text-sm leading-snug text-cream-dim">{r.label}</span>
              </div>

              <p className="mt-4 text-sm text-muted">
                <span className="text-muted-dark">Before — </span>
                {r.problem}
              </p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-cream-dim">{r.whatChanged}</p>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-cream/10 pt-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">{r.proof}</span>
                <a
                  href={r.serviceHref}
                  data-cursor="link"
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold text-gold transition-colors hover:text-gold-soft"
                >
                  See the service
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </m.article>
          ))}
        </m.div>

        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-10 max-w-xl text-center text-sm text-muted"
        >
          Want numbers like these for your business?{" "}
          <a href="/#contact" data-cursor="link" className="font-semibold text-gold transition-colors hover:text-gold-soft">
            Book your free audit →
          </a>
        </m.p>
      </div>
    </section>
  );
}
