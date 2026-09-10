import { m } from "framer-motion";
import { Check } from "lucide-react";
import PageHeader from "../components/page/PageHeader";
import Contact from "../components/Contact";
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
 */

/** Wraps a section so each block announces itself to a screen reader. */
function Block({
  id,
  eyebrow,
  title,
  lede,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede?: string;
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
      className="scroll-mt-24 py-8 sm:py-10"
    >
      <m.header variants={fadeUp} className="mb-5 max-w-2xl">
        <span className="eyebrow">{eyebrow}</span>
        <h2
          id={`${id}-heading`}
          className="mt-3 font-display text-2xl font-extrabold tracking-tight text-fg sm:text-3xl"
        >
          {title}
        </h2>
        {lede && <p className="mt-3 text-[1.02rem] leading-relaxed text-fg-soft">{lede}</p>}
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

      <Block
        id="packages"
        eyebrow="Packages"
        title="Four ways to start"
        lede="Most people start with the audit. If the budget is tight, The Starter is a finished thing at a fixed price rather than a deposit on something bigger."
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {PACKAGES.map((pkg) => (
            <m.article
              key={pkg.name}
              variants={fadeUp}
              className={`flex flex-col gap-2 rounded-card border bg-panel p-5 shadow-card transition duration-300 ease-smooth hover:-translate-y-[3px] hover:shadow-card-hover ${
                pkg.featured ? "border-accent/60" : "border-line hover:border-accent/45"
              }`}
            >
              <span className="eyebrow">{pkg.pitch}</span>
              <h3 className="font-display text-lg font-extrabold text-fg">{pkg.name}</h3>
              <p className="font-display text-2xl font-extrabold text-accent-deep">{pkg.price}</p>
              <p className="text-[0.78rem] font-semibold text-fg-faint">{pkg.note}</p>
              <p className="mt-1 text-sm leading-snug text-fg-soft">{pkg.body}</p>
              <a
                href="/contact"
                className="mt-auto pt-3 text-[0.85rem] font-bold text-accent-deep underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
              >
                {pkg.cta}
              </a>
            </m.article>
          ))}
        </div>
      </Block>

      <Block
        id="rate-card"
        eyebrow="Rate card"
        title="Starting prices by service"
        lede="What each piece of work starts at. A real table, so you can compare it against any other quote you are holding."
      >
        {/* Its own scroller: the page body must never scroll sideways, and a
            table is the one thing allowed to be wider than the screen. */}
        <m.div variants={fadeUp} className="overflow-x-auto rounded-card border border-line bg-panel shadow-card">
          <table className="w-full min-w-[30rem] border-collapse text-start">
            <caption className="sr-only">
              Starting prices for each service, in UAE dirhams
            </caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="px-5 py-3 text-start font-technical text-eyebrow font-extrabold uppercase tracking-[0.14em] text-accent-deep">
                  Service
                </th>
                <th scope="col" className="px-5 py-3 text-end font-technical text-eyebrow font-extrabold uppercase tracking-[0.14em] text-accent-deep">
                  From
                </th>
                <th scope="col" className="px-5 py-3 text-end font-technical text-eyebrow font-extrabold uppercase tracking-[0.14em] text-accent-deep">
                  Charity rate
                </th>
              </tr>
            </thead>
            <tbody>
              {RATE_CARD.map((point) => (
                <tr key={point.service} className="border-b border-line-soft last:border-0">
                  <th scope="row" className="px-5 py-3 text-start text-[0.92rem] font-bold text-fg">
                    {point.service}
                  </th>
                  <td className="whitespace-nowrap px-5 py-3 text-end text-[0.92rem] font-semibold text-fg-soft">
                    {priceLabel(point)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-end text-[0.92rem] font-semibold text-accent-deep">
                    {aed(point.from * NONPROFIT.rate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </m.div>
        <m.p variants={fadeUp} className="mt-3 text-sm text-fg-soft">
          Every figure is a starting point. Scope moves it, which is what the free 60-minute audit
          is for: you leave with a written proposal at a fixed price.
        </m.p>
      </Block>

      <Block
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
              className="flex items-start gap-2 rounded-card border border-line bg-panel p-4 text-sm font-semibold text-fg shadow-card"
            >
              <Check size={16} strokeWidth={2.6} aria-hidden className="mt-0.5 shrink-0 text-accent-deep" />
              {who}
            </li>
          ))}
        </m.ul>
      </Block>

      <Contact />
    </>
  );
}
