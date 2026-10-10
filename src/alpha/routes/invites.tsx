import { createFileRoute } from "../router";
import { useMemo, useState } from "react";
import { AppShell } from "../components/AppShell";
import { useInvites, STATUS_LABEL, STATUS_BORDER, type Invite } from "../lib/invites";
import { useCSV, CSV, type PrayerRow } from "../lib/data";
import { Plus, Trash2, X, HeartHandshake } from "lucide-react";
import { useEffect } from "react";
import { ChevronDown, ChevronUp, HandHeart } from "lucide-react";

export const Route = createFileRoute("/invites")({ component: Invites });

function Invites() {
  const { list, add, update, remove, cycle } = useInvites();
  const { data: prayers } = useCSV<PrayerRow>(CSV.prayers, "prayers");
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [prayModal, setPrayModal] = useState(false);

  const counts = useMemo(() => ({
    praying: list.filter((i) => i.status === "praying").length,
    invited: list.filter((i) => i.status === "invited").length,
    coming: list.filter((i) => i.status === "coming").length,
  }), [list]);

  return (
    <AppShell title="My People">
      <div className="px-5">
        <p className="text-sm text-muted-foreground">Who's on your heart this season? Start with 3 to 5 names.</p>
        <p className="text-xs text-muted-foreground/80 mt-1">Private. Only stored on this device.</p>
      </div>

      <div className="mx-5 mt-4 rounded-2xl bg-white border border-border/60 px-4 py-3 flex justify-between text-center">
        <Stat n={counts.praying} label="Praying" />
        <Stat n={counts.invited} label="Invited" />
        <Stat n={counts.coming} label="Coming" />
      </div>

      <div className="px-5 mt-4">
        {!adding ? (
          <button
            onClick={() => setAdding(true)}
            className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5" /> Add a name
          </button>
        ) : (
          <div className="rounded-2xl bg-white border border-border p-3 flex gap-2">
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && name.trim()) { add(name.trim()); setName(""); setAdding(false); } }}
              placeholder="First name"
              className="flex-1 h-11 rounded-xl bg-secondary px-3 text-sm"
            />
            <button
              onClick={() => { if (name.trim()) { add(name.trim()); setName(""); setAdding(false); } }}
              className="h-11 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
            >Add</button>
            <button onClick={() => { setName(""); setAdding(false); }} className="h-11 w-11 rounded-xl bg-secondary text-foreground" aria-label="Cancel"><X className="h-4 w-4 mx-auto" /></button>
          </div>
        )}
      </div>

      <div className="px-5 mt-4 space-y-2.5">
        {list.length === 0 && (
          <div className="text-center py-10 text-sm text-muted-foreground">No names yet — add the first one above</div>
        )}
        {list.map((i) => (
          <InviteRow key={i.id} invite={i} onCycle={() => cycle(i.id)} onUpdate={(p) => update(i.id, p)} onRemove={() => remove(i.id)} />
        ))}
      </div>

      {list.length > 0 && (
        <div className="px-5 mt-6">
          <button
            onClick={() => setPrayModal(true)}
            className="w-full h-11 rounded-2xl bg-secondary text-foreground font-semibold flex items-center justify-center gap-2"
          >
            <HeartHandshake className="h-4 w-4" /> Pray for my list
          </button>
        </div>
      )}

      {prayModal && <PrayModal list={list} prayers={prayers} onClose={() => setPrayModal(false)} />}

      <PrayerGuide />
      <div className="h-6" />
    </AppShell>
  );
}

const GUIDE_KEY = "alpha:prayer-guide:open:v1";

function PrayerGuide() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try { setOpen(localStorage.getItem(GUIDE_KEY) === "1"); } catch { /* ignore */ }
  }, []);
  const toggle = () => {
    const next = !open;
    setOpen(next);
    try { localStorage.setItem(GUIDE_KEY, next ? "1" : "0"); } catch { /* ignore */ }
  };
  return (
    <section className="px-5 mt-6">
      <div className="rounded-2xl bg-white border border-border/60 shadow-sm overflow-hidden">
        <button
          onClick={toggle}
          aria-expanded={open}
          className="w-full text-left p-4 flex items-start gap-3 min-h-12"
        >
          <div className="h-10 w-10 rounded-xl bg-secondary text-primary flex items-center justify-center shrink-0">
            <HandHeart className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-primary">How to Pray for Your List</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              A short guide on praying for the people God has put on your heart.
            </p>
          </div>
          {open ? <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                : <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />}
        </button>

        {open && (
          <div className="px-5 pb-5 pt-1 space-y-5 text-[14px] leading-relaxed text-foreground/90">
            <div>
              <h4 className="text-sm font-bold text-primary mb-1.5">Why pray for your list?</h4>
              <p className="italic text-muted-foreground">
                "You can do many things after you have prayed, but you can do nothing of lasting value before
                you have prayed. The people on your list are not a task. They are loved by God more deeply
                than you can fathom, and your prayers join His heart for them."
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-primary mb-1.5">A simple way to pray (the 5 minute version)</h4>
              <ol className="list-decimal pl-5 space-y-1.5">
                <li>Look at one name. Picture their face.</li>
                <li>Thank God for them by name. Say something true: "Thank you for Sarah. Thank you that you love her."</li>
                <li>Ask one specific thing. Not generic. Something like: "Soften her heart this week. Give me a chance to share. Let her say yes when I ask."</li>
                <li>Pause and listen. If a thought, a memory, or a verse comes to mind, write it as a note next to that name.</li>
                <li>Move to the next name. End with a short blessing: "Thank you, Father. I trust you with them."</li>
              </ol>
            </div>

            <div>
              <h4 className="text-sm font-bold text-primary mb-1.5">Three patterns that help</h4>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><span className="font-semibold">By name.</span> "Lord, I lift Ahmed before you today." Saying the name slowly is itself an act of love.</li>
                <li><span className="font-semibold">By the cross.</span> Picture the cross between you and that person. Ask Jesus to do what only he can do.</li>
                <li><span className="font-semibold">By their need.</span> If you know they are worried about work, marriage, health, or a child, name it. Pray it.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-primary mb-1.5">What if you don't feel anything?</h4>
              <p className="italic text-muted-foreground">
                "You are not praying to feel something. You are praying because God is real and your friend
                is real. Faithful, dry prayer is still prayer. Keep showing up. The answers are often quiet
                at first."
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-primary mb-1.5">A short prayer to start with</h4>
              <div className="rounded-2xl bg-[#FAF8F5] border-l-4 border-primary p-4">
                <p className="italic text-foreground/90">
                  "Father, thank you for the people on this list. You loved each of them before they ever
                  knew my name. Soften their hearts. Open doors. Give me courage to ask. Use this Alpha to
                  bring them home to you. In Jesus' name, amen."
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-primary mb-1.5">Pray with others</h4>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Tap "Pray for my list" at the top of My Invites to enter a focused prayer mode. Use it daily for one week and see what shifts.</li>
                <li>Tell one prayer partner (a friend, your spouse, your small group leader) the names on your list and ask them to pray too. Two praying is stronger than one.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-primary mb-1.5">For more on praying for those you love</h4>
              <p className="italic text-muted-foreground">
                "Speak to Joyce (
                <a href="mailto:joyce@fellowshipdubai.com" style={{ color: "#1B3FAA" }} className="font-medium not-italic">joyce@fellowshipdubai.com</a>
                ) or Xerxes (
                <a href="mailto:hi@xerxesduane.com" style={{ color: "#1B3FAA" }} className="font-medium not-italic">hi@xerxesduane.com</a>
                ) for further resources and a pastoral conversation if you would like to go deeper."
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex-1">
      <p className="text-2xl font-bold">{n}</p>
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">{label}</p>
    </div>
  );
}

function InviteRow({ invite, onCycle, onUpdate, onRemove }: {
  invite: Invite; onCycle: () => void; onUpdate: (p: Partial<Invite>) => void; onRemove: () => void;
}) {
  const [showNote, setShowNote] = useState(!!invite.note);
  const [confirming, setConfirming] = useState(false);
  return (
    <div className={`bg-white rounded-2xl border border-border/60 border-l-4 ${STATUS_BORDER[invite.status]} p-3`}>
      <div className="flex items-center gap-3">
        <input
          value={invite.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="flex-1 bg-transparent text-base font-semibold focus:outline-none"
        />
        <button onClick={onCycle} className="text-xs font-medium bg-secondary rounded-full px-3 py-1.5">
          {STATUS_LABEL[invite.status]}
        </button>
      </div>
      <div className="mt-2 flex items-center gap-3 text-xs">
        <button onClick={() => setShowNote((v) => !v)} className="text-primary font-medium">
          {showNote ? "Hide note" : invite.note ? "Edit note" : "Add note"}
        </button>
        {!confirming ? (
          <button onClick={() => setConfirming(true)} className="ml-auto text-muted-foreground flex items-center gap-1">
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        ) : (
          <div className="ml-auto flex items-center gap-2">
            <span className="text-muted-foreground">Sure?</span>
            <button onClick={onRemove} className="text-destructive font-semibold">Delete</button>
            <button onClick={() => setConfirming(false)} className="text-muted-foreground">Cancel</button>
          </div>
        )}
      </div>
      {showNote && (
        <textarea
          value={invite.note ?? ""}
          onChange={(e) => onUpdate({ note: e.target.value })}
          placeholder="A small note (how to invite, when…)"
          rows={2}
          className="mt-2 w-full bg-secondary rounded-xl px-3 py-2 text-sm focus:outline-none"
        />
      )}
    </div>
  );
}

function PrayModal({ list, prayers, onClose }: { list: Invite[]; prayers: PrayerRow[]; onClose: () => void }) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const prompt = prayers.find((p) => p.day?.toLowerCase() === today.toLowerCase())?.prompt ?? prayers[0]?.prompt ?? "";
  const names = list.filter((i) => i.status === "praying" || i.status === "invited");

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-h-[80vh] overflow-y-auto bg-white rounded-t-3xl px-5 pt-5"
        style={{ paddingBottom: `calc(env(safe-area-inset-bottom) + 1.5rem)` }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">A moment to pray</h3>
          <button onClick={onClose} aria-label="Close" className="p-1"><X className="h-5 w-5" /></button>
        </div>
        {prompt && (
          <div className="rounded-2xl bg-secondary p-4">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{today}'s prayer</p>
            <p className="mt-1 text-[15px] leading-relaxed">{prompt}</p>
          </div>
        )}
        <div className="mt-4">
          <p className="text-sm font-semibold text-foreground">For:</p>
          {names.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">Add names with status "Praying" or "Invited" to include them here.</p>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {names.map((n) => <li key={n.id} className="text-[15px]">· {n.name}</li>)}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
