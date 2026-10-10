import { createFileRoute } from "../router";
import { AppShell } from "../components/AppShell";
import { RunAlphaHeader } from "../components/RunAlphaHeader";
import { Ear, Heart, Smile } from "lucide-react";

export const Route = createFileRoute("/run-alpha/host-tips")({ component: HostTipsPage });

function HostTipsPage() {
  return (
    <AppShell>
      <RunAlphaHeader title="Host Quick Reference" subtitle="Glance before guests arrive." />

      <section className="px-5 mt-5">
        <h2 className="text-base font-bold mb-3">The 3 Ls</h2>
        <div className="grid gap-3">
          <TipCard icon={<Ear className="h-5 w-5" />} title="LISTEN" body="Listen to understand, not to reply." />
          <TipCard icon={<Heart className="h-5 w-5" />} title="LOVE" body="Accept people exactly where they are. Do not fix. Just love." />
          <TipCard icon={<Smile className="h-5 w-5" />} title="LAUGH" body="If you are not laughing, you are doing it wrong." />
        </div>
      </section>

      <section className="px-5 mt-6">
        <h2 className="text-base font-bold mb-3">The 6 second rule</h2>
        <div className="rounded-2xl bg-white border border-border/60 p-4 shadow-sm text-[14px] leading-relaxed text-foreground/90">
          After you ask a question, count to six in your head before saying anything. Silence is not failure.
          It is someone deciding whether to be honest. If it is hard, take a sip of your drink.
        </div>
      </section>

      <section className="px-5 mt-6">
        <h2 className="text-base font-bold mb-3">The magic phrase</h2>
        <div className="rounded-2xl bg-white border border-border/60 p-4 shadow-sm text-[14px] leading-relaxed text-foreground/90">
          When someone gives a one word answer, say: <span className="font-semibold">"Tell me more about that."</span> Then stay quiet. They will speak.
        </div>
      </section>

      <section className="px-5 mt-6">
        <h2 className="text-base font-bold mb-3">Ask, do not answer</h2>
        <div className="rounded-2xl bg-white border border-border/60 shadow-sm overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-secondary text-foreground">
                <th className="text-left font-semibold px-3 py-2">Instead of</th>
                <th className="text-left font-semibold px-3 py-2">Try</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Did you like the video?", "What stood out to you?"],
                ["Do you believe in God?", "What do you make of the idea of God?"],
                ["Was that helpful?", "What did that bring up for you?"],
              ].map(([a, b], i) => (
                <tr key={i} className="border-t border-border/60">
                  <td className="px-3 py-2.5 text-muted-foreground align-top">{a}</td>
                  <td className="px-3 py-2.5 font-medium align-top">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="px-5 mt-6">
        <h2 className="text-base font-bold mb-3">The three hard moments</h2>
        <div className="grid gap-3">
          <TipCard title="The sceptic" body="Validate, admit, crowdsource. Do not enter debate mode." />
          <TipCard title="The oversharer" body={`Stop the agenda. Say thank you for trusting us with that. Offer to talk after. If there is any safeguarding concern, tell a site pastor.`} />
          <TipCard title="The debate" body="Press pause, redirect to the question on screen, offer to chat one on one later." />
        </div>
      </section>

      <section className="px-5 mt-6">
        <h2 className="text-base font-bold mb-3">Shine, do not shout</h2>
        <div
          className="rounded-2xl p-4 text-[14px] leading-relaxed"
          style={{ background: "rgba(27, 63, 170, 0.08)", borderLeft: "3px solid #1B3FAA" }}
        >
          <p className="text-[11px] uppercase tracking-wider font-bold mb-1" style={{ color: "#1B3FAA" }}>Dubai note</p>
          <p className="text-foreground/90">
            We never pressure anyone to convert. It is against UAE law and against the Alpha way. Lead with
            hospitality and honest conversation. Be truthful about what Alpha is if anyone asks. Respect that
            your room will be wonderfully mixed.
          </p>
        </div>
      </section>
      <div className="h-6" />
    </AppShell>
  );
}

function TipCard({ icon, title, body }: { icon?: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-white border border-border/60 p-4 shadow-sm flex gap-3">
      {icon && (
        <div className="h-10 w-10 rounded-xl bg-secondary text-primary flex items-center justify-center shrink-0">
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-sm font-bold">{title}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-foreground/85">{body}</p>
      </div>
    </div>
  );
}