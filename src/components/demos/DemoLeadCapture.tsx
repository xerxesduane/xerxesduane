import { useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { CONTACT } from "../../data/content";
import { track } from "../../lib/analytics";

/**
 * A slim "want this in your business?" capture, shown right after a visitor has
 * seen a demo work — the highest-intent moment in the AI Lab. Posts to the same
 * Formspree as the main contact form, tagged with which demo drove it, and fires
 * a GA4 conversion event.
 */
export default function DemoLeadCapture({
  demo,
  prompt = "Want this running in your business?",
  sub = "Drop your WhatsApp or email and I'll show you what it would take — free, no pressure.",
}: {
  demo: string;
  prompt?: string;
  sub?: string;
}) {
  const [state, handleSubmit] = useForm(CONTACT.formspreeId);

  useEffect(() => {
    if (state.succeeded) track("generate_lead", { method: "ai_lab_capture", demo });
  }, [state.succeeded, demo]);

  if (state.succeeded) {
    return (
      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-gold/25 bg-gold/[0.06] p-4 text-sm text-cream">
        <CheckCircle2 size={18} className="shrink-0 text-gold" />
        Got it — I'll be in touch within a few hours. Want to skip ahead?{" "}
        <a
          href={`https://wa.me/${CONTACT.whatsapp}`}
          target="_blank"
          rel="noopener"
          className="font-semibold text-gold underline decoration-gold/50 underline-offset-2 hover:text-gold-soft"
        >
          Message me on WhatsApp →
        </a>
      </div>
    );
  }

  return (
    <form
      action={`https://formspree.io/f/${CONTACT.formspreeId}`}
      method="POST"
      onSubmit={handleSubmit}
      className="mt-6 rounded-2xl border border-cream/10 bg-ink-deep/40 p-4 sm:p-5"
    >
      <input type="hidden" name="_subject" value={`AI Lab lead — ${demo} demo`} />
      <input type="hidden" name="demo" value={demo} />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      <p className="text-sm font-semibold text-cream">{prompt}</p>
      <p className="mt-1 text-[13px] text-muted">{sub}</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          name="contact"
          required
          aria-label="Your WhatsApp or email"
          placeholder="WhatsApp number or email"
          className="min-w-0 flex-1 rounded-xl border border-cream/10 bg-ink-deep/60 px-4 py-2.5 text-[15px] text-cream placeholder:text-muted-dark focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
        />
        <button
          type="submit"
          disabled={state.submitting}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.submitting ? "Sending…" : "Get this set up"}
          {!state.submitting && <ArrowUpRight size={16} strokeWidth={2.5} />}
        </button>
      </div>
      <ValidationError errors={state.errors} className="mt-2 text-xs text-gold" />
    </form>
  );
}
