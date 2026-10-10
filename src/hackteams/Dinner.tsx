import { useEffect, useState } from "react";
import { CHALLENGES, EVENTS } from "../data/hack";
import { greetName } from "../hackpartners/greet";
import type { PanelList } from "./Panel";

/**
 * Dinner-night mode for 17 October, full screen on a phone, laptop or TV:
 *
 *   - At the door: tap each name as people arrive.
 *   - Teams reveal: one team at a time, big enough for the room, then one
 *     tap announces the teams to everyone's page.
 *   - Tonight: the evening's running order, with what's on now.
 */

type Act = (body: Record<string, unknown>, done: string) => Promise<void>;
const INK = "#131313";
const Y = "#EFE974";
const O = "#EF4E25";
const two = (n: number) => String(n).padStart(2, "0");

export default function Dinner({ list, busy, act, onClose }: { list: PanelList; busy: boolean; act: Act; onClose: () => void }) {
  const [tab, setTab] = useState<"door" | "reveal" | "program">("door");
  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto" style={{ background: INK }} role="dialog" aria-label="Dinner night">
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-2 px-4 py-3" style={{ background: INK }}>
        <div className="flex gap-1.5 rounded-full border border-white/15 p-1">
          {(
            [
              ["door", "At the door"],
              ["reveal", "Teams reveal"],
              ["program", "Tonight"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className="rounded-full px-4 py-1.5 text-[0.85rem] font-bold"
              style={tab === k ? { background: Y, color: INK } : { color: "#fff" }}
            >
              {label}
            </button>
          ))}
        </div>
        <button type="button" onClick={onClose} className="rounded-full border border-white/30 px-3 py-1 text-[0.85rem] text-white">
          Close
        </button>
      </div>
      <div className="flex-1 px-4 pb-10">
        {tab === "door" && <Door list={list} busy={busy} act={act} />}
        {tab === "reveal" && <Reveal list={list} busy={busy} act={act} />}
        {tab === "program" && <Program />}
      </div>
    </div>
  );
}

function Door({ list, busy, act }: { list: PanelList; busy: boolean; act: Act }) {
  const [q, setQ] = useState("");
  const people = list.people.filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase()));
  const here = list.people.filter((p) => p.arrived).length;
  const expected = list.people.filter((p) => p.prefs?.dinner === "yes").length;
  return (
    <div className="mx-auto max-w-3xl">
      <p className="mt-2 font-display text-[2.2rem] font-extrabold text-white">
        {here} <span className="text-white/50">here</span>
      </p>
      <p className="text-[0.9rem] text-white/60">
        {expected} said yes to the dinner · {list.people.length} in all
      </p>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Find a name"
        className="mt-4 w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-[1.05rem] text-white placeholder:text-white/40"
      />
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {people.map((p) => {
          const on = !!p.arrived;
          return (
            <li key={p.code}>
              <button
                type="button"
                disabled={busy}
                onClick={() => act({ action: "arrived", code: p.code, on: !on }, on ? `${p.name} unmarked.` : `${p.name} is here.`)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left transition"
                style={on ? { background: Y, color: INK } : { background: "#232323", color: "#fff" }}
              >
                <span>
                  <span className="block font-display text-[1.1rem] font-bold">{p.name}</span>
                  <span className="block text-[0.78rem] opacity-70">
                    {p.team ? `${two(p.team)} ${CHALLENGES.find((c) => c.n === p.team)?.title}` : "No team yet"}
                    {p.prefs?.dinner && p.prefs.dinner !== "yes" ? ` · said ${p.prefs.dinner === "no" ? "no" : "not sure"}` : ""}
                  </span>
                </span>
                <span className="text-[1.4rem]" aria-hidden>
                  {on ? "✓" : "○"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Reveal({ list, busy, act }: { list: PanelList; busy: boolean; act: Act }) {
  const placed = CHALLENGES.map((c) => c.n).filter((n) => list.people.some((p) => p.team === n));
  const order = [...list.show.order.filter((n) => placed.includes(n)), ...placed.filter((n) => !list.show.order.includes(n))];
  const [i, setI] = useState(0);
  const last = order.length; // the slide after the teams: announce
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") setI((x) => Math.min(last, x + 1));
      else if (e.key === "ArrowLeft") setI((x) => Math.max(0, x - 1));
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [last]);

  if (!order.length) return <p className="mt-10 text-center text-white/70">Place people in teams first: "Suggest teams" on the panel is a good start.</p>;
  const n = order[i];
  const c = CHALLENGES.find((x) => x.n === n);
  const members = list.people.filter((p) => p.team === n);
  return (
    <div className="mx-auto flex min-h-[75vh] max-w-5xl flex-col justify-between text-center">
      {i < last ? (
        <div className="mt-6">
          <p className="font-technical text-[1rem] font-bold uppercase tracking-[0.2em]" style={{ color: Y }}>
            Team {i + 1} of {order.length} · Challenge {two(n)}
          </p>
          <h2 className="mt-2 font-display font-extrabold leading-tight text-white" style={{ fontSize: "clamp(2.4rem, 7vw, 5rem)" }}>
            {c?.title}
          </h2>
          <p className="mt-1 text-[1.2rem] text-white/70">{c?.tag}</p>
          <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-3">
            {members.map((m) => (
              <li key={m.code} className="rounded-2xl px-5 py-3" style={{ background: "#232323" }}>
                <span className="block font-display text-[1.6rem] font-bold text-white">{greetName(m.name)}</span>
                {m.role && (
                  <span className="block text-[0.95rem]" style={{ color: Y }}>
                    {m.role}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-16">
          <h2 className="font-display text-[3rem] font-extrabold text-white">That's every team!</h2>
          <p className="mt-2 text-[1.1rem] text-white/70">
            {list.announced ? "The teams are announced: everyone's page now shows their team." : "One tap and everyone's private page shows their team, brief and check-ins."}
          </p>
          {!list.announced && (
            <button
              type="button"
              disabled={busy}
              onClick={() => window.confirm("Announce the teams now?") && act({ action: "announce", on: true }, "Teams announced. Send everyone the \"your team is ready\" message.")}
              className="mt-6 rounded-full px-8 py-4 font-display text-[1.3rem] font-extrabold"
              style={{ background: Y, color: INK }}
            >
              Announce the teams
            </button>
          )}
        </div>
      )}
      <div className="mt-8 flex justify-center gap-3">
        <button type="button" onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} className="rounded-full border border-white/30 px-6 py-3 font-bold text-white disabled:opacity-30">
          ← Back
        </button>
        <button type="button" onClick={() => setI(Math.min(last, i + 1))} disabled={i === last} className="rounded-full px-8 py-3 font-display font-extrabold disabled:opacity-30" style={{ background: Y, color: INK }}>
          Next →
        </button>
      </div>
    </div>
  );
}

/** "6:30" on the dinner's evening, as a time in Dubai. */
const at = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return Date.parse(`2026-10-17T${String(h < 12 ? h + 12 : h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00+04:00`);
};

function Program() {
  const event = EVENTS.find((e) => e.id === "team-dinner");
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  const items = event?.program ?? [];
  const current = items.filter((p) => at(p.time) <= now).pop()?.time;
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mt-4 font-display text-[1.8rem] font-extrabold text-white">{event?.title}</h2>
      <ol className="mt-4 space-y-2">
        {items.map((p) => {
          const on = p.time === current && now < Date.parse(event!.end);
          return (
            <li key={p.time} className="flex gap-4 rounded-2xl px-5 py-4" style={on ? { background: Y, color: INK } : { background: "#232323", color: "#fff" }}>
              <span className="w-14 font-display text-[1.3rem] font-extrabold tabular-nums" style={on ? undefined : { color: O }}>
                {p.time}
              </span>
              <span className="text-[1.1rem]">
                {p.what}
                {on && <span className="ml-2 text-[0.8rem] font-bold uppercase tracking-wide">now</span>}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
