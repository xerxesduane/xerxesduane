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
      id="services"
      aria-labelledby="studio-intro-heading"
      className="studio-reference-page studio-reference-section px-6 py-16 md:py-20"
    >
      <div className="mx-auto flex max-w-[520px] flex-col items-center text-center">
        <p
          className={`font-studio-serif mb-4 text-[38px] tracking-tight text-[color:var(--studio-gold)] md:text-[48px] lg:text-[56px] ${fadeClass(inView)}`}
          style={{ animationDelay: "0.1s" }}
        >
          Xerxes Duane
        </p>

        <p
          className={`mb-4 font-pixel text-xs uppercase text-[color:var(--studio-muted)] md:text-sm ${fadeClass(inView)}`}
          style={{ animationDelay: "0.2s" }}
        >
          Independent Systems Consultant in Dubai
        </p>

        <h2
          id="studio-intro-heading"
          className={`font-studio-body text-[34px] font-semibold leading-[1.02] tracking-tight text-[color:var(--studio-cream)] md:text-[46px] lg:text-[54px] ${fadeClass(inView)}`}
          style={{ animationDelay: "0.3s" }}
        >
          Build the <span className="font-studio-serif">next system</span>,
          <br />
          the <span className="font-studio-serif">clear way.</span>
        </h2>

        <div
          className={`font-studio-body mt-5 flex flex-col gap-6 text-sm leading-relaxed text-[color:var(--studio-cream-dim)] md:mt-6 md:text-base ${fadeClass(inView)}`}
          style={{ animationDelay: "0.4s" }}
        >
          <p>
            I help small businesses connect websites, CRM, Odoo/ERP, WhatsApp,
            automation, ads, and AI into one practical operating system.
          </p>
          <p>
            The work is deliberately direct. You work with Xerxes on the
            strategy, build, and decisions. Creative and technical support is brought
            in only when the project needs it.
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
          <Button variant="secondary" href="#work">
            View projects
          </Button>
        </div>
      </div>
    </section>
  );
}
