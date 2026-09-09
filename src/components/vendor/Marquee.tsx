import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * Marquee — adapted from Magic UI (MIT). See ./LICENSE-magicui.md.
 * Upstream: apps/www/registry/magicui/marquee.tsx
 *
 * Changes for this project:
 *  - Tailwind v3 syntax (`gap-[var(--gap)]` rather than v4's `gap-(--gap)`),
 *    with the `marquee-x` / `marquee-y` keyframes declared in tailwind.config.js.
 *  - `cn()` replaced with a plain template join — this project has no `cn`.
 *  - Added a *controlled* `paused` prop so a visible pause button and
 *    `prefers-reduced-motion` can stop the track, not just hover.
 *  - Added `startOnHover`, because the homepage's project/result tracks should
 *    idle until pointed at (the tools strip still autoplays). Pausing via
 *    `animation-play-state` keeps the current offset, so leaving and
 *    re-entering resumes rather than restarting.
 *  - Only the first copy of the content is exposed to assistive tech; the
 *    repeats that make the loop seamless are `aria-hidden`.
 */
interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /** Reverse the travel direction. */
  reverse?: boolean;
  /** Stop while the pointer is over the track. */
  pauseOnHover?: boolean;
  /** Idle until hovered or focused, instead of running from the start. */
  startOnHover?: boolean;
  /** Controlled stop — wins over both of the above. */
  paused?: boolean;
  /** Travel down the block axis instead of the inline one. */
  vertical?: boolean;
  /** How many copies of the children to render. */
  repeat?: number;
  children: ReactNode;
}

export function Marquee({
  className = "",
  reverse = false,
  pauseOnHover = false,
  startOnHover = false,
  paused = false,
  vertical = false,
  repeat = 2,
  children,
  ...props
}: MarqueeProps) {
  const track = [
    "flex shrink-0 justify-around gap-[var(--gap)]",
    vertical ? "animate-marquee-y flex-col" : "animate-marquee-x flex-row",
    reverse ? "[animation-direction:reverse]" : "",
    // Paused states, most specific last.
    // The unnamed `group-*` pair is deliberate: it lets the surrounding card
    // (any ancestor with `group`) start the track, so hovering or tabbing to
    // the card — not just to the strip itself — sets it moving.
    startOnHover
      ? "[animation-play-state:paused] group-hover/marquee:[animation-play-state:running] group-focus-within/marquee:[animation-play-state:running] group-hover:[animation-play-state:running] group-focus-visible:[animation-play-state:running] group-focus-within:[animation-play-state:running]"
      : "",
    pauseOnHover
      ? "group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]"
      : "",
  ].join(" ");

  return (
    <div
      {...props}
      className={`group/marquee flex gap-[var(--gap)] overflow-hidden [--duration:40s] [--gap:1rem] ${
        vertical ? "flex-col" : "flex-row"
      } ${className}`}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          // The repeats exist only to make the loop seamless: hide them from
          // assistive tech, and take their links out of the tab order.
          aria-hidden={i > 0 || undefined}
          inert={i > 0 || undefined}
          className={track}
          style={paused ? { animationPlayState: "paused" } : undefined}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
