import useInViewAnimation, { fadeClass } from "../hooks/useInViewAnimation";
import Button from "./Button";
import { CONTACT } from "../data/content";

/** Two-card reference pricing layout: Monthly Partnership (dark) + Custom Project (light). */
export default function PricingSection() {
  const { ref, inView } = useInViewAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      aria-labelledby="studio-pricing"
      className="studio-reference-page w-full bg-[#FDFCFA] px-6 py-12"
    >
      <h2 id="studio-pricing" className="sr-only">
        Pricing
      </h2>
      <div className="grid grid-cols-1 gap-8 md:ml-auto md:max-w-4xl md:grid-cols-2 md:justify-end">
        {/* Card 1 — dark: Monthly Partnership */}
        <div
          className={`rounded-[40px] bg-[#051A24] pb-10 pl-10 pr-10 pt-3 shadow-[inset_0_2px_8px_rgba(255,255,255,0.08)] md:pr-24 ${fadeClass(inView)}`}
          style={{ animationDelay: "0.1s" }}
        >
          <h3 className="font-studio-serif mt-7 text-2xl font-semibold text-[#F6FCFF] md:text-3xl">
            Monthly Partnership
          </h3>
          <p className="font-studio-body mt-4 text-sm leading-relaxed text-[#E0EBF0] md:text-base">
            A dedicated creative systems partner.
            <br />
            You work directly with Xerxes.
          </p>
          <p className="font-studio-serif mt-8 text-4xl font-semibold text-[#F6FCFF]">
            AED 2,500
          </p>
          <p className="font-studio-body text-sm text-[#E0EBF0]/70">Monthly</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="secondary" href={CONTACT.calendar} target="_blank" rel="noopener">
              Start a chat
            </Button>
            <Button
              variant="tertiary"
              href="/#process"
              className="bg-transparent text-[#F6FCFF] shadow-[0_0_0_1px_rgba(246,252,255,0.25)]"
            >
              How it works
            </Button>
          </div>
        </div>

        {/* Card 2 — light: Custom Project */}
        <div
          className={`rounded-[40px] bg-white pb-10 pl-10 pr-10 pt-3 shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:pr-24 ${fadeClass(inView)}`}
          style={{ animationDelay: "0.2s" }}
        >
          <h3 className="font-studio-serif mt-7 text-2xl font-semibold text-[#051A24] md:text-3xl">
            Custom Project
          </h3>
          <p className="font-studio-body mt-4 text-sm leading-relaxed text-[#051A24]/80 md:text-base">
            Fixed scope, fixed timeline.
            <br />
            Same standards, same founder-led process.
          </p>
          <p className="font-studio-serif mt-8 text-4xl font-semibold text-[#051A24]">
            AED 5,000
          </p>
          <p className="font-studio-body text-sm text-[#273C46]">Minimum</p>
          <div className="mt-8">
            <Button variant="tertiary" href={CONTACT.calendar} target="_blank" rel="noopener">
              Start a chat
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
