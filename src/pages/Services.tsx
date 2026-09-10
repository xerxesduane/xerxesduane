import PageHeader from "../components/page/PageHeader";
import Panel from "../components/page/Panel";
import PanelBoard from "../components/page/PanelBoard";
import SystemDiagram from "../components/home/SystemDiagram";
import Contact from "../components/Contact";
import { PrimaryAction } from "../components/page/PageActions";
import { SERVICE_PAGES } from "../data/servicePages";
import { PRICING, priceForSlug, priceLabel } from "../data/pricing";

export default function Services() {
  return <>
    <PageHeader eyebrow="Services" title={<>One connected business.</>}
      lede="Websites, CRM, Odoo, automation and AI. Explore what each service includes, who it helps, and what it starts at."
      actions={<PrimaryAction href="/contact">Book a free audit</PrimaryAction>} />
    <SystemDiagram />
    <PanelBoard cols="xl:grid-cols-3">
      {SERVICE_PAGES.map(service => {
        // The starting price is the most useful thing this card can carry.
        // SEO and general web development have no published floor, so those
        // two fall back to how the number gets set instead.
        const point = priceForSlug(service.slug);
        return <Panel key={service.slug} icon={service.icon}
          label={service.navLabel} href={`/${service.slug}`} blurb={service.metaDescription}
          footer={<p className="text-sm font-bold text-accent-deep">
            {point ? priceLabel(point) : "Fixed proposal after the free audit"}
          </p>} />;
      })}
    </PanelBoard>
    <p className="mt-4 text-center text-sm text-fg-soft">
      {PRICING.line}{" "}
      <a href="/pricing" className="font-bold text-accent-deep underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent">
        See the full rate card
      </a>
      , the budget package, and half price for churches and charities.
    </p>
    <Contact />
  </>;
}
