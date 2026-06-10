import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { ArrowUpRight, CalendarCheck, Mail, MapPin, MessageCircle } from "lucide-react";
import { CONTACT } from "../data/content";
import { track } from "../lib/analytics";
import Reveal from "./ui/Reveal";
import GoogleRating from "./GoogleRating";

const STEPS = [
  "We confirm your audit time on WhatsApp within a few hours.",
  "We meet for 60 minutes: call, Zoom, or in person if you prefer.",
  "Within 5 business days, you get your plain-English roadmap.",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", business: "", phone: "", note: "" });
  const [source, setSource] = useState({ page: "", referrer: "" });
  const [state, handleSubmit] = useForm(CONTACT.formspreeId);

  const update = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // Capture where the lead came from, so every enquiry is attributable.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot client-only init; intentional SSR-safe pattern
    setSource({
      page: window.location.pathname + window.location.search,
      referrer: document.referrer || "direct",
    });
  }, []);

  useEffect(() => {
    if (state.succeeded) {
      track("generate_lead", { method: "formspree", page: source.page });
    }
  }, [state.succeeded, source.page]);

  const whatsappMessage = [
    `Hi Threshold Works, I'd like to book a free audit.`,
    ``,
    `Name: ${form.name}`,
    `Business: ${form.business}`,
    `Phone: ${form.phone}`,
    form.note ? `On my mind: ${form.note}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const whatsappHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  const field =
    "w-full rounded-xl border border-cream/10 bg-ink-deep/50 px-4 py-3 text-[15px] text-cream placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40";

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-bl">
        <div className="glass border-glow grid gap-10 overflow-hidden rounded-3xl p-7 sm:p-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: pitch + contacts */}
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-gold/60" aria-hidden />
              Book your free audit
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl">
              Just curious what{" "}
              <span className="text-gradient-gold">we'd say?</span>
            </h2>
            <p className="mt-4 max-w-md text-muted">
              60 minutes, zero pressure. You walk away with a clear map of your
              systems and three quick wins you can use right away.
            </p>

            <ol className="mt-8 space-y-4">
              {STEPS.map((s, i) => (
                <li key={s} className="flex gap-3 text-sm text-cream-dim">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 font-mono text-xs text-gold">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>

            <a
              href={CONTACT.calendar}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/10 px-5 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold/15"
            >
              <CalendarCheck size={17} />
              Prefer to pick a time? Book instantly
            </a>

            <div className="mt-8 flex flex-col gap-3 text-sm">
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2.5 text-cream transition-colors hover:text-gold"
              >
                <MessageCircle size={16} className="text-gold" />
                {CONTACT.whatsappDisplay}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2.5 text-cream transition-colors hover:text-gold"
              >
                <Mail size={16} className="text-gold" />
                {CONTACT.email}
              </a>
              <span className="inline-flex items-center gap-2.5 text-muted">
                <MapPin size={16} className="text-gold" />
                {CONTACT.location}
              </span>
            </div>

            <GoogleRating className="mt-8" />
          </Reveal>

          {/* Right: form, or success state */}
          {state.succeeded ? (
            <div className="flex flex-col justify-center rounded-2xl bg-ink-deep/40 p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                <CalendarCheck size={24} />
              </div>
              <h3 className="mt-5 font-display text-2xl text-cream">
                Got it, thank you.
              </h3>
              <p className="mt-3 text-muted">
                Your request is in. We'll confirm your audit time within a few
                hours. Want to skip ahead?
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft"
              >
                <MessageCircle size={17} />
                Continue on WhatsApp now
              </a>
            </div>
          ) : (
            <m.form
              action={`https://formspree.io/f/${CONTACT.formspreeId}`}
              method="POST"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
            >
              <input type="hidden" name="_subject" value="New audit request from xerxesduane.com" />
              {/* Lead attribution: which page + referrer the enquiry came from */}
              <input type="hidden" name="page" value={source.page} />
              <input type="hidden" name="referrer" value={source.referrer} />
              {/* Honeypot: bots fill this; Formspree drops the submission. Hidden from humans + a11y tree. */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs text-muted">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={update("name")}
                  className={field}
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="business" className="mb-1.5 block text-xs text-muted">
                  Your business and what you do <span className="text-muted-dark">(optional)</span>
                </label>
                <input
                  id="business"
                  name="business"
                  value={form.business}
                  onChange={update("business")}
                  className={field}
                  placeholder="Acme Translation, Arabic/English legal docs"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-xs text-muted">
                  WhatsApp or phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={update("phone")}
                  className={field}
                  placeholder="+971 5X XXX XXXX"
                />
                <ValidationError field="phone" prefix="Phone" errors={state.errors} className="mt-1 text-xs text-gold" />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs text-muted">
                  What's the one tech thing on your mind? <span className="text-muted-dark">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={form.note}
                  onChange={update("note")}
                  className={`${field} resize-none`}
                  placeholder="Our site doesn't bring in leads and our invoicing is a mess…"
                />
              </div>
              <ValidationError errors={state.errors} className="text-xs text-gold" />
              <button
                type="submit"
                disabled={state.submitting}
                className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep shadow-[0_14px_50px_-12px_rgba(217,164,65,0.7)] transition duration-300 hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60"
              >
                {state.submitting ? "Sending…" : "Book my free audit"}
                {!state.submitting && <ArrowUpRight size={17} strokeWidth={2.5} />}
              </button>
              <p className="text-center text-xs text-muted-dark">
                We'll reply on WhatsApp within a few hours. No spam, ever.
              </p>
            </m.form>
          )}
        </div>
      </div>
    </section>
  );
}
