interface DottedOrbitProps {
  className?: string;
  /** gold for dark sections, ink for light bands. */
  tone?: "gold" | "ink";
}

/**
 * Decorative dotted-orbit motif: two crossed dotted ellipses slowly rotating
 * in opposite directions around a keystone dot — the doorway's spark in
 * orbit. Pure CSS spin (frozen by the global reduced-motion rule), aria-hidden,
 * zero JS. Size/position via className (e.g. "absolute -right-40 h-96 w-96").
 */
export default function DottedOrbit({ className = "", tone = "gold" }: DottedOrbitProps) {
  const stroke = tone === "gold" ? "rgba(218,164,66,0.4)" : "rgba(11,15,13,0.3)";
  const dot = tone === "gold" ? "#DAA442" : "#B8842F";
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <div className="absolute inset-0 animate-[spin_140s_linear_infinite]">
        <svg viewBox="0 0 600 600" fill="none" className="h-full w-full">
          <ellipse
            cx="300"
            cy="300"
            rx="290"
            ry="175"
            stroke={stroke}
            strokeWidth="1.2"
            strokeDasharray="2 8"
          />
        </svg>
      </div>
      <div className="absolute inset-0 animate-[spin_100s_linear_infinite_reverse]">
        <svg viewBox="0 0 600 600" fill="none" className="h-full w-full">
          <ellipse
            cx="300"
            cy="300"
            rx="180"
            ry="285"
            stroke={stroke}
            strokeWidth="1.2"
            strokeDasharray="2 8"
          />
        </svg>
      </div>
      <span
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: dot }}
      />
    </div>
  );
}
