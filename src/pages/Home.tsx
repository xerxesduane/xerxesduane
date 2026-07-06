import MainframeHero from "../components/MainframeHero";
import StudioIntroSection from "../components/StudioIntroSection";
import InfiniteWorksMarquee from "../components/InfiniteWorksMarquee";
import StudioQuoteSection from "../components/StudioQuoteSection";
import StudioAILabSection from "../components/StudioAILabSection";
import PricingSection from "../components/PricingSection";
import ProjectsSection from "../components/ProjectsSection";
import PartnerSection from "../components/PartnerSection";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import StudioFooter from "../components/StudioFooter";
import CopyrightBar from "../components/CopyrightBar";
import BottomStudioNav from "../components/BottomStudioNav";

/**
 * Homepage flow:
 *   1–2. Retained exactly as before — the dark cinematic "Serve first. Build
 *        second." hero (MainframeHero) and the light computer-head section
 *        (FormerHeroVideoSection). Do not modify.
 *   3+.  Studio-reference landing flow (Viktor Oddy / Vortex-style structure,
 *        adapted to Xerxes Duane): intro → works marquee → founder quote →
 *        pricing → proof carousel → projects → partner CTA → FAQ → contact →
 *        studio footer → copyright → floating bottom nav.
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
      <InfiniteWorksMarquee />
      <StudioQuoteSection />
      <StudioAILabSection />
      <PricingSection />
      <ProjectsSection />
      <PartnerSection />

      {/* Kept from the previous flow (dark-themed, stay on the dark canvas) */}
      <FAQ />
      <Contact />

      <StudioFooter />
      <CopyrightBar />
      <BottomStudioNav />
    </>
  );
}
