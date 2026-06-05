import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FEATURED_WORK } from "../data/workItems";
import { scaleIn, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

/** Curated teaser of portfolio work on the home page. Links to /portfolio. */
export default function SelectedWork() {
  if (FEATURED_WORK.length === 0) return null;

  return (
    <section id="selected-work" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-bl">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              A look at the <span className="text-gradient-gold">craft.</span>
            </>
          }
          subtitle="Web designs and brand & graphic work, a small sample. The full galleries and showreel sit on the portfolio."
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {FEATURED_WORK.slice(0, 8).map((it) => (
            <m.a
              key={it.src}
              href="/portfolio"
              variants={scaleIn}
              aria-label={`See ${it.title}`}
              className="glass glass-hover group block aspect-[4/5] overflow-hidden rounded-xl"
            >
              <img
                src={it.thumb}
                alt={it.title}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-500 ease-smooth group-hover:scale-105"
              />
            </m.a>
          ))}
        </m.div>

        <div className="mt-10 flex justify-center">
          <a
            href="/portfolio"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-cream/15 px-7 py-3.5 text-sm font-semibold text-cream transition duration-300 hover:border-gold/50 hover:text-gold"
          >
            See all work
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
