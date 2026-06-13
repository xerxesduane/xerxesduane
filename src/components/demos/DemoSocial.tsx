import { useRef, useState } from "react";
import { Camera, Briefcase, Music2, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { streamDemo } from "../../lib/demoClient";

type Platform = "instagram" | "linkedin" | "tiktok";

const PLATFORMS: { id: Platform; label: string; icon: LucideIcon }[] = [
  { id: "instagram", label: "Instagram", icon: Camera },
  { id: "linkedin", label: "LinkedIn", icon: Briefcase },
  { id: "tiktok", label: "TikTok", icon: Music2 },
];

const EXAMPLE = "We just launched same-day AC servicing across Dubai, starting at AED 199.";

export default function DemoSocial() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [topic, setTopic] = useState(EXAMPLE);
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  async function write(e: React.FormEvent) {
    e.preventDefault();
    if (loading || !topic.trim()) return;
    setError("");
    setOut("");
    setLoading(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      await streamDemo("/api/demo/social", { topic, platform }, (full) => setOut(full), ctrl.signal);
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
        {PLATFORMS.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlatform(p.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                platform === p.id ? "bg-gold/15 text-gold" : "text-cream-dim hover:text-gold"
              }`}
            >
              <Icon size={13} />
              {p.label}
            </button>
          );
        })}
      </div>

      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        rows={3}
        placeholder="What's the post about? A launch, an offer, a tip…"
        aria-label="Post idea"
        className="w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setTopic(EXAMPLE)}
          className="inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
        >
          <Sparkles size={12} /> Load an example
        </button>
        <button
          type="submit"
          disabled={loading || !topic.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Writing…" : "Write the caption"}
        </button>
      </div>

      {error && <p className="text-xs text-gold">{error}</p>}

      {(out || loading) && (
        <div className="rounded-2xl border border-cream/10 bg-cream/5 p-4 text-[15px] leading-relaxed text-cream-dim">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-gold/70">{platform} caption</p>
          <p className="whitespace-pre-wrap">{out || "…"}</p>
        </div>
      )}
    </form>
  );
}
