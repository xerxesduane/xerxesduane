import { useState } from "react";
import { ReceiptText, Upload, RefreshCw } from "lucide-react";
import { jsonDemo } from "../../lib/demoClient";
import { fileToDownscaledDataUrl } from "../../lib/imageUpload";
import { track } from "../../lib/analytics";

type Receipt = {
  merchant: string;
  date: string;
  currency: string;
  category: string;
  subtotal: number;
  vat: number;
  total: number;
  items: { name: string; price: number }[];
  note: string;
};

function money(n: number, currency: string): string {
  if (!Number.isFinite(n)) return "—";
  return `${currency || "AED"} ${n.toFixed(2)}`;
}

export default function DemoReceipt() {
  const [image, setImage] = useState("");
  const [result, setResult] = useState<Receipt | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
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
    track("demo_run", { demo: "vision-receipt" });
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await jsonDemo<{ mode: string; data: Receipt }>("/api/demo/vision", {
        image,
        mode: "receipt",
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
          <span className="text-sm text-cream-dim">Snap or upload a receipt photo</span>
          <span className="font-mono text-[11px] text-muted-dark">JPG/PNG · processed in memory, never stored</span>
          <input type="file" accept="image/*" capture="environment" onChange={onFile} className="sr-only" />
        </label>
      ) : (
        <div className="flex items-start gap-3">
          <img
            src={image}
            alt="Receipt to read"
            className="h-28 w-28 shrink-0 rounded-xl border border-cream/10 object-cover"
          />
          <div className="flex flex-1 flex-col gap-2">
            <button
              type="button"
              onClick={run}
              disabled={loading}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ReceiptText size={16} />
              {loading ? "Reading…" : "Extract the expense line"}
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
          <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            <Field label="Merchant" value={result.merchant} />
            <Field label="Date" value={result.date} />
            <Field label="Category" value={result.category} />
            <Field label="Total" value={money(result.total, result.currency)} className="text-gold" />
          </div>

          {result.items?.length > 0 && (
            <div className="mt-4 border-t border-cream/10 pt-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Line items</p>
              <ul className="mt-2 flex flex-col gap-1">
                {result.items.map((it, i) => (
                  <li key={i} className="flex justify-between gap-3 text-sm text-cream-dim">
                    <span className="truncate">{it.name}</span>
                    <span className="shrink-0 font-mono text-xs text-muted">{money(it.price, result.currency)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t border-cream/10 pt-3 font-mono text-xs text-muted">
            <span>Subtotal {money(result.subtotal, result.currency)}</span>
            <span>VAT {money(result.vat, result.currency)}</span>
            <span className="text-cream-dim">Total {money(result.total, result.currency)}</span>
          </div>

          {result.note && <p className="mt-3 text-xs italic text-muted-dark">{result.note}</p>}
        </div>
      )}
    </div>
  );
}

function Field({ label, value, className = "text-cream-dim" }: { label: string; value: string; className?: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">{label}</p>
      <p className={`mt-0.5 text-sm ${className}`}>
        {value?.toString().trim() ? value : <span className="text-muted-dark">—</span>}
      </p>
    </div>
  );
}
