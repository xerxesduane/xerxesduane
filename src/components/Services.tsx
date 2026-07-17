import { ArrowUpRight, Magnet, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";
import { OUTCOMES } from "../data/content";

const icons: LucideIcon[] = [Magnet, ShieldCheck, Workflow];

export default function Services() {
  return (
    <section id="services" className="light-focus-surface scroll-mt-24 bg-[#efede8] px-5 py-20 text-[#101820] sm:px-8 sm:py-28" aria-labelledby="services-heading">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#866420]">What I connect</p>
            <h2 id="services-heading" className="editorial-serif mt-4 max-w-xl text-4xl leading-[0.95] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
              Three outcomes. One operating system.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-black/70 sm:text-lg lg:justify-self-end">
            Start with the leak that costs you most. I connect the website, sales tools, operations and automation in the order your business actually needs.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {OUTCOMES.map((outcome, index) => {
            const Icon = icons[index] ?? Workflow;
            return (
              <article key={outcome.title} className="flex flex-col rounded-[28px] border border-black/10 bg-white/60 p-6 shadow-[0_24px_80px_-55px_rgba(16,24,32,0.5)] sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0c2432] text-gold">
                    <Icon size={21} strokeWidth={1.7} aria-hidden />
                  </span>
                  <span className="font-mono text-xs text-black/40">{outcome.no}</span>
                </div>
                <h3 className="mt-7 text-2xl font-semibold tracking-[-0.02em]">{outcome.title}</h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#866420]">{outcome.promise}</p>
                <p className="mt-5 text-sm leading-relaxed text-black/60">{outcome.body}</p>
                <ul className="mt-6 border-t border-black/10 pt-3">
                  {outcome.items.slice(0, 4).map((item) => (
                    <li key={item.href + item.label}>
                      <a
                        href={item.href}
                        className="group flex min-h-11 items-center justify-between gap-3 border-b border-black/10 text-sm font-medium text-black/70 transition-colors hover:text-[#866420]"
                      >
                        {item.label}
                        <ArrowUpRight size={15} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-black/10 pt-7 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm text-black/60">
            Not sure where to start? The free audit maps the handoffs, duplicate work and missed follow-ups before any build is proposed.
          </p>
          <a href="#contact" className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-[#0c2432] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#16394f]">
            Start with the audit
            <ArrowUpRight size={16} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
