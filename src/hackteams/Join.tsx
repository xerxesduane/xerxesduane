import { useState } from "react";
import { Card, Frame, Picker } from "./Member";

/**
 * The open challenge form, /ht/join: one link for everyone who registered,
 * in place of the Google Form. The same questions as each person's private
 * picker, plus their name and (optionally) email. Answers land straight in
 * the Champions' panel; the person gets their own private team link back
 * (see api/hack-teams/join.ts).
 */

const INK = "#131313";
const Y = "#EFE974";
const field = "mt-1 w-full rounded-full border-2 border-[#d9d4c8] px-4 py-2.5 text-[0.95rem] font-normal focus:border-[#131313] focus:outline-none";

type Done = { name: string; link: string; emailed?: boolean; known?: boolean };

export default function Join() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Bots fill in every field; people never see this one.
  const [website, setWebsite] = useState("");
  const [done, setDone] = useState<Done | null>(null);
  const [copied, setCopied] = useState(false);

  const post = async (b: Record<string, unknown>): Promise<string | null> => {
    if (name.trim().length < 2) return "Write your name at the top.";
    try {
      const res = await fetch("/api/hack-teams/join", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ ...b, name, email, website }),
      });
      const out = (await res.json().catch(() => ({}))) as Done & { error?: string };
      if (!res.ok) return out.error ?? "That didn't send. Try again.";
      setDone(out);
      window.scrollTo({ top: 0 });
      return null;
    } catch {
      return "That didn't send. Check your connection and try again.";
    }
  };

  if (done)
    return (
      <Frame>
        <header className="mb-5 text-white">
          <p className="font-technical text-[0.72rem] font-bold uppercase tracking-[0.18em]" style={{ color: Y }}>
            #HACK2026 · Dubai
          </p>
          <h1 className="mt-2 font-display text-[1.9rem] font-extrabold leading-tight">Thank you, {done.name}!</h1>
        </header>
        {done.known ? (
          <Card>
            <p className="text-[0.95rem] leading-relaxed">
              We already have your answers. We've emailed your private link again: open it to change anything. Can't find the email? Message Xerxes or Abel.
            </p>
          </Card>
        ) : (
          <Card>
            <p className="text-[0.95rem] leading-relaxed">
              Your answers are in. Here is your own private page: you can change your answers there until the teams are announced, and after the dinner on Saturday 17 October
              it becomes your team page. {done.emailed ? "We've emailed it to you too." : "Save it now: this is the only time it's shown."}
            </p>
            <p className="mt-4 break-all rounded-2xl px-4 py-3 font-technical text-[0.85rem]" style={{ background: "#f6f3ee" }}>
              {done.link}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={done.link} className="rounded-full px-5 py-2.5 font-display font-extrabold" style={{ background: Y, color: INK }}>
                Open my page
              </a>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(done.link).then(() => setCopied(true))}
                className="rounded-full border-2 border-[#d9d4c8] px-5 py-2.5 font-bold"
              >
                {copied ? "Copied" : "Copy the link"}
              </button>
            </div>
            <p className="mt-3 text-[0.8rem] text-[#6a6a6a]">It's private to you and opens on two devices only, so please don't forward it.</p>
          </Card>
        )}
      </Frame>
    );

  return (
    <Frame>
      <header className="mb-5 text-white">
        <p className="font-technical text-[0.72rem] font-bold uppercase tracking-[0.18em]" style={{ color: Y }}>
          #HACK2026 · Dubai
        </p>
        <h1 className="mt-2 font-display text-[1.9rem] font-extrabold leading-tight">Choose your challenge</h1>
      </header>
      <Picker
        prefs={null}
        owner={false}
        post={post}
        saveLabel="Send my answers"
        top={
          <Card>
            <label className="block text-[0.9rem] font-bold">
              Your name
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={60} autoComplete="name" className={field} />
            </label>
            <label className="mt-3 block text-[0.9rem] font-bold">
              Your email <span className="font-normal text-[#6a6a6a]">(optional)</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" maxLength={254} className={field} />
              <span className="mt-1 block text-[0.78rem] font-normal text-[#6a6a6a]">We send your private team page here, and a reminder before each weekly check-in. Nothing else.</span>
            </label>
            <label aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              Website
              <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </label>
          </Card>
        }
      />
    </Frame>
  );
}
