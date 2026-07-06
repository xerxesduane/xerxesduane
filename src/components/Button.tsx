import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm md:text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051A24] focus-visible:ring-offset-2";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[#051A24] text-white studio-shadow-primary hover:opacity-90 hover:-translate-y-0.5",
  secondary:
    "bg-white text-[#051A24] studio-shadow-secondary hover:-translate-y-0.5",
  tertiary:
    "bg-white text-[#051A24] shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5",
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
