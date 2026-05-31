import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Reveal from "./ui/Reveal";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";

const VALUES = [
  { title: "Honesty over upsells", body: "We'll tell you when you don't need us, even when it costs us the project." },
  { title: "Relationships over transactions", body: "Our oldest client has been with us for years. Not because of a contract, because we pick up the phone." },
  { title: "Systems over hacks", body: "No duct-tape fixes. Proper foundations, documented, so you're never locked in." },
  { title: "People over tech", body: "Every line of code serves a person trying to grow. We never forget that." },
];

export default function Founder() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-bl">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left: founder card */}
          <Reveal>
            <div className="glass border-glow rounded-3xl p-8">
              <div className="flex items-center gap-4">
                <img
                  src="/brand/founder-xerxes.jpg"
                  alt="Xerxes Magdaluyo, founder of Threshold Works"
                  width={64}
                  height={64}
                  loading="lazy"
                  className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-1 ring-gold/30"
                />
                <div>
                  <h3 className="font-display text-xl text-cream">
                    Xerxes Magdaluyo
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-gold/80">
                    Founder · Threshold Works
                  </p>
                </div>
              </div>

              <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-3 py-1.5 text-xs text-muted">
                <MapPin size={13} className="text-gold" />
                Based in Dubai · serving across borders
              </p>

              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
                <p>
                  I didn't start out as a marketer. I started as an IT kid who
                  loved figuring out why things broke, and how to fix them before
                  anyone noticed.
                </p>
                <p>
                  For six-plus years I've worked with businesses across the UAE,
                  the Philippines, and beyond, translation firms, healthcare
                  mobility, automotive platforms, schools, wellness brands, and
                  event studios. I've built e-learning platforms, integrated
                  QuickBooks with CRMs, run Meta Ads that reached 50,000+ people,
                  and supported the IT and marketing of multiple businesses at
                  once.
                </p>
                <p>
                  As an{" "}
                  <span className="font-medium text-cream-dim">
                    Odoo Systems Administrator
                  </span>
                  , I set up and support ERP and CRM systems for businesses across
                  the UAE and the Philippines, wiring inventory, sales, invoicing,
                  and customer data into one source of truth.
                </p>
                <p className="text-cream-dim">
                  I once saved a client real money just by suggesting they buy
                  Microsoft from Microsoft instead of through their reseller. That
                  wasn't in scope. They've referred me three times since.
                </p>
                <p className="font-display text-base italic text-gold">
                  A threshold is the doorstep you cross into something new. That's
                  where we meet you, and walk through with you.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right: values */}
          <div>
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-6 bg-gold/60" aria-hidden />
                What we stand for
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl">
                Built on values, <span className="text-gradient-gold">not buzzwords.</span>
              </h2>
            </Reveal>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  className="glass glass-hover rounded-2xl p-5"
                >
                  <span className="font-mono text-sm text-gold/70">
                    0{i + 1}
                  </span>
                  <h4 className="mt-2 text-lg text-cream">{v.title}</h4>
                  <p className="mt-2 text-sm text-muted">{v.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
