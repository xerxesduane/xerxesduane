import Button from "./Button";
import { CONTACT } from "../data/content";

/**
 * Floating bottom pill nav from the reference. Desktop/tablet only — mobile
 * already has its own bottom audit bar (MobileCTA) + WhatsApp FAB, and two
 * stacked bottom bars would cover content.
 */
export default function BottomStudioNav() {
  return (
    <nav
      aria-label="Quick actions"
      className="studio-reference-page fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-6 rounded-full bg-white px-8 py-2 shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_1px_2px_0_rgba(5,26,36,0.1),0_4px_16px_rgba(5,26,36,0.12),0_16px_40px_-12px_rgba(5,26,36,0.25)] md:flex"
    >
      <a
        href="/"
        aria-label="Xerxes Duane — home"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F3EA] transition-opacity hover:opacity-70"
      >
        <img src="/brand/icon/icon-light.svg" alt="" className="h-7 w-7" />
      </a>
      <Button
        variant="primary"
        href={CONTACT.calendar}
        target="_blank"
        rel="noopener"
        className="!px-5 !py-2 text-sm"
      >
        Book a free systems audit
      </Button>
    </nav>
  );
}
