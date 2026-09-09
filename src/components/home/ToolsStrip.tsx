import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { Marquee } from "../vendor/Marquee";
import { TOOLS } from "../../data/homeBento";
import { useReducedMotionPref } from "../../lib/usePrefs";

/**
 * The stack strip: a fixed label, then a clipped row that scrolls its contents.
 *
 * This is the one track on the homepage that runs continuously — everything on
 * the bento board below waits to be hovered. Built on the vendored Magic UI
 * Marquee (components/vendor/Marquee.tsx), which repeats the list to make the
 * loop seamless and marks the repeats `aria-hidden` + `inert` so each tool is
 * announced and tabbed once.
 *
 * It stops on hover, on keyboard focus inside it, under
 * `prefers-reduced-motion`, and on demand via the visible control — a
 * continuously moving element needs an off switch (WCAG 2.2.2).
 */
export default function ToolsStrip() {
  const reduced = useReducedMotionPref();
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-label="Tools and platforms I work with"
      className="mb-4 rounded-[2.1rem] bg-gradient-to-r from-canvas-sunk/30 via-wash/45 to-wash-strong/60 p-1.5"
    >
      <div className="flex items-stretch overflow-hidden rounded-[1.7rem] border border-line bg-panel shadow-card">
        {/* Fixed label */}
        <div className="flex shrink-0 flex-col justify-center gap-0.5 border-e border-line px-3 py-2.5 sm:px-6">
          <span className="font-technical text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-accent-deep sm:text-eyebrow sm:tracking-[0.16em]">
            Daily drivers
          </span>
          <span className="hidden whitespace-nowrap font-display text-[0.95rem] font-bold text-fg sm:block">
            Tools I work with
          </span>
        </div>

        {/* Clipped, scrolling track */}
        <div className="relative min-w-0 flex-1">
          <Marquee
            pauseOnHover
            paused={paused || reduced}
            repeat={3}
            className="py-3 [--duration:52s] [--gap:0px] sm:py-3.5"
          >
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <span
                  key={tool.label}
                  className="flex shrink-0 items-center gap-2.5 whitespace-nowrap border-e border-line-soft px-4 text-[0.9rem] sm:px-6 sm:text-[0.95rem] font-semibold text-fg"
                >
                  <Icon size={18} strokeWidth={2.1} aria-hidden className="text-accent" />
                  {tool.label}
                </span>
              );
            })}
          </Marquee>
          {/* Fade the clipped edges rather than cutting a label mid-glyph.
              Physical left/right on purpose: the track always travels the same
              way, so the fades must not flip under RTL. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-6"
            style={{ background: "linear-gradient(to right, rgb(var(--c-panel)), transparent)" }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-10"
            style={{ background: "linear-gradient(to left, rgb(var(--c-panel)), transparent)" }}
          />
        </div>

        {/* Pause control — hidden when the OS already asked for stillness. */}
        {!reduced && (
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            aria-pressed={paused}
            aria-label={paused ? "Resume scrolling tools" : "Pause scrolling tools"}
            className="grid shrink-0 place-items-center border-s border-line px-4 text-fg-faint transition hover:bg-panel-alt hover:text-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
          >
            {paused ? <Play size={16} strokeWidth={2.2} /> : <Pause size={16} strokeWidth={2.2} />}
          </button>
        )}
      </div>
    </section>
  );
}
