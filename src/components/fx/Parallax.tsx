import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotionPref } from "../../lib/usePrefs";

interface ParallaxProps {
  children: ReactNode;
  /** Max shift in px, each direction. Keep restrained. */
  range?: number;
  className?: string;
}

/**
 * Restrained scroll parallax for MEDIA only (never text). The inner layer is
 * overscanned (114% height) so the shift never exposes edges; transform-only,
 * zero CLS. Static under reduced motion.
 */
export default function Parallax({ children, range = 14, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPref();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <m.div
        style={reduced ? undefined : { y }}
        className="relative -top-[7%] h-[114%] w-full"
      >
        {children}
      </m.div>
    </div>
  );
}
