import { useState } from "react";
import { ArrowRight, MessageSquareReply, Sparkles } from "lucide-react";
import { jsonDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type LeadResponse = {
  intent: string;
  urgency: "low" | "medium" | "high";
  summary: string;
  suggestedReply: string;
  nextStep: string;
};

const EXAMPLE = `Hi, I saw your AC servicing ad. Our office in Business Bay has 6 split units and two of them are barely cooling — it's getting really uncomfortable for the team. We'd need someone out this week if possible. Can you do a maintenance contract too? Reach me on 050 998 7766 or omar@nasr-trading.ae. Thanks!`;

const URGENCY_COLOR: Record<LeadResponse["urgency"], string> = {
  high: "text-gold",
  medium: "text-cream",
  low: "text-muted-dark",
};

export default function DemoLeadResponse() {
  const [enquiry, setEnquiry] = useState(EXAMPLE);
  const [result, setResult] = useState<LeadResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function respond(e: React.FormEvent) {
    e.preventDefault();
    if (loading || enquiry.trim().length < 10) return;
    track("demo_run", { demo: "leadresponse" });
    setError("");
    setResult(null);
    setLoading(true);
    try {
      setResult(await jsonDemo<LeadResponse>("/api/demo/lead-response", { enquiry }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={respond} className="flex flex-col gap-3">
      <textarea
        value={enquiry}
        onChange={(e) => setEnquiry(e.target.value)}
        rows={5}
        placeholder="Paste a customer enquiry — an email, a WhatsApp message, a contact-form note…"
        aria-label="Customer enquiry"
        className="w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setEnquiry(EXAMPLE)}
          className="inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
        >
          <Sparkles size={12} /> Load an example
        </button>
        <button
          type="submit"
          disabled={loading || enquiry.trim().length < 10}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <MessageSquareReply size={16} />
          {loading ? "Drafting…" : "Draft a response"}
        </button>
      </div>

      {error && <p role="alert" className="text-xs text-gold">{error}</p>}

      {result && (
        <div role="status" aria-live="polite" aria-busy={loading} className="rounded-2xl border border-cream/10 bg-cream/5 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-gold/10 px-2.5 py-1 text-xs text-gold/90">{result.intent}</span>
            <span
              className={`rounded-full border border-cream/10 px-2.5 py-1 text-xs font-medium ${
                URGENCY_COLOR[result.urgency] ?? "text-cream-dim"
              }`}
            >
              {result.urgency} urgency
            </span>
          </div>

          <div className="mt-4 border-t border-cream/10 pt-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Summary</p>
            <p className="mt-1 text-sm text-cream-dim">{result.summary}</p>
          </div>

          {result.suggestedReply && (
            <div className="mt-3 rounded-xl bg-ink-deep/50 p-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold/70">Suggested reply</p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-cream-dim">{result.suggestedReply}</p>
            </div>
          )}

          <div className="mt-3 border-t border-cream/10 pt-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Next step</p>
            <p className="mt-1 text-sm text-cream-dim">{result.nextStep}</p>
          </div>
        </div>
      )}

      <a
        href="/crm-development-dubai"
        data-cursor="link"
        className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
      >
        Never miss a lead again
        <ArrowRight size={14} />
      </a>
    </form>
  );
}
