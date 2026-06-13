import { useState } from "react";
import { Megaphone, Users } from "lucide-react";
import { jsonDemo } from "../../lib/demoClient";
import { track } from "../../lib/analytics";

type Broadcast = {
  templateBody: string;
  followUp1: string;
  followUp2: string;
  audience: string;
};

const EXAMPLE = "Eid 20% off all facials this week, book by Thursday.";

export default function DemoBroadcast() {
  const [promo, setPromo] = useState(EXAMPLE);
  const [broadcast, setBroadcast] = useState<Broadcast | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function build(e: React.FormEvent) {
    e.preventDefault();
    if (loading || promo.trim().length < 8) return;
    track("demo_run", { demo: "broadcast" });
    setError("");
    setBroadcast(null);
    setLoading(true);
    try {
      setBroadcast(await jsonDemo<Broadcast>("/api/demo/broadcast", { promo }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={build} className="flex flex-col gap-3">
      <textarea
        value={promo}
        onChange={(e) => setPromo(e.target.value)}
        rows={3}
        placeholder="Describe the promo — the offer, the deadline, who it's for…"
        aria-label="Promo to broadcast"
        className="w-full resize-none rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
      />
      <button
        type="submit"
        disabled={loading || promo.trim().length < 8}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Megaphone size={15} />
        {loading ? "Building…" : "Build the campaign"}
      </button>

      {error && (
        <p role="alert" className="text-xs text-gold">
          {error}
        </p>
      )}

      <div role="status" aria-live="polite" aria-busy={loading}>
        {broadcast && (
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl border border-cream/10 bg-cream/5 p-4 sm:p-5">
              <div className="flex items-center justify-between border-b border-cream/10 pb-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Broadcast message</p>
                <Megaphone size={18} className="text-gold/70" />
              </div>
              <div className="mt-3">
                <div className="w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-[#144d3c] px-4 py-3 text-[15px] leading-relaxed text-[#e9fbe8]">
                  <p className="whitespace-pre-wrap">{broadcast.templateBody}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 border-t border-cream/10 pt-3">
                <FollowUp label="Day 2 — gentle nudge" text={broadcast.followUp1} />
                <FollowUp label="Day 4 — final call" text={broadcast.followUp2} />
              </div>

              {broadcast.audience && (
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-cream/10 pt-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">Audience</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold">
                    <Users size={12} />
                    {broadcast.audience}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

function FollowUp({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-mono text-[10px] uppercase tracking-wider text-gold/70">{label}</p>
      <div className="w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-[#144d3c]/70 px-4 py-2.5 text-sm leading-relaxed text-[#e9fbe8]">
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
}
