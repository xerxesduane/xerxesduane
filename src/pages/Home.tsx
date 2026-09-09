import BentoBoard from "../components/home/BentoBoard";
import HeroBlock from "../components/home/HeroBlock";
import ServicesSection from "../components/home/ServicesSection";
import ToolsStrip from "../components/home/ToolsStrip";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

/**
 * Homepage.
 *
 * Above the fold: headline, the stack strip, and the bento board — the six
 * entry points into the rest of the site. Below it, the sections the nav and
 * inbound links target (#services, #faq, #contact) so no existing anchor
 * breaks. The profile rail and page chrome come from ShellLayout in App.tsx.
 */
export default function Home() {
  return (
    <>
      <div id="top">
        <HeroBlock />
        <ToolsStrip />
        <BentoBoard />
      </div>
      <ServicesSection />
      <FAQ />
      <Contact />
    </>
  );
}
