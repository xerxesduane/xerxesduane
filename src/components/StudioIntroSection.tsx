import useInViewAnimation, { fadeClass } from "../hooks/useInViewAnimation";
import Button from "./Button";
import { CONTACT } from "../data/content";

/**
 * Reference-style studio intro — opens the lower "studio landing" half of the
 * homepage (appears after the two retained top sections).
 */
export default function StudioIntroSection() {
  const { ref, inView } = useInViewAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      aria-labelledby="studio-intro-heading"
      className="studio-reference-page bg-[#FDFCFA] px-6 py-16 md:py-20"
    >
      <div className="mx-auto flex max-w-[520px] flex-col items-center text-center">
        <p
          className={`font-studio-serif mb-4 text-[32px] font-semibold tracking-tight text-[#051A24] md:text-[40px] lg:text-[44px] ${fadeClass(inView)}`}
          style={{ animationDelay: "0.1s" }}
        >
          Xerxes Duane
        </p>

        <p
          className={`mb-2 font-mono text-xs text-[#051A24] md:text-sm ${fadeClass(inView)}`}
          style={{ animationDelay: "0.2s" }}
        >
          The connected-systems studio of Xerxes Duane
        </p>

        <h2
          id="studio-intro-heading"
          className={`font-studio-body text-[32px] leading-[1.1] tracking-tight text-[#051A24] md:text-[40px] lg:text-[44px] ${fadeClass(inView)}`}
          style={{ animationDelay: "0.3s" }}
        >
          Build the <span className="font-studio-serif">next system</span>,
          <br />
          the <span className="font-studio-serif">clear way.</span>
        </h2>

        <div
          className={`font-studio-body mt-5 flex flex-col gap-6 text-sm leading-relaxed text-[#051A24] md:mt-6 md:text-base ${fadeClass(inView)}`}
          style={{ animationDelay: "0.4s" }}
        >
          <p>
            I help small businesses in Dubai connect websites, CRM, WhatsApp, invoicing,
            dashboards, ads, AI tools, and internal systems into one practical operating
            system.
          </p>
          <p>
            The studio is deliberately small. You work directly with Xerxes on the
            strategy, build, and decisions — with creative and technical support brought
            in when the project needs it.
          </p>
          <p>
            Projects start from AED 5,000. Monthly partnership starts from AED
            2,500/month.
          </p>
        </div>

        <div
          className={`mt-8 flex flex-col items-center gap-4 sm:flex-row ${fadeClass(inView)}`}
          style={{ animationDelay: "0.5s" }}
        >
          <Button variant="primary" href={CONTACT.calendar} target="_blank" rel="noopener">
            Book a free systems audit
          </Button>
          <Button variant="secondary" href="#studio-projects">
            View projects
          </Button>
        </div>
      </div>
    </section>
  );
}
