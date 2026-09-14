import { useState } from "react";
import { m } from "framer-motion";
import DeskIllustration from "./DeskIllustration";
import { useReducedMotionPref } from "../../lib/usePrefs";

/**
 * The artwork: you at the desk, keyed to transparency and trimmed to the
 * figure so `items-end` can sit it on the card's bottom edge. If it ever goes
 * missing the drawn SVG stands in, so the page is never broken by a 404.
 */
const FIGURE_SRC = "/brand/about-desk.webp";
const FIGURE_W = 1200;
const FIGURE_H = 851;

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
            width={FIGURE_W}
            height={FIGURE_H}
            loading="lazy"
            decoding="async"
            onError={() => setMissing(true)}
            // Fits the column and stands on the card's bottom edge, the way
            // the reference does. Not oversized: the figure runs to 92% of the
            // frame, so any bleed off the card's right edge takes his sleeve
            // with the chair. The artwork carries its own margins.
            // Capped from the board breakpoint up. At w-full in a half-card
            // column the 1200x851 artwork renders 512px tall and sets the
            // height of the whole intro, which is most of why this page did
            // not fit a laptop. The cap is the tallest the figure can be
            // without driving that height: with its column's top padding it
            // comes to 312px against the text column's 319, so the words set
            // the card and the figure is as large as it can be for free.
            // Below that breakpoint it still fills its column, where the card
            // is stacked and the height is free.
            className="mx-auto block w-full select-none board:h-[17.5rem] board:w-auto board:object-contain"
            draggable={false}
          />
        )}
      </m.div>
    </m.div>
  );
}
