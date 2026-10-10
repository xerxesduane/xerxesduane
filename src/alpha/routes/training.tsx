import { createFileRoute, Link } from "../router";
import { useMemo } from "react";
import { AppShell } from "../components/AppShell";
import { useCSV, CSV, type VideoRow } from "../lib/data";
import { useSettings } from "../lib/settings";
import { ArrowLeft, MapPin, Calendar, Clock, Settings as SettingsIcon, Clapperboard, ChevronRight } from "lucide-react";
import { ContactBlock } from "../components/ContactBlock";
import lockup from "../assets/alpha-at-fellowship-lockup.webp";

export const Route = createFileRoute("/training")({ component: Training });

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|watch\?v=|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function Training() {
  const { data } = useCSV<VideoRow>(CSV.videos, "videos:v2");
  const s = useSettings();

  // TEAM-ONLY: only videos with section = "Training" belong here
  const teamVideo = useMemo(
    () => data.find((v) => v.section?.trim().toLowerCase() === "training" && /who.*will.*invite|mobiliz/i.test(v.title))
      ?? data.find((v) => v.section?.trim().toLowerCase() === "training"),
    [data]
  );
  const vid = teamVideo ? getYouTubeId(teamVideo.youtube_url) : null;

  return (
    <AppShell>
      <div className="px-5 pt-6">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground font-medium">
          <ArrowLeft className="h-4 w-4 mr-1" /> Home
        </Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight">Training & Resources</h1>
        <p className="mt-1 text-sm text-muted-foreground">For the Alpha team — preparation matters as much as the invitation.</p>
      </div>

      <div className="px-5 mt-5">
        {/* Run Alpha hub entry — high-emphasis card */}
        <Link
          to="/run-alpha"
          className="block rounded-3xl bg-primary text-primary-foreground p-5 shadow-lg active:scale-[0.99] transition"
        >
          <div className="flex items-start gap-3">
            <div className="h-11 w-11 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <Clapperboard className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-[0.18em] opacity-90 font-semibold">Host your own</p>
              <h2 className="mt-1 text-lg font-extrabold leading-tight">Run Your Own Alpha</h2>
              <p className="mt-1 text-[13px] opacity-90 leading-snug">
                Everything you need to host the Alpha Film Series with your friends.
              </p>
            </div>
            <ChevronRight className="h-5 w-5 opacity-90 shrink-0 mt-1" />
          </div>
        </Link>
      </div>

      <div className="px-5 mt-5">
        {teamVideo && vid ? (
          <div className="rounded-2xl overflow-hidden bg-black">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${vid}`}
                title={teamVideo.title}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-secondary p-6 text-center text-sm text-muted-foreground">Loading training video…</div>
        )}
        {teamVideo && (
          <h2 className="mt-3 text-base font-semibold">{teamVideo.title}</h2>
        )}
        <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">
          Before sending invitations, take a moment to watch this and ask: who are the 3–5 people God is putting on your heart?
        </p>
        <Link
          to="/invites"
          className="mt-4 w-full h-12 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center"
        >
          + Add these names to My Invites
        </Link>
      </div>

      <div className="px-5 mt-8">
        <h2 className="text-base font-semibold">Course logistics</h2>
        <ul className="mt-3 space-y-3">
          {s.locations.map((l, i) => (
            <Logistic
              key={i}
              icon={<MapPin className="h-4 w-4" />}
              label={l.isPrimary ? "Primary venue" : "Venue"}
              value={l.mapsUrl
                ? <a href={l.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-primary">{l.name}</a>
                : l.name}
            />
          ))}
          <Logistic icon={<Calendar className="h-4 w-4" />} label="Dates" value={`${s.dayOfWeek}, ${s.startDate} – ${s.endDate}`} />
          <Logistic icon={<Clock className="h-4 w-4" />} label="Time" value={`${s.startTime} – ${s.endTime} · ${s.sessionCount} sessions`} />
        </ul>
        <div className="mt-4 rounded-2xl bg-white border border-border/60 p-4">
          <ContactBlock />
        </div>
      </div>

      {/* Settings link */}
      <div className="px-5 mt-6">
        <Link
          to="/settings"
          className="flex items-center justify-between rounded-2xl bg-white border border-border/60 px-4 py-3.5 active:bg-accent shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-secondary text-primary flex items-center justify-center"><SettingsIcon className="h-4 w-4" /></div>
            <div>
              <p className="text-sm font-semibold">Edit course details</p>
              <p className="text-xs text-muted-foreground mt-0.5">Update season, dates, venues, contact — no code</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Mission tagline + logo — team-only */}
      <div className="px-5 mt-8 flex flex-col items-center">
        <img
          src={lockup}
          alt="Fellowship Dubai × Alpha · Alpha at Fellowship"
          className="h-24 w-auto object-contain"
        />
        <p className="mt-4 text-center text-xs italic text-muted-foreground">
          Know Jesus · Grow to be like Jesus · Go tell the nations about Jesus
        </p>
      </div>
    </AppShell>
  );
}

function Logistic({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <li className="bg-white border border-border/60 rounded-2xl p-4 flex gap-3">
      <div className="h-8 w-8 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">{icon}</div>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
        <div className="text-sm font-medium mt-0.5">{value}</div>
      </div>
    </li>
  );
}
