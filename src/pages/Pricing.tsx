import { useCallback, useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { Check } from "lucide-react";
import PageHeader from "../components/page/PageHeader";
import { PrimaryAction } from "../components/page/PageActions";
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
 * The packages, the rate card and the charity terms do not share a laptop
 * screen. Stacked they ran 1,235px inside a 768px one, and laid out as a board
 * the table was squeezed until the charity column clipped. So they are three
 * views of one page instead, and the rate card is the one that opens, because
 * it is the reason the page exists.
 *
 * Every view stays in the DOM and only its `hidden` attribute changes, so the
 * prerendered HTML still carries every package, every row and the charity
 * terms as plain text whether or not the visitor ever switches.
 */

type Tab = "rate-card" | "packages" | "nonprofit";

const TABS: { id: Tab; label: string; count?: string }[] = [
  { id: "rate-card", label: "Rate card", count: `${RATE_CARD.length} services` },
  { id: "packages", label: "Packages", count: `${PACKAGES.length} ways to start` },
  { id: "nonprofit", label: "Charity rates", count: "half price" },
];

const TAB_IDS = TABS.map((t) => t.id);

/** The view named by the URL fragment, so the old #anchors still land. */
function tabFromHash(): Tab | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.slice(1);
  return (TAB_IDS as string[]).includes(hash) ? (hash as Tab) : null;
}

export default function Pricing() {
  const [tab, setTab] = useState<Tab>("rate-card");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const sync = useCallback(() => setTab(tabFromHash() ?? "rate-card"), []);

  useEffect(() => {
    // The fragment is client state: reading it during render would break
    // hydration, and `hashchange` keeps a pasted #nonprofit link working.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resolve the URL after matching the server snapshot
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [sync]);

  const show = (next: Tab) => {
    setTab(next);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.hash = next === "rate-card" ? "" : next;
      window.history.replaceState(null, "", url);
    }
  };

  /** Roving focus: a tablist moves between tabs with the arrow keys. */
  const onKey = (index: number) => (event: React.KeyboardEvent) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (step === 0) return;
    event.preventDefault();
    const next = (index + step + TABS.length) % TABS.length;
    show(TABS[next].id);
    tabs.current[next]?.focus();
  };

  const panel = (id: Tab) => ({
    id: `${id}-panel`,
    role: "tabpanel",
    "aria-labelledby": id,
    hidden: tab !== id,
    tabIndex: 0,
  });

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title={<>What it costs.</>}
        lede="Real starting prices, published up front. Every figure below is a floor a project actually starts at, not a quote: what you pay depends on scope, and you get that in writing after a free audit."
        actions={<PrimaryAction href="/contact">Book a free audit</PrimaryAction>}
      />

      <div
        role="tablist"
        aria-label="Pricing"
        className="mb-3 flex flex-wrap gap-1.5 rounded-full border border-line bg-panel p-1 sm:w-fit"
      >
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            id={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            aria-controls={`${t.id}-panel`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => show(t.id)}
            onKeyDown={onKey(i)}
            className={`flex min-h-9 flex-1 items-baseline justify-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold transition sm:flex-none ${
              tab === t.id
                ? "bg-navy text-fg-onSolid shadow-solid"
                : "text-fg-soft hover:bg-panel-alt hover:text-accent-deep"
            }`}
          >
            {t.label}
            <span className={`font-technical text-xs font-semibold ${tab === t.id ? "text-fg-onSolid/60" : "text-fg-faint"}`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* ---- the rate card ---- */}
      <m.section {...panel("rate-card")} variants={stagger} initial="hidden" whileInView="show" viewport={VIEWPORT}>
        <h2 className="sr-only">Starting prices by service</h2>
        {/* Split in two so the card sits side by side rather than one column
            deep; the halves are computed from RATE_CARD, so adding or removing
            a service rebalances them. Each half is still its own scroller,
            because the page body must never scroll sideways and a table is the
            one thing allowed to be wider than the screen. */}
        <div className="grid gap-3 board:grid-cols-2">
          {[RATE_CARD.slice(0, Math.ceil(RATE_CARD.length / 2)), RATE_CARD.slice(Math.ceil(RATE_CARD.length / 2))].map(
            (half, h) => (
              <m.div
                key={h}
                variants={fadeUp}
                className="overflow-x-auto rounded-card border border-line bg-panel shadow-card"
              >
                <table className="w-full border-collapse text-start">
                  <caption className="sr-only">
                    Starting prices in UAE dirhams, part {h + 1} of 2
                  </caption>
                  <thead>
                    <tr className="border-b border-line">
                      <th scope="col" className="px-3 py-1.5 text-start font-technical text-eyebrow font-extrabold uppercase tracking-[0.1em] text-accent-deep">
                        Service
                      </th>
                      <th scope="col" className="px-3 py-1.5 text-end font-technical text-eyebrow font-extrabold uppercase tracking-[0.1em] text-accent-deep">
                        From
                      </th>
                      <th scope="col" className="px-3 py-1.5 text-end font-technical text-eyebrow font-extrabold uppercase tracking-[0.1em] text-accent-deep">
                        Charity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {half.map((point) => (
                      <tr key={point.service} className="border-b border-line-soft last:border-0">
                        <th scope="row" className="px-3 py-1 text-start text-[0.85rem] font-bold leading-tight text-fg">
                          {point.service}
                        </th>
                        <td className="whitespace-nowrap px-3 py-1 text-end text-[0.85rem] font-semibold text-fg-soft">
                          {priceLabel(point)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-1 text-end text-[0.85rem] font-semibold text-accent-deep">
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
      </m.section>

      {/* ---- the four packages ---- */}
      <m.section {...panel("packages")} variants={stagger} initial="hidden" whileInView="show" viewport={VIEWPORT}>
        <h2 className="sr-only">Four ways to start</h2>
        <ul className="grid gap-3 sm:grid-cols-2 board:grid-cols-4">
          {PACKAGES.map((pkg) => (
            <m.li
              key={pkg.name}
              variants={fadeUp}
              className={`flex flex-col rounded-card border bg-panel p-4 shadow-card transition duration-300 ease-smooth hover:-translate-y-[2px] hover:shadow-card-hover ${
                pkg.featured ? "border-accent/60" : "border-line hover:border-accent/45"
              }`}
            >
              <h3 className="font-display text-base font-extrabold leading-tight text-fg">
                {pkg.name}{" "}
                <span className="font-technical text-xs font-semibold text-fg-faint">{pkg.pitch}</span>
              </h3>
              <p className="mt-1 font-display text-xl font-extrabold leading-none text-accent-deep">
                {pkg.price}{" "}
                <span className="font-technical text-xs font-semibold text-fg-faint">{pkg.note}</span>
              </p>
              <p className="mt-1.5 text-[0.82rem] leading-snug text-fg-soft">{pkg.body}</p>
              {/* The Starter carries its own page, so its card sends people to
                  read the scope rather than straight to a form. */}
              <a
                href={"href" in pkg && pkg.href ? pkg.href : "/contact"}
                className="mt-auto inline-block pt-2 text-[0.82rem] font-bold text-accent-deep underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
              >
                {pkg.cta}
              </a>
            </m.li>
          ))}
        </ul>
      </m.section>

      {/* ---- charity rates ---- */}
      <m.section {...panel("nonprofit")} variants={stagger} initial="hidden" whileInView="show" viewport={VIEWPORT}>
        <h2 className="sr-only">Half price for churches and charities</h2>
        <m.p variants={fadeUp} className="max-w-[68ch] text-[0.95rem] leading-relaxed text-fg-soft">
          {NONPROFIT.body}
        </m.p>
        <m.ul variants={fadeUp} className="mt-3 grid gap-2 sm:grid-cols-3">
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
      </m.section>
    </>
  );
}
