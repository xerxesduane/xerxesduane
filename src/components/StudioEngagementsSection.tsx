import useInViewAnimation, { fadeClass } from "../hooks/useInViewAnimation";
import { ENGAGEMENTS } from "../data/content";

/**
 * Delivered engagements, by sector.
 *
 * This is the "is this person credible in MY industry?" section. A visitor
 * scanning for their own sector finds it here, with the work that was actually
 * delivered and — where one was measured — the result. No client names, by
 * design; see the ENGAGEMENTS comment in data/content.ts.
 */
export default function StudioEngagementsSection() {
  const { ref, inView } = useInViewAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      aria-labelledby="studio-engagements-heading"
      className="studio-reference-page studio-reference-section px-6 py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className={`flex flex-col items-center text-center ${fadeClass(inView)}`}>
          <p className="studio-reference-eyebrow mb-5">Engagements</p>
          <h2
            id="studio-engagements-heading"
            className="font-studio-body max-w-[620px] text-[30px] font-semibold leading-[1.06] tracking-tight text-[color:var(--studio-cream)] md:text-[42px]"
          >
            Find your sector,{" "}
            <span className="studio-accent">see what was built.</span>
          </h2>
        </div>

        <div
          className={`mt-12 grid gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-4 ${fadeClass(inView)}`}
          style={{ animationDelay: "0.15s" }}
        >
          {ENGAGEMENTS.map((e) => (
            <article
              key={e.sector}
              className="studio-reference-card flex flex-col rounded-2xl p-5 md:p-6"
            >
              <p className="font-studio-pixel text-[10px] uppercase leading-snug text-[color:var(--studio-gold)] md:text-[11px]">
                {e.sector}
              </p>
              <p className="font-studio-body mt-3 flex-1 text-sm leading-relaxed text-[color:var(--studio-cream-dim)]">
                {e.delivered}
              </p>
              {e.kpi && (
                <p className="font-studio-serif mt-4 border-t border-[color:var(--studio-line)] pt-4 text-base leading-snug text-[color:var(--studio-gold)]">
                  {e.kpi}
                </p>
              )}
            </article>
          ))}
        </div>

        <p
          className={`font-studio-body mt-10 text-center text-sm text-[color:var(--studio-cream-dim)] ${fadeClass(inView)}`}
          style={{ animationDelay: "0.25s" }}
        >
          Not listed? The work travels — legal, clinics, consultancies, real
          estate, trading, restaurants and design studios have all run on the
          same approach.{" "}
          <a
            href="#contact"
            className="text-[color:var(--studio-gold)] underline decoration-[color:var(--studio-gold)]/40 underline-offset-2 transition-opacity hover:opacity-80"
          >
            Ask in a free audit →
          </a>
        </p>
      </div>
    </section>
  );
}
