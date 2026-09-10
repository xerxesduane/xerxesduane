import PageHeader from "../components/page/PageHeader";
import Panel from "../components/page/Panel";
import PanelBoard from "../components/page/PanelBoard";
import SystemDiagram from "../components/home/SystemDiagram";
import Contact from "../components/Contact";
import { PrimaryAction } from "../components/page/PageActions";
import { SERVICE_PAGES } from "../data/servicePages";

export default function Services() {
  return <>
    <PageHeader eyebrow="Services" title={<>One connected business.</>}
      lede="Websites, CRM, Odoo, automation and AI. Explore what each service includes, who it helps, and where to start."
      actions={<PrimaryAction href="/contact">Book a free audit</PrimaryAction>} />
    <SystemDiagram />
    <PanelBoard cols="xl:grid-cols-3">
      {SERVICE_PAGES.map(service => <Panel key={service.slug} icon={service.icon}
        label={service.navLabel} href={`/${service.slug}`} blurb={service.metaDescription}
        footer={service.price && <p className="text-sm font-bold text-accent-deep">{service.price}</p>} />)}
    </PanelBoard>
    <Contact />
  </>;
}
