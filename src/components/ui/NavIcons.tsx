/**
 * Nav glyphs whose parts move independently.
 *
 * lucide ships each icon as one flat SVG, so a folder can't open and a stack
 * can't separate. These four are drawn in the same 24px grid and 2px stroke as
 * the lucide set they sit beside, but with the moving part in its own <g> so a
 * `group-hover` class can transform it. Purely decorative — every consumer
 * labels the link with real text.
 *
 * Motion is expressed with Tailwind's `group-hover:` on transform utilities,
 * which the global `prefers-reduced-motion` rule in index.css reduces to an
 * instant state change rather than an animation.
 */
interface GlyphProps {
  size?: number;
  className?: string;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "shrink-0 overflow-visible",
});

/** House. The roof lifts a hair. */
export function HomeGlyph({ size = 19, className = "" }: GlyphProps) {
  return (
    <svg {...base(size)} className={`${base(size).className} ${className}`}>
      <path d="M4 10.5V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9.5" />
      <g className="origin-center transition-transform duration-300 ease-smooth group-hover:-translate-y-[1.5px]">
        <path d="M2.5 11.5 12 3.5l9.5 8" />
      </g>
      <path d="M9.5 21v-5.5h5V21" />
    </svg>
  );
}

/** Folder whose front panel tips open. */
export function FolderGlyph({ size = 19, className = "" }: GlyphProps) {
  return (
    <svg {...base(size)} className={`${base(size).className} ${className}`}>
      <path d="M3 7.5a1.5 1.5 0 0 1 1.5-1.5h4.2a1.5 1.5 0 0 1 1.2.6l1.1 1.4H19a1.5 1.5 0 0 1 1.5 1.5v2" />
      <g className="origin-bottom transition-transform duration-300 ease-smooth group-hover:-translate-y-[1px] group-hover:-rotate-[7deg]">
        <path d="M3 11h18l-1.6 7.2a1.5 1.5 0 0 1-1.5 1.3H6.1a1.5 1.5 0 0 1-1.5-1.3Z" />
      </g>
    </svg>
  );
}

/** Three layers that separate. */
export function LayersGlyph({ size = 19, className = "" }: GlyphProps) {
  return (
    <svg {...base(size)} className={`${base(size).className} ${className}`}>
      <g className="transition-transform duration-300 ease-smooth group-hover:-translate-y-[2px]">
        <path d="m12 3 8.5 4.2L12 11.4 3.5 7.2Z" />
      </g>
      <g className="transition-transform duration-300 ease-smooth group-hover:translate-y-[0.5px]">
        <path d="m3.5 12 8.5 4.2 8.5-4.2" />
      </g>
      <g className="transition-transform duration-300 ease-smooth group-hover:translate-y-[2.5px]">
        <path d="m3.5 16.6 8.5 4.2 8.5-4.2" />
      </g>
    </svg>
  );
}

/** Chat bubble with a dot that pulses forward. */
export function ChatGlyph({ size = 19, className = "" }: GlyphProps) {
  return (
    <svg {...base(size)} className={`${base(size).className} ${className}`}>
      <path d="M20.5 12a8.5 8.5 0 0 1-12.3 7.6L3.5 21l1.4-4.6A8.5 8.5 0 1 1 20.5 12Z" />
      <g className="transition-transform duration-300 ease-smooth group-hover:translate-x-[2px]">
        <circle cx="9" cy="12" r="0.9" fill="currentColor" stroke="none" />
      </g>
      <g className="transition-transform duration-300 ease-smooth group-hover:translate-x-[1px]">
        <circle cx="12.5" cy="12" r="0.9" fill="currentColor" stroke="none" />
      </g>
      <circle cx="16" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
