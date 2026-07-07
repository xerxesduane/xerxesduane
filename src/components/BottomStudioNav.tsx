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
      className="studio-reference-page fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-6 rounded-full border border-[color:var(--studio-line)] bg-[rgba(7,23,36,0.78)] px-8 py-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_18px_52px_-22px_rgba(0,0,0,0.9)] backdrop-blur md:flex"
    >
      <a
        href="/"
        aria-label="Xerxes Duane — home"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] transition-opacity hover:opacity-70"
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
