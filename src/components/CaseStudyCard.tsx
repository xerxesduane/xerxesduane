import { m } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { fadeUp } from "../lib/motion";
import type { CaseStudy } from "../data/content";

/** Small uppercase section label, in the technical face. */
function Label({ children }: { children: string }) {
  return (
    <p className="mt-4 font-technical text-[0.62rem] font-bold uppercase tracking-[0.16em] text-accent-deep">
      {children}
    </p>
  );
}

/**
 * One case study, in the panel language: hairline card, gold technical labels,
 * measured numbers pulled out as tiles.
 */
export default function CaseStudyCard({ c }: { c: CaseStudy }) {
  return (
    <m.article
      variants={fadeUp}
      className="flex flex-col rounded-card border border-line bg-panel p-5 shadow-card transition duration-300 ease-smooth hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card-hover sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-accent/12 px-3 py-1 font-technical text-[0.62rem] font-bold uppercase tracking-[0.14em] text-accent-deep">
          {c.category}
        </span>
        <span className="font-technical text-xs text-fg-faint">{c.location}</span>
      </div>

      <h3 className="mt-4 font-display text-2xl font-semibold text-fg">{c.client}</h3>

      <Label>The problem</Label>
      <p className="mt-1.5 text-sm leading-snug text-fg-soft">{c.challenge}</p>

      <Label>What I built</Label>
      <p className="mt-1.5 text-sm leading-snug text-fg-soft">{c.summary}</p>

      {c.stats && (
        <dl className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {c.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-line bg-panel-alt p-3 text-center"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="font-display text-xl font-extrabold text-accent-deep">
                  {s.value}
                </span>
                <span className="mt-1 block text-[0.68rem] leading-tight text-fg-soft">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      )}

      {c.scope && (
        <ul className="mt-5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {c.scope.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-fg-soft">
              <Check size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-5">
        <div className="border-t border-line pt-4">
          <p className="font-technical text-[0.62rem] font-bold uppercase tracking-[0.16em] text-accent-deep">
            What changed
          </p>
          <p className="mt-1.5 font-display text-base italic text-fg">{c.takeaway}</p>
        </div>
        <a
          href={`/case-studies/${c.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 font-technical text-[0.68rem] font-bold uppercase tracking-[0.12em] text-fg transition hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
        >
          Read case study
          <ArrowUpRight size={13} strokeWidth={2.4} aria-hidden />
        </a>
      </div>
    </m.article>
  );
}
