import { m } from "framer-motion";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

// Replaces the old testimonials section. Instead of quotes, it points to the
// single most credible, fully-verifiable asset on the site: the live AI Lab.
const CHIPS = ["AI receptionist", "WhatsApp automation", "Quote + VAT", "Review responder", "Property listings"];

export default function ProofBand() {
  return (
    <section className="py-20 sm:py-28" aria-label="Proof — try the live AI Lab">
      <div className="container-bl">
        <SectionHeading
          eyebrow="Don't take my word for it"
          title={
            <>
              Proof you can <span className="text-gradient-gold">poke at.</span>
            </>
          }
          subtitle="Most agencies show you testimonials. I'll do one better — these are real, working AI tools I've built. The same automations I install for clients. Type into them; they respond for real."
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-6"
        >
          <m.div variants={fadeUp} className="flex flex-wrap justify-center gap-2">
            {CHIPS.map((c) => (
              <span
                key={c}
                className="rounded-full border border-cream/10 bg-cream/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-cream-dim"
              >
                {c}
              </span>
            ))}
          </m.div>

          <m.a
            variants={fadeUp}
            href="/ai-lab"
            data-cursor="link"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink-deep shadow-[0_14px_50px_-18px_rgba(218,164,66,0.8)] transition-colors hover:bg-gold-soft"
          >
            <FlaskConical size={16} />
            Try 30+ live AI tools
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </m.a>

          <m.p variants={fadeUp} className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-dark">
            No sign-up · your input isn't stored · they respond for real
          </m.p>
        </m.div>
      </div>
    </section>
  );
}
