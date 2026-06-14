import { m } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { PACKAGES, AUDIT_DELIVERABLES } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

const packageDetails = [
  ["60-minute deep-dive", "Plain-English roadmap", "Priorities before spending"],
  ["Defined scope", "Fixed quote", "Built and shipped"],
  ["Ongoing support", "One trusted contact", "Monthly momentum"],
];

export default function Packages() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 -z-10 h-80 bg-[radial-gradient(ellipse_48%_48%_at_50%_50%,rgba(218,164,66,0.11),transparent_70%)]"
      />
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
          className="relative mt-14 grid gap-3 md:grid-cols-3"
        >
          <div
            aria-hidden
            className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent md:block"
          />

          {PACKAGES.map((p, index) => (
            <m.article
              key={p.name}
              variants={fadeUp}
              data-cursor="view"
              className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 sm:p-7 ${
                p.featured
                  ? "border-gold/30 bg-cream text-ink shadow-[0_30px_100px_-65px_rgba(218,164,66,0.9)]"
                  : "glass glass-hover border-cream/10"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-mono text-xs font-semibold ${
                    p.featured
                      ? "bg-ink text-gold"
                      : "bg-gold/10 text-gold ring-1 ring-gold/20"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {p.featured && (
                  <span className="rounded-full border border-ink/10 bg-ink/[0.06] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/60">
                    Start here
                  </span>
                )}
              </div>

              <div className="mt-8">
                <span
                  className={`font-mono text-xs uppercase tracking-wider ${
                    p.featured ? "text-gold-deep" : "text-gold/80"
                  }`}
                >
                  {p.pitch}
                </span>
                <h3 className={`mt-3 text-2xl ${p.featured ? "!text-ink" : "text-cream"}`}>
                  {p.name}
                </h3>
                <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className={`font-display text-3xl ${p.featured ? "text-ink" : "text-gold"}`}>
                    {p.price}
                  </span>
                  <span className={`text-xs ${p.featured ? "text-ink/50" : "text-muted-dark"}`}>
                    {p.note}
                  </span>
                </div>
                <p className={`mt-5 text-sm leading-relaxed ${p.featured ? "text-ink/70" : "text-muted"}`}>
                  {p.body}
                </p>
              </div>

              <ul className={`mt-6 space-y-3 border-t pt-5 ${p.featured ? "border-ink/10" : "border-cream/8"}`}>
                {packageDetails[index].map((detail) => (
                  <li
                    key={detail}
                    className={`flex items-center gap-2.5 text-sm ${p.featured ? "text-ink/70" : "text-cream-dim"}`}
                  >
                    <Check size={15} className={p.featured ? "text-gold-deep" : "text-gold"} />
                    {detail}
                  </li>
                ))}
              </ul>

              {p.featured && (
                <div className="mt-5 rounded-xl border border-ink/10 bg-ink/[0.04] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-gold-deep">You walk away with</p>
                  <ul className="mt-2 space-y-1.5">
                    {AUDIT_DELIVERABLES.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-ink/70">
                        <Check size={14} className="mt-0.5 shrink-0 text-gold-deep" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <a
                href="/#contact"
                data-cursor="link"
                className={`mt-7 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 ${
                  p.featured
                    ? "bg-ink text-cream hover:bg-gold hover:text-ink"
                    : "border border-cream/15 text-cream hover:border-gold/50 hover:text-gold"
                }`}
              >
                {p.cta}
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </a>
            </m.article>
          ))}
        </m.div>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-cream/10 bg-cream/[0.04] px-5 py-4 text-center text-sm text-muted-dark">
          All prices are indicative starting points. You get one fixed quote
          after your free audit, no surprises and no lock-in.
        </div>
      </div>
    </section>
  );
}
