import { useState, type FormEvent } from "react";
import { m } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { CONTACT } from "../data/content";
import { track } from "../lib/analytics";
import Reveal from "./ui/Reveal";

const STEPS = [
  "We confirm your audit time on WhatsApp within a few hours.",
  "We meet for 60 minutes: call, Zoom, or in person if you prefer.",
  "Within 5 business days, you get your plain-English roadmap.",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", business: "", phone: "", note: "" });

  const update = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = [
      `Hi Threshold Works, I'd like to book a free audit.`,
      ``,
      `Name: ${form.name}`,
      `Business: ${form.business}`,
      `Phone: ${form.phone}`,
      form.note ? `On my mind: ${form.note}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    track("generate_lead", { method: "whatsapp_form", location: window.location.pathname });
    window.open(
      `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener",
    );
  };

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
              60 minutes. No sales pitch. No commitment. Just clarity about what's
              working, what's wasted, and what to fix first.
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
          </Reveal>

          {/* Right: form */}
          <m.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs text-muted">
                Your name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={update("name")}
                className={field}
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label htmlFor="business" className="mb-1.5 block text-xs text-muted">
                Your business and what you do
              </label>
              <input
                id="business"
                required
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
                type="tel"
                required
                value={form.phone}
                onChange={update("phone")}
                className={field}
                placeholder="+971 5X XXX XXXX"
              />
            </div>
            <div>
              <label htmlFor="note" className="mb-1.5 block text-xs text-muted">
                What's the one tech thing on your mind? <span className="text-muted-dark">(optional)</span>
              </label>
              <textarea
                id="note"
                rows={3}
                value={form.note}
                onChange={update("note")}
                className={`${field} resize-none`}
                placeholder="Our site doesn't bring in leads and our invoicing is a mess…"
              />
            </div>
            <button
              type="submit"
              className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep shadow-[0_14px_50px_-12px_rgba(217,164,65,0.7)] transition duration-300 hover:bg-gold-soft"
            >
              Book my free audit
              <ArrowUpRight size={17} strokeWidth={2.5} />
            </button>
            <p className="text-center text-xs text-muted-dark">
              Opens WhatsApp with your details, review before sending.
            </p>
          </m.form>
        </div>
      </div>
    </section>
  );
}
