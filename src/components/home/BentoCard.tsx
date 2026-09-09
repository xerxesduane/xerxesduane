import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { fadeUp } from "../../lib/motion";

interface BentoCardProps {
  icon: LucideIcon;
  /** Short, uppercase card label. */
  label: string;
  blurb?: string;
  /** When set the whole card is a link; omit for cards with links inside. */
  href?: string;
  /** Tailwind grid spans applied from lg up. */
  span?: string;
  children?: ReactNode;
}

/**
 * One bento tile: orange icon tile, bold label, concise blurb, then a preview.
 *
 * A card with `href` renders as a single anchor (one tab stop, arrow purely
 * decorative). A card whose body contains its own links renders as a section
 * instead — nesting interactive elements inside an anchor is invalid and makes
 * the inner links unreachable by keyboard.
 */
export default function BentoCard({
  icon: Icon,
  label,
  blurb,
  href,
  span = "",
  children,
}: BentoCardProps) {
  const shell =
    "group relative flex flex-col gap-2.5 rounded-card border border-line bg-panel p-4 shadow-card transition duration-300 ease-smooth";
  const interactive =
    "hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-wash";

  const head = (
    <div className="flex items-start gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-ink">
        <Icon size={18} strokeWidth={2.1} aria-hidden />
      </span>
      <h3 className="min-w-0 flex-1 pt-1.5 font-technical text-xs font-bold uppercase tracking-[0.14em] text-fg">
        {label}
      </h3>
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
