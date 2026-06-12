import { m } from "framer-motion";
import { EASE } from "../../lib/motion";

/**
 * The Open X mark, drawn in: foundation line first, then the gold and cream
 * strokes draw upward and outward, then the spark settles into the opening.
 * Decorative (aria-hidden); MotionConfig reducedMotion="user" renders it
 * instantly for reduced motion. Paths match ui/Wordmark.tsx exactly.
 */
export default function LogoDraw({ className = "" }: { className?: string }) {
  return (
    <m.svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden
      className={className}
      initial="hidden"
      animate="show"
    >
      {/* foundation */}
      <m.path
        d="M5 31 H31"
        stroke="#DAA442"
        strokeWidth="2.6"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          show: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.5, ease: EASE },
          },
        }}
      />
      {/* back stroke (gold) */}
      <m.path
        d="M23.8 30 C21 23, 14.5 13, 8.2 6.4"
        stroke="#DAA442"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          show: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.7, ease: EASE, delay: 0.15 },
          },
        }}
      />
      {/* front stroke (cream) */}
      <m.path
        d="M12.2 30 C15 23, 21.5 13, 27.8 6.4"
        stroke="#F3EFE6"
        strokeOpacity="0.92"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          show: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: EASE, delay: 0.35 },
          },
        }}
      />
      {/* spark settles into the opening last */}
      <m.circle
        cx="18"
        cy="5.6"
        r="1.9"
        fill="#DAA442"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          show: {
            scale: 1,
            opacity: 1,
            transition: { type: "spring", stiffness: 320, damping: 16, delay: 0.95 },
          },
        }}
        style={{ transformOrigin: "18px 5.6px" }}
      />
    </m.svg>
  );
}
