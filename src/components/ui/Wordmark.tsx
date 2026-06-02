interface WordmarkProps {
  className?: string;
  /** size of the logo mark in px (wordmark text scales with it) */
  size?: number;
  showText?: boolean;
  /** show the "by Xerxes Duane" founder endorsement beneath the wordmark */
  endorsed?: boolean;
}

/**
 * Threshold Works logo — "The Threshold".
 * Nested doorway arches (the threshold you cross into something new) rising from
 * a gold foundation line, with a keystone spark at the apex for the "Works".
 */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      {/* outer arch (structure) */}
      <path
        d="M7 31 V16 Q7 5.5 18 5.5 Q29 5.5 29 16 V31"
        stroke="currentColor"
        strokeOpacity="0.92"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-cream"
      />
      {/* inner arch (the layer within) */}
      <path
        d="M12.5 31 V17.5 Q12.5 11 18 11 Q23.5 11 23.5 17.5 V31"
        stroke="#DAA442"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* keystone spark */}
      <circle cx="18" cy="6.2" r="1.9" fill="#DAA442" />
      {/* foundation line */}
      <path
        d="M3.5 31 H32.5"
        stroke="#DAA442"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Wordmark({
  className = "",
  size = 28,
  showText = true,
  endorsed = false,
}: WordmarkProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className="font-display font-semibold tracking-tight text-cream"
            style={{ fontSize: `${size * 0.62}px` }}
          >
            Threshold<span className="text-gold"> Works</span>
          </span>
          {endorsed && (
            <span
              className="mt-1 font-sans font-medium text-gold"
              style={{
                fontSize: `${size * 0.27}px`,
                letterSpacing: "0.08em",
              }}
            >
              by Xerxes Duane
            </span>
          )}
        </span>
      )}
    </span>
  );
}
