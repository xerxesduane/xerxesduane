import { ArrowUpRight } from "lucide-react";
import useInViewAnimation, { fadeClass } from "../hooks/useInViewAnimation";
import Button from "./Button";
import { AI_LAB_CARDS, AI_LAB_TRUST } from "../data/aiLabHome";

export default function StudioAILabSection() {
  const { ref, inView } = useInViewAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      id="studio-ai-lab"
      aria-labelledby="studio-ai-lab-heading"
      className="studio-reference-page studio-reference-section studio-grain w-full overflow-hidden px-6 py-14 md:py-20"
    >
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`studio-reference-eyebrow mx-auto ${fadeClass(inView)}`}
            style={{ animationDelay: "0.1s" }}
          >
            AI LAB - 37 TOOLS
          </p>
          <h2
            id="studio-ai-lab-heading"
            className={`font-studio-body mt-7 text-[38px] font-semibold leading-[0.98] tracking-tight text-[color:var(--studio-cream)] md:text-[56px] lg:text-[64px] ${fadeClass(inView)}`}
            style={{ animationDelay: "0.2s" }}
          >
            Try the AI <span className="studio-accent">before</span> you buy the{" "}
            <span className="studio-accent">system.</span>
          </h2>
          <p
            className={`font-studio-body mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[color:var(--studio-cream-dim)] md:text-base ${fadeClass(inView)}`}
            style={{ animationDelay: "0.3s" }}
          >
            37 real working tools built around the same practical AI patterns I use in
            client products. Type into them and see what useful AI can do inside a
            business workflow.
          </p>
          <ul
            className={`mt-5 flex flex-wrap items-center justify-center gap-2 ${fadeClass(inView)}`}
            style={{ animationDelay: "0.4s" }}
            aria-label="AI Lab facts"
          >
            {AI_LAB_TRUST.map((t) => (
              <li
                key={t}
                className="font-studio-body rounded-full border border-[color:var(--studio-line)] bg-white/[0.055] px-4 py-1.5 text-xs text-[color:var(--studio-cream)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AI_LAB_CARDS.map((card, i) => (
            <a
              key={card.demoId}
              href={`/ai-lab#${card.demoId}`}
              className={`studio-reference-card group flex flex-col rounded-[28px] p-8 transition-transform duration-300 hover:-translate-y-1 ${fadeClass(inView)}`}
              style={{ animationDelay: `${0.1 + (i % 3) * 0.1}s` }}
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--studio-gold)] text-[color:var(--studio-ink)]">
                  <card.icon aria-hidden className="h-5 w-5" />
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="h-5 w-5 text-[rgba(216,207,192,0.6)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--studio-gold)]"
                />
              </div>
              <h3 className="font-studio-serif mt-6 text-2xl text-[color:var(--studio-cream)] md:text-3xl">
                {card.title}
              </h3>
              <p className="font-studio-body mt-3 text-sm leading-relaxed text-[color:var(--studio-cream-dim)]">
                {card.whatItDoes}
              </p>
              <p className="font-studio-body mt-4 text-xs italic text-[color:var(--studio-muted)]">
                Try it: "{card.example}"
              </p>
              <span className="font-studio-body mt-auto pt-6 text-sm font-medium text-[color:var(--studio-gold)] underline-offset-4 group-hover:underline">
                {card.cta}
              </span>
            </a>
          ))}
        </div>

        <div
          className={`mt-12 flex justify-center ${fadeClass(inView)}`}
          style={{ animationDelay: "0.5s" }}
        >
          <Button variant="primary" href="/ai-lab">
            Open the AI Lab
          </Button>
        </div>
      </div>
    </section>
  );
}
