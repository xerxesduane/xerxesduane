import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { fadeUp } from "../../lib/motion";

interface PanelProps {
  /** Gold icon tile. Omit for a plain panel. */
  icon?: LucideIcon;
  /** Short uppercase label, set in the technical face. */
  label?: string;
  blurb?: string;
  /** When set the whole panel is a link; omit for panels with links inside. */
  href?: string;
  /** Tailwind grid spans, applied by the caller. */
  span?: string;
  /** `plain` drops the card chrome — for panels that only need the rhythm. */
  tone?: "card" | "plain";
  children?: ReactNode;
}

/**
 * The bento tile, shared by the homepage board and the inner pages.
 *
 * A panel with `href` renders as a single anchor (one tab stop, decorative
 * arrow). A panel whose body holds its own links renders as a section instead —
 * nesting interactive elements inside an anchor is invalid and makes the inner
 * links unreachable by keyboard.
 */
export default function Panel({
  icon: Icon,
  label,
  blurb,
  href,
  span = "",
  tone = "card",
  children,
}: PanelProps) {
  const shell =
    tone === "card"
      ? "group relative flex flex-col gap-2.5 rounded-card border border-line bg-panel p-4 shadow-card transition duration-300 ease-smooth sm:p-5"
      : "group relative flex flex-col gap-2.5";
  const interactive =
    "hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

  const head = (label || Icon) && (
    <div className="flex items-start gap-3">
      {Icon && (
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-ink">
          <Icon size={18} strokeWidth={2.1} aria-hidden />
        </span>
      )}
      {label && (
        <h3 className="min-w-0 flex-1 pt-2 font-technical text-xs font-bold uppercase tracking-[0.14em] text-fg">
          {label}
        </h3>
      )}
      {href && (
        <ArrowUpRight
          size={17}
          strokeWidth={2.1}
          aria-hidden
          className="shrink-0 text-fg-faint transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      )}
    </div>
  );

  const body = (
    <>
      {head}
      {blurb && <p className="text-sm leading-snug text-fg-soft">{blurb}</p>}
      {children}
    </>
  );

  if (href) {
    return (
      <m.a variants={fadeUp} href={href} className={`${shell} ${interactive} ${span}`}>
        {body}
      </m.a>
    );
  }
  return (
    <m.section variants={fadeUp} aria-label={label} className={`${shell} ${span}`}>
      {body}
    </m.section>
  );
}
