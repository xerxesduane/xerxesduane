import type { ReactNode } from "react";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Diagnosis from "../components/Diagnosis";
import Services from "../components/Services";
import Layers from "../components/Layers";
import Industries from "../components/Industries";
import Work from "../components/Work";
import SelectedWork from "../components/SelectedWork";
import ProofBand from "../components/ProofBand";
import Clients from "../components/Clients";
import Stats from "../components/Stats";
import Process from "../components/Process";
import WhyUs from "../components/WhyUs";
import Founder from "../components/Founder";
import Packages from "../components/Packages";
import FAQ from "../components/FAQ";
import LeadMagnet from "../components/LeadMagnet";
import Contact from "../components/Contact";
import MidCTA from "../components/MidCTA";
import WhoFor from "../components/WhoFor";
import AILabPreview from "../components/AILabPreview";

/**
 * Section band — gives the long homepage rhythm. Alternating bands get a
 * barely-there tint and an edge-faded hairline at the top, so stacked sections
 * read as distinct "chapters" without hiding the animated background.
 */
function Band({
  tint = false,
  divide = true,
  children,
}: {
  tint?: boolean;
  divide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`relative ${tint ? "bg-cream/[0.015]" : ""}`}>
      {divide && (
        <div className="container-bl">
          <div className="hairline" />
        </div>
      )}
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />

      {/* The problem → what we do */}
      <Band divide={false}>
        <Diagnosis />
      </Band>
      <Band tint>
        <Services />
      </Band>
      <Band>
        <AILabPreview />
      </Band>
      <Band tint>
        <Layers />
      </Band>

      {/* Proof: numbers, case studies, craft, words */}
      <Band tint>
        <Stats />
      </Band>
      <Band>
        <Work />
        <SelectedWork />
      </Band>
      <Band tint>
        <ProofBand />
        <Clients />
      </Band>

      {/* Mid-page conversion point */}
      <MidCTA />

      {/* How we work + who you work with */}
      <Band tint>
        <WhoFor />
        <Industries />
        <Process />
      </Band>
      <Band>
        <WhyUs />
        <Founder />
      </Band>

      {/* Offer → close */}
      <Band tint>
        <Packages />
      </Band>
      <Band>
        <FAQ />
        <LeadMagnet />
      </Band>
      <Band tint divide={false}>
        <Contact />
      </Band>
    </>
  );
}
