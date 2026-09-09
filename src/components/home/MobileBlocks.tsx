import { m } from "framer-motion";
import { ArrowRight, Trophy } from "lucide-react";
import ResultCard from "./ResultCard";
import Counter from "../ui/Counter";
import { STATS } from "../../data/content";
import { FEATURED_RESULTS } from "../../data/homeBento";
import { fadeUp, stagger, VIEWPORT } from "../../lib/motion";

/* ---------------------------------------------------------------------------
 * The two pieces the phone composition pulls out of the bento board.
 *
 * On a phone the board becomes a horizontally snapped Explore rail, which is a
 * poor home for a four-figure stat grid or for outcome cards that want their
 * full width. Those two panels are hidden from the rail below `sm` and these
 * blocks take their place — both read the same data, so there is one set of
 * numbers on the site regardless of viewport.
 * ------------------------------------------------------------------------- */

/** Compact proof row: the same four figures as the Experience card. */
export function MobileProof() {
  return (
    <m.dl
      variants={stagger}
      initial="hidden"
      animate="show"
      aria-label="Experience at a glance"
      className="mb-4 grid grid-cols-2 gap-2 sm:hidden"
    >
      {STATS.map((stat) => (
        <m.div
          key={stat.label}
          variants={fadeUp}
          className="rounded-xl border border-line bg-panel px-3 py-2.5 shadow-card"
        >
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <span className="block font-display text-[1.35rem] font-extrabold leading-none tracking-tight text-fg">
              <Counter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="mt-1 block text-[0.7rem] leading-tight text-fg-soft">
              {stat.label}
            </span>
          </dd>
        </m.div>
      ))}
    </m.dl>
  );
}

/** Featured results, stacked full width beneath the Explore rail. */
export function MobileResults() {
  return (
    <m.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      aria-label="Featured results"
      className="mt-4 sm:hidden"
    >
      <m.div variants={fadeUp} className="mb-2.5 flex items-center gap-2.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[0.8rem] bg-accent text-accent-ink">
          <Trophy size={18} strokeWidth={2.2} aria-hidden />
        </span>
        <h2 className="font-display text-card font-extrabold uppercase tracking-[0.045em] text-fg">
          Featured results
        </h2>
      </m.div>
      <ul className="flex flex-col gap-2.5">
        {FEATURED_RESULTS.slice(0, 2).map((result) => (
          <m.li key={result.slug} variants={fadeUp}>
            <ResultCard result={result} />
          </m.li>
        ))}
      </ul>
      <m.a
        variants={fadeUp}
        href="/case-studies"
        className="mt-3 inline-flex items-center gap-1.5 text-[0.85rem] font-bold text-accent-deep"
      >
        All case studies
        <ArrowRight size={14} strokeWidth={2.6} aria-hidden className="rtl-flip" />
      </m.a>
    </m.section>
  );
}
