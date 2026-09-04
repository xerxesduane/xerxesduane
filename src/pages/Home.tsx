import MainframeHero from "../components/MainframeHero";
import StudioIntroSection from "../components/StudioIntroSection";
import StudioProofBand from "../components/StudioProofBand";
import StudioEngagementsSection from "../components/StudioEngagementsSection";
import StudioQuoteSection from "../components/StudioQuoteSection";
import StudioAILabSection from "../components/StudioAILabSection";
import PricingSection from "../components/PricingSection";
import ProjectsSection from "../components/ProjectsSection";
import PartnerSection from "../components/PartnerSection";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import BottomStudioNav from "../components/BottomStudioNav";

/**
 * Homepage flow:
 *   1–2. Retained exactly as before — the dark cinematic "Serve first. Build
 *        second." hero (MainframeHero) and the light computer-head section
 *        (FormerHeroVideoSection). Do not modify.
 *   3+.  Studio-reference landing flow: intro → measured results → founder
 *        quote → AI Lab → pricing → projects → engagements by sector →
 *        partner CTA → FAQ → contact → floating bottom nav.
 *
 * Ordering is deliberate: the visitor meets verified results immediately after
 * the intro, and can find their own sector before being asked to book. The
 * reference-GIF marquee that used to sit in the proof slot showed interface
 * directions rather than delivered work, so it no longer earns that position.
 * The lower sections are light-palette (.studio-reference-page) and use the
 * PP Neue Montreal / PP Mondwest font system, scoped so the top two sections
 * keep their existing look.
 */
export default function Home() {
  return (
    <>
      {/* Sections 1 & 2 — retained exactly */}
      <MainframeHero />

      {/* Studio-reference landing flow */}
      <StudioIntroSection />
      {/* Proof before anything else is asked of the visitor. */}
      <StudioProofBand />
      <StudioQuoteSection />
      <StudioAILabSection />
      <PricingSection />
      <ProjectsSection />
      <StudioEngagementsSection />
      <PartnerSection />

      {/* Kept from the previous flow (dark-themed, stay on the dark canvas) */}
      <FAQ />
      <Contact />

      <BottomStudioNav />
    </>
  );
}
