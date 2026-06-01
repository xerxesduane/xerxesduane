import { useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Download, FileText, ArrowUpRight } from "lucide-react";
import { CONTACT } from "../data/content";
import { track } from "../lib/analytics";
import Reveal from "./ui/Reveal";

const PDF_URL = "/resources/systems-audit-checklist.pdf";

export default function LeadMagnet() {
  const [state, handleSubmit] = useForm(CONTACT.formspreeId);

  useEffect(() => {
    if (state.succeeded) track("lead_magnet", { resource: "systems-audit-checklist" });
  }, [state.succeeded]);

  return (
    <section className="py-16 sm:py-24" aria-label="Free systems audit checklist">
      <div className="container-bl">
        <Reveal className="mx-auto max-w-3xl">
          <div className="glass border-glow grid items-center gap-8 rounded-3xl p-7 sm:p-10 md:grid-cols-[1fr_1.1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-gold">
                <FileText size={13} />
                Free download
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl">
                Not ready to book?{" "}
                <span className="text-gradient-gold">Grab the checklist.</span>
              </h2>
              <p className="mt-3 text-muted">
                15 quick checks to spot where your business is leaking time, money,
                and leads, the same things we look for in the audit.
              </p>
            </div>

            {state.succeeded ? (
              <div className="rounded-2xl bg-ink-deep/40 p-6 text-center">
                <p className="text-cream-dim">Done, it's yours.</p>
                <a
                  href={PDF_URL}
                  download
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft"
                >
                  <Download size={17} />
                  Download the checklist
                </a>
              </div>
            ) : (
              <form
                action={`https://formspree.io/f/${CONTACT.formspreeId}`}
                method="POST"
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
              >
                <input type="hidden" name="_subject" value="Systems Audit Checklist download" />
                <input type="hidden" name="source" value="systems-audit-checklist" />
                <label htmlFor="lm-email" className="sr-only">Your email</label>
                <input
                  id="lm-email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@yourbusiness.com"
                  className="w-full rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
                />
                <ValidationError field="email" prefix="Email" errors={state.errors} className="text-xs text-gold" />
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {state.submitting ? "Sending…" : "Email me the checklist"}
                  {!state.submitting && <ArrowUpRight size={16} strokeWidth={2.5} />}
                </button>
                <p className="text-center text-xs text-muted-dark">
                  No spam. Just the checklist and the occasional useful idea.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
