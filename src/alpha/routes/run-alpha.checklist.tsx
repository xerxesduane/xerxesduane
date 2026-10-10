import { createFileRoute } from "../router";
import { useEffect, useState } from "react";
import { AppShell } from "../components/AppShell";
import { RunAlphaHeader } from "../components/RunAlphaHeader";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

export const Route = createFileRoute("/run-alpha/checklist")({ component: ChecklistPage });

type Item = {
  id: string;
  title: string;
  body: string;
  groups?: { label: string; items: { id: string; text: string }[] }[];
};

const ITEMS: Item[] = [
  { id: "decision", title: "Decision", body: "Pick how you'll run it (In Person or Online) and a tentative start date." },
  { id: "team", title: "Team", body: "Recruit a Host, a Helper, an Admin, and a Prayer person. Meet once before launch." },
  { id: "venue", title: "Venue", body: "Choose where you'll run it and book it for every session plus the Day Away." },
  { id: "training", title: "Training", body: "Watch the training for your track, read the playbook, do a practice run." },
  { id: "list", title: "List", body: "Each team member writes 7 to 10 names of friends to invite. Pray for them by name." },
  { id: "invitations", title: "Invitations", body: "Personal messages or face to face asks (use the Scripts in this app). Never a group blast. Follow up the no replies." },
  {
    id: "logistics",
    title: "Logistics, budget, and resources",
    body: "Tap to expand. Everything you need to handle so launch night feels effortless.",
    groups: [
      {
        label: "Budget",
        items: [
          { id: "budget-set", text: "Set a budget for the course and confirm who is funding it (church, hosts, mixed)." },
          { id: "budget-track", text: "Track expenses simply (a phone note or spreadsheet is enough)." },
          { id: "budget-margin", text: "Build in margin for unexpected costs (about 10% buffer)." },
          { id: "budget-free", text: "Decide if the course is free for guests or contribution-based. Note: most Alphas are completely free. The course is funded by the church or hosts to remove every barrier." },
        ],
      },
      {
        label: "Food",
        items: [
          { id: "food-catering", text: "Confirm catering or food plan for every session." },
          { id: "food-diet", text: "Get dietary needs from registrations (vegetarian, halal, nut allergies, gluten free). Ask on the registration form." },
          { id: "food-hotel", text: "For a hotel venue (JW Marriott Marina, Creekside, Two Seasons), confirm the food order with the venue at least 7 days ahead each week." },
          { id: "food-home", text: "For homes or workplaces, assign a different team member each week to bring or order food." },
          { id: "food-time", text: "Allow at least 15 minutes of eating time before the talk. The meal is not a detail. It is the welcome." },
        ],
      },
      {
        label: "Logistics",
        items: [
          { id: "log-venue", text: "Venue booked for every session plus the Day Away." },
          { id: "log-setup", text: "Room set up walked through and tables arranged in small group clusters." },
          { id: "log-parking", text: "Parking instructions confirmed and shared with guests." },
          { id: "log-contact", text: "A clear point of contact at the venue for any issues on the night." },
          { id: "log-late", text: "Plan for late arrivals: a seat saved, a warm welcome, no shaming." },
          { id: "log-signin", text: "Sign-in or check-in system so the team knows who is in the room each week." },
        ],
      },
      {
        label: "Resources and tech",
        items: [
          { id: "tech-laptop", text: "Laptop or device to play the film, with the Alpha Dashboard or downloaded film files ready." },
          { id: "tech-backup", text: "Backup device in case the first one fails. Always have a plan B." },
          { id: "tech-cables", text: "Charging cables and a power adapter for the room." },
          { id: "tech-internet", text: "Reliable internet at the venue (or download the film in advance for offline use)." },
          { id: "tech-screen", text: "Screen and projector or large TV, tested with the actual film with sound." },
          { id: "tech-mics", text: "Microphones if the room is larger than 30 people. Test before guests arrive." },
          { id: "tech-music", text: "Music for arrivals (a playlist on Spotify or YouTube). Silence on arrival feels awkward." },
          { id: "tech-nametags", text: "Name tags and markers for at least the first two weeks." },
          { id: "tech-pens", text: "Pens, notepaper, and Bibles available at each table (optional, for those who want to take notes)." },
          { id: "tech-welcome", text: "A welcome table at the door with name tags, schedule, and a place to greet first-timers." },
        ],
      },
    ],
  },
];

const KEY = "alpha:run:launch-checklist:v1";
const EXPAND_KEY = "alpha:run:launch-checklist:expand:v1";

function subIds(item: Item): string[] {
  if (!item.groups) return [];
  return item.groups.flatMap((g) => g.items.map((i) => i.id));
}

function ChecklistPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setChecked(JSON.parse(raw)); } catch { /* ignore */ }
    try { const raw = localStorage.getItem(EXPAND_KEY); if (raw) setExpanded(JSON.parse(raw)); } catch { /* ignore */ }
  }, []);
  const save = (next: Record<string, boolean>) => {
    setChecked(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };
  const toggle = (id: string) => save({ ...checked, [id]: !checked[id] });
  const toggleExpand = (id: string) => {
    const next = { ...expanded, [id]: !expanded[id] };
    setExpanded(next);
    try { localStorage.setItem(EXPAND_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };
  const reset = () => save({});

  const isItemDone = (item: Item) => {
    if (item.groups) {
      const ids = subIds(item);
      return ids.length > 0 && ids.every((id) => checked[id]);
    }
    return !!checked[item.id];
  };
  const done = ITEMS.filter(isItemDone).length;
  const pct = Math.round((done / ITEMS.length) * 100);

  return (
    <AppShell>
      <RunAlphaHeader title="The Launch Checklist" subtitle="Seven things to do before launch." />

      <div className="px-5 mt-5">
        <div className="rounded-2xl bg-white border border-border/60 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">{done} of {ITEMS.length} done</p>
            <p className="text-xs text-muted-foreground">{pct}%</p>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-secondary overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <ol className="px-5 mt-4 space-y-3">
        {ITEMS.map((item, idx) => {
          const hasGroups = !!item.groups;
          const isOn = isItemDone(item);
          const isOpen = !!expanded[item.id];
          const allSub = hasGroups ? subIds(item) : [];
          const subDone = allSub.filter((id) => checked[id]).length;
          return (
            <li key={item.id}>
              <div className={`rounded-2xl border shadow-sm transition ${
                isOn ? "bg-primary/5 border-primary/30" : "bg-white border-border/60"
              }`}>
                <button
                  onClick={() => hasGroups ? toggleExpand(item.id) : toggle(item.id)}
                  className="w-full text-left p-4 flex gap-3 min-h-12"
                >
                  <span
                    className={`mt-0.5 h-6 w-6 rounded-md border-2 flex items-center justify-center shrink-0 ${
                      isOn ? "bg-primary border-primary text-primary-foreground" : "border-border bg-white"
                    }`}
                  >
                    {isOn && <Check className="h-4 w-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-bold ${isOn ? "line-through text-muted-foreground" : ""}`}>
                      {idx + 1}. {item.title}
                    </p>
                    <p className={`mt-1 text-[13px] leading-relaxed ${isOn ? "text-muted-foreground" : "text-foreground/85"}`}>
                      {item.body}
                    </p>
                    {hasGroups && (
                      <p className="mt-1.5 text-[12px] font-semibold text-primary">
                        {subDone} of {allSub.length} done
                      </p>
                    )}
                  </div>
                  {hasGroups && (
                    isOpen
                      ? <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                      : <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                  )}
                </button>
                {hasGroups && isOpen && (
                  <div className="px-4 pb-4 pt-1 space-y-4">
                    {item.groups!.map((group) => (
                      <div key={group.label}>
                        <p className="text-[12px] uppercase tracking-wider font-bold text-foreground mb-2">
                          {group.label}
                        </p>
                        <ul className="space-y-1.5">
                          {group.items.map((sub) => {
                            const on = !!checked[sub.id];
                            return (
                              <li key={sub.id}>
                                <button
                                  onClick={() => toggle(sub.id)}
                                  className="w-full text-left rounded-xl bg-white border border-border/60 p-3 flex gap-2.5 min-h-12 active:bg-accent"
                                >
                                  <span
                                    className={`mt-0.5 h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 ${
                                      on ? "bg-primary border-primary text-primary-foreground" : "border-border bg-white"
                                    }`}
                                  >
                                    {on && <Check className="h-3.5 w-3.5" />}
                                  </span>
                                  <span className={`text-[13px] leading-relaxed ${on ? "line-through text-muted-foreground" : "text-foreground/90"}`}>
                                    {sub.text}
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="px-5 mt-6">
        <button
          onClick={reset}
          className="w-full h-11 rounded-2xl bg-secondary text-foreground text-sm font-semibold"
        >
          Reset checklist
        </button>
      </div>
      <div className="h-6" />
    </AppShell>
  );
}