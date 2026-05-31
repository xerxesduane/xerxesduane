import { motion } from "framer-motion";
import { PROCESS } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

export default function Process() {
  return (
    <section id="process" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-bl">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              Listen deeply. Plan honestly.{" "}
              <span className="text-gradient-gold">Build calmly.</span>
            </>
          }
          subtitle="From 'I think I need this' to 'I can't believe we ran the business without it.'"
        />

        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="relative mt-14 grid gap-4 md:grid-cols-5"
        >
          {/* connecting line (desktop) */}
          <span
            aria-hidden
            className="absolute left-0 right-0 top-[2.1rem] hidden h-px bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 md:block"
          />
          {PROCESS.map((step) => (
            <motion.li
              key={step.no}
              variants={fadeUp}
              className="glass relative rounded-2xl p-5"
            >
              <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gold font-mono text-sm font-semibold text-ink-deep">
                {step.no}
              </span>
              <h3 className="mt-4 text-lg text-cream">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
