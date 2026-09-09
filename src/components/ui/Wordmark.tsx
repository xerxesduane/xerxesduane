interface WordmarkProps {
  className?: string;
  /** size of the logo mark in px (wordmark text scales with it) */
  size?: number;
  showText?: boolean;
}

/**
 * Xerxes Duane logo — "the Open X".
 * Two strokes cross low and flare upward and outward (open arms, serve first),
 * a spark cradled in the opening, rooted on the accent foundation line.
 *
 * The geometry is the brand asset; the colours are the site palette, so both
 * strokes read from design tokens and the mark re-tints with the theme.
 */
export function LogoMark({ size = 28 }: { size?: number }) {
  const accent = "rgb(var(--c-accent))";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      {/* foundation line */}
      <path d="M5 31 H31" stroke={accent} strokeWidth="2.6" strokeLinecap="round" />
      {/* back stroke (accent, the value) */}
      <path
        d="M23.8 30 C21 23, 14.5 13, 8.2 6.4"
        stroke={accent}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* front stroke (ink, the work) */}
      <path
        d="M12.2 30 C15 23, 21.5 13, 27.8 6.4"
        stroke="rgb(var(--c-fg))"
        strokeOpacity="0.92"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* spark cradled in the opening */}
      <circle cx="18" cy="5.6" r="1.9" fill={accent} />
    </svg>
  );
}

export default function Wordmark({
  className = "",
  size = 28,
  showText = true,
}: WordmarkProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className="font-display font-extrabold tracking-tight text-fg"
            style={{ fontSize: `${size * 0.62}px` }}
          >
            Xerxes<span className="font-semibold text-fg-soft"> Duane</span>
          </span>
        </span>
      )}
    </span>
  );
}
