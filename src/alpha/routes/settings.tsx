import { createFileRoute, Link } from "../router";
import { useEffect, useState } from "react";
import { AppShell } from "../components/AppShell";
import {
  defaultSettings,
  useSettings,
  writeSettings,
  resetSettings,
  buildInviteText,
  type Settings,
  type Location,
} from "../lib/settings";
import { ArrowLeft, Plus, Trash2, Save, RotateCcw, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const stored = useSettings();
  const [draft, setDraft] = useState<Settings>(stored);

  // Keep draft in sync if external write happens while screen open
  useEffect(() => { setDraft(stored); }, [stored]);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const updateLocation = (i: number, patch: Partial<Location>) => {
    setDraft((d) => {
      const next = d.locations.map((l, idx) => (idx === i ? { ...l, ...patch } : l));
      // If toggling primary on, make all others false
      if (patch.isPrimary === true) {
        next.forEach((l, idx) => { if (idx !== i) l.isPrimary = false; });
      }
      // Ensure at least one primary
      if (!next.some((l) => l.isPrimary) && next[0]) next[0].isPrimary = true;
      return { ...d, locations: next };
    });
  };

  const addLocation = () =>
    setDraft((d) => ({ ...d, locations: [...d.locations, { id: crypto.randomUUID(), name: "", shortName: "", area: "", room: "", mapsUrl: "", isPrimary: false }] }));

  const removeLocation = (i: number) =>
    setDraft((d) => {
      const next = d.locations.filter((_, idx) => idx !== i);
      if (!next.some((l) => l.isPrimary) && next[0]) next[0].isPrimary = true;
      return { ...d, locations: next };
    });

  const save = () => {
    writeSettings(draft);
    toast("Settings saved — the whole app is updated");
  };

  const reset = () => {
    if (confirm("Reset all settings to defaults? This can't be undone.")) {
      resetSettings();
      setDraft(defaultSettings);
      toast("Settings reset to defaults");
    }
  };

  const preview = buildInviteText(draft);

  return (
    <AppShell>
      <div className="px-5 pt-6">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground font-medium">
          <ArrowLeft className="h-4 w-4 mr-1" /> Home
        </Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight">Course Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit these details for each new Alpha course. Changes save to this device and update the whole app. No code needed.
        </p>
      </div>

      {/* Live preview */}
      <div className="mx-5 mt-5 rounded-2xl bg-white border border-border/60 p-4 shadow-sm">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Live preview · invite text</p>
        <pre className="mt-2 text-[13px] leading-relaxed whitespace-pre-wrap font-sans text-foreground/90">{preview}</pre>
      </div>

      <Section title="Course Details">
        <Field label="Course name" value={draft.courseName} onChange={(v) => update("courseName", v)} />
        <Field label="Season" value={draft.season} onChange={(v) => update("season", v)} />
        <Field label="Tagline" value={draft.tagline} onChange={(v) => update("tagline", v)} />
      </Section>

      <Section title="Schedule">
        <Field label="Start date" value={draft.startDate} onChange={(v) => update("startDate", v)} />
        <Field label="End date" value={draft.endDate} onChange={(v) => update("endDate", v)} />
        <Field label="Day of week" value={draft.dayOfWeek} onChange={(v) => update("dayOfWeek", v)} />
        <Field label="Start time" value={draft.startTime} onChange={(v) => update("startTime", v)} />
        <Field label="End time" value={draft.endTime} onChange={(v) => update("endTime", v)} />
        <Field label="Number of sessions" value={draft.sessionCount} onChange={(v) => update("sessionCount", v)} />
      </Section>

      <Section title="Cost & Food">
        <Field label="Cost" value={draft.cost} onChange={(v) => update("cost", v)} />
        <Field label="Food" value={draft.food} onChange={(v) => update("food", v)} />
      </Section>

      <Section title="Contact & Registration">
        <Field label="Contact email" type="email" value={draft.contactEmail} onChange={(v) => update("contactEmail", v)} />
        <Field label="Secondary contact email" type="email" value={draft.contactEmailSecondary} onChange={(v) => update("contactEmailSecondary", v)} />
        <Field label="Registration URL" type="url" value={draft.registrationUrl} onChange={(v) => update("registrationUrl", v)} />
        <Field label="Church name" value={draft.churchName} onChange={(v) => update("churchName", v)} />
        <Field label="Church website" type="url" value={draft.churchWebsite} onChange={(v) => update("churchWebsite", v)} />
        <Field label="Alpha info URL" type="url" value={draft.alphaInfoUrl} onChange={(v) => update("alphaInfoUrl", v)} />
      </Section>

      <Section title="Locations">
        <div className="space-y-3">
          {draft.locations.map((loc, i) => (
            <div key={i} className="rounded-2xl bg-white border border-border/60 p-3 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Venue {i + 1}{loc.isPrimary ? " · Primary" : ""}
                </span>
                {draft.locations.length > 1 && (
                  <button
                    onClick={() => removeLocation(i)}
                    aria-label="Remove venue"
                    className="text-muted-foreground p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Field label="Name" value={loc.name} onChange={(v) => updateLocation(i, { name: v })} />
              <Field label="Google Maps URL" type="url" value={loc.mapsUrl} onChange={(v) => updateLocation(i, { mapsUrl: v })} />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={loc.isPrimary}
                  onChange={(e) => updateLocation(i, { isPrimary: e.target.checked })}
                  className="h-4 w-4 accent-primary"
                />
                Set as primary venue
              </label>
            </div>
          ))}
          <button
            onClick={addLocation}
            className="w-full h-11 rounded-2xl bg-secondary text-foreground font-medium flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add another location
          </button>
        </div>
      </Section>

      <div className="px-5 mt-6 space-y-2">
        <button
          onClick={save}
          className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
        >
          <Save className="h-4 w-4" /> Save changes
        </button>
        <button
          onClick={reset}
          className="w-full h-10 text-sm text-muted-foreground font-medium flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset to defaults
        </button>
      </div>

      <div className="px-5 mt-4 mb-6">
        <Link
          to="/about"
          className="flex items-center justify-between rounded-2xl bg-white border border-border/60 px-4 py-3.5 active:bg-accent shadow-sm"
        >
          <span className="text-sm font-medium">About this app</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Link>
      </div>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 px-5">
      <h2 className="text-base font-bold mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Field({
  label, value, onChange, type = "text",
}: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full h-11 rounded-xl bg-white border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </label>
  );
}