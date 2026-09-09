import { m } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { fadeUp, stagger } from "../../lib/motion";

interface PageHeaderProps {
  eyebrow: string;
  /** Optional glyph in the eyebrow — used by the service pages. */
  icon?: LucideIcon;
  title: ReactNode;
  lede?: ReactNode;
  /** Buttons or links, pulled to the upper right on wide screens. */
  actions?: ReactNode;
  /** Small meta line under the title (dates, reading time, breadcrumbs). */
  meta?: ReactNode;
  /** Override the title classes — Arabic needs looser leading than the
      Latin hero scale allows. */
  titleClass?: string;
}

/**
 * The page header, in the same language as the homepage hero: technical
 * eyebrow, oversized Fraunces title on the left, actions anchored to the
 * opposite corner.
 *
 * Left-aligned on purpose — the inner pages used to centre their headings,
 * which read as a separate site next to the fixed rail.
 */
export default function PageHeader({
  eyebrow,
  icon: Icon,
  title,
  lede,
  actions,
  meta,
  titleClass = "text-hero",
}: PageHeaderProps) {
  return (
    <m.header
      id="top"
      variants={stagger}
      initial="hidden"
      animate="show"
      className="mb-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="min-w-0">
          <m.span variants={fadeUp} className="eyebrow">
            {Icon ? (
              <Icon size={14} strokeWidth={2.1} aria-hidden />
            ) : (
              <span className="h-px w-6 bg-accent/60" aria-hidden />
            )}
            {eyebrow}
          </m.span>
          <m.h1
            variants={fadeUp}
            className={`mt-3 max-w-[20ch] text-balance font-display font-semibold text-fg ${titleClass}`}
          >
            {title}
          </m.h1>
          {meta && (
            <m.div
              variants={fadeUp}
              className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-technical text-xs text-fg-faint"
            >
              {meta}
            </m.div>
          )}
        </div>

        {actions && (
          <m.div variants={fadeUp} className="flex shrink-0 flex-wrap items-center gap-2">
            {actions}
          </m.div>
        )}
      </div>

      {lede && (
        <m.p
          variants={fadeUp}
          className="mt-4 max-w-[68ch] text-[1.02rem] leading-relaxed text-fg-soft"
        >
          {lede}
        </m.p>
      )}
    </m.header>
  );
}
