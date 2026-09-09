import { useState } from "react";
import { m } from "framer-motion";
import { ArrowUpRight, Clapperboard, Grid2X2, LayoutTemplate, Palette, Star } from "lucide-react";
import Kinetic from "../components/fx/Kinetic";
import WorkGallery from "../components/WorkGallery";
import Contact from "../components/Contact";
import { fadeUp, stagger } from "../lib/motion";
import { WORK_ITEMS } from "../data/workItems";

type PortfolioFilter = "all" | "web" | "graphic" | "featured";
const INITIAL_ITEMS = 12;

const FILTERS: {
  id: PortfolioFilter;
  label: string;
  icon: typeof Grid2X2;
}[] = [
  { id: "all", label: "All work", icon: Grid2X2 },
  { id: "web", label: "Websites & commerce", icon: LayoutTemplate },
  { id: "graphic", label: "Brand & content", icon: Palette },
  { id: "featured", label: "Launch & growth", icon: Star },
];

export default function Portfolio() {
  const [filter, setFilter] = useState<PortfolioFilter>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS);
  const filteredItems = WORK_ITEMS.filter((item) => {
    if (filter === "all") return true;
    if (filter === "featured") return item.featured;
    return item.category === filter;
  });
  const visibleItems = filteredItems.slice(0, visibleCount);

  return (
    <>
      <section className="container-bl scroll-mt-24 pb-12">
        <m.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <m.span variants={fadeUp} className="eyebrow justify-center">
            <span className="h-px w-6 bg-gold/60" aria-hidden />
            Portfolio · web &amp; design
          </m.span>
          <Kinetic as="h1" className="mt-5 text-4xl sm:text-5xl md:text-6xl">
            Work that looks the part{" "}
            <span className="text-gradient-gold italic">and does the job.</span>
          </Kinetic>
          <m.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            A selection of websites and brand &amp; graphic design for businesses
            across the UAE and beyond. Tap any piece to view it full size.
          </m.p>
          <m.div variants={fadeUp} className="mt-7 flex justify-center">
            <a
              href="/showreel"
              className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-gold/50 hover:text-gold"
            >
              <Clapperboard size={16} />
              Watch the video showreel
            </a>
          </m.div>
        </m.div>
      </section>

      <section id="work" className="container-bl scroll-mt-24 py-12 sm:py-16">
        <a
          href="/case-studies"
          className="group mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-gold/20 bg-gold/[0.08] p-5 transition-colors hover:border-gold/45 sm:flex-row sm:items-center"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-gold">Looking for outcomes, not only visuals?</span>
            <p className="mt-2 text-sm text-cream-dim">Read the challenge, approach, delivery scope, and results behind selected projects.</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gold">
            View case studies <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
        <div className="sticky top-24 z-20 mb-9 rounded-2xl border border-cream/10 bg-ink/95 p-2 shadow-[0_20px_70px_-35px_rgba(0,0,0,0.9)] backdrop-blur-sm">
          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
            role="group"
            aria-label="Filter portfolio"
          >
            {FILTERS.map((option) => {
              const Icon = option.icon;
              const count = WORK_ITEMS.filter((item) => {
                if (option.id === "all") return true;
                if (option.id === "featured") return item.featured;
                return item.category === option.id;
              }).length;
              const active = filter === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setFilter(option.id);
                    setVisibleCount(INITIAL_ITEMS);
                  }}
                  className={`flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition duration-300 ${
                    active
                      ? "bg-gold text-ink shadow-[0_10px_30px_-12px_rgba(218,164,66,0.8)]"
                      : "text-muted hover:bg-cream/5 hover:text-cream"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.9} />
                  <span>{option.label}</span>
                  <span
                    className={`font-mono text-[10px] ${
                      active ? "text-ink/55" : "text-muted-dark"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-7 flex items-end justify-between gap-4" aria-live="polite">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold">
              Showing {visibleItems.length} of {filteredItems.length} pieces
            </p>
            <h2 className="mt-2 text-2xl text-cream sm:text-3xl">
              {FILTERS.find((option) => option.id === filter)?.label}
            </h2>
          </div>
          {filter !== "all" && (
            <button
              type="button"
              onClick={() => {
                setFilter("all");
                setVisibleCount(INITIAL_ITEMS);
              }}
              className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-gold"
            >
              Clear filter
            </button>
          )}
        </div>

        <WorkGallery key={filter} items={visibleItems} />
        {visibleCount < filteredItems.length && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + INITIAL_ITEMS)}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-gold/30 px-6 py-3 font-mono text-xs uppercase tracking-wider text-gold transition-colors hover:border-gold hover:bg-gold hover:text-ink"
            >
              Load more work
            </button>
          </div>
        )}
      </section>

      <section className="container-bl pb-20 sm:pb-28">
        <div className="mt-6 flex justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep shadow-[0_14px_50px_-12px_rgba(218,164,66,0.8)] transition duration-300 hover:bg-gold-soft"
          >
            Like what you see? Let's talk
            <ArrowUpRight size={17} strokeWidth={2.5} />
          </a>
        </div>
      </section>

      <Contact />
    </>
  );
}
