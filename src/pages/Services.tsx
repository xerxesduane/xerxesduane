import { ArrowLeft } from "lucide-react";
import ServicesSection from "../components/home/ServicesSection";
import Contact from "../components/Contact";
import PageHeader from "../components/page/PageHeader";
import { GhostAction, PrimaryAction } from "../components/page/PageActions";

/**
 * `/services` — its own rail destination.
 *
 * These sections used to sit below the homepage bento, which stopped the
 * dashboard view fitting a single screen. Splitting them out is what lets the
 * home panel be one viewport.
 */
export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={<>What I build, and what it costs.</>}
        lede="Websites, ERP, automation and AI — wired into one system rather than a stack of tools that never talk to each other."
        actions={
          <>
            <PrimaryAction href="/contact">Book a free audit</PrimaryAction>
            <GhostAction href="/" icon={<ArrowLeft size={15} strokeWidth={2.2} aria-hidden />}>
              Home
            </GhostAction>
          </>
        }
      />
      <ServicesSection />
      <Contact />
    </>
  );
}
