import PageHeader from "../components/page/PageHeader";
import Panel from "../components/page/Panel";
import PanelBoard from "../components/page/PanelBoard";
import { PrimaryAction } from "../components/page/PageActions";
import { SERVICE_PAGES } from "../data/servicePages";
import { PRICING, priceForSlug, priceLabel } from "../data/pricing";

/**
 * `/services` — all sixteen services on one screen.
 *
 * Each card carries the name and the starting price, which is what someone
 * scanning the list is actually deciding on; the full description lives on the
 * service page a click away. The system diagram moved off this page for the
 * same reason — at 347px it cost more than the space it earned here.
 */
export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={<>One connected business.</>}
        lede="Websites, CRM, Odoo, automation and AI. Open any service for what it includes and who it helps."
        actions={<PrimaryAction href="/contact">Book a free audit</PrimaryAction>}
      />

      <PanelBoard cols="board:grid-cols-4">
        {SERVICE_PAGES.map((service) => {
          const point = priceForSlug(service.slug);
          return (
            <Panel
              key={service.slug}
              icon={service.icon}
              label={service.navLabel}
              href={`/${service.slug}`}
              footer={
                <p className="text-[0.78rem] font-bold text-accent-deep">
                  {point ? priceLabel(point) : "Priced after the free audit"}
                </p>
              }
            />
          );
        })}
      </PanelBoard>

      <p className="mt-2 text-[0.76rem] leading-tight text-fg-soft">
        {PRICING.line}{" "}
        <a
          href="/pricing"
          className="font-bold text-accent-deep underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
        >
          See the full rate card
        </a>
        , the budget package, and half price for churches and charities.
      </p>
    </>
  );
}
