import { useState } from "react";

/**
 * Feedback on each participant's team page, from the end of the
 * presentations on 21 November (the owner's preview shows it early). The
 * panel shows the answers without names, so people can be honest.
 */

const OPEN_FROM = Date.parse("2026-11-21T20:00:00+04:00");
const INK = "#131313";
const Y = "#EFE974";

type Feedback = { rating: number; well: string; change: string; again: "yes" | "maybe" | "no"; at: number };

const AGAIN = [
  { v: "yes", label: "Yes" },
  { v: "maybe", label: "Maybe" },
  { v: "no", label: "No" },
] as const;

export default function FeedbackCard({
  saved,
  interested,
  preview,
  post,
}: {
  saved: Feedback | null;
  /** Already asked to hear about #HACK2027. */
  interested: boolean;
  preview: boolean;
  post: (b: Record<string, unknown>) => Promise<string | null>;
}) {
  const [now] = useState(() => Date.now());
  const [rating, setRating] = useState(saved?.rating ?? 0);
  const [well, setWell] = useState(saved?.well ?? "");
  const [change, setChange] = useState(saved?.change ?? "");
  const [again, setAgain] = useState<Feedback["again"] | null>(saved?.again ?? null);
  const [next, setNext] = useState(interested);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(saved ? "Thank you, we have your feedback. You can change it any time." : "");
  if (!preview && now < OPEN_FROM) return null;

  const field = "mt-1 w-full rounded-2xl border-2 border-[#d9d4c8] px-4 py-2.5 text-[0.95rem] font-normal focus:border-[#131313] focus:outline-none";
  const send = async () => {
    if (!rating) return setMsg("Give the program a score from 1 to 5.");
    if (!again) return setMsg("Say whether you'd join again.");
    setBusy(true);
    const err = await post({ action: "feedback", rating, well, change, again, next });
    setBusy(false);
    setMsg(err ?? "Thank you! It goes to Xerxes and Abel without your name.");
  };

  return (
    <section className="rounded-3xl bg-white p-5 text-[#131313] sm:p-6">
      <h2 className="font-display text-[1.2rem] font-bold">How was it?</h2>
      <p className="mt-1 text-[0.85rem] text-[#6a6a6a]">
        Two minutes, and it shapes the next #HACK. Xerxes and Abel see your answers without your name.
        {preview && " (Preview: participants see this from the evening of 21 November.)"}
      </p>
      <p className="mt-4 text-[0.9rem] font-bold">Overall, from 1 to 5</p>
      <div className="mt-1 flex gap-1.5" role="radiogroup" aria-label="Overall score">
        {[1, 2, 3, 4, 5].map((v) => (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={rating === v}
            onClick={() => setRating(v)}
            className="h-10 w-10 rounded-full border-2 font-bold"
            style={rating === v ? { background: INK, borderColor: INK, color: Y } : { borderColor: "#d9d4c8", color: INK }}
          >
            {v}
          </button>
        ))}
      </div>
      <label className="mt-4 block text-[0.9rem] font-bold">
        What went well?
        <textarea value={well} onChange={(e) => setWell(e.target.value)} maxLength={600} rows={2} className={field} />
      </label>
      <label className="mt-3 block text-[0.9rem] font-bold">
        What should we change next time?
        <textarea value={change} onChange={(e) => setChange(e.target.value)} maxLength={600} rows={2} className={field} />
      </label>
      <p className="mt-4 text-[0.9rem] font-bold">Would you join #HACK again?</p>
      <div className="mt-1 flex gap-2">
        {AGAIN.map((a) => (
          <button
            key={a.v}
            type="button"
            onClick={() => setAgain(a.v)}
            aria-pressed={again === a.v}
            className="rounded-full border-2 px-4 py-1.5 text-[0.9rem] font-semibold"
            style={again === a.v ? { background: INK, borderColor: INK, color: "#fff" } : { borderColor: "#d9d4c8", color: INK }}
          >
            {a.label}
          </button>
        ))}
      </div>
      <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl px-3 py-2.5" style={{ background: "#f6f3ee" }}>
        <input type="checkbox" checked={next} onChange={(e) => setNext(e.target.checked)} className="mt-1 h-4 w-4 accent-[#131313]" />
        <span className="text-[0.9rem]">
          <strong>Keep me posted about #HACK2027.</strong> This one goes to Xerxes and Abel with your name, so they can tell you when it opens.
        </span>
      </label>
      <button
        type="button"
        onClick={send}
        disabled={busy || preview}
        className="mt-5 rounded-full px-5 py-2.5 font-display font-extrabold disabled:opacity-50"
        style={{ background: Y, color: INK }}
      >
        {busy ? "Sending…" : saved ? "Update my feedback" : "Send feedback"}
      </button>
      {msg && <p className="mt-2 text-[0.9rem] font-semibold">{msg}</p>}
    </section>
  );
}
