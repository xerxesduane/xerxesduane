import { useState } from "react";
import { ScanSearch, Sparkles, Check, Copy, ArrowRight } from "lucide-react";
import { jsonDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Aeo = {
  summary: string;
  confidence: "low" | "medium" | "high";
  gaps: string[];
  improvements: string[];
  schema: string;
};

const EXAMPLE =
  "AYA Home Spa — a home-service beauty and wellness spa in Dubai offering facials, massage, and nail care at your home across Dubai. Bookings via WhatsApp and Instagram.";

const CONF: Record<Aeo["confidence"], { label: string; cls: string }> = {
  high: { label: "High confidence", cls: "text-gold" },
  medium: { label: "Medium confidence", cls: "text-cream" },
  low: { label: "Low confidence", cls: "text-muted-dark" },
};

const field =
  "w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40";

export default function DemoAeo() {
  const [business, setBusiness] = useState(EXAMPLE);
  const [result, setResult] = useState<Aeo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (loading || business.trim().length < 15) return;
    track("demo_run", { demo: "aeo" });
    setError("");
    setResult(null);
    setCopied(false);
    setLoading(true);
    try {
      setResult(await jsonDemo<Aeo>("/api/demo/aeo", { business }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function copySchema() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.schema);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — ignore */
    }
  }

  const conf = result ? CONF[result.confidence] ?? CONF.medium : null;

  return (
    <form onSubmit={run} className="flex flex-col gap-3">
      <textarea
        value={business}
        onChange={(e) => setBusiness(e.target.value)}
        rows={3}
        placeholder="Describe your business in a sentence or two…"
        aria-label="Business description"
        className={field}
      />
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setBusiness(EXAMPLE)}
          className="inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
        >
          <Sparkles size={12} /> Load an example
        </button>
        <button
          type="submit"
          disabled={loading || business.trim().length < 15}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ScanSearch size={15} />
          {loading ? "Checking…" : "See how AI sees you"}
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
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-gold/70">How an AI engine describes you</p>
            {conf && <span className={`font-mono text-[10px] uppercase tracking-wider ${conf.cls}`}>{conf.label}</span>}
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-cream-dim">{result.summary}</p>

          {result.gaps?.length > 0 && (
            <div className="mt-4 border-t border-cream/10 pt-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">What's holding back your AI visibility</p>
              <ul className="mt-2 flex flex-col gap-1">
                {result.gaps.map((g, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-dark" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.improvements?.length > 0 && (
            <div className="mt-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold/70">Fixes that get you cited</p>
              <ul className="mt-2 flex flex-col gap-1">
                {result.improvements.map((g, i) => (
                  <li key={i} className="flex gap-2 text-sm text-cream-dim">
                    <Check size={14} className="mt-0.5 shrink-0 text-gold" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.schema && (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Ready-to-paste JSON-LD</p>
                <button
                  type="button"
                  onClick={copySchema}
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-gold/80 transition-colors hover:text-gold"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="mt-1.5 max-h-52 overflow-auto rounded-xl bg-ink-deep/70 p-3 font-mono text-[11px] leading-relaxed text-cream-dim">
                {result.schema}
              </pre>
            </div>
          )}

          <a
            href="/answer-engine-optimization-dubai"
            data-cursor="link"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
          >
            Get found by ChatGPT &amp; Perplexity
            <ArrowRight size={14} />
          </a>
        </div>
      )}
    </form>
  );
}
