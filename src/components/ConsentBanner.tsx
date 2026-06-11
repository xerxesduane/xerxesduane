import { useEffect, useState } from "react";

const STORAGE_KEY = "tw-consent"; // "granted" | "denied"

type GtagFn = (...args: unknown[]) => void;
interface ClarityWindow extends Window {
  gtag?: GtagFn;
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  __CLARITY_ID__?: string;
  __clarityLoaded__?: boolean;
}

/** Load Microsoft Clarity on demand (only after consent). */
function loadClarity() {
  const w = window as ClarityWindow;
  const id = w.__CLARITY_ID__;
  if (!id || w.__clarityLoaded__) return;
  w.__clarityLoaded__ = true;
  w.clarity =
    w.clarity ||
    function (...args: unknown[]) {
      (w.clarity!.q = w.clarity!.q || []).push(args);
    };
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.clarity.ms/tag/" + id;
  document.head.appendChild(s);
}

/** Turn analytics on: update Google Consent Mode + start Clarity. */
function grantConsent() {
  const w = window as ClarityWindow;
  w.gtag?.("consent", "update", { analytics_storage: "granted" });
  loadClarity();
}

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage blocked — treat as no decision */
    }
    if (saved === "granted") {
      grantConsent();
    } else if (saved !== "denied") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot client-only init; intentional SSR-safe pattern
      setShow(true);
    }
  }, []);

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    } catch {
      /* ignore */
    }
    if (granted) grantConsent();
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed inset-x-3 bottom-24 z-[60] sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-md"
    >
      <div className="nav-surface flex flex-col gap-3 rounded-2xl p-3.5 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] sm:p-4">
        <p className="text-xs leading-relaxed text-cream-dim sm:text-sm">
          We use anonymous analytics to improve the site. Nothing is shared or
          sold. See our{" "}
          <a href="/privacy" className="text-gold underline-offset-2 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex shrink-0 items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => decide(false)}
            className="rounded-full border border-cream/15 px-4 py-2 text-xs font-semibold text-cream transition-colors hover:border-cream/40"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="rounded-full bg-gold px-5 py-2 text-xs font-semibold text-ink-deep transition-colors hover:bg-gold-soft"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
