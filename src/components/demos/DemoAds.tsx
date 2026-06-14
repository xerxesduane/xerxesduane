import { useRef, useState } from "react";
import { Megaphone, Sparkles } from "lucide-react";
import { streamDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Platform = "google" | "meta";

const PLATFORMS: { id: Platform; label: string }[] = [
  { id: "google", label: "Google Search" },
  { id: "meta", label: "Meta (FB/IG)" },
];

const EXAMPLE = "Same-day AC repair across Dubai, fixed price from AED 199, 1-year warranty.";

export default function DemoAds() {
  const [platform, setPlatform] = useState<Platform>("google");
  const [product, setProduct] = useState(EXAMPLE);
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  async function write(e: React.FormEvent) {
    e.preventDefault();
    if (loading || !product.trim()) return;
    track("demo_run", { demo: "ads", platform });
    setError("");
    setOut("");
    setLoading(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      await streamDemo("/api/demo/ads", { product, platform }, (full) => setOut(full), ctrl.signal);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={write} className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-1 self-start rounded-full border border-cream/10 bg-ink-deep/40 p-1">
        {PLATFORMS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPlatform(p.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              platform === p.id ? "bg-gold/15 text-gold" : "text-cream-dim hover:text-gold"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <textarea
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        rows={3}
        placeholder="What are you advertising? Include the offer and any proof points…"
        aria-label="Product or offer"
        className="w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setProduct(EXAMPLE)}
          className="inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
        >
          <Sparkles size={12} /> Load an example
        </button>
        <button
          type="submit"
          disabled={loading || !product.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Megaphone size={15} />
          {loading ? "Writing…" : "Write the ads"}
        </button>
      </div>

      {error && <p role="alert" className="text-xs text-gold">{error}</p>}

      {(out || loading) && (
        <div role="status" aria-live="polite" aria-busy={loading} className="rounded-2xl border border-cream/10 bg-cream/5 p-4 text-[15px] leading-relaxed text-cream-dim">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-gold/70">{platform} ad copy</p>
          <p className="whitespace-pre-wrap">{out || "…"}</p>
        </div>
      )}
    </form>
  );
}
