import { m } from "framer-motion";
import { useMemo } from "react";
import type { ReactNode } from "react";
import type { Variants } from "framer-motion";
import { EASE, fadeUp, VIEWPORT } from "../../lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Scroll-reveal wrapper. Reduced-motion handled by MotionConfig in App.tsx.
 * Note: delay is merged INTO the variant transition — a top-level `transition`
 * prop would replace the variant's duration/ease entirely (framer semantics).
 */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const variants = useMemo<Variants>(
    () =>
      delay === 0
        ? fadeUp
        : {
            hidden: fadeUp.hidden,
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: EASE, delay },
            },
          },
    [delay],
  );

  return (
    <m.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </m.div>
  );
}
