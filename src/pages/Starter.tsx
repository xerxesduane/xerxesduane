import { m } from "framer-motion";
import { ArrowUpRight, Check, X } from "lucide-react";
import PageHeader from "../components/page/PageHeader";
import { GhostAction, PrimaryAction } from "../components/page/PageActions";
import { NONPROFIT, STARTER, aed, priceFor, priceLabel } from "../data/pricing";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";

/**
 * The Starter: the one page for someone who cannot spend five figures.
 *
 * Every other page on this site sells range. This one sells a ceiling, so it
 * is built the opposite way round: the number comes first, what is excluded
 * gets as much room as what is included, and there is no "from". Someone
 * arriving here has already decided their budget and is checking whether it
 * buys anything real.
 *
 * All of it reads from STARTER in data/pricing.ts, which is also what the
 * pricing table, the home card and the assistant quote.
 */
export default function Starter() {
  const charity = STARTER.price * NONPROFIT.rate;

  return (
    <>
      <PageHeader
        eyebrow="The Starter"
        title={<>{STARTER.tagline}</>}
        lede="A finished one-page website at a price fixed before we begin. Not a deposit, and not a template with someone else's logo swapped out."
        meta={
          <span>
            <strong className="font-bold text-accent-deep">{aed(STARTER.price)}</strong>
            {" fixed · "}
            {aed(charity)} for churches and charities
          </span>
        }
        actions={
          <>
            <PrimaryAction href="/contact">Start your Starter</PrimaryAction>
            <GhostAction href="/pricing">See all pricing</GhostAction>
          </>
        }
      />

      {/* One board rather than three stacked sections: what you get, what it
          does not cover, and the two shorter blocks in a column beside them.
          Stacked, the same content ran 932px; the page is meant to be read in
          one look, which is the whole argument the page is making. */}
      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="grid gap-3 board:grid-cols-3"
      >
        <m.section
          variants={fadeUp}
          aria-labelledby="scope-heading"
          className="scroll-mt-24 rounded-card border border-line bg-panel p-4 shadow-card"
        >
          <h2 id="scope-heading" className="eyebrow">
            What you get
          </h2>
          <ul className="mt-2 space-y-1.5">
            {STARTER.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[0.92rem] leading-snug text-fg">
                <Check
                  size={16}
                  strokeWidth={2.6}
                  aria-hidden
                  className="mt-[0.2rem] shrink-0 text-accent-deep"
                />
                {item}
              </li>
            ))}
          </ul>
        </m.section>

        {/* Given as much weight as the includes column, on purpose. A fixed
            price only stays fixed if the edges are stated before anyone
            agrees to it, and naming the real price of each thing turns a
            "no" into a route rather than a dead end. */}
        <m.section
          variants={fadeUp}
          aria-labelledby="excludes-heading"
          className="scroll-mt-24 rounded-card border border-line bg-panel-alt p-4 shadow-card"
        >
          <h2 id="excludes-heading" className="eyebrow">
            What it does not cover
          </h2>
          <ul className="mt-2 space-y-1.5">
            {STARTER.excludes.map(({ what, instead }) => {
              const point = priceFor(instead);
              return (
                <li key={what} className="flex items-start gap-2.5 text-[0.92rem] leading-snug">
                  <X
                    size={16}
                    strokeWidth={2.6}
                    aria-hidden
                    className="mt-[0.2rem] shrink-0 text-fg-faint"
                  />
                  <span className="text-fg-soft">
                    {what}
                    {point && (
                      <span className="block text-[0.8rem] text-fg-faint">
                        {instead}, {priceLabel(point)}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </m.section>

        <div className="grid content-start gap-3">
          <m.section
            variants={fadeUp}
            aria-labelledby="who-heading"
            className="scroll-mt-24 rounded-card border border-line bg-panel p-4 shadow-card"
          >
            <span className="eyebrow">Who it is for</span>
            <h2
              id="who-heading"
              className="mt-1.5 font-display text-lg font-extrabold tracking-tight text-fg"
            >
              Built for a real budget, not a trial
            </h2>
            <ul className="mt-2 space-y-1.5">
              {STARTER.who.map((line) => (
                <li
                  key={line}
                  className="rounded-xl border border-line bg-panel-alt px-3 py-2 text-sm leading-snug text-fg-soft"
                >
                  {line}
                </li>
              ))}
            </ul>
          </m.section>

          <m.section
            variants={fadeUp}
            aria-labelledby="versus-heading"
            className="scroll-mt-24 rounded-card border border-line bg-panel p-4 shadow-card"
          >
            <h2
              id="versus-heading"
              className="font-display text-xl font-extrabold tracking-tight text-fg"
            >
              Why not just the landing page service?
            </h2>
            <p className="mt-1.5 text-[0.9rem] leading-snug text-fg-soft">{STARTER.versus}</p>
            <a
              href="/landing-page-design-dubai"
              className="mt-3 inline-flex items-center gap-1.5 py-1 text-[0.9rem] font-bold text-accent-deep underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
            >
              Compare with Landing Pages &amp; Funnels
              <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden />
            </a>
          </m.section>
        </div>
      </m.div>

    </>
  );
}
