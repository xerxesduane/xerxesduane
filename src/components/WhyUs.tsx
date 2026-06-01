import { m } from "framer-motion";
import { Check, X } from "lucide-react";
import { COMPARISON } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

export default function WhyUs() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-bl">
        <SectionHeading
          eyebrow="Why Threshold Works"
          title={
            <>
              The difference is{" "}
              <span className="text-gradient-gold">how we work.</span>
            </>
          }
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-3xl"
        >
          {/* header row */}
          <m.div
            variants={fadeUp}
            className="grid grid-cols-2 gap-px text-sm font-semibold"
          >
            <div className="bg-ink-deep/60 px-5 py-4 font-mono text-xs uppercase tracking-wider text-muted-dark">
              Typical agency
            </div>
            <div className="bg-gold/10 px-5 py-4 font-mono text-xs uppercase tracking-wider text-gold">
              Threshold Works
            </div>
          </m.div>

          {COMPARISON.map((row) => (
            <m.div
              variants={fadeUp}
              key={row.bayt}
              className="grid grid-cols-2 gap-px border-t border-cream/5"
            >
              <div className="flex items-start gap-2.5 bg-ink-surface/40 px-5 py-4 text-sm text-muted">
                <X size={16} className="mt-0.5 shrink-0 text-muted-dark" />
                {row.agency}
              </div>
              <div className="flex items-start gap-2.5 bg-olive/10 px-5 py-4 text-sm text-cream">
                <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                {row.bayt}
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
