import { useState } from "react";
import { ArrowUpRight, Clapperboard, Grid2X2, LayoutTemplate, Palette, Star } from "lucide-react";
import WorkGallery from "../components/WorkGallery";
import Contact from "../components/Contact";
import PageHeader from "../components/page/PageHeader";
import { GhostAction, PrimaryAction } from "../components/page/PageActions";
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
      <PageHeader
        eyebrow="Portfolio · web & design"
        title={<>Work that looks the part and does the job.</>}
        lede="Websites and brand &amp; graphic design for businesses across the UAE and beyond. Tap any piece to view it full size."
        actions={
          <>
            <PrimaryAction href="/case-studies">Case studies</PrimaryAction>
            <GhostAction href="/showreel" icon={<Clapperboard size={15} aria-hidden />}>
              Showreel
            </GhostAction>
          </>
        }
      />

      <section id="work" className="scroll-mt-24 py-8">
        <a
          href="/case-studies"
          className="group mb-5 flex flex-col justify-between gap-4 rounded-card border border-accent/25 bg-accent/[0.07] p-5 transition-colors hover:border-accent/50 sm:flex-row sm:items-center"
        >
          <div>
            <span className="font-technical text-[0.62rem] font-bold uppercase tracking-[0.16em] text-accent">Looking for outcomes, not only visuals?</span>
            <p className="mt-2 text-sm text-fg-soft">Read the challenge, approach, delivery scope, and results behind selected projects.</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">
            View case studies <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
        <div className="sticky top-4 z-20 mb-6 rounded-card border border-line bg-panel/95 p-2 shadow-card backdrop-blur-sm">
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
