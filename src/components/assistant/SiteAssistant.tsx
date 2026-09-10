import { Suspense, lazy, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ChatGlyph } from "../ui/NavIcons";
import { assistantCopy } from "../../data/assistant";

// The chat only exists for visitors who open it, so it ships as its own chunk
// rather than in the bundle every page loads. Suspense sits outside
// AnimatePresence — inside, it would remount on resolve and eat the exit.
const AssistantPanel = lazy(() => import("./AssistantPanel"));

/**
 * The chat launcher in the corner of every page, and the panel it opens.
 *
 * This replaced the floating WhatsApp button. WhatsApp didn't go away — it
 * moved inside, pinned above the composer, where it now arrives with the
 * visitor's question already attached. The trade is deliberate: the old button
 * was one destination, this is a question answered *and* the same destination
 * one tap further on.
 *
 * The launcher stays mounted while the panel is open, faded out and untabbable
 * rather than unmounted, so closing can hand focus straight back to it.
 */
export default function SiteAssistant({ locale = "en" }: { locale?: "en" | "ar" }) {
  const copy = assistantCopy(locale);
  const [open, setOpen] = useState(false);
  const fabRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const titleId = useId();

  useEffect(() => {
    if (wasOpen.current && !open) fabRef.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? copy.closeLabel : copy.openLabel}
        title={open ? copy.closeLabel : copy.openLabel}
        tabIndex={open ? -1 : undefined}
        aria-hidden={open || undefined}
        className={`group fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] end-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-ink shadow-card-hover ring-1 ring-white/20 transition duration-300 ease-smooth hover:scale-105 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas lg:bottom-7 lg:end-7 ${
          open ? "pointer-events-none scale-90 opacity-0" : ""
        }`}
      >
        {open ? <X size={22} strokeWidth={2.4} aria-hidden /> : <ChatGlyph size={24} />}
      </button>

      <Suspense fallback={null}>
        <AnimatePresence>
          {open && (
            <AssistantPanel locale={locale} onClose={() => setOpen(false)} labelledBy={titleId} />
          )}
        </AnimatePresence>
      </Suspense>
    </>
  );
}
