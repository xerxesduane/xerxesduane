import { m } from "framer-motion";
import { Globe, Receipt, Target, CreditCard } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";

const PAINS = [
  { icon: Globe, text: "Your website doesn't talk to your CRM." },
  { icon: Receipt, text: "Your CRM doesn't talk to your invoicing." },
  { icon: Target, text: "Your ads spend money on people who'll never convert." },
  { icon: CreditCard, text: "And you're paying for software you don't fully use." },
];

export default function Diagnosis() {
  return (
    <section id="opportunity" className="scroll-mt-24 py-24 sm:py-32" aria-label="The opportunity">
      <div className="container-bl">
        <SectionHeading
          eyebrow="The opportunity"
          title={
            <>
              Most small businesses in Dubai are one connected system away from{" "}
              <span className="text-gradient-gold">real growth.</span>
            </>
          }
          subtitle="Great marketing brings you leads. Systems that actually work together turn those leads into paying customers, and hand you back your time."
        />

        {/* the four quiet leaks */}
        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2"
        >
          {PAINS.map((p) => (
            <m.div
              key={p.text}
              variants={fadeUp}
              className="glass glass-hover flex items-start gap-4 rounded-2xl p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <p.icon size={19} strokeWidth={1.8} />
              </span>
              <p className="text-[15px] leading-relaxed text-cream-dim">{p.text}</p>
            </m.div>
          ))}
        </m.div>

        {/* the resolution */}
        <Reveal delay={0.1} className="mx-auto mt-14 max-w-2xl text-center">
          <span aria-hidden className="mx-auto block h-px w-16 bg-gold/50" />
          <p className="mt-8 font-display text-xl leading-relaxed text-cream sm:text-2xl">
            You don't need more tools. You need someone to look at the whole
            picture, fix what's quietly costing you, and build the parts that
            are missing, calmly, honestly, in plain language.
          </p>
          <p className="mt-6 font-display text-xl italic text-gold">
            That's what Threshold Works is for.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
