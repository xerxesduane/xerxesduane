import { useEffect, useId, useState, type RefObject } from "react";
import { m } from "framer-motion";

/**
 * AnimatedBeam — adapted from Magic UI (MIT). See ./LICENSE-magicui.md.
 * Upstream: apps/www/registry/magicui/animated-beam.tsx
 *
 * Changes for this project:
 *  - `motion/react` → `framer-motion`'s `m`, because the app mounts
 *    `<LazyMotion strict>` and `motion.*` throws there.
 *  - Colours default to the design tokens instead of Magic UI's purple/orange.
 *  - Honours `prefers-reduced-motion`: the static path still draws, the
 *    travelling gradient does not animate.
 *  - `cn()` replaced with a template join.
 */
export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  /** Freeze the travelling highlight (reduced motion, offscreen, hidden tab). */
  still?: boolean;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export function AnimatedBeam({
  className = "",
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 4,
  delay = 0,
  pathColor = "rgb(var(--c-line))",
  pathWidth = 2,
  pathOpacity = 1,
  gradientStartColor = "rgb(var(--c-accent))",
  gradientStopColor = "rgb(var(--c-accent-deep))",
  still = false,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const [pathD, setPathD] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });

  const gradientCoordinates = reverse
    ? { x1: ["90%", "-10%"], x2: ["100%", "0%"], y1: ["0%", "0%"], y2: ["0%", "0%"] }
    : { x1: ["10%", "110%"], x2: ["0%", "100%"], y1: ["0%", "0%"], y2: ["0%", "0%"] };

  useEffect(() => {
    const updatePath = () => {
      const container = containerRef.current;
      const from = fromRef.current;
      const to = toRef.current;
      if (!container || !from || !to) return;

      const box = container.getBoundingClientRect();
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      setSize({ width: box.width, height: box.height });

      const startX = a.left - box.left + a.width / 2 + startXOffset;
      const startY = a.top - box.top + a.height / 2 + startYOffset;
      const endX = b.left - box.left + b.width / 2 + endXOffset;
      const endY = b.top - box.top + b.height / 2 + endYOffset;
      const controlY = startY - curvature;

      setPathD(`M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`);
    };

    const observer = new ResizeObserver(updatePath);
    if (containerRef.current) observer.observe(containerRef.current);
    updatePath();
    window.addEventListener("resize", updatePath);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  return (
    <svg
      fill="none"
      width={size.width}
      height={size.height}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={`pointer-events-none absolute left-0 top-0 transform-gpu ${className}`}
      viewBox={`0 0 ${size.width} ${size.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      {!still && (
        <path
          d={pathD}
          strokeWidth={pathWidth}
          stroke={`url(#beam-${id})`}
          strokeLinecap="round"
        />
      )}
      <defs>
        <m.linearGradient
          className="transform-gpu"
          id={`beam-${id}`}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={
            still
              ? undefined
              : {
                  x1: gradientCoordinates.x1,
                  x2: gradientCoordinates.x2,
                  y1: gradientCoordinates.y1,
                  y2: gradientCoordinates.y2,
                }
          }
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatDelay: 0.4,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </m.linearGradient>
      </defs>
    </svg>
  );
}
