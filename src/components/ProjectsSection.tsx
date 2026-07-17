import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { CASE_STUDIES } from "../data/content";

export default function ProjectsSection() {
  return (
    <section id="work" className="light-focus-surface scroll-mt-24 bg-[#e5e2db] px-5 py-20 text-[#101820] sm:px-8 sm:py-28" aria-labelledby="work-heading">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#866420]">Delivered work</p>
            <h2 id="work-heading" className="editorial-serif mt-4 max-w-2xl text-4xl leading-[0.95] tracking-[-0.025em] sm:text-5xl">
              Systems and campaigns with evidence behind them.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-black/60">
            No interface references presented as client work. These are the businesses, scopes and tracked outcomes actually delivered.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {CASE_STUDIES.map((study) => (
            <article key={study.slug} className="flex flex-col rounded-[28px] border border-black/10 bg-[#f3f1ec] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-[#0c2432] px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-gold">
                  {study.category}
                </span>
                <span className="text-xs text-black/50">{study.location}</span>
              </div>

              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{study.client}</h3>
              <p className="mt-4 text-sm leading-relaxed text-black/60">{study.summary}</p>

              {study.stats && (
                <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-4">
                  {study.stats.map((stat) => (
                    <div key={stat.label} className="bg-[#f3f1ec] p-3 text-center">
                      <dt className="text-[11px] leading-tight text-black/50">{stat.label}</dt>
                      <dd className="editorial-serif order-first mb-1 text-2xl text-[#866420]">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {study.scope && (
                <ul className="mt-7 grid gap-2 border-t border-black/10 pt-5 sm:grid-cols-2">
                  {study.scope.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-black/60">
                      <Check size={15} className="mt-0.5 shrink-0 text-[#866420]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-7 border-l-2 border-[#b8892f] pl-4 text-sm italic leading-relaxed text-black/70">{study.takeaway}</p>
              <a
                href={`/case-studies/${study.slug}`}
                className="group mt-auto inline-flex min-h-12 items-center gap-2 pt-7 text-sm font-semibold text-[#6f531b]"
              >
                Read the case study
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a href="/case-studies" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-black/20 px-6 text-sm font-semibold transition-colors hover:bg-black hover:text-white">
            See all case studies
            <ArrowRight size={16} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
