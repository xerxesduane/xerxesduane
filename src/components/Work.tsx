import { m } from "framer-motion";
import { CASE_STUDIES } from "../data/content";
import { stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";
import CaseStudyCard from "./CaseStudyCard";

export default function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-bl">
        <SectionHeading
          eyebrow="Case studies"
          title={
            <>
              Real businesses. <span className="text-gradient-gold">Quiet wins.</span>
            </>
          }
          subtitle="From full Odoo deployments to ad campaigns that pay for themselves, a sample of recent work across the UAE, the Philippines, and beyond."
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-14 grid gap-5 lg:grid-cols-2"
        >
          {CASE_STUDIES.map((c) => (
            <CaseStudyCard key={c.client} c={c} />
          ))}
        </m.div>

        <div className="mt-10 text-center">
          <a
            href="/case-studies"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gold transition-colors hover:text-gold-soft"
          >
            See all case studies
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
