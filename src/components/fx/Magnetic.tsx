import { m, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode, PointerEvent } from "react";
import { SPRING } from "../../lib/motion";
import { useFinePointer, useReducedMotionPref } from "../../lib/usePrefs";

interface MagneticProps {
  children: ReactNode;
  /** 0–1, how strongly the element leans toward the pointer. */
  strength?: number;
  className?: string;
}

/**
 * Subtle magnetic pull toward the pointer. The wrapper renders identically on
 * server and client (motion values start at 0 = no transform), so hydration
 * is untouched; the effect simply never engages on touch or reduced motion.
 */
export default function Magnetic({ children, strength = 0.3, className = "" }: MagneticProps) {
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  const active = fine && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING.magnetic);
  const sy = useSpring(y, SPRING.magnetic);

  const onPointerMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (!active || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.span
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {children}
    </m.span>
  );
}
