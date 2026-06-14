import { useState } from "react";
import { Recycle, Sparkles, ArrowRight } from "lucide-react";
import { jsonDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Repurposed = {
  email: { subject: string; body: string };
  socialPost: string;
  videoOutline: { hook: string; beats: string[]; cta: string };
};

type Tab = "email" | "social" | "video";

const TABS: { id: Tab; label: string }[] = [
  { id: "email", label: "Email" },
  { id: "social", label: "Social post" },
  { id: "video", label: "Short video" },
];

const EXAMPLE = `Big news for our team and clients this quarter. After six months of building, we've finally launched our new automated onboarding flow — clients now go from signed contract to fully set up in under 48 hours instead of two weeks. We rebuilt the whole intake process around a single smart form, automatic document collection, and a kickoff call that's booked the moment payment clears. Early results: support tickets in the first week are down 40%, and our team is spending far less time chasing paperwork. We're also rolling out a monthly progress dashboard so every client can see exactly what we're working on. Huge thanks to everyone who helped test this. If you're a current client, you'll see the new experience on your next project; if you're thinking about working with us, there's never been a better time to start.`;

export default function DemoRepurpose() {
  const [content, setContent] = useState(EXAMPLE);
  const [result, setResult] = useState<Repurposed | null>(null);
  const [tab, setTab] = useState<Tab>("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function repurpose(e: React.FormEvent) {
    e.preventDefault();
    if (loading || content.trim().length < 40) return;
    track("demo_run", { demo: "repurpose" });
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const data = await jsonDemo<Repurposed>("/api/demo/repurpose", { content });
      setResult(data);
      setTab("email");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={repurpose} className="flex flex-col gap-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        placeholder="Paste a long-form message, update, or article to repurpose…"
        aria-label="Long-form content to repurpose"
        className="w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setContent(EXAMPLE)}
          className="inline-flex items-center gap-1.5 text-xs text-gold/80 transition-colors hover:text-gold"
        >
          <Sparkles size={12} /> Load an example
        </button>
        <button
          type="submit"
          disabled={loading || content.trim().length < 40}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Recycle size={15} />
          {loading ? "Repurposing…" : "Repurpose this"}
        </button>
      </div>

      {error && <p role="alert" className="text-xs text-gold">{error}</p>}

      {result && (
        <div role="status" aria-live="polite" aria-busy={loading} className="rounded-2xl border border-cream/10 bg-cream/5 p-4">
          <div className="flex flex-wrap items-center gap-1 self-start rounded-full border border-cream/10 bg-ink-deep/40 p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  tab === t.id ? "bg-gold/15 text-gold" : "text-cream-dim hover:text-gold"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "email" && (
            <div className="mt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Subject</p>
              <p className="mt-0.5 text-sm font-medium text-cream">{result.email.subject}</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-muted-dark">Body</p>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-cream-dim">{result.email.body}</p>
            </div>
          )}

          {tab === "social" && (
            <div className="mt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold/70">Social post</p>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-cream-dim">{result.socialPost}</p>
            </div>
          )}

          {tab === "video" && (
            <div className="mt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold/70">Hook</p>
              <p className="mt-1 text-sm italic text-cream-dim">{result.videoOutline.hook}</p>

              {result.videoOutline.beats.length > 0 && (
                <div className="mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Beats</p>
                  <ol className="mt-2 flex flex-col gap-1.5">
                    {result.videoOutline.beats.map((beat, i) => (
                      <li key={i} className="flex gap-2 text-sm text-cream-dim">
                        <span className="font-mono text-xs text-gold/70">{i + 1}.</span>
                        <span>{beat}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="mt-4 border-t border-cream/10 pt-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">CTA</p>
                <p className="mt-1 text-sm text-cream-dim">{result.videoOutline.cta}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <a
        href="/video-editing-dubai"
        data-cursor="link"
        className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
      >
        Turn your content into reels
        <ArrowRight size={14} />
      </a>
    </form>
  );
}
