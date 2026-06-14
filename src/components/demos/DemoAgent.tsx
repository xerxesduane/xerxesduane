import { useRef, useState } from "react";
import { Workflow, Sparkles, Check, Loader2, ArrowRight, Wrench } from "lucide-react";
import { streamNdjson } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Step = { id: string; label: string; tool: string; detail: string; status: "running" | "done" };
type AgentEvent =
  | ({ type: "step" } & Step)
  | { type: "summary"; score: number; reply: string; slot: string };

const EXAMPLE =
  "Hi, I run a 12-branch restaurant group in Dubai. Reservations and complaints are scattered across WhatsApp and email and we keep dropping the ball. Looking for someone to build a proper system — maybe AI to triage messages and book tables? Budget is flexible if it works. — Khalid, Operations, +971 50 123 4567";

const field =
  "w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40";

export default function DemoAgent() {
  const [lead, setLead] = useState(EXAMPLE);
  const [steps, setSteps] = useState<Step[]>([]);
  const [summary, setSummary] = useState<{ score: number; reply: string; slot: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (loading || lead.trim().length < 12) return;
    track("demo_run", { demo: "agent" });
    setError("");
    setSteps([]);
    setSummary(null);
    setLoading(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      await streamNdjson<AgentEvent>(
        "/api/demo/agent",
        { lead },
        (ev) => {
          if (ev.type === "summary") {
            setSummary({ score: ev.score, reply: ev.reply, slot: ev.slot });
            return;
          }
          // upsert the step by id
          setSteps((prev) => {
            const next = prev.slice();
            const i = next.findIndex((s) => s.id === ev.id);
            const step: Step = { id: ev.id, label: ev.label, tool: ev.tool, detail: ev.detail, status: ev.status };
            if (i === -1) next.push(step);
            else next[i] = step;
            return next;
          });
        },
        ctrl.signal,
      );
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={run} className="flex flex-col gap-3">
      <textarea
        value={lead}
        onChange={(e) => setLead(e.target.value)}
        rows={4}
        placeholder="Paste an inbound lead — an email, a WhatsApp, a form fill…"
        aria-label="Inbound lead message"
        className={field}
      />
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setLead(EXAMPLE)}
          className="inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
        >
          <Sparkles size={12} /> Load an example
        </button>
        <button
          type="submit"
          disabled={loading || lead.trim().length < 12}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Workflow size={15} />
          {loading ? "Agent running…" : "Run the agent"}
        </button>
      </div>

      {error && <p role="alert" className="text-xs text-gold">{error}</p>}

      {steps.length > 0 && (
        <div role="status" aria-live="polite" aria-busy={loading} className="rounded-2xl border border-cream/10 bg-cream/5 p-4">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-gold/70">Agent run · live</p>
          <ol className="flex flex-col">
            {steps.map((s, i) => (
              <li key={s.id} className="relative flex gap-3 pb-4 last:pb-0">
                {i < steps.length - 1 && (
                  <span aria-hidden className="absolute left-[11px] top-6 h-full w-px bg-cream/10" />
                )}
                <span
                  className={`relative z-10 mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ring-1 ${
                    s.status === "done"
                      ? "bg-gold/15 text-gold ring-gold/30"
                      : "bg-ink-deep text-gold ring-gold/20"
                  }`}
                >
                  {s.status === "done" ? <Check size={13} /> : <Loader2 size={13} className="motion-safe:animate-spin" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-cream">{s.label}</p>
                  <p className="flex items-center gap-1 font-mono text-[10.5px] text-muted-dark">
                    <Wrench size={10} className="shrink-0" />
                    {s.tool}
                  </p>
                  {s.status === "done" && s.detail && (
                    <p className="mt-1 whitespace-pre-wrap text-[13px] leading-snug text-cream-dim">{s.detail}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {summary && (
            <div className="mt-1 rounded-xl border border-gold/20 bg-ink-deep/50 p-3">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold/70">Outcome</p>
                <span className="font-mono text-xs text-gold">Fit {summary.score}/100</span>
              </div>
              <p className="mt-1 text-sm italic text-cream-dim">“{summary.reply}”</p>
            </div>
          )}

          <p className="mt-3 font-mono text-[10px] text-muted-dark">
            CRM &amp; calendar steps are simulated for the demo · the qualification &amp; reply are live AI
          </p>
        </div>
      )}

      <a
        href="/ai-automation-dubai"
        data-cursor="link"
        className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
      >
        Run agents like this on your real inbox
        <ArrowRight size={14} />
      </a>
    </form>
  );
}
