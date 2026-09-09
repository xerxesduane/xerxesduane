import BentoBoard from "../components/home/BentoBoard";
import HeroBlock from "../components/home/HeroBlock";
import { MobileProof, MobileResults } from "../components/home/MobileBlocks";
import ServicesSection from "../components/home/ServicesSection";
import ToolsStrip from "../components/home/ToolsStrip";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

/**
 * Homepage.
 *
 * Above the fold on a desktop: headline, the stack strip, and the bento board —
 * the six entry points into the rest of the site. On a phone the same board
 * becomes a swipeable Explore rail, with the proof figures lifted above it and
 * the featured results stacked below (see components/home/MobileBlocks).
 *
 * Below that sit the sections the nav and inbound links target (#services,
 * #faq, #contact) so no existing anchor breaks. The profile rail and page
 * chrome come from ShellLayout in App.tsx.
 */
export default function Home() {
  return (
    <>
      <div id="top">
        <HeroBlock />
        <MobileProof />
        <ToolsStrip />
        <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-fg-faint sm:hidden">
          Explore · swipe
        </p>
        <BentoBoard />
        <MobileResults />
      </div>
      <ServicesSection />
      <FAQ />
      <Contact />
    </>
  );
}
