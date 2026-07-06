import { ArrowUpRight } from "lucide-react";
import useInViewAnimation, { fadeClass } from "../hooks/useInViewAnimation";
import Button from "./Button";
import { AI_LAB_CARDS, AI_LAB_TRUST } from "../data/aiLabHome";

/**
 * Studio-reference AI Lab section: the six live, Groq-backed demos from
 * aiLabHome.ts rendered as reference-style cards. Everything links into the
 * real /ai-lab demos — nothing here is mocked.
 */
export default function StudioAILabSection() {
  const { ref, inView } = useInViewAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      id="studio-ai-lab"
      aria-labelledby="studio-ai-lab-heading"
      className="studio-reference-page w-full bg-[#FDFCFA] px-6 py-12 md:py-16"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`font-studio-pixel text-2xl leading-none text-[#051A24] md:text-3xl ${fadeClass(inView)}`}
            style={{ animationDelay: "0.1s" }}
          >
            AI LAB
          </p>
          <h2
            id="studio-ai-lab-heading"
            className={`font-studio-body mt-4 text-[32px] leading-[1.1] tracking-tight text-[#051A24] md:text-[40px] lg:text-[44px] ${fadeClass(inView)}`}
            style={{ animationDelay: "0.2s" }}
          >
            Try the AI <span className="font-studio-serif">before</span> you buy the{" "}
            <span className="font-studio-serif">system.</span>
          </h2>
          <p
            className={`font-studio-body mt-5 text-sm leading-relaxed text-[#273C46] md:text-base ${fadeClass(inView)}`}
            style={{ animationDelay: "0.3s" }}
          >
            Live tools built around real UAE workflows — quoting, WhatsApp leads, Odoo
            readiness, bilingual replies. Open one, type your own scenario, and see what
            practical AI feels like in your business.
          </p>
          <ul
            className={`mt-5 flex flex-wrap items-center justify-center gap-2 ${fadeClass(inView)}`}
            style={{ animationDelay: "0.4s" }}
            aria-label="AI Lab facts"
          >
            {AI_LAB_TRUST.map((t) => (
              <li
                key={t}
                className="font-studio-body rounded-full bg-white px-4 py-1.5 text-xs text-[#051A24] shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_2px_8px_rgba(0,0,0,0.06)]"
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
              className={`group flex flex-col rounded-[32px] bg-white p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1 ${fadeClass(inView)}`}
              style={{ animationDelay: `${0.1 + (i % 3) * 0.1}s` }}
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#051A24] text-white">
                  <card.icon aria-hidden className="h-5 w-5" />
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="h-5 w-5 text-[#051A24]/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#051A24]"
                />
              </div>
              <h3 className="font-studio-serif mt-6 text-xl font-semibold text-[#051A24] md:text-2xl">
                {card.title}
              </h3>
              <p className="font-studio-body mt-3 text-sm leading-relaxed text-[#051A24]/70">
                {card.whatItDoes}
              </p>
              <p className="font-studio-body mt-4 text-xs italic text-[#273C46]">
                Try it: “{card.example}”
              </p>
              <span className="font-studio-body mt-auto pt-6 text-sm font-medium text-[#051A24] underline-offset-4 group-hover:underline">
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
