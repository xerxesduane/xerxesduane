import { m } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { CASE_STUDIES } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import CaseStudyCard from "../components/CaseStudyCard";
import Kinetic from "../components/fx/Kinetic";
import Contact from "../components/Contact";

export default function CaseStudies() {
  return (
    <>
      <section id="top" className="relative overflow-hidden pt-36 pb-12 sm:pt-44 sm:pb-16">
        <div className="container-bl">
          <m.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-3xl text-center"
          >
            <m.span variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Case studies
            </m.span>
            <Kinetic as="h1" className="mt-7 text-4xl leading-[1.06] sm:text-5xl md:text-6xl">
              Real businesses. <span className="text-gradient-gold italic">Real systems. Real results.</span>
            </Kinetic>
            <m.p variants={fadeUp} className="mx-auto mt-7 max-w-2xl text-lg text-muted sm:text-xl">
              A closer look at the work, from full Odoo deployments to ad
              campaigns that pay for themselves, across the UAE, the Philippines,
              and beyond.
            </m.p>
            <m.div variants={fadeUp} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/#contact"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep shadow-[0_14px_50px_-12px_rgba(217,164,65,0.8)] transition duration-300 hover:bg-gold-soft sm:w-auto"
              >
                Book your free systems audit
                <ArrowUpRight size={17} strokeWidth={2.5} />
              </a>
              <a
                href="/"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/15 px-7 py-3.5 text-sm font-semibold text-cream transition duration-300 hover:border-gold/50 hover:text-gold sm:w-auto"
              >
                <ArrowLeft size={16} strokeWidth={2.2} />
                Back to home
              </a>
            </m.div>
          </m.div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container-bl">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid gap-5 lg:grid-cols-2"
          >
            {CASE_STUDIES.map((c) => (
              <CaseStudyCard key={c.client} c={c} />
            ))}
          </m.div>
          <m.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mt-10 text-center text-sm text-muted"
          >
            Some client work is under NDA and not shown here. Ask in your audit.
          </m.p>
        </div>
      </section>

      <Contact />
    </>
  );
}
