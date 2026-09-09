/**
 * Thin, low-contrast curved lines behind the page.
 *
 * Pure inline SVG (no image request), fixed and non-interactive, drawn in the
 * foreground colour at very low alpha so it holds up in both themes without a
 * second asset. Purely decorative, so it is hidden from assistive tech.
 */
export default function CanvasLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full text-fg/[0.07]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="1" fill="none">
          {/* Long sweeps that read as one continuous system across the page. */}
          <path d="M -180 720 C 180 700, 300 420, 520 300 S 980 120, 1320 -60" />
          <path d="M -140 900 C 260 840, 420 540, 700 420 S 1180 260, 1560 140" />
          <path d="M 240 -80 C 300 220, 520 360, 760 420 S 1180 560, 1420 900" />
          {/* Wide arcs, echoing the ring around the portrait. */}
          <circle cx="180" cy="130" r="230" />
          <circle cx="1290" cy="760" r="330" />
          <circle cx="880" cy="200" r="150" />
        </g>
      </svg>
    </div>
  );
}
