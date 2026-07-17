import MainframeHero from "../components/MainframeHero";
import ResultsBand from "../components/ResultsBand";
import Marquee from "../components/Marquee";
import Services from "../components/Services";
import ProjectsSection from "../components/ProjectsSection";
import StudioAILabSection from "../components/StudioAILabSection";
import PricingSection from "../components/PricingSection";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <MainframeHero />
      <ResultsBand />
      <Marquee />
      <Services />
      <ProjectsSection />
      <StudioAILabSection />
      <PricingSection />
      <FAQ />
      <Contact />
    </>
  );
}
