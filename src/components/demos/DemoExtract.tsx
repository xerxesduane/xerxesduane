import { useState } from "react";
import { Wand2 } from "lucide-react";
import { jsonDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Lead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  intent: "buy" | "support" | "partnership" | "hiring" | "other" | "unknown";
  services: string[];
  urgency: "low" | "medium" | "high" | "unknown";
  summary: string;
  suggestedReply: string;
};

const EXAMPLE = `hey there, found you through a friend. we run a small dental clinic in JLT (Bright Smile) and honestly our booking is a mess — half on whatsapp, half on paper. losing appts. would love a proper online booking + reminders thing, and maybe connect it to our accounts. need it before ramadan ideally. you can reach me on 050 123 4567 or sara@brightsmile.ae. thanks!`;

const URGENCY_COLOR: Record<Lead["urgency"], string> = {
  high: "text-gold",
  medium: "text-cream",
  low: "text-cream-dim",
  unknown: "text-muted-dark",
};

export default function DemoExtract() {
  const [text, setText] = useState(EXAMPLE);
  const [result, setResult] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function extract(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    track("demo_run", { demo: "extract" });
    setError("");
    setResult(null);
    setLoading(true);
    try {
      setResult(await jsonDemo<Lead>("/api/demo/extract", { text }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={extract} className="flex flex-col gap-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="Paste a messy enquiry — a WhatsApp message, an email, a DM…"
        aria-label="Message to extract from"
        className="w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />
      <button
        type="submit"
        disabled={loading || text.trim().length < 10}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Wand2 size={16} />
        {loading ? "Extracting…" : "Extract structured data"}
      </button>

      {error && <p role="alert" className="text-xs text-gold">{error}</p>}

      {result && (
        <div role="status" aria-live="polite" aria-busy={loading} className="rounded-2xl border border-cream/10 bg-cream/5 p-4">
          <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            <Field label="Name" value={result.name} />
            <Field label="Company" value={result.company} />
            <Field label="Email" value={result.email} />
            <Field label="Phone" value={result.phone} />
            <Field label="Intent" value={result.intent} />
            <Field
              label="Urgency"
              value={result.urgency}
              className={URGENCY_COLOR[result.urgency] ?? "text-cream-dim"}
            />
          </div>

          {result.services.length > 0 && (
            <div className="mt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Services</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.services.map((s) => (
                  <span key={s} className="rounded-full bg-gold/10 px-2.5 py-1 text-xs text-gold/90">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 border-t border-cream/10 pt-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Summary</p>
            <p className="mt-1 text-sm text-cream-dim">{result.summary}</p>
          </div>

          {result.suggestedReply && (
            <div className="mt-3 rounded-xl bg-ink-deep/50 p-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold/70">Suggested reply</p>
              <p className="mt-1 text-sm italic text-cream-dim">{result.suggestedReply}</p>
            </div>
          )}
        </div>
      )}
    </form>
  );
}

function Field({ label, value, className = "text-cream-dim" }: { label: string; value: string; className?: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">{label}</p>
      <p className={`mt-0.5 text-sm ${className}`}>{value?.trim() ? value : <span className="text-muted-dark">—</span>}</p>
    </div>
  );
}
