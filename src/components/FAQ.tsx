import { useId, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQS } from "../data/content";
import { EASE, fadeUp, stagger, VIEWPORT } from "../lib/motion";

/**
 * The homepage FAQ.
 *
 * A disclosure list, not a tab set: each question is a button that owns its
 * own answer via `aria-controls` + `aria-expanded`, the answer region is
 * labelled by its question, and only one is open at a time because the answers
 * are long enough that two open at once buries the rest of the list.
 *
 * The height animation is on a wrapper with `overflow: hidden`; the answer
 * itself never animates, so text never reflows mid-transition.
 */
export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <m.section
      id="faq"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="scroll-mt-24 py-14 sm:py-16"
      aria-label="Common questions"
    >
      <m.header variants={fadeUp} className="mb-6 max-w-2xl">
        <span className="eyebrow">Common questions</span>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
          The honest answers.
        </h2>
      </m.header>

      <m.div
        variants={fadeUp}
        className="divide-y divide-line overflow-hidden rounded-card border border-line bg-panel shadow-card"
      >
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          const panelId = `${id}-panel-${i}`;
          const buttonId = `${id}-button-${i}`;
          return (
            <div key={faq.q}>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start transition-colors hover:bg-panel-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:px-6 sm:py-5"
                >
                  <span
                    className={`font-display text-[1.02rem] font-bold transition-colors sm:text-lg ${
                      isOpen ? "text-accent-deep" : "text-fg"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <m.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    aria-hidden
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border ${
                      isOpen
                        ? "border-transparent bg-accent text-accent-ink"
                        : "border-line bg-panel-alt text-fg-soft"
                    }`}
                  >
                    <Plus size={17} strokeWidth={2.4} />
                  </m.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="px-5 pb-5 sm:px-6"
                    >
                      <p className="max-w-prose text-[0.95rem] leading-relaxed text-fg-soft">
                        {faq.a}
                      </p>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </m.div>
    </m.section>
  );
}
