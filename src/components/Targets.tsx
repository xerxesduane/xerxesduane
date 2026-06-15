import { m } from "framer-motion";
import { TrendingUp, Target, Clock, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

// "What good looks like" — forward-looking TARGETS, deliberately framed as aims,
// not claimed past results (those live, with real numbers, in ResultsBand). No
// specific figures are asserted as outcomes; the disclaimer keeps it honest.
const TARGETS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: TrendingUp,
    title: "Organic growth that compounds",
    body: "The aim: more qualified organic traffic and page-one rankings for the terms that actually convert — built over months, not overnight.",
  },
  {
    icon: Target,
    title: "Leads at a cost that works",
    body: "The aim: more qualified enquiries at a controlled cost per acquisition — paid spend that earns its keep instead of leaking budget.",
  },
  {
    icon: Clock,
    title: "Hours back every week",
    body: "The aim: automate the repetitive admin that eats your mornings, and answer every enquiry faster — without adding headcount.",
  },
  {
    icon: Workflow,
    title: "One connected system",
    body: "The aim: your website, CRM, ERP and ads talking to each other — fewer manual steps, fewer dropped balls, one source of truth.",
  },
];

export default function Targets() {
  return (
    <section className="bg-[#E8E1D2] py-20 sm:py-28" aria-label="What good looks like">
      <div className="container-bl">
        <SectionHeading
          tone="light"
          eyebrow="What good looks like"
          title={
            <>
              What a strong engagement <span className="text-gold-deep">aims for.</span>
            </>
          }
          subtitle="Every business is different — these are the outcomes I optimise toward with you. Targets to work toward, not guarantees."
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-12 grid max-w-content gap-4 sm:gap-5 sm:grid-cols-2"
        >
          {TARGETS.map((t) => {
            const Icon = t.icon;
            return (
              <m.div
                key={t.title}
                variants={fadeUp}
                className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-ink/[0.04] p-6"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink/5 text-gold-deep ring-1 ring-ink/10">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="text-lg text-ink">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{t.body}</p>
                </div>
              </m.div>
            );
          })}
        </m.div>

        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto mt-8 max-w-xl text-center text-sm text-ink/60"
        >
          The honest version: results depend on your market, budget and starting point. A free audit is where
          we set realistic targets for yours.{" "}
          <a href="/#contact" data-cursor="link" className="font-semibold text-gold-deep underline-offset-2 hover:underline">
            Book it →
          </a>
        </m.p>
      </div>
    </section>
  );
}
