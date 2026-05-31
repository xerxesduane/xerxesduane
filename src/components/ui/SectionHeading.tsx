import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-left"
      }
    >
      <span className="eyebrow">
        <span className="h-px w-6 bg-gold/60" aria-hidden />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl sm:text-4xl md:text-[2.85rem]">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p>
      )}
    </Reveal>
  );
}
