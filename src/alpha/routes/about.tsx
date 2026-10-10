import { createFileRoute, Link } from "../router";
import { AppShell } from "../components/AppShell";
import { ArrowLeft, ChevronRight, Mail, Globe } from "lucide-react";
import lockup from "../assets/alpha-at-fellowship-lockup.webp";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  const reportBody = [
    "What went wrong or what would you like to see improved?",
    "",
    "Where in the app did this happen? (Home, Scripts, Run Alpha, etc.)",
    "",
    "What phone and browser are you using?",
  ].join("%0D%0A");

  const reportMailto = `mailto:hi@xerxesduane.com?subject=${encodeURIComponent("Alpha at Fellowship App: Issue report")}&body=${reportBody}`;

  return (
    <AppShell>
      <div className="px-5 pt-6">
        <Link to="/settings" className="inline-flex items-center text-sm text-muted-foreground font-medium">
          <ArrowLeft className="h-4 w-4 mr-1" /> Settings
        </Link>
      </div>

      {/* Header */}
      <div className="px-5 mt-4 flex flex-col items-center text-center">
        <img
          src={lockup}
          alt="Fellowship Dubai × Alpha · Alpha at Fellowship"
          className="h-24 w-auto object-contain"
        />
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-xs">
          A mobile companion for inviting friends to Alpha and helping anyone host the Alpha Film Series themselves.
        </p>
      </div>

      {/* What this app is for */}
      <section className="mt-8 px-5">
        <h2 className="text-sm font-bold tracking-tight" style={{ color: "#E4002B" }}>
          What this app is for
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-foreground/80">
          Alpha at Fellowship is the in-house tool we use at Fellowship Dubai to mobilise our team to invite friends, family, and colleagues to Alpha, and to equip team members who want to run their own Alpha Film Series. Everything in this app, the scripts, graphics, films, and host guides, is shaped for our Dubai context and built to be reusable for every future Alpha course.
        </p>
      </section>

      {/* Our mission */}
      <section className="mt-8 px-5 text-center">
        <p
          className="text-sm font-semibold leading-relaxed"
          style={{ color: "#1B3FAA" }}
        >
          Know Jesus. Grow to be like Jesus. Go tell the nations about Jesus.
        </p>
        <p className="mt-1.5 text-[12px] text-muted-foreground">
          Fellowship Dubai · Two Locations, One Church
        </p>
      </section>

      {/* Support contacts */}
      <section className="mt-8 px-5">
        <h2 className="text-sm font-bold tracking-tight" style={{ color: "#E4002B" }}>
          Need help?
        </h2>
        <div className="mt-3 space-y-3">
          <a
            href="mailto:joyce@fellowshipdubai.com"
            className="flex items-center justify-between rounded-2xl bg-white border border-border/60 px-4 py-3.5 active:bg-accent shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0" style={{ color: "#1B3FAA" }} />
              <div>
                <p className="text-sm font-semibold">Joyce, Alpha Coordinator</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  joyce@fellowshipdubai.com
                </p>
                <p className="text-[11px] text-muted-foreground/80">
                  Alpha questions, coaching, and follow-up
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </a>

          <a
            href="mailto:hi@xerxesduane.com"

            className="flex items-center justify-between rounded-2xl bg-white border border-border/60 px-4 py-3.5 active:bg-accent shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0" style={{ color: "#1B3FAA" }} />
              <div>
                <p className="text-sm font-semibold">Xerxes, App and Tech</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  hi@xerxesduane.com
                </p>
                <p className="text-[11px] text-muted-foreground/80">
                  App issues, bugs, or technical help
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </a>
        </div>
        <p className="mt-2.5 text-[11px] text-muted-foreground text-center">
          We aim to reply within a couple of working days.
        </p>
      </section>

      {/* Report an issue */}
      <section className="mt-8 px-5">
        <div className="rounded-2xl bg-white border border-border/60 p-5 shadow-sm">
          <h2 className="text-sm font-bold tracking-tight" style={{ color: "#E4002B" }}>
            Found a bug or have a suggestion?
          </h2>
          <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
            We genuinely want to know. Tap below to send us a note.
          </p>
          <a
            href={reportMailto}
            className="mt-4 block w-full h-12 rounded-2xl font-semibold text-white text-sm flex items-center justify-center gap-2 active:scale-[0.99] transition"
            style={{ backgroundColor: "#E4002B" }}
          >
            <Mail className="h-4 w-4" /> Report an issue
          </a>
        </div>
      </section>

      {/* App info */}
      <section className="mt-8 px-5">
        <div className="rounded-2xl bg-white border border-border/60 p-5 shadow-sm space-y-3">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">App name</p>
            <p className="mt-0.5 text-sm font-medium">Alpha at Fellowship</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Built for</p>
            <p className="mt-0.5 text-sm font-medium">Fellowship Dubai</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Web address</p>
            <a
              href="https://alpha-atfellowship.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 text-sm font-medium inline-flex items-center gap-1"
              style={{ color: "#1B3FAA" }}
            >
              alpha-atfellowship.lovable.app <Globe className="h-3 w-3" />
            </a>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Add to home screen</p>
            <p className="mt-0.5 text-[13px] text-muted-foreground leading-relaxed">
              On iPhone, tap the Share button then Add to Home Screen. On Android, tap the menu then Add to Home screen or Install app.
            </p>
          </div>
        </div>
      </section>

      {/* Developer credit */}
      <section className="mt-8 px-5 mb-10">
        <div className="rounded-2xl bg-white border border-border/60 p-5 shadow-sm border-l-[4px]" style={{ borderLeftColor: "#1B3FAA" }}>
          <h2 className="text-sm font-bold tracking-tight" style={{ color: "#1B3FAA" }}>
            Built with care
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-foreground/80">
            This app was designed and developed by Xerxes Duane of Threshold Works, a Dubai tech studio building websites, apps, and systems for small businesses and faith-based organisations.
          </p>
          <a
            href="https://www.xerxesduane.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-full h-11 rounded-2xl font-semibold text-white text-sm flex items-center justify-center gap-2 active:scale-[0.99] transition"
            style={{ backgroundColor: "#1B3FAA" }}
          >
            <Globe className="h-4 w-4" /> Visit Threshold Works
          </a>
          <p className="mt-3 text-[11px] text-muted-foreground italic text-center">
            Built quietly, with care, for the Fellowship Dubai team.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
