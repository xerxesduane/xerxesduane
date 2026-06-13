import { m } from "framer-motion";
import { Bot, UserRoundCheck, FileSearch, Braces, Languages, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Kinetic from "../components/fx/Kinetic";
import Reveal from "../components/ui/Reveal";
import Contact from "../components/Contact";
import DemoChat from "../components/demos/DemoChat";
import DemoAsk from "../components/demos/DemoAsk";
import DemoExtract from "../components/demos/DemoExtract";
import DemoTranslate from "../components/demos/DemoTranslate";
import DemoWhatsApp from "../components/demos/DemoWhatsApp";
import { fadeUp, stagger } from "../lib/motion";

function DemoCard({
  icon: Icon,
  eyebrow,
  title,
  blurb,
  children,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  blurb: string;
  children: ReactNode;
}) {
  return (
    <Reveal>
      <div className="glass border-glow rounded-3xl p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold ring-1 ring-gold/20">
            <Icon size={22} strokeWidth={1.7} />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold/80">{eyebrow}</p>
            <h2 className="mt-1 text-2xl text-cream sm:text-[1.7rem]">{title}</h2>
            <p className="mt-2 text-sm text-muted">{blurb}</p>
          </div>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </Reveal>
  );
}

export default function Demos() {
  return (
    <>
      <section id="top" className="relative overflow-hidden pt-36 pb-12 sm:pt-44 sm:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-10 -z-10 h-96 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(218,164,66,0.13),transparent_68%)]"
        />
        <div className="container-bl">
          <m.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-3xl text-center">
            <m.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-gold"
            >
              Live AI lab
            </m.span>
            <Kinetic as="h1" className="mt-7 text-4xl leading-[1.06] sm:text-5xl md:text-6xl">
              Try the AI. <span className="text-gradient-gold italic">Not just read about it.</span>
            </Kinetic>
            <m.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              These are real, working demos — the same kind of AI I build into client products. Powered by
              Llama 3 on Groq, running live. Type into them, they respond for real.
            </m.p>
            <m.p variants={fadeUp} className="mx-auto mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-dark">
              Nothing here is canned · No sign-up · Your input isn't stored
            </m.p>
          </m.div>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-bl">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <DemoCard
              icon={Bot}
              eyebrow="Business assistant"
              title="An AI rep for your website"
              blurb="The kind of always-on assistant I'd embed on your site to answer customers and never miss a question."
            >
              <DemoChat
                demo="assistant"
                greeting="Hi! I'm a demo assistant for a small business. Ask me anything a customer might — hours, services, getting a quote…"
                placeholder="Ask the assistant a question…"
                suggestions={["What services do you offer?", "Are you open on weekends?", "Can I get a quote?"]}
              />
            </DemoCard>

            <DemoCard
              icon={UserRoundCheck}
              eyebrow="Lead qualifier"
              title="A bot that qualifies your leads"
              blurb="It chats with a visitor, figures out what they need, and hands you a warm, ready-to-act lead."
            >
              <DemoChat
                demo="lead"
                greeting="Hey — tell me a bit about your business and what's slowing you down, and I'll figure out how I can help."
                placeholder="Tell it about your business…"
                suggestions={[
                  "I run a small e-commerce store",
                  "My tools don't talk to each other",
                  "I need a website that converts",
                ]}
              />
            </DemoCard>

            <DemoCard
              icon={Send}
              eyebrow="Outreach on autopilot"
              title="WhatsApp outreach, personalized by AI"
              blurb="Point it at your contact leads and it writes a unique, on-brand WhatsApp opener for each one — then sends the whole list while you sleep."
            >
              <DemoWhatsApp />
            </DemoCard>

            <DemoCard
              icon={FileSearch}
              eyebrow="Answers from your content"
              title="Ask questions about any document"
              blurb="Paste text or point it at a page, then ask — it answers only from what's there, not the open internet."
            >
              <DemoAsk />
            </DemoCard>

            <DemoCard
              icon={Braces}
              eyebrow="Structured extraction"
              title="Turn messy messages into clean data"
              blurb="Drop in a rambling enquiry and watch it become a tidy, typed record — the first step of any automation."
            >
              <DemoExtract />
            </DemoCard>

            <DemoCard
              icon={Languages}
              eyebrow="Arabic ⇄ English"
              title="Translate either direction, instantly"
              blurb="Bilingual is the default in Dubai. Paste Arabic or English and get a natural translation — handy for sites, support, and content."
            >
              <DemoTranslate />
            </DemoCard>
          </div>

          <Reveal>
            <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-dark">
              Like one of these? I build them tuned to your business, your data, and your tone —
              then wire them into the tools you already use.{" "}
              <a href="/#contact" className="text-gold underline decoration-gold/50 underline-offset-2 hover:text-gold-soft">
                Book a free audit →
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <Contact />
    </>
  );
}
