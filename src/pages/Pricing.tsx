import { m } from "framer-motion";
import { Check } from "lucide-react";
import PageHeader from "../components/page/PageHeader";
import { GhostAction, PrimaryAction } from "../components/page/PageActions";
import { PACKAGES } from "../data/content";
import { NONPROFIT, RATE_CARD, aed, priceLabel } from "../data/pricing";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";

/**
 * The pricing page.
 *
 * Its job is to be quotable. Most people asking what a website costs in Dubai
 * are not on this site yet, they are asking a search engine or an assistant,
 * and both will only repeat a number they can find as plain text next to the
 * thing it prices. So every figure here is real text in a real table rather
 * than an image, a tooltip or a PDF, the headings are the questions people
 * actually type, and the same numbers go out as Schema.org offers from
 * lib/seo.ts. See RATE_CARD in data/pricing.ts, which both read from.
 *
 * It is also why the page compresses by laying the three blocks out as a board
 * and tightening the rows rather than folding the table away: every figure
 * stays visible plain text, which is the only reason the page works at all.
 */

/** One column of the board; announces itself to a screen reader. */
function Block({
  id,
  eyebrow,
  title,
  lede,
  className = "",
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede?: string;
  /** Where the block sits on the board. */
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <m.section
      id={id}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-24 ${className}`}
    >
      <m.header variants={fadeUp} className="mb-2 max-w-2xl">
        <p className="flex flex-wrap items-baseline gap-x-3">
          <span className="eyebrow">{eyebrow}</span>
          <span
            id={`${id}-heading`}
            className="font-display text-lg font-extrabold tracking-tight text-fg"
          >
            {title}
          </span>
        </p>
        {lede && <p className="mt-1 text-[0.85rem] leading-snug text-fg-soft">{lede}</p>}
      </m.header>
      {children}
    </m.section>
  );
}

export default function Pricing() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title={<>What it costs.</>}
        lede="Real starting prices, published up front. Every figure below is a floor a project actually starts at, not a quote: what you pay depends on scope, and you get that in writing after a free audit."
        actions={
          <>
            <PrimaryAction href="/contact">Book a free audit</PrimaryAction>
            <GhostAction href="#nonprofit">Charity rates</GhostAction>
          </>
        }
      />

      <div className="grid gap-3 board:grid-cols-12">
        <Block
          className="board:col-span-5"
          id="packages"
          eyebrow="Packages"
          title="Four ways to start"
          lede="Most people start with the audit. If the budget is tight, The Starter is a finished thing at a fixed price rather than a deposit on something bigger."
        >
          <ul className="grid gap-2">
            {PACKAGES.map((pkg) => (
              <m.li
                key={pkg.name}
                variants={fadeUp}
                className={`rounded-card border bg-panel p-3 shadow-card transition duration-300 ease-smooth hover:-translate-y-[2px] hover:shadow-card-hover ${
                  pkg.featured ? "border-accent/60" : "border-line hover:border-accent/45"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="font-display text-base font-extrabold text-fg">
                    {pkg.name}{" "}
                    <span className="font-technical text-xs font-semibold text-fg-faint">
                      {pkg.pitch}
                    </span>
                  </h3>
                  <p className="font-display text-lg font-extrabold text-accent-deep">
                    {pkg.price}{" "}
                    <span className="font-technical text-xs font-semibold text-fg-faint">
                      {pkg.note}
                    </span>
                  </p>
                </div>
                <p className="text-[0.82rem] leading-snug text-fg-soft">
                  {pkg.body}{" "}
                  {/* The Starter carries its own page, so its row sends people
                      to read the scope rather than straight to a form. */}
                  <a
                    href={"href" in pkg && pkg.href ? pkg.href : "/contact"}
                    className="whitespace-nowrap font-bold text-accent-deep underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
                  >
                    {pkg.cta}
                  </a>
                </p>
              </m.li>
            ))}
          </ul>
        </Block>

        <Block
          className="board:col-span-7"
          id="rate-card"
          eyebrow="Rate card"
          title="Starting prices by service"
          lede="What each piece of work starts at. A real table, so you can compare it against any other quote you are holding."
        >
          {/* Two halves side by side on the board: sixteen rows in one
              column cost 465px, and every figure still has to be visible
              plain text. Each half is its own scroller, because the page body
              must never scroll sideways and a table is the one thing allowed
              to be wider than the screen. */}
          <div className="grid gap-3 board:grid-cols-2">
            {[RATE_CARD.slice(0, Math.ceil(RATE_CARD.length / 2)), RATE_CARD.slice(Math.ceil(RATE_CARD.length / 2))].map(
              (half, h) => (
                <m.div
                  key={h}
                  variants={fadeUp}
                  className="overflow-x-auto rounded-card border border-line bg-panel shadow-card"
                >
                  <table className="w-full min-w-[18rem] border-collapse text-start">
                    <caption className="sr-only">
                      Starting prices in UAE dirhams, part {h + 1} of 2
                    </caption>
                    <thead>
                      <tr className="border-b border-line">
                        <th scope="col" className="px-3 py-2 text-start font-technical text-eyebrow font-extrabold uppercase tracking-[0.14em] text-accent-deep">
                          Service
                        </th>
                        <th scope="col" className="px-3 py-2 text-end font-technical text-eyebrow font-extrabold uppercase tracking-[0.14em] text-accent-deep">
                          From
                        </th>
                        <th scope="col" className="px-3 py-2 text-end font-technical text-eyebrow font-extrabold uppercase tracking-[0.14em] text-accent-deep">
                          Charity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {half.map((point) => (
                        <tr key={point.service} className="border-b border-line-soft last:border-0">
                          <th scope="row" className="px-3 py-1.5 text-start text-[0.85rem] font-bold text-fg">
                            {point.service}
                          </th>
                          <td className="whitespace-nowrap px-3 py-1.5 text-end text-[0.85rem] font-semibold text-fg-soft">
                            {priceLabel(point)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-1.5 text-end text-[0.85rem] font-semibold text-accent-deep">
                            {aed(point.from * NONPROFIT.rate)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </m.div>
              ),
            )}
          </div>
          <m.p variants={fadeUp} className="mt-2 text-[0.82rem] leading-snug text-fg-soft">
            Every figure is a starting point. Scope moves it, which is what the free 60-minute audit
            is for: you leave with a written proposal at a fixed price.
          </m.p>
        </Block>

        <Block
          className="board:col-span-12"
          id="nonprofit"
          eyebrow="Non-profits"
          title="Half price for churches and charities"
          lede={NONPROFIT.body}
        >
          <m.ul variants={fadeUp} className="grid gap-2 sm:grid-cols-3">
            {[
              "Registered non-profits and NGOs",
              "Churches and places of worship",
              "Registered charities and foundations",
            ].map((who) => (
              <li
                key={who}
                className="flex items-start gap-2 rounded-card border border-line bg-panel px-4 py-2.5 text-sm font-semibold text-fg shadow-card"
              >
                <Check size={16} strokeWidth={2.6} aria-hidden className="mt-0.5 shrink-0 text-accent-deep" />
                {who}
              </li>
            ))}
          </m.ul>
        </Block>
      </div>

    </>
  );
}
