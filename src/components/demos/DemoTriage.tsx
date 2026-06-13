import { useState } from "react";
import { Inbox } from "lucide-react";
import { jsonDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Triage = {
  department: "sales" | "support" | "billing" | "complaint" | "general";
  priority: "low" | "medium" | "high" | "urgent";
  sentiment: "positive" | "neutral" | "negative";
  language: string;
  sla: string;
  ackDraft: string;
};

const EXAMPLE =
  "Hi — I was charged twice for my subscription this month and the second payment hasn't been refunded. This is really frustrating, I've emailed twice already with no reply. Please sort this out today.";

const PRIORITY_STYLES: Record<Triage["priority"], string> = {
  low: "bg-cream/10 text-cream-dim",
  medium: "bg-gold/15 text-gold",
  high: "bg-gold/25 text-gold",
  urgent: "bg-gold text-ink-deep",
};

const SENTIMENT_STYLES: Record<Triage["sentiment"], string> = {
  positive: "bg-gold/15 text-gold",
  neutral: "bg-cream/10 text-cream-dim",
  negative: "bg-gold/25 text-gold",
};

export default function DemoTriage() {
  const [message, setMessage] = useState(EXAMPLE);
  const [result, setResult] = useState<Triage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function triage(e: React.FormEvent) {
    e.preventDefault();
    if (loading || message.trim().length < 10) return;
    track("demo_run", { demo: "triage" });
    setError("");
    setResult(null);
    setLoading(true);
    try {
      setResult(await jsonDemo<Triage>("/api/demo/triage", { message }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={triage} className="flex flex-col gap-3">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        placeholder="Paste a customer message — an email, a chat, a contact-form note…"
        aria-label="Customer message to triage"
        className="w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />
      <button
        type="submit"
        disabled={loading || message.trim().length < 10}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Inbox size={15} />
        {loading ? "Triaging…" : "Triage & route"}
      </button>

      {error && (
        <p role="alert" className="text-xs text-gold">
          {error}
        </p>
      )}

      <div role="status" aria-live="polite" aria-busy={loading}>
        {result && (
          <div className="rounded-2xl border border-cream/10 bg-cream/5 p-4 sm:p-5">
            <div className="flex items-center justify-between border-b border-cream/10 pb-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Routed to</p>
                <p className="text-sm font-medium capitalize text-cream">{result.department}</p>
              </div>
              <Inbox size={20} className="text-gold/70" />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
              <Field label="Priority">
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${PRIORITY_STYLES[result.priority]}`}>
                  {result.priority}
                </span>
              </Field>
              <Field label="Sentiment">
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${SENTIMENT_STYLES[result.sentiment]}`}>
                  {result.sentiment}
                </span>
              </Field>
              <Field label="Language">
                <span className="text-sm text-cream-dim">{result.language}</span>
              </Field>
              <Field label="Respond">
                <span className="text-sm text-cream-dim">{result.sla}</span>
              </Field>
            </div>

            {result.ackDraft && (
              <div className="mt-4 rounded-xl border border-cream/10 bg-ink-deep/40 p-3">
                <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-gold/70">Acknowledgement draft</p>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-cream-dim">{result.ackDraft}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">{label}</p>
      {children}
    </div>
  );
}
