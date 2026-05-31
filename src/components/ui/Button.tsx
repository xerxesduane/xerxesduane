import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "ghost";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-300 ease-smooth focus-visible:outline-none";

  if (variant === "ghost") {
    return (
      <a
        className={`${base} border border-cream/15 text-cream hover:border-gold/50 hover:text-gold ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      className={`${base} bg-gold text-ink-deep shadow-[0_10px_40px_-12px_rgba(217,164,65,0.7)] hover:bg-gold-soft hover:shadow-[0_14px_50px_-10px_rgba(217,164,65,0.85)] ${className}`}
      {...props}
    >
      {/* glow halo */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gold/40 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </a>
  );
}
