import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FEATURED_WORK } from "../data/workItems";
import { scaleIn, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import Parallax from "./fx/Parallax";

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
          {FEATURED_WORK.slice(0, 8).map((it, index) => (
            <m.a
              key={it.src}
              href="/portfolio"
              variants={scaleIn}
              aria-label={`See ${it.title}`}
              data-cursor="view"
              className={`glass glass-hover group relative block overflow-hidden rounded-xl ${
                index === 0
                  ? "col-span-2 aspect-video"
                  : "aspect-[4/5]"
              }`}
            >
              <Parallax range={14} className="h-full w-full">
                <img
                  src={it.thumb}
                  alt={it.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 ease-smooth group-hover:scale-105"
                />
              </Parallax>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-deep/95 via-ink-deep/5 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                  {it.label}
                </span>
                <p className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-cream sm:text-base">
                  {it.title}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-cream-dim opacity-0 transition duration-300 group-hover:opacity-100">
                  View portfolio
                  <ArrowUpRight size={11} strokeWidth={2.4} />
                </span>
              </div>
            </m.a>
          ))}
        </m.div>

        <div className="mt-10 flex justify-center">
          <Button variant="ghost" href="/portfolio" className="px-7 py-3.5">
            See all work
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </section>
  );
}
