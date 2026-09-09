import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { fadeUp } from "../../lib/motion";

interface PanelProps {
  /** Orange icon tile. Omit for a plain panel. */
  icon?: LucideIcon;
  /** Render something other than a lucide glyph inside the tile. */
  iconNode?: ReactNode;
  /** Short uppercase label — the card's heading. */
  label?: string;
  blurb?: string;
  /** When set the whole panel is a link; omit for panels with links inside. */
  href?: string;
  /** Tailwind grid spans, applied by the caller. */
  span?: string;
  /** `plain` drops the card chrome — for panels that only need the rhythm. */
  tone?: "card" | "plain";
  /** Pinned to the bottom of the card, below the body. */
  footer?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/**
 * The bento tile, shared by the homepage board and the inner pages.
 *
 * A panel with `href` renders as a single anchor (one tab stop, decorative
 * arrow). A panel whose body holds its own links renders as a section instead —
 * nesting interactive elements inside an anchor is invalid and makes the inner
 * links unreachable by keyboard.
 *
 * Hover/focus is one shared gesture across every card on the site: a 3px lift,
 * a deeper shadow, an accent border, the orange tile lifting and tilting, the
 * heading picking up the accent, and the corner arrow sliding in. It is driven
 * by `group-hover` **and** `group-focus-visible`, so a keyboard user reaching
 * the card sees the same state a pointer user does. Everything is transform and
 * colour only, so `prefers-reduced-motion` (handled globally in index.css by
 * collapsing transition durations) leaves the states legible but instant.
 */
export const PANEL_HOVER =
  "transition duration-300 ease-smooth hover:-translate-y-[3px] hover:border-accent/45 hover:shadow-card-hover focus-visible:-translate-y-[3px] focus-visible:border-accent/45 focus-visible:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

/** The orange tile. Lifts and tilts with the card. */
export function IconTile({ children }: { children: ReactNode }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[0.85rem] bg-accent text-accent-ink shadow-[0_6px_14px_-8px_rgb(var(--c-accent))] transition duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:-rotate-6 group-hover:shadow-[0_10px_20px_-8px_rgb(var(--c-accent))] group-focus-visible:-translate-y-0.5 group-focus-visible:-rotate-6">
      {children}
    </span>
  );
}

export default function Panel({
  icon: Icon,
  iconNode,
  label,
  blurb,
  href,
  span = "",
  tone = "card",
  footer,
  className = "",
  children,
}: PanelProps) {
  const shell =
    tone === "card"
      ? "group relative flex flex-col gap-2.5 rounded-card border border-line bg-panel p-4 shadow-card sm:p-[1.15rem]"
      : "group relative flex flex-col gap-2.5";

  const head = (label || Icon || iconNode) && (
    <div className="flex items-center gap-3">
      {(Icon || iconNode) && (
        <IconTile>{iconNode ?? (Icon ? <Icon size={20} strokeWidth={2.2} aria-hidden /> : null)}</IconTile>
      )}
      {label && (
        <h3 className="min-w-0 flex-1 font-display text-card font-extrabold uppercase tracking-[0.045em] text-fg transition-colors duration-300 group-hover:text-accent-deep group-focus-visible:text-accent-deep">
          {label}
        </h3>
      )}
      {href && (
        <ArrowUpRight
          size={18}
          strokeWidth={2.4}
          aria-hidden
          className="shrink-0 -translate-x-1 text-accent opacity-0 transition duration-300 ease-smooth group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
        />
      )}
    </div>
  );

  const body = (
    <>
      {head}
      {blurb && <p className="-mt-1 text-[0.9rem] leading-snug text-fg-soft">{blurb}</p>}
      {children}
      {footer && <div className="mt-auto pt-1">{footer}</div>}
    </>
  );

  if (href) {
    return (
      <m.a
        variants={fadeUp}
        href={href}
        className={`${shell} ${PANEL_HOVER} ${span} ${className}`}
      >
        {body}
      </m.a>
    );
  }
  return (
    <m.section
      variants={fadeUp}
      aria-label={label}
      className={`${shell} ${tone === "card" ? "transition duration-300 ease-smooth hover:border-accent/45 hover:shadow-card-hover" : ""} ${span} ${className}`}
    >
      {body}
    </m.section>
  );
}
