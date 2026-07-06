import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { EASE } from "../lib/motion";
import { AR_CHROME } from "../data/servicePagesAr";

/**
 * Persistent "book a free audit" bar for mobile. Slides up once the visitor
 * scrolls past the hero, and gets out of the way when the contact section is
 * on screen (so it never covers the form's own button). Hidden on md+ where
 * the nav CTA is always visible. Sits to the left of the WhatsApp FAB.
 */
export default function MobileCTA({ locale = "en" }: { locale?: "en" | "ar" }) {
  const ar = locale === "ar";
  const label = ar ? AR_CHROME.bookAudit : "Free systems audit";

  const [scrolledPast, setScrolledPast] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const io = new IntersectionObserver(
      ([entry]) => setAtContact(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  const show = scrolledPast && !atContact;

  return (
    <AnimatePresence>
      {show && (
        <m.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.32, ease: EASE }}
          className="nav-surface fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 md:hidden"
        >
          <a
            href={ar ? "/ar#contact" : "/#contact"}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink-deep shadow-[0_10px_30px_-12px_rgba(218,164,66,0.8)] transition-colors duration-300 hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <img src="/brand/icon/icon-light.svg" alt="" className="h-5 w-5" />
            {label}
          </a>
        </m.div>
      )}
    </AnimatePresence>
  );
}
