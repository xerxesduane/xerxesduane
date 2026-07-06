import { useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import useInViewAnimation, { fadeClass } from "../hooks/useInViewAnimation";

const CAPABILITIES = ["Strategy", "Systems", "AI", "Odoo", "Marketing"];

/** Studio image with a subtle scroll parallax (disabled on mobile / reduced motion). */
function ParallaxImage() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches
    ) {
      return;
    }

    let raf = 0;
    let visible = false;

    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const progress = 1 - (rect.top + rect.height) / (window.innerHeight + rect.height);
      const offset = Math.max(-200, Math.min(200, (progress - 0.5) * 400));
      img.style.transform = `translateY(${offset}px) scale(1.12)`;
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) onScroll();
    });
    io.observe(wrap);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="mx-auto mt-12 h-[320px] max-w-2xl overflow-hidden rounded-2xl shadow-lg md:h-[420px]"
    >
      <img
        ref={imgRef}
        src="/brand/xerxes-magdaluyo-photo.jpeg"
        alt="Xerxes Magdaluyo"
        loading="lazy"
        className="h-full w-full object-cover object-[center_35%] will-change-transform"
        style={{ transform: "scale(1.12)" }}
      />
    </div>
  );
}

/** Founder quote + capability "logo" row, reference testimonial-quote layout. */
export default function StudioQuoteSection() {
  const { ref, inView } = useInViewAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      aria-labelledby="studio-quote"
      className="studio-reference-page bg-[#FDFCFA] px-6 py-12"
    >
      <div className="mx-auto max-w-2xl text-center">
        <Quote
          aria-hidden
          className={`mx-auto mb-6 h-6 w-6 text-slate-900 ${fadeClass(inView)}`}
          style={{ animationDelay: "0.1s" }}
        />
        <blockquote
          id="studio-quote"
          className={`font-studio-body text-[32px] leading-[1.1] tracking-tight text-[#0D212C] md:text-[40px] lg:text-[44px] ${fadeClass(inView)}`}
          style={{ animationDelay: "0.2s" }}
        >
          "I built this <span className="font-studio-serif">work</span> for businesses
          that are tired of <span className="font-studio-serif">disconnected tools</span>,
          unclear vendors, and systems that only one person understands.”
        </blockquote>
        <p
          className={`font-studio-body mt-6 text-sm italic text-[#273C46] ${fadeClass(inView)}`}
          style={{ animationDelay: "0.3s" }}
        >
          Xerxes Duane
        </p>

        <ul
          className={`mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 ${fadeClass(inView)}`}
          style={{ animationDelay: "0.4s" }}
          aria-label="Consulting capabilities"
        >
          {CAPABILITIES.map((c) => (
            <li
              key={c}
              className="font-studio-body min-w-[100px] text-[22px] font-medium text-slate-900 md:text-[24px]"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>

      <ParallaxImage />
    </section>
  );
}
