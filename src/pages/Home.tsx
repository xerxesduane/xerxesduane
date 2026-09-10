import BentoBoard from "../components/home/BentoBoard";
import HeroBlock from "../components/home/HeroBlock";
import ToolsStrip from "../components/home/ToolsStrip";

/**
 * Homepage — one screen, nothing below it.
 *
 * Headline, the tools strip, and the board of entry points, sized to land
 * inside a desktop viewport so there is nothing to scroll to and therefore no
 * footer (App.tsx drops it on this route). The sections that used to sit
 * underneath — services, FAQs, contact — already have real pages at /services
 * and /contact, which is where the nav has pointed for a while, so nothing
 * moved and no link broke; they simply stopped being duplicated here.
 *
 * A phone can't hold all of this at once and shouldn't pretend to: the board
 * becomes a swipeable rail and the page scrolls a little. The promise is a
 * desktop one.
 */
export default function Home() {
  return (
    <div id="top">
      <HeroBlock />
      <ToolsStrip />
      <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-fg-faint sm:hidden">
        Explore · swipe
      </p>
      <div id="work" className="scroll-mt-8">
        <BentoBoard />
      </div>
    </div>
  );
}
