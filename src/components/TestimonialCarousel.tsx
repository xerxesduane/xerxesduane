import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useInViewAnimation, { fadeClass } from "../hooks/useInViewAnimation";
import { RESULTS } from "../data/content";

/**
 * Reference carousel mechanics, but the cards are REAL proof from delivered
 * projects (RESULTS in content.ts) — the repo has no attributable client
 * quotes yet, so nothing here pretends to be a testimonial.
 */

interface ProofCard {
  quote: string;
  name: string;
  role: string;
  badge: string;
  proof: string;
}

const CARDS: ProofCard[] = RESULTS.map((r) => ({
  quote: `${r.value} ${r.label} — ${r.whatChanged}`,
  name: r.category,
  role: r.problem,
  badge: r.value.replace(/[^0-9→%$+.]/g, "").slice(0, 4) || "XD",
  proof: r.proof,
}));

const GAP = 24; // matches gap-6

export default function TestimonialCarousel() {
  const { ref, inView } = useInViewAnimation<HTMLElement>();
  const [index, setIndex] = useState(CARDS.length); // start in middle copy
  const [paused, setPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(427.5);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Tripled array for the infinite-scroll effect.
  const items = [...CARDS, ...CARDS, ...CARDS];

  useEffect(() => {
    const measure = () =>
      setCardWidth(window.innerWidth >= 768 ? 427.5 : window.innerWidth - 48);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => i + 1), 3000);
    return () => clearInterval(id);
  }, [paused]);

  // Snap back to the middle copy (without animation) when drifting to an edge.
  useEffect(() => {
    if (index >= CARDS.length * 2 || index < CARDS.length) {
      const t = setTimeout(() => {
        const track = trackRef.current;
        if (!track) return;
        track.style.transition = "none";
        setIndex((i) => (i >= CARDS.length * 2 ? i - CARDS.length : i + CARDS.length));
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            track.style.transition = "";
          });
        });
      }, 850);
      return () => clearTimeout(t);
    }
  }, [index]);

  return (
    <section
      ref={ref}
      aria-labelledby="studio-proof"
      className="studio-reference-page overflow-hidden bg-[#FDFCFA] px-6 py-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`mb-8 flex items-end justify-between md:ml-auto md:max-w-4xl ${fadeClass(inView)}`}
        style={{ animationDelay: "0.1s" }}
      >
        <h2
          id="studio-proof"
          className="font-studio-body text-3xl tracking-tight text-[#0D212C] md:text-4xl"
        >
          What <span className="font-studio-serif">builders</span> say
        </h2>
        <div className="flex items-center gap-4">
          <p className="font-studio-body hidden text-sm text-[#273C46] sm:block">
            Real projects · plain results
          </p>
          <button
            type="button"
            aria-label="Previous proof card"
            onClick={() => setIndex((i) => i - 1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0D212C]/20 text-[#0D212C] transition-colors hover:bg-[#0D212C]/5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next proof card"
            onClick={() => setIndex((i) => i + 1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#0D212C]/20 text-[#0D212C] transition-colors hover:bg-[#0D212C]/5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-6"
        style={{
          transform: `translateX(-${index * (cardWidth + GAP)}px)`,
          transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {items.map((card, i) => (
          <article
            key={i}
            className="shrink-0 rounded-[32px] bg-white px-6 py-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:rounded-[40px] md:pl-10 md:pr-24"
            style={{ width: cardWidth }}
            aria-hidden={i < CARDS.length || i >= CARDS.length * 2}
          >
            <svg
              aria-hidden
              width="28"
              height="22"
              viewBox="0 0 28 22"
              className="mb-4 fill-[#051A24]"
            >
              <path d="M0 22V12.4C0 5.8 3.9 1.3 10.5 0l1.6 3.4C7.9 4.7 5.8 7.2 5.6 10H12v12H0Zm16 0V12.4C16 5.8 19.9 1.3 26.5 0l1.5 3.4c-4.2 1.3-6.3 3.8-6.5 6.6H28v12H16Z" />
            </svg>
            <p className="font-studio-body text-sm leading-relaxed text-[#051A24] md:text-base">
              {card.quote}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#051A24] text-[10px] font-semibold text-white">
                {card.badge}
              </span>
              <div>
                <p className="font-studio-body text-sm font-medium text-[#051A24]">
                  {card.name}
                </p>
                <p className="font-studio-body text-xs text-[#273C46]">{card.proof}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
