import { m } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger, VIEWPORT } from "../../lib/motion";
import Kinetic from "../fx/Kinetic";

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
      <m.span variants={fadeUp} className="eyebrow">
        <span className="h-px w-6 bg-gold/60" aria-hidden />
        {eyebrow}
      </m.span>
      <Kinetic as="h2" className="mt-4 text-3xl sm:text-4xl md:text-[2.85rem]">
        {title}
      </Kinetic>
      {subtitle && (
        <m.p variants={fadeUp} className="mt-4 text-base text-muted sm:text-lg">
          {subtitle}
        </m.p>
      )}
    </m.div>
  );
}
