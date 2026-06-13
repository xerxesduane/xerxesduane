import { useRef, useState } from "react";
import { Sparkles, Star } from "lucide-react";
import { streamDemo } from "../../lib/demoClient";

type Tone = "warm" | "professional" | "apologetic";

const TONES: { id: Tone; label: string }[] = [
  { id: "warm", label: "Warm" },
  { id: "professional", label: "Professional" },
  { id: "apologetic", label: "Extra apologetic" },
];

const EXAMPLES = [
  {
    stars: 2,
    text: "Booked a deep clean for my villa. The team showed up an hour late and missed the upstairs bathrooms completely. Paid full price though. Disappointed.",
  },
  {
    stars: 5,
    text: "Honestly the best service I've used in Dubai. Sara was so professional and my apartment has never looked better. Will 100% book again!",
  },
];

export default function DemoReview() {
  const [tone, setTone] = useState<Tone>("warm");
  const [review, setReview] = useState(EXAMPLES[0].text);
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  async function respond(e: React.FormEvent) {
    e.preventDefault();
    if (loading || !review.trim()) return;
    setError("");
    setOut("");
    setLoading(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      await streamDemo("/api/demo/review", { review, tone }, (full) => setOut(full), ctrl.signal);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={respond} className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-1 self-start rounded-full border border-cream/10 bg-ink-deep/40 p-1">
        {TONES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTone(t.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              tone === t.id ? "bg-gold/15 text-gold" : "text-cream-dim hover:text-gold"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows={4}
        placeholder="Paste a customer review — good, bad, or mixed…"
        aria-label="Customer review"
        className="w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setReview(ex.text)}
              className="inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
            >
              <Sparkles size={12} />
              {ex.stars >= 4 ? "5★ review" : "2★ review"}
            </button>
          ))}
        </div>
        <button
          type="submit"
          disabled={loading || !review.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Star size={15} />
          {loading ? "Writing…" : "Write a reply"}
        </button>
      </div>

      {error && <p className="text-xs text-gold">{error}</p>}

      {(out || loading) && (
        <div className="rounded-2xl border border-cream/10 bg-cream/5 p-4 text-[15px] leading-relaxed text-cream-dim">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-gold/70">Suggested public reply</p>
          <p className="whitespace-pre-wrap">{out || "…"}</p>
        </div>
      )}
    </form>
  );
}
