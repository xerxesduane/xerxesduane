import { m } from "framer-motion";
import { RESULTS } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

// Outcome proof, led with like both reference sites: a real metric welded to a
// named client, rendered as a large gold Space Mono numeral. Figures that need
// Xerxes' sign-off render as visibly-marked placeholders — never as fake claims.
export default function ResultsBand() {
  return (
    <section className="py-20 sm:py-28" aria-label="Real results from real projects">
      <div className="container-bl">
        <SectionHeading
          eyebrow="Results, not adjectives"
          title={
            <>
              Real numbers from <span className="text-gradient-gold">real projects.</span>
            </>
          }
          subtitle="A few outcomes from work I've delivered. Where a figure still needs my sign-off it's marked as a placeholder — I don't publish invented metrics."
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-12 grid max-w-content grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3"
        >
          {RESULTS.map((r, i) => (
            <m.div
              key={i}
              variants={fadeUp}
              className={`rounded-2xl border p-5 sm:p-6 ${
                r.placeholder ? "border-dashed border-gold/25 bg-transparent" : "border-cream/10 bg-ink-surface/60"
              }`}
            >
              <p className={`font-mono text-3xl tabular-nums sm:text-4xl ${r.placeholder ? "text-gold/40" : "text-gold"}`}>
                {r.value}
              </p>
              <p className="mt-2 text-sm leading-snug text-cream-dim">{r.label}</p>
              <p className="mt-3 border-t border-cream/10 pt-2 text-xs">
                <span className={r.placeholder ? "text-muted-dark" : "text-gold/80"}>{r.client}</span>
                <span className="mt-0.5 block text-muted-dark">{r.context}</span>
              </p>
              {r.placeholder && (
                <p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-gold/50">Placeholder · add real data</p>
              )}
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
