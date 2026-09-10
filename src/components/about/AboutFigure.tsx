import { useState } from "react";
import { m } from "framer-motion";
import DeskIllustration from "./DeskIllustration";
import { useReducedMotionPref } from "../../lib/usePrefs";

/**
 * Where to drop the artwork. A transparent PNG (or WebP — change the
 * extension here) of you at the desk, roughly 4:3, ideally ~1400px wide.
 * Until that file exists the drawn SVG stands in, so the page is never
 * broken by a missing asset.
 */
const FIGURE_SRC = "/brand/about-desk.png";

/**
 * The About card's figure: your illustration, floating.
 *
 * Two motions, both cheap and both transform-only so they never cause layout
 * work: it rises into place once, then breathes on a slow loop. The loop is
 * deliberately long and shallow — at 6s and 10px it reads as "alive" rather
 * than "animated", which is what a static figure at a desk wants.
 *
 * `prefers-reduced-motion` drops both: `MotionConfig reducedMotion="user"` in
 * App.tsx handles the entrance, and the float is gated on the hook here
 * because a `repeat: Infinity` loop is exactly the thing that setting exists
 * to stop.
 *
 * If the artwork 404s, `onError` falls back to the drawn scene rather than
 * leaving a broken-image icon in the card.
 */
export default function AboutFigure() {
  const reduced = useReducedMotionPref();
  const [missing, setMissing] = useState(false);

  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="relative flex h-full w-full items-end justify-center"
    >
      <m.div
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        className="w-full"
      >
        {missing ? (
          <DeskIllustration className="w-full" />
        ) : (
          <img
            src={FIGURE_SRC}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            onError={() => setMissing(true)}
            // Fills the column and sits on the card's bottom edge, the way the
            // reference does. Give the artwork transparent margins of its own
            // rather than padding it here.
            className="mx-auto block w-full select-none"
            draggable={false}
          />
        )}
      </m.div>
    </m.div>
  );
}
