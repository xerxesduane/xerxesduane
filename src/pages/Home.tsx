import type { ReactNode } from "react";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Diagnosis from "../components/Diagnosis";
import Services from "../components/Services";
import AILabPreview from "../components/AILabPreview";
import ResultsBand from "../components/ResultsBand";
import Work from "../components/Work";
import ConnectedSystems from "../components/ConnectedSystems";
import Process from "../components/Process";
import Packages from "../components/Packages";
import WhyUs from "../components/WhyUs";
import Founder from "../components/Founder";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

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

/**
 * Homepage flow (deliberately tightened from ~23 sections to a scannable ~13):
 * Hero → trust strip → problem → services → AI Lab → real numbers → case
 * studies → connected system → process → packages → trust/founder → FAQ →
 * contact. Each section makes ONE point; duplicates (a second numbers band, a
 * second AI-Lab pitch, a second "who's it for", a second work grid, a mid-page
 * CTA clone) were removed so the page earns the scroll.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />

      {/* The problem → what I do */}
      <Band divide={false}>
        <Diagnosis />
      </Band>
      <Band tint>
        <Services />
      </Band>
      <Band>
        <AILabPreview />
      </Band>

      {/* Proof: real numbers → case studies → how it connects */}
      <Band tint>
        <ResultsBand />
      </Band>
      <Band>
        <Work />
      </Band>
      <Band tint>
        <ConnectedSystems />
      </Band>

      {/* How I work (cream contrast band) */}
      <Process />

      {/* Offer → trust → close */}
      <Band tint>
        <Packages />
      </Band>
      <Band>
        <WhyUs />
        <Founder />
      </Band>
      <Band tint>
        <FAQ />
      </Band>
      <Band divide={false}>
        <Contact />
      </Band>
    </>
  );
}
