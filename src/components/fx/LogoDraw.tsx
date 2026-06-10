import { m } from "framer-motion";
import { EASE } from "../../lib/motion";

/**
 * The doorway mark, drawn in: foundation line first, then the outer and inner
 * arches stroke-draw, then the keystone spark settles. Decorative (aria-hidden);
 * MotionConfig reducedMotion="user" renders it instantly for reduced motion.
 * Paths match ui/Wordmark.tsx exactly.
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
      {/* foundation / threshold */}
      <m.path
        d="M3.5 31 H32.5"
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
      {/* outer arch */}
      <m.path
        d="M7 31 V16 Q7 5.5 18 5.5 Q29 5.5 29 16 V31"
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
            transition: { duration: 0.8, ease: EASE, delay: 0.15 },
          },
        }}
      />
      {/* inner arch */}
      <m.path
        d="M12.5 31 V17.5 Q12.5 11 18 11 Q23.5 11 23.5 17.5 V31"
        stroke="#DAA442"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          show: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.7, ease: EASE, delay: 0.4 },
          },
        }}
      />
      {/* keystone spark settles last */}
      <m.circle
        cx="18"
        cy="6.2"
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
        style={{ transformOrigin: "18px 6.2px" }}
      />
    </m.svg>
  );
}
