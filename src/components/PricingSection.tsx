import useInViewAnimation, { fadeClass } from "../hooks/useInViewAnimation";
import Button from "./Button";
import { CONTACT } from "../data/content";

export default function PricingSection() {
  const { ref, inView } = useInViewAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      aria-labelledby="studio-pricing"
      className="studio-reference-page w-full bg-[#FDFCFA] px-6 py-12 md:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="font-studio-pixel text-xs uppercase tracking-[0.2em] text-[#B8892F]">
            Simple starting points
          </p>
          <h2
            id="studio-pricing"
            className="font-studio-body mt-3 text-3xl font-semibold tracking-tight text-[#051A24] md:text-4xl"
          >
            Pick the level of help you need.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            className={`flex min-h-[360px] flex-col rounded-[32px] bg-white p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] ${fadeClass(inView)}`}
            style={{ animationDelay: "0.1s" }}
          >
            <p className="font-studio-pixel text-xs uppercase tracking-[0.2em] text-[#B8892F]">
              Starter
            </p>
            <h3 className="font-studio-body mt-4 text-2xl font-semibold text-[#051A24]">
              Quick Win Sprint
            </h3>
            <p className="font-studio-body mt-4 text-sm leading-relaxed text-[#051A24]/75 md:text-base">
              One focused fix: a form, WhatsApp follow-up, tracking cleanup, landing-page
              tune-up, or a small automation.
            </p>
            <div className="mt-8">
              <p className="font-studio-body text-4xl font-semibold text-[#051A24]">
                AED 1,500
              </p>
              <p className="font-studio-body text-sm text-[#273C46]">One focused sprint</p>
            </div>
            <div className="mt-auto pt-8">
              <Button variant="tertiary" href={CONTACT.calendar} target="_blank" rel="noopener">
                Start small
              </Button>
            </div>
          </div>

          <div
            className={`flex min-h-[360px] flex-col rounded-[32px] bg-[#051A24] p-8 shadow-[inset_0_2px_8px_rgba(255,255,255,0.08),0_18px_50px_-30px_rgba(5,26,36,0.9)] ${fadeClass(inView)}`}
            style={{ animationDelay: "0.2s" }}
          >
            <p className="font-studio-pixel text-xs uppercase tracking-[0.2em] text-[#E8C26F]">
              Ongoing
            </p>
            <h3 className="font-studio-body mt-4 text-2xl font-semibold text-[#F6FCFF]">
              Monthly Partnership
            </h3>
            <p className="font-studio-body mt-4 text-sm leading-relaxed text-[#E0EBF0] md:text-base">
              A dedicated systems partner for improvements, maintenance, automations,
              reporting, and practical growth work.
            </p>
            <div className="mt-8">
              <p className="font-studio-body text-4xl font-semibold text-[#F6FCFF]">
                AED 2,500
              </p>
              <p className="font-studio-body text-sm text-[#E0EBF0]/70">Monthly</p>
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
            className={`flex min-h-[360px] flex-col rounded-[32px] bg-white p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)] ${fadeClass(inView)}`}
            style={{ animationDelay: "0.3s" }}
          >
            <p className="font-studio-pixel text-xs uppercase tracking-[0.2em] text-[#B8892F]">
              Build
            </p>
            <h3 className="font-studio-body mt-4 text-2xl font-semibold text-[#051A24]">
              Custom Project
            </h3>
            <p className="font-studio-body mt-4 text-sm leading-relaxed text-[#051A24]/75 md:text-base">
              Fixed scope, fixed timeline. Websites, CRM, Odoo/ERP, dashboards, internal
              tools, or AI workflows built around your process.
            </p>
            <div className="mt-8">
              <p className="font-studio-body text-4xl font-semibold text-[#051A24]">
                AED 5,000
              </p>
              <p className="font-studio-body text-sm text-[#273C46]">Project minimum</p>
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
