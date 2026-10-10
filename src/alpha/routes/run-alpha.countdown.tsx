import { createFileRoute } from "../router";
import { AppShell } from "../components/AppShell";
import { RunAlphaHeader } from "../components/RunAlphaHeader";

export const Route = createFileRoute("/run-alpha/countdown")({ component: CountdownPage });

const WEEKS: { week: string; title: string; body: string }[] = [
  { week: "Week minus 6", title: "Team", body: "Confirm Host, Helper, Admin, Prayer. Meet for an hour. Pray together." },
  { week: "Week minus 5", title: "Venue", body: "Lock in the date and venue. Walk the room." },
  { week: "Week minus 4", title: "List", body: "Each team member writes 7 to 10 names. Begin praying for them by name." },
  { week: "Week minus 3", title: "First touch", body: "First invitation goes out. Keep it personal. Use a Script from this app." },
  { week: "Week minus 2", title: "Second touch", body: "Follow up the no replies. Send a testimony video or a taster invite." },
  { week: "Week minus 1", title: "Logistics", body: "Order food. Test tech. Prepare name tags. Final team prayer night." },
  { week: "Week 0", title: "Launch", body: "Show up early. Play music. Welcome at the door. Trust God." },
];

function CountdownPage() {
  return (
    <AppShell>
      <RunAlphaHeader title="The 6 Week Countdown" subtitle="From team kickoff to launch night." />
      <ol className="px-5 mt-5 space-y-3">
        {WEEKS.map((w, i) => (
          <li key={i} className="rounded-2xl bg-white border border-border/60 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="h-8 min-w-[3.25rem] px-2 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center shrink-0">
                {w.week}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold">{w.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-foreground/85">{w.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div className="h-6" />
    </AppShell>
  );
}