import { useEffect, useRef, useState } from "react";
import "../styles/mainframe.css";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";

const EMAIL = "hi@xerxesduane.com";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "AI Lab", href: "/ai-lab" },
  { label: "About", href: "/about" },
];

const PILL_LINKS = [
  { label: "Book a free systems audit", href: "#contact" },
  { label: "Try the AI Lab", href: "/ai-lab" },
  { label: "See the work", href: "/#work" },
];

/** Typewriter: reveals `text` one character at a time after `startDelay` ms. */
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setStarted(true), startDelay);
    return () => window.clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || count >= text.length) return;
    const t = window.setTimeout(() => setCount((c) => c + 1), speed);
    return () => window.clearTimeout(t);
  }, [started, count, text.length, speed]);

  return { shown: text.slice(0, count), typing: started && count < text.length };
}

/**
 * Full-screen landing hero (homepage only): a fixed background video scrubbed
 * by horizontal mouse movement (no autoplay — the visitor "plays" it by
 * moving), with a minimal black-text navbar, a blurred intro label, a
 * typewriter greeting, and pill CTAs. Adapted to the Xerxes Duane brand.
 */
export default function MainframeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  const { shown, typing } = useTypewriter(
    "Big-company systems for small businesses that can't afford a tech team.",
  );

  // Buttons slide in 400ms after load, independent of the typewriter.
  useEffect(() => {
    const t = window.setTimeout(() => setShowButtons(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  // Mouse-scrub: horizontal movement seeks through the video. A `seeking` ref
  // prevents seek flooding — while a seek is in flight, the target keeps
  // updating and onSeeked issues the next seek if the target moved.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let prevX: number | null = null;
    let target = 0;
    let seeking = false;

    const seekTo = (t: number) => {
      seeking = true;
      v.currentTime = t;
    };

    const onMove = (e: MouseEvent) => {
      if (prevX === null) {
        prevX = e.clientX;
        return;
      }
      const delta = e.clientX - prevX;
      prevX = e.clientX;
      if (!v.duration || Number.isNaN(v.duration)) return;
      const offset = (delta / window.innerWidth) * 0.8 * v.duration;
      target = Math.min(v.duration, Math.max(0, (seeking ? target : v.currentTime) + offset));
      if (!seeking) seekTo(target);
    };

    const onSeeked = () => {
      seeking = false;
      if (Math.abs(v.currentTime - target) > 0.02) seekTo(target);
    };

    window.addEventListener("mousemove", onMove);
    v.addEventListener("seeked", onSeeked);
    return () => {
      window.removeEventListener("mousemove", onMove);
      v.removeEventListener("seeked", onSeeked);
    };
  }, []);

  // Fade the fixed video out once the hero scrolls out of view, so it never
  // sits visually behind the rest of the homepage.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const bar = "block h-[2px] w-6 bg-black transition-transform duration-300";

  return (
    <div className="mainframe-landing">
      {/* light underlay: guarantees the black hero text stays readable while
          the video loads (or if it can't), instead of sitting on the site's
          dark background */}
      <div
        aria-hidden
        className={`fixed inset-0 z-0 bg-[#e3e0d8] transition-opacity duration-500 ${
          heroVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* fixed scrubbed background video */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        aria-hidden
        className={`fixed inset-0 z-0 h-full w-full object-cover transition-opacity duration-500 ${
          heroVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ objectPosition: "70% center" }}
      />

      {/* landing navbar — fades out with the hero so black text never sits
          over the dark sections below */}
      <nav
        className={`fixed inset-x-0 top-0 z-[10] flex items-center justify-between px-5 py-4 transition-opacity duration-500 sm:px-8 sm:py-5 ${
          heroVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <a href="/" className="flex items-center gap-3">
          <span className="mainframe-logo-text text-[21px] tracking-tight text-black sm:text-[26px]">
            Xerxes Duane<span aria-hidden>®</span>
          </span>
          <span aria-hidden className="mainframe-asterisk select-none text-[25px] text-black sm:text-[30px]">
            ✳︎
          </span>
        </a>

        <div className="hidden items-center text-[23px] text-black md:flex">
          {NAV_LINKS.map((l, i) => (
            <span key={l.href}>
              <a href={l.href} className="transition-opacity hover:opacity-60">
                {l.label}
              </a>
              {i < NAV_LINKS.length - 1 && <span aria-hidden>,&nbsp;</span>}
            </span>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden text-[23px] text-black underline underline-offset-2 transition-opacity hover:opacity-60 md:block"
        >
          Get in touch
        </a>

        {/* mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="flex flex-col gap-[5px] md:hidden"
        >
          <span className={`${bar} ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`${bar} ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`${bar} ${menuOpen ? "translate-y-[-7px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[9] flex flex-col items-start justify-center gap-8 bg-white/95 px-8 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            className="text-[32px] font-medium text-black"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="text-[32px] font-medium text-black underline underline-offset-2"
        >
          Get in touch
        </a>
      </div>

      {/* hero */}
      <section
        id="top"
        ref={sectionRef}
        className="relative flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0"
      >
        <h1 className="sr-only">Xerxes Duane — big-company systems for small businesses in Dubai</h1>

        <div className="relative z-10 max-w-xl">
          {/* blurred intro label */}
          <p
            aria-hidden
            className="pointer-events-none mb-5 select-none sm:mb-6"
            style={{
              fontSize: "clamp(18px, 4vw, 26px)",
              lineHeight: 1.3,
              fontWeight: 400,
              color: "#000",
              filter: "blur(4px)",
            }}
          >
            Hey there, welcome to Xerxes Duane,
            <br />
            Independent Systems Consultant in Dubai
          </p>

          {/* typewriter greeting */}
          <p
            className="mb-5 text-black sm:mb-6"
            style={{
              fontSize: "clamp(18px, 4vw, 26px)",
              lineHeight: 1.35,
              fontWeight: 400,
              minHeight: 54,
            }}
          >
            {shown}
            {typing && (
              <span
                aria-hidden
                className="ml-[2px] inline-block h-[1.1em] w-[2px] translate-y-[0.15em] bg-black"
                style={{ animation: "blink 1s step-end infinite" }}
              />
            )}
          </p>
          <p className="mb-5 max-w-lg text-sm leading-relaxed text-black/75 sm:mb-6 sm:text-base">
            I help small businesses connect websites, CRM, Odoo/ERP, WhatsApp,
            automation, ads, and AI into one practical operating system - built
            clearly, priced honestly, and designed to save time, capture leads,
            and support real growth.
          </p>

          {/* pill CTAs */}
          <div
            className="flex flex-wrap gap-y-1 transition-all duration-700"
            style={{
              opacity: showButtons ? 1 : 0,
              transform: showButtons ? "translateY(0)" : "translateY(16px)",
            }}
          >
            {PILL_LINKS.map((b) => (
              <a
                key={b.label}
                href={b.href}
                className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-[0.3em] text-[13px] text-black transition-colors duration-200 hover:bg-black hover:text-white sm:px-5 sm:text-[15px]"
              >
                {b.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(EMAIL).catch(() => {})}
              className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-black/40 bg-transparent px-4 py-[0.3em] text-[13px] text-black transition-colors duration-200 hover:bg-black hover:text-white sm:gap-3 sm:px-5 sm:text-[15px]"
            >
              Reach us:{" "}
              <span className="underline underline-offset-1">{EMAIL}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" />
                <path d="M8.5 3.5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v5.5a1 1 0 0 0 1 1h1.5" stroke="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
