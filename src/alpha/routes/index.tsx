import { createFileRoute, Link } from "../router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "../components/AppShell";
import { shareText, copyText, whatsappLink } from "../lib/share";
import { trackVisit } from "../lib/pwa";
import {
  useSettings,
  buildLocationInvite,
  buildBothInvite,
  venueLine,
  type Location,
} from "../lib/settings";
import {
  Calendar, Clock, MapPin, Share2, Copy, ChevronRight, X,
  Settings as SettingsIcon, ExternalLink, MessageCircle, Users, BookOpen, Check,
} from "lucide-react";
import { ContactBlock } from "../components/ContactBlock";
import { toast } from "sonner";
import lockup from "../assets/alpha-at-fellowship-lockup.webp";
import fellowshipLogo from "../assets/fellowship-dubai-logo.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Invite a friend to Alpha at Fellowship Dubai" },
      { name: "description", content: "Pick a location, personalise the message, and send an invitation to Alpha at Fellowship Dubai in a couple of taps." },
      { property: "og:title", content: "Invite a friend to Alpha at Fellowship Dubai" },
      { property: "og:description", content: "Pick a location, personalise the message, and send an invitation to Alpha at Fellowship Dubai in a couple of taps." },
    ],
  }),
  component: Home,
});

const VENUE_KEY = "alpha:invite-venue:v1";

function Home() {
  const s = useSettings();
  const [installBanner, setInstallBanner] = useState(false);
  const [choice, setChoice] = useState<string>("both");
  const [note, setNote] = useState("");

  useEffect(() => {
    const visits = trackVisit();
    if (visits >= 3 && !localStorage.getItem("alpha:install-dismissed")) setInstallBanner(true);
    try {
      const saved = localStorage.getItem(VENUE_KEY);
      if (saved) setChoice(saved);
    } catch { /* ignore */ }
  }, []);

  const pick = (id: string) => {
    setChoice(id);
    try { localStorage.setItem(VENUE_KEY, id); } catch { /* ignore */ }
  };

  const selected: Location | null = useMemo(
    () => s.locations.find((l) => l.id === choice) ?? null,
    [s.locations, choice]
  );

  const message = useMemo(
    () => (selected ? buildLocationInvite(s, selected, note) : buildBothInvite(s, note)),
    [s, selected, note]
  );

  const onWhatsApp = () => {
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };
  const onCopy = async () => {
    if (await copyText(message)) toast("Invitation copied. Paste it anywhere.");
    else toast("Could not copy. Press and hold the message above to select it.");
  };
  const onShare = async () => {
    const r = await shareText(message, undefined, "Alpha at Fellowship");
    if (r === "copied") toast("Invitation copied. Paste it anywhere.");
    if (r === "failed") toast("Nothing was sent.");
  };

  return (
    <AppShell>
      <div className="px-5 pt-6 relative flex items-center justify-center">
        <img src={lockup} alt="Fellowship Dubai and Alpha" className="h-14 w-auto object-contain" />
        <Link
          to="/settings"
          aria-label="Course settings"
          className="absolute right-5 top-6 h-11 w-11 rounded-full bg-white border border-border flex items-center justify-center text-muted-foreground active:bg-secondary"
        >
          <SettingsIcon className="h-4 w-4" />
        </Link>
      </div>

      {installBanner && (
        <div className="mx-5 mt-4 rounded-2xl bg-primary/10 border border-primary/20 p-4 flex items-start gap-3">
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Add Alpha at Fellowship to your home screen</p>
            <p className="text-xs text-muted-foreground mt-0.5">In Safari or Chrome, tap Share, then Add to Home Screen.</p>
          </div>
          <button
            aria-label="Dismiss"
            onClick={() => { localStorage.setItem("alpha:install-dismissed", "1"); setInstallBanner(false); }}
            className="p-2 text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="px-5 mt-5">
        <h1 className="text-2xl font-extrabold leading-tight">Invite someone to Alpha</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Choose a location, add a personal line if you like, then send.
        </p>
      </div>

      {/* Course summary */}
      <div className="mx-5 mt-4 rounded-3xl bg-primary text-primary-foreground p-5 shadow-lg">
        <p className="text-xs uppercase tracking-[0.2em] opacity-90">{s.courseName} at {s.churchName} · {s.season}</p>
        <h2 className="mt-1.5 text-2xl font-extrabold leading-tight">{s.tagline}</h2>
        <div className="mt-4 space-y-2 text-[14px]">
          <div className="flex items-start gap-2.5 opacity-95">
            <Calendar className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{s.dateLine}</span>
          </div>
          <div className="flex items-start gap-2.5 opacity-95">
            <Clock className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{s.timeLine}</span>
          </div>
          {s.locations.map((l) => (
            <div key={l.id} className="flex items-start gap-2.5 opacity-95">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                {l.mapsUrl ? (
                  <a href={l.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 underline">
                    {venueLine(l)}
                  </a>
                ) : venueLine(l)}
                {l.room ? <span className="block opacity-85">{l.room}</span> : null}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1 */}
      <section className="px-5 mt-7">
        <h2 className="text-base font-bold">1. Which location?</h2>
        <div className="mt-3 space-y-2">
          {s.locations.map((l) => (
            <VenueButton
              key={l.id}
              active={choice === l.id}
              title={l.shortName || l.name}
              subtitle={[l.area, l.room].filter(Boolean).join(" · ")}
              onClick={() => pick(l.id)}
            />
          ))}
          <VenueButton
            active={choice === "both"}
            title="Both locations"
            subtitle="Let them choose whichever is closer"
            onClick={() => pick("both")}
          />
        </div>
      </section>

      {/* Step 2 */}
      <section className="px-5 mt-7">
        <h2 className="text-base font-bold">2. Add a personal line (optional)</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          placeholder="Hey Sarah, thought of you..."
          aria-label="Personal line to add above the invitation"
          className="mt-2 w-full rounded-2xl bg-white border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </section>

      {/* Step 3 */}
      <section className="px-5 mt-7">
        <h2 className="text-base font-bold">3. Send it</h2>
        <div className="mt-2 rounded-2xl bg-white border border-border/60 p-4 shadow-sm">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Your invitation</p>
          <pre className="mt-2 text-[14px] leading-relaxed whitespace-pre-wrap font-sans text-foreground/90">{message}</pre>
        </div>

        <div className="mt-3 space-y-2">
          <button
            onClick={onWhatsApp}
            className="w-full h-12 rounded-2xl bg-[#25D366] text-white font-semibold flex items-center justify-center gap-2 active:opacity-90"
          >
            <MessageCircle className="h-5 w-5" /> Send on WhatsApp
          </button>
          <button
            onClick={onCopy}
            className="w-full h-12 rounded-2xl bg-secondary text-foreground font-semibold flex items-center justify-center gap-2"
          >
            <Copy className="h-5 w-5" /> Copy invitation
          </button>
          <button
            onClick={onShare}
            className="w-full h-12 rounded-2xl bg-white border border-border text-foreground font-semibold flex items-center justify-center gap-2"
          >
            <Share2 className="h-5 w-5" /> More ways to share
          </button>
          {s.registrationUrl && (
            <a
              href={s.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2"
            >
              <ExternalLink className="h-5 w-5" /> Open the registration form
            </a>
          )}
        </div>
      </section>

      <nav className="px-5 mt-8 space-y-2" aria-label="More">
        <TileLink to="/invites" icon={<Users className="h-5 w-5" />} title="My People" sub="Names you are praying for and inviting" />
        <TileLink to="/resources" icon={<BookOpen className="h-5 w-5" />} title="Resources" sub="Images, what to say, videos and team training" />
      </nav>

      <footer className="px-5 mt-10 mb-2 text-center space-y-1.5">
        <div className="flex items-center justify-center gap-2">
          <img src={fellowshipLogo} alt="" className="h-6 w-6 rounded object-cover" />
          <p className="text-xs text-foreground/80 font-semibold">Alpha at Fellowship</p>
        </div>
        {s.alphaInfoUrl && (
          <p className="text-[11px]">
            <a href={s.alphaInfoUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-medium">
              About Alpha at {s.churchName}
            </a>
          </p>
        )}
        <div className="pt-2 flex justify-center">
          <ContactBlock align="center" />
        </div>
      </footer>
    </AppShell>
  );
}

function VenueButton({ active, title, subtitle, onClick }: {
  active: boolean; title: string; subtitle?: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`w-full min-h-14 rounded-2xl border px-4 py-3 text-left flex items-center gap-3 transition ${
        active ? "bg-primary/10 border-primary" : "bg-white border-border"
      }`}
    >
      <span
        aria-hidden
        className={`h-6 w-6 rounded-full border flex items-center justify-center shrink-0 ${
          active ? "bg-primary border-primary text-primary-foreground" : "border-border"
        }`}
      >
        {active && <Check className="h-4 w-4" />}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{title}</span>
        {subtitle && <span className="block text-xs text-muted-foreground mt-0.5">{subtitle}</span>}
      </span>
    </button>
  );
}

function TileLink({ to, icon, title, sub }: { to: string; icon: React.ReactNode; title: string; sub: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-2xl bg-white border border-border/60 px-4 py-3.5 active:bg-accent shadow-sm min-h-14"
    >
      <span className="h-9 w-9 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-xs text-muted-foreground mt-0.5">{sub}</span>
      </span>
      <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
    </Link>
  );
}
