import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { TOOLS } from "../../data/homeBento";
import { useReducedMotionPref } from "../../lib/usePrefs";

/**
 * The stack strip: a fixed label, then a clipped row that scrolls its contents.
 *
 * The track is rendered twice and translated by -50%, which is what makes the
 * loop seamless. The duplicate is `aria-hidden` so screen readers announce each
 * tool once. Motion stops entirely under `prefers-reduced-motion`, and a
 * visible control lets anyone else pause it — a continuously moving element
 * needs an off switch (WCAG 2.2.2).
 */
export default function ToolsStrip() {
  const reduced = useReducedMotionPref();
  const [paused, setPaused] = useState(false);
  const still = reduced || paused;

  const row = (duplicate: boolean) => (
    <ul
      className="flex shrink-0 items-center gap-8 pr-8"
      aria-hidden={duplicate || undefined}
    >
      {TOOLS.map((tool) => {
        const Icon = tool.icon;
        return (
          <li
            key={(duplicate ? "dup-" : "") + tool.label}
            className="flex shrink-0 items-center gap-2.5 text-sm font-medium text-fg"
          >
            <Icon size={17} strokeWidth={1.9} aria-hidden className="text-accent" />
            {tool.label}
          </li>
        );
      })}
    </ul>
  );

  return (
    <section
      aria-label="Tools and platforms I work with"
      className="mb-2.5 flex items-stretch gap-0 overflow-hidden rounded-panel border border-line bg-panel shadow-card"
    >
      {/* Fixed label */}
      <div className="flex shrink-0 flex-col justify-center border-r border-line px-3 py-2.5 sm:px-5">
        <span className="font-technical text-eyebrow font-bold uppercase text-accent">
          Daily drivers
        </span>
        <span className="mt-0.5 hidden whitespace-nowrap font-display text-sm font-semibold text-fg sm:block">
          Tools I work with
        </span>
      </div>

      {/* Clipped, scrolling track */}
      <div className="relative min-w-0 flex-1 overflow-hidden">
        <div
          className="flex w-max animate-marquee-slow items-center py-2.5 pl-6"
          style={still ? { animationPlayState: "paused" } : undefined}
        >
          {row(false)}
          {row(true)}
        </div>
        {/* Fade the clipped edge rather than cutting a label mid-glyph. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-panel to-transparent"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-panel to-transparent"
        />
      </div>

      {/* Pause control — hidden when the OS already asked for stillness. */}
      {!reduced && (
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          aria-pressed={paused}
          aria-label={paused ? "Resume scrolling tools" : "Pause scrolling tools"}
          className="grid shrink-0 place-items-center border-l border-line px-4 text-fg-faint transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        >
          {paused ? <Play size={15} strokeWidth={2} /> : <Pause size={15} strokeWidth={2} />}
        </button>
      )}
    </section>
  );
}
