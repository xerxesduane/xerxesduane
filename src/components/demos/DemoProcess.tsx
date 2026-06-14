import { useState } from "react";
import { Workflow, Sparkles, AlertTriangle, Clock, ArrowRight } from "lucide-react";
import { jsonDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Effort = "low" | "medium" | "high";

type Analysis = {
  steps: string[];
  bottlenecks: { step: string; problem: string; impact: string }[];
  automationPlan: { task: string; tool: string; effort: Effort }[];
  estimatedTimeSaved: string;
};

const EXAMPLE = `When a quote request comes in, it can land on WhatsApp, in our shared inbox, or as a website form. Whoever sees it first copies the details into a Google Sheet by hand. We message the customer back asking for missing info, then I work out pricing from an old price-list document and type up a quote in Word. I email or WhatsApp it as a PDF, then chase by hand a few days later if there's no reply. Won deals get re-typed into our accounting system. Two of us spend most mornings on this.`;

const EFFORT_PILL: Record<Effort, string> = {
  low: "bg-gold/10 text-gold ring-gold/20",
  medium: "bg-cream/10 text-cream ring-cream/20",
  high: "bg-cream/5 text-cream-dim ring-cream/15",
};

export default function DemoProcess() {
  const [workflow, setWorkflow] = useState(EXAMPLE);
  const [result, setResult] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyze(e: React.FormEvent) {
    e.preventDefault();
    if (loading || workflow.trim().length < 20) return;
    track("demo_run", { demo: "process" });
    setError("");
    setResult(null);
    setLoading(true);
    try {
      setResult(await jsonDemo<Analysis>("/api/demo/process", { workflow }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={analyze} className="flex flex-col gap-3">
      <textarea
        value={workflow}
        onChange={(e) => setWorkflow(e.target.value)}
        rows={6}
        placeholder="Describe a manual workflow, step by step — how a job moves from start to finish today…"
        aria-label="Manual workflow description"
        className="w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setWorkflow(EXAMPLE)}
          className="inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
        >
          <Sparkles size={12} /> Load an example
        </button>
        <button
          type="submit"
          disabled={loading || workflow.trim().length < 20}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Workflow size={15} />
          {loading ? "Analysing…" : "Analyse the process"}
        </button>
      </div>

      {error && <p role="alert" className="text-xs text-gold">{error}</p>}

      {result && (
        <div
          role="status"
          aria-live="polite"
          aria-busy={loading}
          className="rounded-2xl border border-cream/10 bg-cream/5 p-4"
        >
          {result.steps.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">The workflow today</p>
              <ol className="mt-2 flex flex-col gap-2">
                {result.steps.map((step, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/10 font-mono text-[10px] text-gold ring-1 ring-gold/20">
                      {i + 1}
                    </span>
                    <p className="text-sm text-cream-dim">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {result.bottlenecks.length > 0 && (
            <div className="mt-4 border-t border-cream/10 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Bottlenecks</p>
              <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                {result.bottlenecks.map((b, i) => (
                  <div key={i} className="rounded-xl bg-ink-deep/50 p-3">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle size={13} className="shrink-0 text-gold" />
                      <p className="text-sm font-medium text-cream">{b.step}</p>
                    </div>
                    <p className="mt-1 text-xs text-cream-dim">{b.problem}</p>
                    <p className="mt-1 text-xs text-muted">{b.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.automationPlan.length > 0 && (
            <div className="mt-4 border-t border-cream/10 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Automation plan</p>
              <div className="mt-2 flex flex-col gap-2">
                {result.automationPlan.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-3 rounded-xl bg-ink-deep/50 p-3"
                  >
                    <div>
                      <p className="text-sm text-cream-dim">{a.task}</p>
                      <p className="mt-0.5 text-xs text-muted">{a.tool}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ring-1 ${
                        EFFORT_PILL[a.effort] ?? EFFORT_PILL.medium
                      }`}
                    >
                      {a.effort} effort
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex items-start gap-2 rounded-xl bg-ink-deep/50 p-3">
            <Clock size={15} className="mt-0.5 shrink-0 text-gold" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold/70">
                Time saved · rough estimate
              </p>
              <p className="mt-0.5 text-base font-semibold text-cream">{result.estimatedTimeSaved}</p>
            </div>
          </div>

          <a
            href="/ai-automation-dubai"
            data-cursor="link"
            className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
          >
            See how I'd automate this
            <ArrowRight size={14} />
          </a>
        </div>
      )}
    </form>
  );
}
