import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Rows3 } from "lucide-react";
import { useReducedMotionPref } from "../../lib/usePrefs";
import type { WorkItem } from "../../data/workItems";

interface ProjectReelProps {
  items: WorkItem[];
  /** Start flat instead of on the cylinder (reduced motion, coarse pointer). */
  flatByDefault?: boolean;
  /** Called when a card is activated — a click, Enter, or Space. */
  onSelect: (item: WorkItem) => void;
}

const CARD_W = 256;
const CARD_H = 182;
const DRAG_THRESHOLD = 6;
/** Degrees of rotation per pixel dragged. */
const SENSITIVITY = 0.22;

/**
 * A draggable cylinder of project previews.
 *
 * The cards are laid out around a vertical axis — each one is rotated by its
 * share of 360° and pushed out along Z by the radius that makes neighbouring
 * cards just touch — and the whole ring is rotated by a single angle that
 * pointer drag, the arrow buttons and the keyboard all write to.
 *
 * Three things that a naive version gets wrong and this one does not:
 *
 *  - **Drag vs click.** A pointer that moved more than a few pixels is a drag,
 *    so the card underneath is not activated when the pointer comes up.
 *  - **Momentum.** Release velocity is carried on a rAF loop with exponential
 *    decay, and the loop stops when it is no longer visible to the eye.
 *  - **A way out.** Everything reachable by dragging is also reachable from
 *    the flat list, which is what reduced-motion users, touch users and
 *    keyboard users get by default — the cylinder is the enhancement, never
 *    the only route to the work.
 */
export default function ProjectReel({ items, flatByDefault = false, onSelect }: ProjectReelProps) {
  const reduced = useReducedMotionPref();
  const [flat, setFlat] = useState(flatByDefault);
  const [angle, setAngle] = useState(0);
  const [row, setRow] = useState(0);
  const [dragging, setDragging] = useState(false);
  /** True while the momentum loop is writing the angle every frame. */
  const [coasting, setCoasting] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startAngle: 0, lastX: 0, lastT: 0, moved: 0 });
  const velocity = useRef(0);
  const frame = useRef(0);

  const count = items.length;
  const columns = Math.max(3, Math.ceil(count / 3));
  const rows = Math.ceil(count / columns);
  const step = 360 / columns;
  const frontColumn = ((Math.round(-angle / step) % columns) + columns) % columns;
  const candidate = row * columns + frontColumn;
  const focusIndex = candidate < count ? candidate : frontColumn;
  const radius = useMemo(
    () => (Math.round((CARD_W + 18) / 2 / Math.tan(Math.PI / columns))),
    [columns],
  );

  const stopMomentum = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    velocity.current = 0;
    setCoasting(false);
  }, []);

  /** Spin down after release. */
  const runMomentum = useCallback(() => {
    cancelAnimationFrame(frame.current);
    setCoasting(true);
    let previous = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min(32, now - previous) / 16;
      previous = now;
      velocity.current *= Math.pow(0.94, elapsed);
      if (Math.abs(velocity.current) < 0.02) {
        stopMomentum();
        return;
      }
      setAngle((a) => a + velocity.current * elapsed);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [stopMomentum]);

  useEffect(() => stopMomentum, [stopMomentum]);

  // Nothing should keep spinning behind a hidden tab.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) stopMomentum();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [stopMomentum]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (flat || e.button !== 0) return;
    stopMomentum();
    drag.current = {
      active: true,
      startX: e.clientX,
      startAngle: angle,
      lastX: e.clientX,
      lastT: e.timeStamp,
      moved: 0,
    };
    // Preserve native clicks until the movement is clearly a drag.
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    d.moved = Math.max(d.moved, Math.abs(dx));
    if (d.moved <= DRAG_THRESHOLD) return;
    if (!(e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      setDragging(true);
    }
    setAngle(d.startAngle + dx * SENSITIVITY);

    const dt = e.timeStamp - d.lastT;
    if (dt > 0) velocity.current = Math.max(-3, Math.min(3, ((e.clientX - d.lastX) * SENSITIVITY * 16) / dt));
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
  };

  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    setDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already gone */
    }
    if (!reduced && e.type !== "pointercancel" && d.moved > DRAG_THRESHOLD && Math.abs(velocity.current) > 0.15) runMomentum();
    else stopMomentum();
  };

  /** True when the pointer that just came up was dragging, not clicking. */
  const wasDrag = () => drag.current.moved > DRAG_THRESHOLD;

  const spin = useCallback(
    (direction: 1 | -1) => {
      stopMomentum();
      setAngle((a) => (Math.round(a / step) - direction) * step);
    },
    [step, stopMomentum],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (flat) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      spin(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      spin(-1);
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setRow((r) => (r + (e.key === "ArrowDown" ? 1 : rows - 1)) % rows);
    } else if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) {
      e.preventDefault();
      stopMomentum();
      onSelect(items[focusIndex]);
    }
  };

  if (count === 0) return null;

  /* ---- flat fallback: the same work, as an ordinary grid ---- */
  if (flat) {
    return (
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-[0.85rem] text-fg-soft">
            {count} builds. Choose one to open its preview.
          </p>
          <button
            type="button"
            onClick={() => setFlat(false)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-[0.8rem] font-bold text-fg transition hover:border-accent/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Spin the reel
          </button>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.src}>
              <button
                type="button"
                onClick={() => onSelect(item)}
                className="group/tile w-full overflow-hidden rounded-xl border border-line bg-panel text-start shadow-card transition duration-300 ease-smooth hover:-translate-y-[3px] hover:border-accent/45 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
              >
                <img
                  src={item.thumb}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full bg-plate object-cover object-top"
                />
                <span className="flex items-center justify-between gap-2 px-3 py-2.5">
                  <span className="truncate text-[0.85rem] font-bold text-fg">{item.title}</span>
                  <ArrowUpRight
                    size={15}
                    strokeWidth={2.4}
                    aria-hidden
                    className="shrink-0 text-fg-faint transition group-hover/tile:text-accent"
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /* ---- the cylinder ---- */
  return (
    <div className="flex flex-col">
      <div
        ref={stageRef}
        role="group"
        aria-label="Project reel. Drag sideways, or use the arrow keys, to turn it."
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={() => { drag.current.active = false; setDragging(false); }}
        className={`relative h-[min(62dvh,36rem)] touch-pan-y select-none overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:h-[min(68dvh,39rem)] ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ perspective: "900px", perspectiveOrigin: "50% 50%" }}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transformStyle: "preserve-3d",
            // Push the whole ring back by its radius first, so the card facing
            // the viewer lands at z≈0 and renders at its true size. Without
            // this the front card sits `radius` px in front of the origin and
            // the perspective divide blows it up several times over.
            transform: `translate(-50%, -50%) translateZ(${-radius}px) rotateY(${angle}deg)`,
            // No easing while a gesture or the momentum loop owns the angle —
            // a transition on every frame would fight the rAF updates.
            transition:
              dragging || coasting || reduced ? "none" : "transform 520ms cubic-bezier(0.16, 1, 0.3, 1)",
            willChange: "transform",
            width: CARD_W,
            height: CARD_H,
          }}
        >
          {items.map((item, i) => {
            // How close this card is to facing the viewer, 1 = dead centre.
            const facing = Math.cos((((i % columns) * step + angle) * Math.PI) / 180);
            const front = facing > 0.3;
            return (
              <button
                key={item.src}
                type="button"
                tabIndex={-1}
                aria-current={i === focusIndex ? "true" : undefined}
                onClick={(event) => {
                  if (event.detail > 0 && wasDrag()) return;
                  stopMomentum();
                  onSelect(item);
                }}
                className="group/card absolute inset-0 overflow-hidden rounded-xl border border-line bg-panel text-start shadow-card transition-[opacity,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                style={{
                  transform: `translateY(${(Math.floor(i / columns) - (rows - 1) / 2) * (CARD_H + 14)}px) rotateY(${(i % columns) * step}deg) translateZ(${radius}px)`,
                  // Fade with the turn so the far side of the ring recedes
                  // instead of competing with the card in front.
                  opacity: Math.max(0.18, 0.22 + 0.78 * Math.max(0, facing)),
                  pointerEvents: front ? "auto" : "none",
                  boxShadow: i === focusIndex ? "0 0 0 2px rgb(var(--c-accent))" : undefined,
                  backfaceVisibility: "hidden",
                }}
              >
                <img
                  src={item.thumb}
                  alt=""
                  draggable={false}
                  loading={i < 6 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-[8.25rem] w-full bg-plate object-cover object-top"
                />
                <span className="flex items-center justify-between gap-2 px-3 py-2">
                  <span className="truncate text-[0.8rem] font-bold text-fg">{item.title}</span>
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2.4}
                    aria-hidden
                    className="shrink-0 text-fg-faint transition group-hover/card:text-accent"
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" aria-atomic="true" className="px-4 pb-3 text-center text-sm font-bold text-fg">{items[focusIndex]?.title}</p>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-6">
        <p className="text-[0.8rem] text-fg-soft">
          Drag to turn · ← → rotate · ↑ ↓ choose row · Enter opens
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => spin(-1)}
            aria-label="Previous project"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-panel text-fg-soft transition hover:border-accent/45 hover:text-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ChevronLeft size={18} strokeWidth={2.2} aria-hidden className="rtl-flip" />
          </button>
          <button
            type="button"
            onClick={() => spin(1)}
            aria-label="Next project"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-panel text-fg-soft transition hover:border-accent/45 hover:text-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ChevronRight size={18} strokeWidth={2.2} aria-hidden className="rtl-flip" />
          </button>
          <button
            type="button"
            onClick={() => {
              stopMomentum();
              setFlat(true);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-[0.8rem] font-bold text-fg transition hover:border-accent/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Rows3 size={15} strokeWidth={2.2} aria-hidden />
            List view
          </button>
        </div>
      </div>
    </div>
  );
}
