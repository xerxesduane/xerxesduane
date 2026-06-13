import { useState } from "react";
import { ReceiptText } from "lucide-react";
import { jsonDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Item = { description: string; quantity: number; unitPrice: number };
type Invoice = { vendor: string; invoiceDate: string; currency: string; items: Item[] };

const EXAMPLE =
  "Gulf Office Supplies LLC — TAX INVOICE 14/03/2026\n" +
  "5 reams A4 paper @ 14.50 ea\n" +
  "printer toner cartridge x2  220 each\n" +
  "delivery charge ........ 35\n" +
  "1x desk organizer 48.75\n" +
  "Thank you for your business!";

const VAT_RATE = 0.05;

export default function DemoInvoice() {
  const [text, setText] = useState(EXAMPLE);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function parse(e: React.FormEvent) {
    e.preventDefault();
    if (loading || text.trim().length < 10) return;
    track("demo_run", { demo: "invoice" });
    setError("");
    setInvoice(null);
    setLoading(true);
    try {
      setInvoice(await jsonDemo<Invoice>("/api/demo/invoice", { text }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const cur = invoice?.currency || "AED";
  const fmt = (n: number) =>
    `${cur} ${n.toLocaleString("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const lines = (invoice?.items ?? []).map((it) => ({ ...it, amount: (it.quantity || 0) * (it.unitPrice || 0) }));
  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  return (
    <form onSubmit={parse} className="flex flex-col gap-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="Paste a messy supplier invoice or statement…"
        aria-label="Invoice or statement to parse"
        className="w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />
      <button
        type="submit"
        disabled={loading || text.trim().length < 10}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ReceiptText size={15} />
        {loading ? "Parsing…" : "Parse the invoice"}
      </button>

      {error && (
        <p role="alert" className="text-xs text-gold">
          {error}
        </p>
      )}

      <div role="status" aria-live="polite" aria-busy={loading}>
        {invoice && (
          <div className="rounded-2xl border border-cream/10 bg-cream/5 p-4 sm:p-5">
            <div className="flex items-center justify-between border-b border-cream/10 pb-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Invoice from</p>
                <p className="text-sm font-medium text-cream">{invoice.vendor}</p>
                {invoice.invoiceDate && (
                  <p className="mt-0.5 text-xs text-muted-dark">{invoice.invoiceDate}</p>
                )}
              </div>
              <ReceiptText size={20} className="text-gold/70" />
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {lines.map((l, i) => (
                <div key={i} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-cream-dim">
                    {l.description}
                    <span className="ml-1 text-muted-dark">×{l.quantity}</span>
                  </span>
                  <span className="shrink-0 font-mono text-cream">{fmt(l.amount)}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 flex flex-col gap-1.5 border-t border-cream/10 pt-3 text-sm">
              <Row label="Subtotal" value={fmt(subtotal)} />
              <Row label="VAT (5%)" value={fmt(vat)} />
              <div className="mt-1 flex items-center justify-between border-t border-cream/10 pt-2">
                <span className="font-semibold text-cream">Total</span>
                <span className="font-mono text-base font-semibold text-gold">{fmt(total)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className="font-mono text-cream-dim">{value}</span>
    </div>
  );
}
