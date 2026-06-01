import { m } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, VIEWPORT } from "../../lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Scroll-reveal wrapper. Respects reduced-motion automatically via framer-m. */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ delay }}
    >
      {children}
    </m.div>
  );
}
