import { m } from "framer-motion";
import { ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { fadeUp } from "../lib/motion";
import type { CaseStudy } from "../data/content";

export default function CaseStudyCard({ c }: { c: CaseStudy }) {
  return (
    <m.article
      variants={fadeUp}
      className="glass glass-hover flex flex-col rounded-3xl p-7 sm:p-9"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-gold/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-gold">
          {c.category}
        </span>
        <span className="font-mono text-xs text-muted-dark">{c.location}</span>
      </div>

      {c.url ? (
        <a
          href={c.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mt-5 inline-flex items-center gap-2 font-display text-2xl text-cream transition-colors hover:text-gold sm:text-3xl"
        >
          {c.client}
          <ExternalLink
            size={16}
            className="text-muted-dark transition-colors group-hover/link:text-gold"
            aria-hidden
          />
        </a>
      ) : (
        <h3 className="mt-5 font-display text-2xl text-cream sm:text-3xl">
          {c.client}
        </h3>
      )}
      <p className="mt-3 text-sm text-muted">{c.challenge}</p>

      {c.stats && (
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {c.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-cream/8 bg-ink-deep/40 p-3 text-center"
            >
              <div className="font-mono text-xl font-semibold text-gold sm:text-2xl">
                {s.value}
              </div>
              <div className="mt-1 text-[11px] leading-tight text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {c.scope && (
        <ul className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {c.scope.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-cream-dim">
              <Check size={15} className="shrink-0 text-gold" />
              {item}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-6 flex items-center gap-2 border-t border-cream/8 pt-5 font-display text-base italic text-cream-dim">
        <ArrowUpRight size={16} className="text-gold" />
        {c.takeaway}
      </p>
    </m.article>
  );
}
