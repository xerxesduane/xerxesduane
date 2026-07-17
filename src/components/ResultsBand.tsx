import { ArrowRight, Star } from "lucide-react";
import { TRUST } from "../data/trust";

const proof = [
  {
    value: "54K",
    label: "people reached",
    context: "AYA Home Spa \u2014 Meta Ads",
    href: "/case-studies/aya-home-spa-meta-ads",
  },
  {
    value: "791",
    label: "customer conversations",
    context: "AYA Home Spa \u2014 Meta Ads",
    href: "/case-studies/aya-home-spa-meta-ads",
  },
  {
    value: "610",
    label: "tracked conversions",
    context: "Wellington \u2014 Google Ads",
    href: "/case-studies/wellington-cash-for-cars-google-ads",
  },
  {
    value: TRUST.clientCount ? `${TRUST.clientCount}+` : "50+",
    label: "businesses supported",
    context: `Independent since ${TRUST.since}`,
    href: "/about",
  },
];

export default function ResultsBand() {
  const google = TRUST.enabled ? TRUST.google : null;

  return (
    <section id="results" className="scroll-mt-24 bg-[#0c2432] py-14 text-[#f4efe6] sm:py-16" aria-labelledby="results-heading">
      <div className="container-bl">
        <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Delivered proof</p>
            <h2 id="results-heading" className="editorial-serif mt-3 max-w-2xl text-3xl leading-tight sm:text-4xl">
              Real outcomes from real client work.
            </h2>
          </div>
          <a
            href="/case-studies"
            className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
          >
            View the evidence
            <ArrowRight size={16} aria-hidden />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {proof.map((item) => (
            <a
              key={item.value + item.label}
              href={item.href}
              className="group flex min-h-44 flex-col justify-between border-b border-white/10 py-7 sm:px-6 sm:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <div>
                <p className="editorial-serif text-5xl leading-none text-gold sm:text-6xl">{item.value}</p>
                <p className="mt-2 text-sm font-semibold text-[#f4efe6]">{item.label}</p>
              </div>
              <p className="mt-6 flex items-center justify-between gap-3 text-xs text-[#9fb0b8]">
                {item.context}
                <ArrowRight size={14} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
              </p>
            </a>
          ))}
        </div>

        {google && (
          <a
            href={google.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm text-[#d8cfc0] transition-colors hover:border-gold/50 hover:text-gold"
            aria-label={`Rated ${google.rating.toFixed(1)} out of 5 from ${google.reviewCount} Google reviews`}
          >
            <Star size={15} fill="currentColor" className="text-gold" aria-hidden />
            <strong className="text-[#f4efe6]">{google.rating.toFixed(1)}</strong>
            from {google.reviewCount} Google reviews
          </a>
        )}
      </div>
    </section>
  );
}
