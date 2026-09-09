import { ArrowLeft, Compass } from "lucide-react";
import { SERVICE_PAGES } from "../data/servicePages";
import PageHeader from "../components/page/PageHeader";
import Panel from "../components/page/Panel";
import PanelBoard from "../components/page/PanelBoard";
import { GhostAction, PrimaryAction } from "../components/page/PageActions";

export default function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        title={<>This page took a wrong turn.</>}
        lede="The page you're after doesn't exist or has moved. Here's the way back to something useful."
        actions={
          <>
            <PrimaryAction href="/#contact">Book a free audit</PrimaryAction>
            <GhostAction href="/" icon={<ArrowLeft size={15} strokeWidth={2.2} aria-hidden />}>
              Home
            </GhostAction>
          </>
        }
      />

      <PanelBoard cols="lg:grid-cols-1">
        <Panel icon={Compass} label="Where to next">
          <ul className="flex flex-wrap gap-2">
            {SERVICE_PAGES.map((p) => (
              <li key={p.slug}>
                <a
                  href={`/${p.slug}`}
                  className="inline-flex rounded-full border border-line bg-panel-alt px-3 py-1.5 text-sm text-fg-soft transition hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-panel"
                >
                  {p.navLabel}
                </a>
              </li>
            ))}
          </ul>
        </Panel>
      </PanelBoard>
    </>
  );
}
