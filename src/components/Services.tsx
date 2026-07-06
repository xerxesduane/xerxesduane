import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Magnet, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";
import { OUTCOMES, CREATIVE_SUPPORT } from "../data/content";

const OUTCOME_ICONS: LucideIcon[] = [Magnet, ShieldCheck, Workflow];
const OUTCOME_PRICES = ["from AED 2,500", "from AED 4,000", "from AED 6,000"];
const VIDEO_SRC =
  "https://res.cloudinary.com/dymdk9ysp/video/upload/v1783345689/Dubai_City_Skyline_Night_Traffic_Aerial_by_Yavor_Yanakiev_-_Stock_Video_-_Motion_Array_rf86de.mp4";

const HEADING_CHAR_DELAY_MS = 30;
const HEADING_INITIAL_DELAY_MS = 200;
const HEADING_DURATION_MS = 500;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

interface AnimatedHeadingProps {
  lines: { text: string; className?: string }[];
}

function AnimatedHeading({ lines }: AnimatedHeadingProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const label = lines.map((line) => line.text).join(" ");

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 0);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  let charIndex = 0;

  return (
    <h2
      aria-label={label}
      className="text-center font-sans text-3xl font-semibold leading-[0.98] tracking-[-0.025em] text-cream md:text-4xl lg:text-[2.75rem]"
      style={{ textShadow: "0 2px 22px rgba(0, 0, 0, 0.55)" }}
    >
      {lines.map((line) => (
        <span key={line.text} aria-hidden="true" className={`block ${line.className ?? ""}`}>
          {line.text.split(" ").map((word, wordIndex, words) => (
            <span key={`${line.text}-${wordIndex}`} className="inline-block whitespace-nowrap">
              {Array.from(word).map((char, index) => {
                const delay = HEADING_INITIAL_DELAY_MS + charIndex * HEADING_CHAR_DELAY_MS;
                charIndex += 1;

                return (
                  <span
                    key={`${word}-${index}`}
                    className="inline-block"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform:
                        visible || prefersReducedMotion ? "translateX(0)" : "translateX(-18px)",
                      transitionProperty: prefersReducedMotion ? "none" : "opacity, transform",
                      transitionDuration: `${HEADING_DURATION_MS}ms`,
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                      transitionDelay: prefersReducedMotion ? "0ms" : `${delay}ms`,
                    }}
                  >
                    {char}
                  </span>
                );
              })}
              {wordIndex < words.length - 1 && (
                <span
                  className="inline-block"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform:
                      visible || prefersReducedMotion ? "translateX(0)" : "translateX(-18px)",
                    transitionProperty: prefersReducedMotion ? "none" : "opacity, transform",
                    transitionDuration: `${HEADING_DURATION_MS}ms`,
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: prefersReducedMotion
                      ? "0ms"
                      : `${HEADING_INITIAL_DELAY_MS + charIndex++ * HEADING_CHAR_DELAY_MS}ms`,
                  }}
                >
                  {"\u00A0"}
                </span>
              )}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

function FadeIn({ children, className, delay = 0, duration = 1000 }: FadeInProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), prefersReducedMotion ? 0 : delay);
    return () => window.clearTimeout(timer);
  }, [delay, prefersReducedMotion]);

  return (
    <div
      className={`transition-opacity ${className ?? ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: prefersReducedMotion ? "0ms" : `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative isolate min-h-screen overflow-hidden bg-black px-6 py-20 sm:py-24 lg:py-28"
      aria-label="What I build"
    >
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="mb-6 font-mono text-[11px] uppercase tracking-[0.35em] text-gold"
            style={{ textShadow: "0 2px 18px rgba(0, 0, 0, 0.6)" }}
          >
            WHAT I BUILD
          </p>
          <AnimatedHeading
            lines={[
              { text: "Everything I build serves" },
              { text: "one of three outcomes.", className: "text-gold" },
            ]}
          />
          <FadeIn delay={800} duration={1000}>
            <p
              className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-cream-dim md:text-lg"
              style={{ textShadow: "0 2px 18px rgba(0, 0, 0, 0.65)" }}
            >
              Not a menu of twelve disconnected services — one connected system,
              built in the order your business needs it.
            </p>
          </FadeIn>
        </div>

        <FadeIn
          delay={1100}
          duration={1000}
          className="mt-10 grid min-w-0 gap-4 lg:grid-cols-[repeat(3,minmax(0,1fr))]"
        >
          {OUTCOMES.map((outcome, index) => {
            const Icon = OUTCOME_ICONS[index] ?? Workflow;

            return (
              <article
                key={outcome.title}
                className="liquid-glass liquid-glass-dark group relative flex min-h-[440px] min-w-0 flex-col overflow-hidden rounded-3xl border border-white/20 px-6 py-6 sm:p-7 lg:min-h-[500px]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/40 text-gold ring-1 ring-gold/20 transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-gold group-hover:text-ink">
                    <Icon size={22} strokeWidth={1.7} />
                  </span>
                  <span className="font-mono text-xs text-cream-dim/70">{outcome.no}</span>
                </div>

                <h3 className="mt-6 font-sans text-xl font-semibold leading-tight tracking-[-0.02em] text-cream sm:text-[1.45rem]">
                  {outcome.title}
                </h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-gold/80">
                  {outcome.promise}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-cream-dim">{outcome.body}</p>

                <ul className="mt-6 space-y-1 border-t border-white/10 pt-4">
                  {outcome.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        data-cursor="link"
                        className="group/item flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-cream-dim transition-colors hover:bg-white/[0.06] hover:text-gold"
                      >
                        <span className="min-w-0">{item.label}</span>
                        <ArrowUpRight
                          size={14}
                          strokeWidth={2}
                          className="shrink-0 text-cream-dim/60 opacity-0 transition group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:text-gold group-hover/item:opacity-100"
                          aria-hidden
                        />
                      </a>
                    </li>
                  ))}
                </ul>

                <p className="mt-auto border-t border-white/10 pt-4 font-mono text-xs text-gold">
                  {OUTCOME_PRICES[index]}
                </p>
              </article>
            );
          })}
        </FadeIn>

        <FadeIn
          delay={1300}
          duration={1000}
          className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center"
        >
          <span className="font-mono text-[11px] uppercase tracking-wider text-cream-dim">
            Backed by in-house creative:
          </span>
          {CREATIVE_SUPPORT.map((c) => (
            <a
              key={c.label}
              href={c.href}
              data-cursor="link"
              className="rounded-full border border-white/15 bg-black/20 px-3.5 py-1.5 text-xs text-cream-dim backdrop-blur-sm transition-colors hover:border-gold/50 hover:text-gold"
            >
              {c.label}
            </a>
          ))}
        </FadeIn>

        <FadeIn delay={1500} duration={1000}>
          <div className="liquid-glass liquid-glass-dark mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-white/20 px-5 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-sm text-cream-dim">
              Indicative starting prices. You get one fixed quote after your free
              systems audit, no surprises and no lock-in. Ad spend and software
              licences are billed separately.
            </p>
            <a
              href="#contact"
              data-cursor="link"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/30 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-gold transition hover:border-gold hover:bg-gold hover:text-ink"
            >
              Start with the audit
              <ArrowUpRight size={14} strokeWidth={2.4} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
