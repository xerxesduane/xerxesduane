import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HERO } from "../../data/homeBento";
import { fadeUp, stagger } from "../../lib/motion";

/**
 * Oversized headline with the contact button pulled to the upper right, so the
 * two anchor opposite corners of the content column the way the reference does.
 */
export default function HeroBlock() {
  return (
    <m.header variants={stagger} initial="hidden" animate="show" className="mb-4">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <m.h1
          variants={fadeUp}
          className="max-w-[16ch] text-balance font-display text-hero font-semibold text-fg"
        >
          {HERO.headline}
        </m.h1>

        <m.a
          variants={fadeUp}
          href={HERO.ctaHref}
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-navy px-5 py-3 text-sm font-semibold text-fg-onSolid shadow-solid transition duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-navy-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          {HERO.ctaLabel}
          <ArrowUpRight
            size={17}
            strokeWidth={2.2}
            aria-hidden
            className="text-accent transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </m.a>
      </div>

      <m.p
        variants={fadeUp}
        className="mt-3 max-w-[62ch] text-[0.95rem] leading-relaxed text-fg-soft"
      >
        {HERO.subhead}
      </m.p>
    </m.header>
  );
}
