import { useEffect, useState } from "react";

const STORAGE_KEY = "tw-consent";

type GtagFn = (...args: unknown[]) => void;
interface ClarityWindow extends Window {
  gtag?: GtagFn;
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  __CLARITY_ID__?: string;
  __clarityLoaded__?: boolean;
}

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
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.clarity.ms/tag/" + id;
  document.head.appendChild(script);
}

function grantConsent() {
  const w = window as ClarityWindow;
  w.gtag?.("consent", "update", { analytics_storage: "granted" });
  loadClarity();
}

export default function ConsentBanner({
  locale = "en",
  offsetForMobileCta = false,
}: {
  locale?: "en" | "ar";
  offsetForMobileCta?: boolean;
}) {
  const [show, setShow] = useState(false);
  const ar = locale === "ar";

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage can be unavailable in strict privacy modes.
    }
    if (saved === "granted") grantConsent();
    else if (saved !== "denied") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot client-only consent initialization
      setShow(true);
    }
  }, []);

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    } catch {
      // The choice still applies for the current page.
    }
    if (granted) grantConsent();
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside
      role="dialog" aria-modal="false" aria-live="polite" aria-atomic="true" aria-label={ar ? "خيارات التحليلات" : "Analytics choices"}
      dir={ar ? "rtl" : "ltr"}
      className={`fixed inset-x-3 z-40 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-md ${
        offsetForMobileCta ? "bottom-40" : "bottom-3"
      }`}
    >
      <div className="nav-surface flex flex-col gap-4 rounded-2xl p-4 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)]">
        <p className="text-xs leading-relaxed text-cream-dim sm:text-sm">
          {ar
            ? "أستخدم Google Analytics وMicrosoft Clarity لفهم كيفية استخدام الموقع. يمكنك قبول التحليلات الاختيارية أو رفضها."
            : "I use Google Analytics and Microsoft Clarity to understand site usage. You can accept or decline optional analytics."}{" "}
          <a href="/privacy" className="text-gold underline underline-offset-2">
            {ar ? "سياسة الخصوصية" : "Privacy Policy"}
          </a>
          .
        </p>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => decide(false)}
            className="inline-flex min-h-11 items-center rounded-full border border-cream/20 px-5 text-xs font-semibold text-cream transition-colors hover:border-cream/50"
          >
            {ar ? "رفض" : "Decline"}
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="inline-flex min-h-11 items-center rounded-full bg-gold px-5 text-xs font-semibold text-ink-deep transition-colors hover:bg-gold-soft"
          >
            {ar ? "قبول" : "Accept"}
          </button>
        </div>
      </div>
    </aside>
  );
}
