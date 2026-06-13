import { useState } from "react";
import { Building2 } from "lucide-react";
import { jsonDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Listing = {
  headline: string;
  listing: string;
  highlights: string[];
  whatsappEn: string;
  whatsappAr: string;
};

const EXAMPLE =
  "3BR apartment, Dubai Marina, 1,800 sqft, sea view, AED 180k/yr, chiller free, 2 parking, fully furnished, gym & pool, walk to the metro";

export default function DemoProperty() {
  const [facts, setFacts] = useState(EXAMPLE);
  const [result, setResult] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function write(e: React.FormEvent) {
    e.preventDefault();
    if (loading || facts.trim().length < 8) return;
    track("demo_run", { demo: "property" });
    setError("");
    setResult(null);
    setLoading(true);
    try {
      setResult(await jsonDemo<Listing>("/api/demo/property", { facts }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={write} className="flex flex-col gap-3">
      <textarea
        value={facts}
        onChange={(e) => setFacts(e.target.value)}
        rows={4}
        placeholder="Bullet facts — beds, area, size, view, price, amenities…"
        aria-label="Property facts"
        className="w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />
      <button
        type="submit"
        disabled={loading || facts.trim().length < 8}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Building2 size={16} />
        {loading ? "Writing…" : "Write the listing"}
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
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Headline</p>
                <p className="text-sm font-medium text-cream">{result.headline}</p>
              </div>
              <Building2 size={20} className="ml-3 shrink-0 text-gold/70" />
            </div>

            <div className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-cream-dim">
              {result.listing}
            </div>

            {result.highlights.length > 0 && (
              <div className="mt-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Highlights</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.highlights.map((h, i) => (
                    <span key={i} className="rounded-full bg-gold/10 px-2.5 py-1 text-xs text-gold/90">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.whatsappEn && (
              <div className="mt-4 rounded-xl bg-ink-deep/50 p-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold/70">WhatsApp · English</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-cream-dim">{result.whatsappEn}</p>
              </div>
            )}

            {result.whatsappAr && (
              <div className="mt-3 rounded-xl bg-ink-deep/50 p-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-gold/70">WhatsApp · العربية</p>
                <p dir="rtl" className="mt-1 whitespace-pre-wrap text-sm text-cream-dim">
                  {result.whatsappAr}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
