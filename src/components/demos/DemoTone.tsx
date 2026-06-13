import { useRef, useState } from "react";
import { Wand2, Sparkles } from "lucide-react";
import { streamDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Voice = "luxury" | "playful" | "corporate" | "gulf-warm";

const VOICES: { id: Voice; label: string }[] = [
  { id: "luxury", label: "Luxury" },
  { id: "playful", label: "Playful" },
  { id: "corporate", label: "Corporate" },
  { id: "gulf-warm", label: "Gulf-warm" },
];

const EXAMPLE =
  "We clean homes and offices in Dubai. Book online and our team will arrive on time with all the equipment.";

export default function DemoTone() {
  const [voice, setVoice] = useState<Voice>("luxury");
  const [text, setText] = useState(EXAMPLE);
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  async function rewrite(e: React.FormEvent) {
    e.preventDefault();
    if (loading || !text.trim()) return;
    track("demo_run", { demo: "tone", voice });
    setError("");
    setOut("");
    setLoading(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      await streamDemo("/api/demo/tone", { text, voice }, (full) => setOut(full), ctrl.signal);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={rewrite} className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-1 self-start rounded-full border border-cream/10 bg-ink-deep/40 p-1">
        {VOICES.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setVoice(v.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              voice === v.id ? "bg-gold/15 text-gold" : "text-cream-dim hover:text-gold"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Paste the text you'd like to rewrite in a new voice…"
        aria-label="Text to rewrite"
        className="w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setText(EXAMPLE)}
          className="inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
        >
          <Sparkles size={12} /> Load an example
        </button>
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Wand2 size={15} />
          {loading ? "Rewriting…" : "Rewrite the voice"}
        </button>
      </div>

      {error && (
        <p role="alert" className="text-xs text-gold">
          {error}
        </p>
      )}

      {(out || loading) && (
        <div
          role="status"
          aria-live="polite"
          aria-busy={loading}
          className="rounded-2xl border border-cream/10 bg-cream/5 p-4 text-[15px] leading-relaxed text-cream-dim"
        >
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-gold/70">Rewritten text</p>
          <p className="whitespace-pre-wrap">{out || "…"}</p>
        </div>
      )}
    </form>
  );
}
