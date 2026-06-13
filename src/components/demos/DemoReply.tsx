import { useRef, useState } from "react";
import { Sparkles, CornerDownLeft } from "lucide-react";
import { streamDemo } from "../../lib/demoClient";

type Tone = "friendly" | "formal" | "brief";

const TONES: { id: Tone; label: string }[] = [
  { id: "friendly", label: "Friendly" },
  { id: "formal", label: "Formal" },
  { id: "brief", label: "Brief" },
];

const EXAMPLE =
  "Hi, saw your post about web design. We're a small accounting firm in Business Bay, our current site is super outdated and doesn't work on mobile. Roughly what would a redesign cost and how long does it take? Also do you do the hosting? Thanks, Omar";

export default function DemoReply() {
  const [tone, setTone] = useState<Tone>("friendly");
  const [message, setMessage] = useState(EXAMPLE);
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  async function draft(e: React.FormEvent) {
    e.preventDefault();
    if (loading || !message.trim()) return;
    setError("");
    setOut("");
    setLoading(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      await streamDemo("/api/demo/reply", { message, tone }, (full) => setOut(full), ctrl.signal);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={draft} className="flex flex-col gap-3">
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
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        placeholder="Paste an inbound email, WhatsApp, or DM…"
        aria-label="Incoming message"
        className="w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setMessage(EXAMPLE)}
          className="inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
        >
          <Sparkles size={12} /> Load an example
        </button>
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CornerDownLeft size={15} />
          {loading ? "Drafting…" : "Draft a reply"}
        </button>
      </div>

      {error && <p className="text-xs text-gold">{error}</p>}

      {(out || loading) && (
        <div className="rounded-2xl border border-cream/10 bg-cream/5 p-4 text-[15px] leading-relaxed text-cream-dim">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-gold/70">Draft reply</p>
          <p className="whitespace-pre-wrap">{out || "…"}</p>
        </div>
      )}
    </form>
  );
}
