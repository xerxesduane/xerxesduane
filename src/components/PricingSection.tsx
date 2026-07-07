import useInViewAnimation, { fadeClass } from "../hooks/useInViewAnimation";
import Button from "./Button";
import { CONTACT } from "../data/content";

export default function PricingSection() {
  const { ref, inView } = useInViewAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      aria-labelledby="studio-pricing"
      className="studio-reference-page studio-reference-section w-full px-6 py-12 md:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="studio-reference-eyebrow mx-auto">
            Simple starting points
          </p>
          <h2
            id="studio-pricing"
            className="font-studio-body mt-5 text-3xl font-semibold tracking-tight text-[color:var(--studio-cream)] md:text-4xl"
          >
            Pick the level of help you need.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            className={`studio-reference-card flex min-h-[360px] flex-col rounded-[28px] p-8 ${fadeClass(inView)}`}
            style={{ animationDelay: "0.1s" }}
          >
            <p className="font-studio-pixel text-xs uppercase text-[color:var(--studio-gold)]">
              Starter
            </p>
            <h3 className="font-studio-body mt-4 text-2xl font-semibold text-[color:var(--studio-cream)]">
              Quick Win Sprint
            </h3>
            <p className="font-studio-body mt-4 text-sm leading-relaxed text-[color:var(--studio-cream-dim)] md:text-base">
              One focused fix: a form, WhatsApp follow-up, tracking cleanup, landing-page
              tune-up, or a small automation.
            </p>
            <div className="mt-8">
              <p className="font-studio-body text-4xl font-semibold text-[color:var(--studio-gold)]">
                AED 1,500
              </p>
              <p className="font-studio-body text-sm text-[color:var(--studio-muted)]">One focused sprint</p>
            </div>
            <div className="mt-auto pt-8">
              <Button variant="tertiary" href={CONTACT.calendar} target="_blank" rel="noopener">
                Start small
              </Button>
            </div>
          </div>

          <div
            className={`flex min-h-[360px] flex-col rounded-[28px] border border-[rgba(232,193,115,0.4)] bg-[color:var(--studio-ink)] p-8 shadow-[inset_0_2px_8px_rgba(255,255,255,0.08),0_18px_70px_-34px_rgba(232,193,115,0.55)] ${fadeClass(inView)}`}
            style={{ animationDelay: "0.2s" }}
          >
            <p className="font-studio-pixel text-xs uppercase text-[color:var(--studio-gold)]">
              Ongoing
            </p>
            <h3 className="font-studio-body mt-4 text-2xl font-semibold text-[color:var(--studio-cream)]">
              Monthly Partnership
            </h3>
            <p className="font-studio-body mt-4 text-sm leading-relaxed text-[color:var(--studio-cream-dim)] md:text-base">
              A dedicated systems partner for improvements, maintenance, automations,
              reporting, and practical growth work.
            </p>
            <div className="mt-8">
              <p className="font-studio-body text-4xl font-semibold text-[color:var(--studio-gold)]">
                AED 2,500
              </p>
              <p className="font-studio-body text-sm text-[color:var(--studio-muted)]">Monthly</p>
            </div>
            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <Button variant="secondary" href={CONTACT.calendar} target="_blank" rel="noopener">
                Start a chat
              </Button>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 md:text-base"
              >
                Ask what fits
              </a>
            </div>
          </div>

          <div
            className={`studio-reference-card flex min-h-[360px] flex-col rounded-[28px] p-8 ${fadeClass(inView)}`}
            style={{ animationDelay: "0.3s" }}
          >
            <p className="font-studio-pixel text-xs uppercase text-[color:var(--studio-gold)]">
              Build
            </p>
            <h3 className="font-studio-body mt-4 text-2xl font-semibold text-[color:var(--studio-cream)]">
              Custom Project
            </h3>
            <p className="font-studio-body mt-4 text-sm leading-relaxed text-[color:var(--studio-cream-dim)] md:text-base">
              Fixed scope, fixed timeline. Websites, CRM, Odoo/ERP, dashboards, internal
              tools, or AI workflows built around your process.
            </p>
            <div className="mt-8">
              <p className="font-studio-body text-4xl font-semibold text-[color:var(--studio-gold)]">
                AED 5,000
              </p>
              <p className="font-studio-body text-sm text-[color:var(--studio-muted)]">Project minimum</p>
            </div>
            <div className="mt-auto pt-8">
              <Button variant="tertiary" href={CONTACT.calendar} target="_blank" rel="noopener">
                Start a chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
