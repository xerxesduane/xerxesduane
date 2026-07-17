import { ArrowUpRight } from "lucide-react";
import Button from "./Button";
import { AI_LAB_CARDS } from "../data/aiLabHome";

const featuredIds = new Set(["leadresponse", "pipeline", "process"]);

export default function StudioAILabSection() {
  const featured = AI_LAB_CARDS.filter((card) => featuredIds.has(card.demoId));

  return (
    <section id="studio-ai-lab" aria-labelledby="studio-ai-lab-heading" className="studio-reference-page studio-reference-section w-full overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">AI Lab &mdash; 37 live tools</p>
            <h2 id="studio-ai-lab-heading" className="editorial-serif mt-4 max-w-3xl text-4xl leading-[0.95] tracking-[-0.025em] text-cream sm:text-5xl lg:text-6xl">
              Test the tool before you fund the system.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-cream-dim lg:justify-self-end">
            Try practical AI for lead handling, Odoo planning and workflow automation. No sign-up, and sample data is enough.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {featured.map((card) => (
            <a
              key={card.demoId}
              href={`/ai-lab#${card.demoId}`}
              className="studio-reference-card group flex min-h-[340px] flex-col rounded-[28px] p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-ink-deep">
                  <card.icon className="h-5 w-5" aria-hidden />
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" aria-hidden />
              </div>
              <h3 className="editorial-serif mt-7 text-3xl text-cream">{card.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-cream-dim">{card.whatItDoes}</p>
              <span className="mt-auto inline-flex min-h-11 items-center pt-6 text-sm font-semibold text-gold">
                {card.cta}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row">
          <p className="text-sm text-muted">The full Lab includes search, categories and 37 working demos.</p>
          <Button variant="primary" href="/ai-lab">Open the AI Lab</Button>
        </div>
      </div>
    </section>
  );
}
