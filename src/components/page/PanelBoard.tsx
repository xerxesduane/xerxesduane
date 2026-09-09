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
  /**
   * Below `sm`, lay the panels out as a horizontally snapped rail instead of
   * stacking them. Used by the homepage: on a phone the board reads as an
   * Explore rail you swipe, with the next card peeking in as the affordance.
   */
  rail?: boolean;
}

/**
 * The washed container the panels sit on. Shared by the homepage board and the
 * inner pages so the bento rhythm is identical everywhere.
 *
 * The wash is a pale-blue bloom anchored to the right edge — it lifts the board
 * off the cream page without turning into a coloured slab behind the cards.
 *
 * `animate` is not used here: the board reveals on scroll, and on pages where
 * it is the first thing below the header that still fires immediately because
 * VIEWPORT's threshold is deliberately low.
 */
export const BOARD_WASH =
  "radial-gradient(125% 135% at 100% 22%, rgb(var(--c-wash-strong) / 0.95) 0%, rgb(var(--c-wash) / 0.72) 30%, rgb(var(--c-canvas-sunk) / 0.42) 62%, rgb(var(--c-canvas-sunk) / 0.14) 100%)";

export default function PanelBoard({
  children,
  cols = "lg:grid-cols-12",
  className = "",
  washed = true,
  rail = false,
}: PanelBoardProps) {
  const layout = rail
    ? // A rail below sm; the ordinary grid from sm up. `snap-mandatory` plus a
      // sub-full card width means one card always settles in view with the
      // next one peeking, and the scrollbar is hidden because the peek is the
      // affordance.
      `flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] max-sm:[&>*]:w-[84%] max-sm:[&>*]:shrink-0 max-sm:[&>*]:snap-center [&::-webkit-scrollbar]:hidden sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible ${cols}`
    : `grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 ${cols}`;
  return (
    <m.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      style={washed ? { background: BOARD_WASH } : undefined}
      className={washed ? `rounded-panel p-3 sm:p-4 ${className}` : className}
    >
      <div className={layout}>{children}</div>
    </m.div>
  );
}
