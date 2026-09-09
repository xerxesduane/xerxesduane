import { useEffect } from "react";
import BentoBoard from "../components/home/BentoBoard";
import HeroBlock from "../components/home/HeroBlock";
import ToolsStrip from "../components/home/ToolsStrip";

/**
 * The dashboard view: headline, the stack strip, and the six entry points —
 * sized to sit in a single panel without scrolling on a desktop viewport.
 *
 * Services, the FAQ and the contact form used to stack below this and are now
 * their own rail destinations (/services, /contact), which is what makes the
 * one-screen layout possible.
 */
export default function Home() {
  // Links published before these became routes point at /#services and
  // /#contact. A fragment is never sent to the server, so a redirect rule
  // cannot catch it; send those visitors on from here instead.
  useEffect(() => {
    const target = { "#services": "/services", "#contact": "/contact" }[
      window.location.hash
    ];
    if (target) window.location.replace(target);
  }, []);

  return (
    <div id="top">
      <HeroBlock />
      <ToolsStrip />
      <BentoBoard />
    </div>
  );
}
