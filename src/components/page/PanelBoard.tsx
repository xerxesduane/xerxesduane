import { m } from "framer-motion";
import type { ReactNode } from "react";
import { stagger, VIEWPORT } from "../../lib/motion";

interface PanelBoardProps {
  children: ReactNode;
  /** Grid template applied from lg up. Defaults to the 12-column board. */
  cols?: string;
  className?: string;
  /** `false` drops the washed container — for boards that sit inside one. */
  washed?: boolean;
}

/**
 * The washed container the panels sit on. Shared by the homepage board and the
 * inner pages so the bento rhythm is identical everywhere.
 *
 * `animate` is not used here: the board reveals on scroll, and on pages where
 * it is the first thing below the header that still fires immediately because
 * VIEWPORT's threshold is deliberately low.
 */
export default function PanelBoard({
  children,
  cols = "lg:grid-cols-12",
  className = "",
  washed = true,
}: PanelBoardProps) {
  return (
    <m.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={
        washed
          ? `rounded-panel bg-gradient-to-r from-canvas-sunk/30 via-wash/40 to-wash-strong/60 p-3 sm:p-4 ${className}`
          : className
      }
    >
      <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 ${cols}`}>
        {children}
      </div>
    </m.div>
  );
}
