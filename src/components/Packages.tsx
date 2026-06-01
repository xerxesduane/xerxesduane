import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PACKAGES } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

export default function Packages() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-bl">
        <SectionHeading
          eyebrow="Ways to work together"
          title={
            <>
              Start small. <span className="text-gradient-gold">Grow when it's right.</span>
            </>
          }
          subtitle="No cold retainers. Start with an audit, become a project, grow into a partnership, naturally."
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {PACKAGES.map((p) => (
            <m.div
              key={p.name}
              variants={fadeUp}
              className={`glass glass-hover relative flex flex-col rounded-3xl p-7 ${
                p.featured ? "border-glow" : ""
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-gold px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-deep">
                  Most popular
                </span>
              )}
              <span className="font-mono text-xs uppercase tracking-wider text-gold/80">
                {p.pitch}
              </span>
              <h3 className="mt-3 font-display text-2xl text-cream">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-3xl text-gold">{p.price}</span>
                <span className="text-xs text-muted-dark">{p.note}</span>
              </div>
              <p className="mt-4 flex-1 text-sm text-muted">{p.body}</p>
              <a
                href="#contact"
                className={`mt-6 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 ${
                  p.featured
                    ? "bg-gold text-ink-deep hover:bg-gold-soft"
                    : "border border-cream/15 text-cream hover:border-gold/50 hover:text-gold"
                }`}
              >
                {p.cta}
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </a>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
