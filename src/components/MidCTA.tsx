import { ArrowUpRight } from "lucide-react";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import DottedOrbit from "./fx/DottedOrbit";

/**
 * Mid-page conversion band. Gives visitors a way to act around the halfway
 * point instead of having to reach the contact section at the very bottom.
 */
export default function MidCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24" aria-label="Book a free audit">
      <DottedOrbit
        tone="gold"
        className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 opacity-50"
      />
      <div className="container-bl relative">
        <Reveal className="glass border-glow relative mx-auto max-w-4xl overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12 sm:py-14">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl"
          />
          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-gold/60" aria-hidden />
            No pressure, no jargon
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl sm:text-4xl">
            See exactly where your systems are{" "}
            <span className="text-gradient-gold">leaking time and money.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">
            Book a free 60-minute audit. We map what you have, what's breaking,
            and the highest-leverage fix, whether or not you ever hire us.
          </p>
          <div className="mt-9 flex justify-center">
            <Button href="#contact" className="px-7 py-3.5">
              Book your free audit
              <ArrowUpRight size={17} strokeWidth={2.5} />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
