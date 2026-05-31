import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, VIEWPORT } from "../../lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Scroll-reveal wrapper. Respects reduced-motion automatically via framer-motion. */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
