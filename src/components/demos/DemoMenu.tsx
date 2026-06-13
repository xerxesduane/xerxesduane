import { useState } from "react";
import { UtensilsCrossed, Sparkles } from "lucide-react";
import { jsonDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Dish = { name: string; description: string; tags: string[]; pairing: string };
type Menu = { items: Dish[] };

const EXAMPLE = `Chicken shawarma wrap - garlic sauce, pickles, fries inside
Falafel plate w/ hummus and tabbouleh (veg)
Lamb mandi, basmati rice
Mango lassi
Baklava (has pistachios)`;

export default function DemoMenu() {
  const [menu, setMenu] = useState(EXAMPLE);
  const [result, setResult] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    if (loading || menu.trim().length < 10) return;
    track("demo_run", { demo: "menu" });
    setError("");
    setResult(null);
    setLoading(true);
    try {
      setResult(await jsonDemo<Menu>("/api/demo/menu", { menu }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={generate} className="flex flex-col gap-3">
      <textarea
        value={menu}
        onChange={(e) => setMenu(e.target.value)}
        rows={5}
        placeholder="Paste a rough menu — one dish per line, notes and all…"
        aria-label="Menu to rewrite"
        className="w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setMenu(EXAMPLE)}
          className="inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
        >
          <Sparkles size={12} /> Load an example
        </button>
        <button
          type="submit"
          disabled={loading || menu.trim().length < 10}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <UtensilsCrossed size={15} />
          {loading ? "Plating…" : "Generate listings"}
        </button>
      </div>

      {error && (
        <p role="alert" className="text-xs text-gold">
          {error}
        </p>
      )}

      <div role="status" aria-live="polite" aria-busy={loading}>
        {result && (
          <div className="flex flex-col gap-3">
            {result.items.map((dish, i) => (
              <div key={i} className="rounded-2xl border border-cream/10 bg-cream/5 p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-cream">{dish.name}</p>
                  <UtensilsCrossed size={18} className="mt-0.5 shrink-0 text-gold/70" />
                </div>

                <p className="mt-1.5 text-sm leading-relaxed text-cream-dim">{dish.description}</p>

                {dish.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {dish.tags.map((tag, t) => (
                      <span
                        key={t}
                        className="rounded-full border border-cream/10 bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium text-gold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {dish.pairing && (
                  <p className="mt-3 text-xs italic text-muted-dark">
                    <span className="font-mono uppercase tracking-wider text-muted-dark not-italic">
                      Pairs with:
                    </span>{" "}
                    {dish.pairing}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}
