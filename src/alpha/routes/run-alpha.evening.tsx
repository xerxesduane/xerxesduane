import { createFileRoute, Link } from "../router";
import { AppShell } from "../components/AppShell";
import { RunAlphaHeader } from "../components/RunAlphaHeader";

export const Route = createFileRoute("/run-alpha/evening")({ component: EveningPage });

const STEPS: { time: string; title: string; body: string }[] = [
  { time: "0:00", title: "Arrival", body: "Music on. Welcome at the door with name tags. Food laid out." },
  { time: "0:15", title: "Food", body: "Eat together. Helpers join their tables now and stay all night." },
  { time: "0:35", title: "Welcome and icebreaker", body: "Short, fun, low stakes. Open tonight's Emcee Intro." },
  { time: "0:45", title: "The film", body: "Press play. If using Discussion Breaks, pause at each break for conversation." },
  { time: "1:10", title: "Conversation", body: "Use the question on screen. 3 Ls. 6 second rule. Helpers stay quiet and pray." },
  { time: "1:25", title: "Wrap up", body: "Thank them. Open tonight's Emcee Farewell. Confirm next week. End on time." },
];

function EveningPage() {
  return (
    <AppShell>
      <RunAlphaHeader title="Anatomy of an Evening" subtitle="The live run sheet." />
      <ol className="px-5 mt-5 space-y-3">
        {STEPS.map((s, i) => (
          <li key={i} className="rounded-2xl bg-white border border-border/60 p-4 shadow-sm flex gap-3">
            <div className="text-right shrink-0">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Time</p>
              <p className="text-sm font-bold text-primary tabular-nums">{s.time}</p>
            </div>
            <div className="min-w-0 border-l border-border/60 pl-3">
              <p className="text-sm font-bold">{s.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-foreground/85">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="px-5 mt-4">
        <div
          className="rounded-2xl p-4 text-[13px] leading-relaxed"
          style={{ background: "rgba(214, 158, 46, 0.12)", borderLeft: "3px solid #D69E2E" }}
        >
          <p className="font-bold" style={{ color: "#8B6914" }}>Running the Day Away?</p>
          <p className="mt-1 text-foreground/90">
            It is longer and focuses on the Holy Spirit across several films with breaks and food in between.
            See the <Link to="/run-alpha" className="text-primary font-semibold">playbook</Link> for the full run sheet.
          </p>
        </div>
      </div>
      <div className="h-6" />
    </AppShell>
  );
}