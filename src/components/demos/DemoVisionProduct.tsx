import { useState } from "react";
import { ShoppingBag, Upload, RefreshCw } from "lucide-react";
import { jsonDemo } from "../../lib/demoClient";
import { fileToDownscaledDataUrl } from "../../lib/imageUpload";
import { track } from "../../lib/analytics";

type ProductCopy = {
  title: string;
  description: string;
  bullets: string[];
  seoTitle: string;
  metaDescription: string;
  suggestedPriceAed: number;
  tags: string[];
  note: string;
};

export default function DemoVisionProduct() {
  const [image, setImage] = useState("");
  const [result, setResult] = useState<ProductCopy | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError("");
    setResult(null);
    try {
      setImage(await fileToDownscaledDataUrl(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't read that image.");
    }
  }

  async function run() {
    if (loading || !image) return;
    track("demo_run", { demo: "vision-product" });
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await jsonDemo<{ mode: string; data: ProductCopy }>("/api/demo/vision", {
        image,
        mode: "product",
      });
      setResult(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {!image ? (
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-cream/15 bg-ink-deep/40 px-4 py-8 text-center transition-colors hover:border-gold/40">
          <Upload size={20} className="text-gold" />
          <span className="text-sm text-cream-dim">Snap or upload a product photo</span>
          <span className="font-mono text-[11px] text-muted-dark">JPG/PNG · processed in memory, never stored</span>
          <input type="file" accept="image/*" capture="environment" onChange={onFile} className="sr-only" />
        </label>
      ) : (
        <div className="flex items-start gap-3">
          <img
            src={image}
            alt="Product to describe"
            className="h-28 w-28 shrink-0 rounded-xl border border-cream/10 object-cover"
          />
          <div className="flex flex-1 flex-col gap-2">
            <button
              type="button"
              onClick={run}
              disabled={loading}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingBag size={16} />
              {loading ? "Writing…" : "Write the listing"}
            </button>
            <label className="inline-flex w-fit cursor-pointer items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold">
              <RefreshCw size={12} /> Use a different photo
              <input type="file" accept="image/*" capture="environment" onChange={onFile} className="sr-only" />
            </label>
          </div>
        </div>
      )}

      {error && <p role="alert" className="text-xs text-gold">{error}</p>}

      {result && (
        <div
          role="status"
          aria-live="polite"
          aria-busy={loading}
          className="rounded-2xl border border-cream/10 bg-cream/5 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg text-cream">{result.title}</h3>
            {Number.isFinite(result.suggestedPriceAed) && result.suggestedPriceAed > 0 && (
              <span className="shrink-0 rounded-full bg-gold/10 px-3 py-1 font-mono text-sm text-gold ring-1 ring-gold/20">
                ~AED {Math.round(result.suggestedPriceAed)}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-cream-dim">{result.description}</p>

          {result.bullets?.length > 0 && (
            <ul className="mt-3 flex flex-col gap-1.5">
              {result.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {b}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 border-t border-cream/10 pt-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-gold/70">SEO</p>
            <p className="mt-1 text-sm text-cream-dim">{result.seoTitle}</p>
            <p className="mt-1 text-xs text-muted">{result.metaDescription}</p>
          </div>

          {result.tags?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {result.tags.map((t) => (
                <span key={t} className="rounded-full bg-gold/10 px-2.5 py-1 text-xs text-gold/90">
                  {t}
                </span>
              ))}
            </div>
          )}

          {result.note && <p className="mt-3 text-xs italic text-muted-dark">{result.note}</p>}
        </div>
      )}
    </div>
  );
}
