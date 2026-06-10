import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import { SPRING, EASE } from "../../lib/motion";
import { useFinePointer, useReducedMotionPref } from "../../lib/usePrefs";

type CursorState = "default" | "link" | "view" | "open" | "play" | "drag" | "hidden";

const LABELS: Partial<Record<CursorState, string>> = {
  view: "View",
  open: "Open",
  play: "Play",
  drag: "Drag",
};

const RING = 36;
const DOT = 6;

/**
 * Custom cursor: a small dot + a spring-eased follower ring with contextual
 * states via data-cursor attributes (link grow, labeled gold disc for
 * view/open/play). Decorative only: pointer-events-none, aria-hidden, fine
 * pointers only, fully off under reduced motion, never rendered server-side.
 * Focus outlines and keyboard navigation are untouched.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  const enabled = fine && !reduced;

  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, SPRING.cursor);
  const ringY = useSpring(y, SPRING.cursor);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("tw-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      // Native text/form affordances win — hide the custom cursor there.
      if (t.closest("input, textarea, select, [data-cursor='hidden']")) {
        setState("hidden");
        return;
      }
      const tagged = t.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        setState((tagged.dataset.cursor as CursorState) || "link");
        return;
      }
      if (t.closest("a, button, [role='button'], label")) {
        setState("link");
        return;
      }
      setState("default");
    };

    const onLeaveDoc = () => setVisible(false);
    const onEnterDoc = () => setVisible(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveDoc);
    document.documentElement.addEventListener("pointerenter", onEnterDoc);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      document.documentElement.classList.remove("tw-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeaveDoc);
      document.documentElement.removeEventListener("pointerenter", onEnterDoc);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const labeled = state in LABELS;
  const hidden = !visible || state === "hidden";
  const label = LABELS[state];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80]" data-cursor-root>
      {/* follower ring / labeled disc */}
      <m.div
        style={{ x: ringX, y: ringY, width: RING, height: RING, top: -RING / 2, left: -RING / 2 }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: hidden ? 0.4 : labeled ? 1.9 : state === "link" ? 1.45 : pressed ? 0.85 : 1,
        }}
        transition={{ duration: 0.25, ease: EASE }}
        className={`absolute flex items-center justify-center rounded-full ${
          labeled
            ? "bg-gold text-ink-deep"
            : "border-[1.5px] border-cream/90 mix-blend-difference"
        }`}
      >
        {labeled && (
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em]">
            {label}
          </span>
        )}
      </m.div>
      {/* precise dot */}
      <m.div
        style={{ x, y, width: DOT, height: DOT, top: -DOT / 2, left: -DOT / 2 }}
        animate={{ opacity: hidden || labeled ? 0 : 1, scale: pressed ? 0.6 : 1 }}
        transition={{ duration: 0.18, ease: EASE }}
        className="absolute rounded-full bg-cream mix-blend-difference"
      />
    </div>
  );
}
