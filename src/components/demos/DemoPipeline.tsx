import { useState } from "react";
import { Workflow, Sparkles, ArrowRight } from "lucide-react";
import { jsonDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Pipeline = {
  stages: { name: string; purpose: string; exitCriteria: string }[];
  fields: { name: string; type: string; required: boolean }[];
  automations: { trigger: string; action: string }[];
};

const EXAMPLE = `We run an interior fit-out company in Dubai. Most leads come from Instagram DMs and referrals. We chat to understand their space and budget, do a site visit, send a detailed proposal with 3D renders, then negotiate, sign a contract with a 50% deposit, and hand over to the project team once work starts.`;

export default function DemoPipeline() {
  const [process, setProcess] = useState(EXAMPLE);
  const [result, setResult] = useState<Pipeline | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function design(e: React.FormEvent) {
    e.preventDefault();
    if (loading || process.trim().length < 20) return;
    track("demo_run", { demo: "pipeline" });
    setError("");
    setResult(null);
    setLoading(true);
    try {
      setResult(await jsonDemo<Pipeline>("/api/demo/pipeline", { process }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={design} className="flex flex-col gap-3">
      <textarea
        value={process}
        onChange={(e) => setProcess(e.target.value)}
        rows={5}
        placeholder="Describe how you sell — where leads come from, the steps you take, and how a deal closes…"
        aria-label="Your sales process"
        className="w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setProcess(EXAMPLE)}
          className="inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
        >
          <Sparkles size={12} /> Load an example
        </button>
        <button
          type="submit"
          disabled={loading || process.trim().length < 20}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Workflow size={15} />
          {loading ? "Designing…" : "Design my pipeline"}
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
          {/* Stages — numbered cards forming the pipeline */}
          {result.stages.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Pipeline stages</p>
              <ol className="mt-2 flex flex-col gap-2">
                {result.stages.map((s, i) => (
                  <li
                    key={i}
                    className="relative rounded-xl border border-cream/10 bg-ink-deep/50 p-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/10 font-mono text-[10px] text-gold ring-1 ring-gold/20">
                        {i + 1}
                      </span>
                      <p className="text-sm font-semibold text-cream">{s.name}</p>
                    </div>
                    <p className="mt-1.5 text-xs text-cream-dim">{s.purpose}</p>
                    <p className="mt-1.5 text-xs text-muted">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-gold/70">Exit</span>{" "}
                      {s.exitCriteria}
                    </p>
                    {i < result.stages.length - 1 && (
                      <div className="mt-2 flex justify-center text-gold/40" aria-hidden="true">
                        <ArrowRight size={13} className="rotate-90" />
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Fields — compact table */}
          {result.fields.length > 0 && (
            <div className="mt-4 border-t border-cream/10 pt-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Fields to track</p>
              <table className="mt-2 w-full text-left">
                <thead>
                  <tr className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">
                    <th className="pb-1.5 font-normal">Field</th>
                    <th className="pb-1.5 font-normal">Type</th>
                    <th className="pb-1.5 text-right font-normal">Required</th>
                  </tr>
                </thead>
                <tbody>
                  {result.fields.map((f, i) => (
                    <tr key={i} className="border-t border-cream/10">
                      <td className="py-1.5 pr-3 text-sm text-cream-dim">{f.name}</td>
                      <td className="py-1.5 pr-3 font-mono text-xs text-muted">{f.type}</td>
                      <td className="py-1.5 text-right">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            f.required
                              ? "bg-gold/10 text-gold/90"
                              : "bg-cream/5 text-muted-dark"
                          }`}
                        >
                          {f.required ? "Required" : "Optional"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Automations — trigger -> action rows */}
          {result.automations.length > 0 && (
            <div className="mt-4 border-t border-cream/10 pt-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Automations</p>
              <div className="mt-2 flex flex-col gap-2">
                {result.automations.map((a, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1.5 rounded-xl bg-ink-deep/50 p-3 sm:flex-row sm:items-center sm:gap-2"
                  >
                    <span className="text-sm text-cream-dim">{a.trigger}</span>
                    <ArrowRight size={13} className="shrink-0 text-gold/60" aria-hidden="true" />
                    <span className="text-sm font-medium text-cream">{a.action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <a
            href="/crm-development-dubai"
            data-cursor="link"
            className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
          >
            Set this up in your CRM
            <ArrowRight size={14} />
          </a>
        </div>
      )}
    </form>
  );
}
