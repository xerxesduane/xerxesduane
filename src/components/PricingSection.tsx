import { ArrowUpRight } from "lucide-react";
import { CONTACT } from "../data/content";

const options = [
  {
    label: "Focused sprint",
    price: "From AED 1,500",
    detail: "One clearly scoped fix, automation or conversion improvement.",
  },
  {
    label: "Custom project",
    price: "From AED 5,000",
    detail: "A fixed-scope website, CRM, workflow, internal tool or connected system.",
  },
  {
    label: "Monthly partnership",
    price: "From AED 2,500",
    detail: "Ongoing systems support, improvements, reporting and maintenance.",
  },
];

export default function PricingSection() {
  return (
    <section className="bg-[#071724] px-5 py-16 text-cream sm:px-8 sm:py-20" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Clear starting points</p>
            <h2 id="pricing-heading" className="editorial-serif mt-3 text-3xl sm:text-4xl">Choose the level of help you need.</h2>
          </div>
          <a
            href={CONTACT.calendar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 shrink-0 items-center gap-2 self-start rounded-full bg-gold px-6 text-sm font-semibold text-ink-deep transition-colors hover:bg-gold-soft"
          >
            Talk through what fits
            <ArrowUpRight size={16} aria-hidden />
          </a>
        </div>

        <div className="grid md:grid-cols-3">
          {options.map((option) => (
            <article key={option.label} className="border-b border-white/10 py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{option.label}</p>
              <h3 className="mt-3 text-2xl font-semibold text-gold">{option.price}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-dim">{option.detail}</p>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          Indicative starting prices. Every engagement gets a fixed, plain-English quote after the audit. Software licences and ad spend are separate.
        </p>
      </div>
    </section>
  );
}
