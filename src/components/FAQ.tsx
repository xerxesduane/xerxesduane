import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "../data/content";
import { EASE } from "../lib/motion";
import SectionHeading from "./ui/SectionHeading";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-bl">
        <SectionHeading
          eyebrow="Common questions"
          title={
            <>
              The honest <span className="text-gradient-gold">answers.</span>
            </>
          }
        />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-cream/8 overflow-hidden rounded-3xl border border-cream/8 bg-ink-surface/30">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-cream/[0.03]"
                  >
                    <span
                      className={`font-display text-lg transition-colors ${
                        isOpen ? "text-gold" : "text-cream"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <m.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="shrink-0 text-gold"
                    >
                      <Plus size={20} />
                    </m.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[15px] text-muted">{faq.a}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
