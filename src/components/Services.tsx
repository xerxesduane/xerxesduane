import { m } from "framer-motion";
import { ArrowUpRight, Magnet, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";
import { OUTCOMES, CREATIVE_SUPPORT } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

const OUTCOME_ICONS: LucideIcon[] = [Magnet, ShieldCheck, Workflow];
const OUTCOME_PRICES = ["from AED 2,500", "from AED 4,000", "from AED 6,000"];

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 -z-10 h-96 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(218,164,66,0.13),transparent_68%)]"
      />
      <div className="container-bl">
        <SectionHeading
          eyebrow="What I build"
          title={
            <>
              Everything I build serves{" "}
              <span className="text-gradient-gold">one of three outcomes.</span>
            </>
          }
          subtitle="Not a menu of twelve disconnected services — one connected system, built in the order your business needs it."
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-14 grid gap-4 lg:grid-cols-3"
        >
          {OUTCOMES.map((outcome, index) => {
            const Icon = OUTCOME_ICONS[index];
            return (
              <m.article
                key={outcome.title}
                variants={fadeUp}
                className="glass glass-hover group relative flex flex-col overflow-hidden rounded-3xl p-6 sm:p-7"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold ring-1 ring-gold/20 transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-gold group-hover:text-ink">
                    <Icon size={22} strokeWidth={1.7} />
                  </span>
                  <span className="font-mono text-xs text-muted-dark">{outcome.no}</span>
                </div>

                <h3 className="mt-6 text-2xl leading-tight text-cream sm:text-[1.7rem]">
                  {outcome.title}
                </h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-gold/80">
                  {outcome.promise}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{outcome.body}</p>

                <ul className="mt-6 space-y-1 border-t border-cream/8 pt-4">
                  {outcome.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        data-cursor="link"
                        className="group/item flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-cream-dim transition-colors hover:bg-cream/[0.04] hover:text-gold"
                      >
                        {item.label}
                        <ArrowUpRight
                          size={14}
                          strokeWidth={2}
                          className="shrink-0 text-muted-dark opacity-0 transition group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:text-gold group-hover/item:opacity-100"
                          aria-hidden
                        />
                      </a>
                    </li>
                  ))}
                </ul>

                <p className="mt-auto border-t border-cream/8 pt-4 font-mono text-xs text-gold">
                  {OUTCOME_PRICES[index]}
                </p>
              </m.article>
            );
          })}
        </m.div>

        {/* Creative support — real capability, deliberately not equal-billed */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center"
        >
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-dark">
            Backed by in-house creative:
          </span>
          {CREATIVE_SUPPORT.map((c) => (
            <a
              key={c.label}
              href={c.href}
              data-cursor="link"
              className="rounded-full border border-cream/10 px-3.5 py-1.5 text-xs text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
            >
              {c.label}
            </a>
          ))}
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-cream/10 bg-cream/[0.04] px-5 py-5 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <p className="text-sm text-muted-dark">
            Indicative starting prices. You get one fixed quote after your free
            systems audit, no surprises and no lock-in. Ad spend and software
            licences are billed separately.
          </p>
          <a
            href="#contact"
            data-cursor="link"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/30 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-gold transition hover:border-gold hover:bg-gold hover:text-ink"
          >
            Start with the audit
            <ArrowUpRight size={14} strokeWidth={2.4} />
          </a>
        </m.div>
      </div>
    </section>
  );
}
