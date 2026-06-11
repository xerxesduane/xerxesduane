import { m } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger, VIEWPORT } from "../../lib/motion";
import Kinetic from "../fx/Kinetic";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  /** light = for cream/sand bands (ink text, deep-gold eyebrow). */
  tone?: "dark" | "light";
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
}: SectionHeadingProps) {
  const light = tone === "light";
  return (
    <m.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-left"
      }
    >
      <m.span variants={fadeUp} className={`eyebrow ${light ? "!text-gold-deep" : ""}`}>
        <span className={`h-px w-6 ${light ? "bg-gold-deep/60" : "bg-gold/60"}`} aria-hidden />
        {eyebrow}
      </m.span>
      <Kinetic
        as="h2"
        className={`mt-4 text-3xl sm:text-4xl md:text-[2.85rem] ${light ? "!text-ink" : ""}`}
      >
        {title}
      </Kinetic>
      {subtitle && (
        <m.p
          variants={fadeUp}
          className={`mt-4 text-base sm:text-lg ${light ? "text-ink/65" : "text-muted"}`}
        >
          {subtitle}
        </m.p>
      )}
    </m.div>
  );
}
