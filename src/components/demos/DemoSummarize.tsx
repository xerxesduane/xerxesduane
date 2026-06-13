import { useState } from "react";
import { ListChecks, CheckCircle2 } from "lucide-react";
import { jsonDemo } from "../../lib/demoClient";

type Notes = {
  summary: string;
  decisions: string[];
  actionItems: { task: string; owner: string }[];
};

const EXAMPLE = `quick sync re the new client onboarding. omar says the intake form is too long, ppl drop off. agreed to cut it to 5 fields. layla will redo it in the crm by thursday. we also decided to send a welcome whatsapp automatically after signup — needs the api connected, omar to check with the dev. budget for the automation tool approved, ~AED 150/mo. still open: who writes the welcome message copy. next call monday 10am.`;

export default function DemoSummarize() {
  const [notes, setNotes] = useState(EXAMPLE);
  const [result, setResult] = useState<Notes | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (loading || notes.trim().length < 15) return;
    setError("");
    setResult(null);
    setLoading(true);
    try {
      setResult(await jsonDemo<Notes>("/api/demo/summarize", { notes }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={run} className="flex flex-col gap-3">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={5}
        placeholder="Paste messy meeting notes or a voice-note transcript…"
        aria-label="Meeting notes"
        className="w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />
      <button
        type="submit"
        disabled={loading || notes.trim().length < 15}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ListChecks size={15} />
        {loading ? "Processing…" : "Summarize & extract tasks"}
      </button>

      {error && <p className="text-xs text-gold">{error}</p>}

      {result && (
        <div className="flex flex-col gap-4 rounded-2xl border border-cream/10 bg-cream/5 p-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Summary</p>
            <p className="mt-1 text-sm text-cream-dim">{result.summary}</p>
          </div>

          {result.decisions?.length > 0 && (
            <div className="border-t border-cream/10 pt-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Decisions</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {result.decisions.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-cream-dim">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#3FB984]" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.actionItems?.length > 0 && (
            <div className="border-t border-cream/10 pt-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Action items</p>
              <div className="mt-2 flex flex-col gap-2">
                {result.actionItems.map((a, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 rounded-xl bg-ink-deep/50 px-3 py-2">
                    <span className="text-sm text-cream">{a.task}</span>
                    <span className="shrink-0 rounded-full bg-gold/10 px-2.5 py-0.5 text-xs text-gold/90">{a.owner}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
