import useInViewAnimation, { fadeClass } from "../hooks/useInViewAnimation";
import { RESULTS } from "../data/content";
import { TRUST_SUMMARY } from "../data/trust";

/**
 * Proof band — the first thing a visitor meets after the intro.
 *
 * It occupies the slot the reference-GIF marquee used to hold. That strip
 * showed interface directions the studio *could* build; this shows what it
 * already did, with the number attached. Every figure traces to a CASE_STUDIES
 * entry, so nothing here is estimated.
 *
 * Styled with the studio-reference tokens so it reads as part of the same page
 * rather than a bolted-on section.
 */

/** The four figures that carry the most weight, in the order they persuade. */
const HEADLINE = RESULTS.slice(0, 4);

export default function StudioProofBand() {
  const { ref, inView } = useInViewAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      id="proof"
      aria-labelledby="studio-proof-heading"
      className="studio-reference-page studio-reference-section scroll-mt-24 px-6 py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className={`flex flex-col items-center text-center ${fadeClass(inView)}`}>
          <p className="studio-reference-eyebrow mb-5">Measured results</p>
          <h2
            id="studio-proof-heading"
            className="font-studio-body max-w-[620px] text-[30px] font-semibold leading-[1.06] tracking-tight text-[color:var(--studio-cream)] md:text-[42px]"
          >
            Numbers from real projects,{" "}
            <span className="studio-accent">not adjectives.</span>
          </h2>
          <p className="font-studio-body mt-4 max-w-[560px] text-sm leading-relaxed text-[color:var(--studio-cream-dim)] md:text-base">
            {TRUST_SUMMARY.line} Client names stay private — the work and the
            figures do not.
          </p>
          {TRUST_SUMMARY.google && (
            <a
              href={TRUST_SUMMARY.google.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-studio-pixel mt-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--studio-line)] bg-white/5 px-3.5 py-1.5 text-[11px] uppercase tracking-wider text-[color:var(--studio-cream-dim)] transition-colors hover:text-[color:var(--studio-gold)]"
            >
              <span aria-hidden className="text-[color:var(--studio-gold)]">
                {"\u2605\u2605\u2605\u2605\u2605"}
              </span>
              {TRUST_SUMMARY.google.rating.toFixed(1)} on Google ·{" "}
              {TRUST_SUMMARY.google.reviewCount} reviews
            </a>
          )}
        </div>

        {/* Headline figures */}
        <dl
          className={`mt-12 grid grid-cols-2 gap-4 md:mt-14 md:grid-cols-4 md:gap-5 ${fadeClass(inView)}`}
          style={{ animationDelay: "0.15s" }}
        >
          {HEADLINE.map((r) => (
            <div
              key={r.value + r.label}
              className="studio-reference-card flex flex-col rounded-2xl p-5 md:p-6"
            >
              <dt className="sr-only">{r.label}</dt>
              <dd className="contents">
                <span className="font-studio-serif text-[34px] leading-none text-[color:var(--studio-gold)] md:text-[44px]">
                  {r.value}
                </span>
                <span className="font-studio-body mt-3 text-xs leading-snug text-[color:var(--studio-cream)] md:text-sm">
                  {r.label}
                </span>
                <span className="font-studio-pixel mt-3 text-[10px] uppercase leading-snug text-[color:var(--studio-muted)] md:text-[11px]">
                  {r.category}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        {/* One line of context per figure, so the numbers can be believed */}
        <div
          className={`mt-10 grid gap-x-10 gap-y-6 border-t border-[color:var(--studio-line)] pt-10 md:grid-cols-2 ${fadeClass(inView)}`}
          style={{ animationDelay: "0.25s" }}
        >
          {HEADLINE.map((r) => (
            <div key={r.proof + r.value}>
              <p className="font-studio-pixel text-[10px] uppercase text-[color:var(--studio-gold)]/80 md:text-[11px]">
                {r.proof}
              </p>
              <p className="font-studio-body mt-1.5 text-sm leading-relaxed text-[color:var(--studio-cream-dim)]">
                {r.whatChanged}
              </p>
            </div>
          ))}
        </div>

        <p
          className={`font-studio-body mt-10 text-center text-xs text-[color:var(--studio-muted)] ${fadeClass(inView)}`}
          style={{ animationDelay: "0.3s" }}
        >
          Figures are taken from delivered projects and stated as measured. No
          projections, and no result is promised in advance.
        </p>
      </div>
    </section>
  );
}
