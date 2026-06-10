import { Children, Fragment, cloneElement, isValidElement, useMemo } from "react";
import { m } from "framer-motion";
import type { ReactNode } from "react";
import type { Variants } from "framer-motion";
import { maskUp } from "../../lib/motion";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

const TAGS = {
  h1: m.h1,
  h2: m.h2,
  h3: m.h3,
  p: m.p,
  span: m.span,
  div: m.div,
} as const;

interface KineticProps {
  children: ReactNode;
  as?: Tag;
  className?: string;
  /**
   * auto: inherit variant propagation from an m.* stagger parent (no own
   * initial/animate). mount: play on mount. inview: play when scrolled into view.
   */
  mode?: "auto" | "mount" | "inview";
  delay?: number;
  amount?: number;
}

/**
 * Kinetic word-mask reveal. Splits text into per-word spans AT RENDER TIME, so
 * server and client emit identical markup (no hydration mismatch, no DOM
 * mutation, no measuring — immune to font-swap reflow). The full text stays in
 * the DOM as real text nodes (SEO + screen readers read it naturally).
 * Elements (e.g. .text-gradient-gold spans) animate as single units, which
 * keeps background-clip gradients continuous. Never char-splits — safe for
 * any script, though Arabic pages currently keep their block reveals.
 */
export default function Kinetic({
  children,
  as = "span",
  className,
  mode = "auto",
  delay = 0,
  amount = 0.35,
}: KineticProps) {
  const Comp = TAGS[as];

  const container = useMemo<Variants>(
    () => ({
      hidden: {},
      show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 + delay } },
    }),
    [delay],
  );

  const units = useMemo(() => {
    let key = 0;
    const out: ReactNode[] = [];

    const pushWord = (content: ReactNode) => {
      out.push(
        // Clip wrapper: padding extends the paint area for ascenders/descenders
        // and italic overhang; negative margins cancel it in layout (zero CLS).
        <span
          key={`w${key++}`}
          className="inline-block overflow-hidden align-bottom pt-[0.12em] pb-[0.18em] px-[0.06em] -mt-[0.12em] -mb-[0.18em] -mx-[0.06em]"
        >
          <m.span variants={maskUp} className="inline-block">
            {content}
          </m.span>
        </span>,
      );
    };

    const walk = (nodes: ReactNode) => {
      Children.forEach(nodes, (child) => {
        if (child == null || child === false) return;
        if (typeof child === "string" || typeof child === "number") {
          for (const part of String(child).split(/(\s+)/)) {
            if (!part) continue;
            if (/^\s+$/.test(part)) out.push(part);
            else pushWord(part);
          }
          return;
        }
        if (isValidElement(child)) {
          if (child.type === Fragment) {
            walk((child.props as { children?: ReactNode }).children);
            return;
          }
          if (child.type === "br") {
            out.push(cloneElement(child, { key: `br${key++}` }));
            return;
          }
        }
        pushWord(child);
      });
    };

    walk(children);
    return out;
  }, [children]);

  const motionProps =
    mode === "mount"
      ? { initial: "hidden" as const, animate: "show" as const }
      : mode === "inview"
        ? {
            initial: "hidden" as const,
            whileInView: "show" as const,
            viewport: { once: true, amount },
          }
        : {};

  return (
    <Comp variants={container} className={className} {...motionProps}>
      {units}
    </Comp>
  );
}
