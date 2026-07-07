import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm md:text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--studio-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--studio-bg)]";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[color:var(--studio-gold)] text-[color:var(--studio-ink)] studio-shadow-primary hover:-translate-y-0.5 hover:bg-[color:var(--studio-gold-deep)]",
  secondary:
    "border border-[color:var(--studio-line)] bg-white/[0.075] text-[color:var(--studio-cream)] studio-shadow-secondary hover:-translate-y-0.5 hover:bg-white/[0.12]",
  tertiary:
    "border border-[color:var(--studio-line)] bg-white/[0.055] text-[color:var(--studio-cream)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_14px_44px_-30px_rgba(0,0,0,0.9)] hover:-translate-y-0.5 hover:bg-white/[0.1]",
};

interface StudioButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  href: string;
  children: ReactNode;
}

/** Reusable studio-reference button (renders as a link — every CTA navigates). */
export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...rest
}: StudioButtonProps) {
  return (
    <a href={href} className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
