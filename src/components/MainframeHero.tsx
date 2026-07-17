import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, Star, X } from "lucide-react";
import "../styles/mainframe.css";
import { NAV_LINKS } from "../data/content";
import { TRUST } from "../data/trust";
import { getLenis } from "../lib/lenisStore";

const VIDEO_SRC = "/hero/hero-1080.mp4";

export default function MainframeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const update = () => {
      const bottom = sectionRef.current?.getBoundingClientRect().bottom ?? window.innerHeight;
      const visible = bottom > 96;
      setHeroVisible(visible);
      if (!visible) setMenuOpen(false);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (heroVisible && !media.matches) void video.play().catch(() => {});
      else video.pause();
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [heroVisible]);

  useEffect(() => {
    if (!menuOpen) return;
    const trigger = menuButtonRef.current;

    document.body.style.overflow = "hidden";
    getLenis()?.stop();

    const panel = menuRef.current;
    const focusable = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
      : [];
    window.requestAnimationFrame(() => focusable[0]?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      getLenis()?.start();
      trigger?.focus();
    };
  }, [menuOpen]);

  const google = TRUST.enabled ? TRUST.google : null;

  return (
    <div className="mainframe-landing light-focus-surface">
      <div
        aria-hidden
        className={`fixed inset-0 z-0 bg-[#e8e5de] transition-opacity duration-200 ${
          heroVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster="/hero/poster.webp"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden
        className={`fixed inset-0 z-0 h-full w-full object-cover transition-opacity duration-200 ${
          heroVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ objectPosition: "70% center" }}
      />
      <div
        aria-hidden
        className={`fixed inset-0 z-[1] bg-[linear-gradient(90deg,rgba(238,235,228,0.97)_0%,rgba(238,235,228,0.88)_44%,rgba(238,235,228,0.2)_76%,rgba(238,235,228,0.08)_100%)] transition-opacity duration-200 ${
          heroVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <header
        aria-hidden={!heroVisible}
        inert={!heroVisible}
        className={`fixed inset-x-0 top-0 z-30 transition-opacity duration-150 ${
          heroVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="mx-auto flex min-h-20 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8" aria-label="Primary navigation">
          <a href="/" className="inline-flex min-h-12 items-center gap-3 py-2 text-black">
            <span className="mainframe-logo-text text-[20px] font-semibold tracking-[-0.02em] sm:text-[22px]">
              Xerxes Duane
            </span>
          </a>

          <ul className="hidden items-center gap-1 text-[15px] text-black lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="inline-flex min-h-11 items-center rounded-full px-3.5 transition-colors hover:bg-black/5">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden min-h-12 items-center rounded-full bg-black px-5 text-sm font-semibold text-white transition-colors hover:bg-black/75 lg:inline-flex"
          >
            Book a free systems audit
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mainframe-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/20 bg-white/60 text-black backdrop-blur-sm lg:hidden"
          >
            {menuOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div
          ref={menuRef}
          id="mainframe-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-50 flex flex-col justify-start overflow-y-auto bg-[#efede7] px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-20 lg:hidden"
        >
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="absolute right-5 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/20 bg-white/60 text-black"
          >
            <X size={22} aria-hidden />
          </button>

          <nav aria-label="Mobile navigation">
            <ul className="border-t border-black/20">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-black/20">
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-16 items-center justify-between text-2xl font-medium text-black"
                  >
                    {link.label}
                    <ArrowRight size={20} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-black px-6 text-base font-semibold text-white"
            >
              Book a free systems audit
            </a>
          </nav>
        </div>
      )}

      <section
        id="top"
        ref={sectionRef}
        className="relative z-10 flex min-h-[100svh] items-end px-5 pb-12 pt-28 sm:px-8 sm:pb-16 md:min-h-[760px] md:items-center md:pb-0 lg:h-[88svh]"
      >
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="max-w-[760px]">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-black/60 sm:text-sm">
              Independent Systems Consultant &mdash; Dubai
            </p>
            <h1 className="mainframe-display text-[clamp(2.9rem,7.4vw,7rem)] leading-[0.88] tracking-[-0.055em] text-black">
              One connected system for your leads, sales and operations.
            </h1>
            <p className="mainframe-body mt-7 max-w-2xl text-base leading-relaxed text-black/70 sm:text-lg md:text-xl">
              I connect your website, CRM, Odoo/ERP, WhatsApp, automation and AI so your team stops copying data between disconnected tools.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#contact"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/75 sm:w-auto"
              >
                Book a free systems audit
                <ArrowRight size={16} aria-hidden />
              </a>
              <a
                href="#results"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-black/25 bg-white/50 px-6 text-sm font-semibold text-black backdrop-blur-sm transition hover:bg-white/80 sm:w-auto"
              >
                See real results
              </a>
              <a
                href="/ai-lab"
                className="inline-flex min-h-12 items-center gap-2 px-1 text-sm font-semibold text-black underline decoration-black/30 underline-offset-4 transition hover:decoration-black"
              >
                Try a live AI tool
                <ArrowRight size={15} aria-hidden />
              </a>
            </div>

            {TRUST.enabled && (
              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-black/60 sm:text-sm">
                <span>{TRUST.clientCount}+ businesses helped since {TRUST.since}</span>
                {google && (
                  <a
                    href={google.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-black transition-opacity hover:opacity-60"
                    aria-label={`${google.rating.toFixed(1)} out of 5 from ${google.reviewCount} Google reviews`}
                  >
                    <Star size={15} fill="currentColor" aria-hidden />
                    {google.rating.toFixed(1)} from {google.reviewCount} Google reviews
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
