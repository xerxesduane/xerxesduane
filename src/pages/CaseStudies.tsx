import { ArrowLeft } from "lucide-react";
import { CASE_STUDIES } from "../data/content";
import CaseStudyCard from "../components/CaseStudyCard";
import Contact from "../components/Contact";
import PageHeader from "../components/page/PageHeader";
import PanelBoard from "../components/page/PanelBoard";
import ProjectShowcase from "../components/showcase/ProjectShowcase";
import { GhostAction, PrimaryAction } from "../components/page/PageActions";

export default function CaseStudies() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title={<>Real businesses. Real systems.</>}
        lede="A closer look at the work, from full Odoo deployments to ad campaigns that pay for themselves, across the UAE, the Philippines and beyond."
        actions={
          <>
            <PrimaryAction href="/#contact">Book a free audit</PrimaryAction>
            <GhostAction href="/" icon={<ArrowLeft size={15} strokeWidth={2.2} aria-hidden />}>
              Home
            </GhostAction>
          </>
        }
      />

      <ProjectShowcase className="mb-4" />

      <PanelBoard cols="lg:grid-cols-2">
        {CASE_STUDIES.map((c) => (
          <CaseStudyCard key={c.client} c={c} />
        ))}
      </PanelBoard>

      <p className="mt-5 text-sm text-fg-faint">
        Some client work is under NDA and not shown here. Ask in your audit.
      </p>

      <Contact />
    </>
  );
}
