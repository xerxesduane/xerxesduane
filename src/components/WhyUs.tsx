import { m } from "framer-motion";
import { Check, X } from "lucide-react";
import { COMPARISON } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

export default function WhyUs() {
  return (
    <section id="why" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-bl">
        <SectionHeading
          eyebrow="Why Xerxes Duane"
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
          className="glass border-glow mx-auto mt-14 max-w-3xl overflow-hidden rounded-3xl"
        >
          {/* header row */}
          <m.div variants={fadeUp} className="grid grid-cols-2 text-sm font-semibold">
            <div className="px-5 py-4 font-mono text-xs uppercase tracking-wider text-muted-dark">
              Typical agency
            </div>
            <div className="border-l border-gold/20 bg-gold/[0.07] px-5 py-4 font-mono text-xs uppercase tracking-wider text-gold">
              Xerxes Duane
            </div>
          </m.div>

          {COMPARISON.map((row) => (
            <m.div
              variants={fadeUp}
              key={row.bayt}
              className="group grid grid-cols-2 border-t border-cream/5"
            >
              <div className="flex items-start gap-3 px-5 py-4 text-sm text-muted">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cream/5 text-muted-dark">
                  <X size={12} strokeWidth={2.2} />
                </span>
                {row.agency}
              </div>
              <div className="flex items-start gap-3 border-l border-gold/20 bg-gold/[0.07] px-5 py-4 text-sm text-cream transition-colors duration-300 group-hover:bg-gold/[0.11]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Check size={12} strokeWidth={2.4} />
                </span>
                {row.bayt}
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
