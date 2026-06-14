import { useState } from "react";
import { LayoutTemplate, Sparkles, ArrowUpRight } from "lucide-react";
import { jsonDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Section = {
  eyebrow: string;
  headline: string;
  subhead: string;
  bullets: { title: string; text: string }[];
  primaryCta: string;
  secondaryCta: string;
  stat: { value: string; label: string };
};

const EXAMPLE =
  "A boutique Dubai dental clinic offering same-day appointments, cosmetic dentistry, and full Arabic + English service.";

const field =
  "w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40";

export default function DemoSection() {
  const [business, setBusiness] = useState(EXAMPLE);
  const [result, setResult] = useState<Section | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (loading || business.trim().length < 10) return;
    track("demo_run", { demo: "section" });
    setError("");
    setResult(null);
    setLoading(true);
    try {
      setResult(await jsonDemo<Section>("/api/demo/section", { business }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={run} className="flex flex-col gap-3">
      <textarea
        value={business}
        onChange={(e) => setBusiness(e.target.value)}
        rows={2}
        placeholder="Describe a business or offer…"
        aria-label="Business or offer to generate a section for"
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
          disabled={loading || business.trim().length < 10}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LayoutTemplate size={15} />
          {loading ? "Designing…" : "Generate a live section"}
        </button>
      </div>

      {error && <p role="alert" className="text-xs text-gold">{error}</p>}

      {(result || loading) && (
        <div role="status" aria-live="polite" aria-busy={loading}>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-dark">Live preview</p>
          {result && (
            <div className="overflow-hidden rounded-2xl border border-gold/20 bg-[linear-gradient(180deg,rgba(218,164,66,0.08),rgba(11,15,13,0.4))] p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold/80">{result.eyebrow}</p>
              <h3 className="mt-3 text-2xl leading-tight text-cream sm:text-3xl">{result.headline}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream-dim">{result.subhead}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {result.bullets?.slice(0, 3).map((b, i) => (
                  <div key={i} className="rounded-xl border border-cream/10 bg-ink-deep/40 p-3">
                    <p className="text-sm font-semibold text-cream">{b.title}</p>
                    <p className="mt-1 text-xs text-muted">{b.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep">
                  {result.primaryCta}
                  <ArrowUpRight size={15} />
                </span>
                <span className="rounded-full border border-cream/15 px-5 py-2.5 text-sm font-semibold text-cream">
                  {result.secondaryCta}
                </span>
                {result.stat?.value && (
                  <span className="ml-auto text-right">
                    <span className="block font-mono text-xl text-gold">{result.stat.value}</span>
                    <span className="block text-[11px] text-muted-dark">{result.stat.label}</span>
                  </span>
                )}
              </div>
            </div>
          )}
          <p className="mt-2 text-xs text-muted-dark">
            Rendered live from AI output in your brand system — this is the kind of section I ship, fully editable.
          </p>
        </div>
      )}
    </form>
  );
}
