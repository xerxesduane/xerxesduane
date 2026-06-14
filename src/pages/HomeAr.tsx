import { m } from "framer-motion";
import { ArrowUpRight, MessageCircle, CalendarCheck, FlaskConical, ChevronDown } from "lucide-react";
import { SERVICE_PAGES_AR } from "../data/servicePagesAr";
import { CONTACT } from "../data/content";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import Reveal from "../components/ui/Reveal";

const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  "مرحبًا Xerxes، أودّ حجز تدقيق مجاني لأنظمتي.",
)}`;

const FAQ_AR = [
  {
    q: "ماذا يحدث إذا لم أستطع الوصول إليك، أو كنت مشغولًا أو مسافرًا؟",
    a: "تتعامل مع رقمٍ واحدٍ موثوق طوال الوقت، وكل نظامٍ نبنيه يكون موثّقًا بوضوح. حتى لو تأخّرت في الردّ، يبقى عملك في يدك ولا تعلق يومًا في انتظار أحد.",
  },
  {
    q: "هل أملك كل شيء فعلًا؟ الموقع والنطاق والحسابات؟",
    a: "نعم، بالكامل. النطاق والاستضافة والشيفرة البرمجية وكل الحسابات تكون باسمك أنت منذ اليوم الأول، لا باسمي. أنا أبني لك، لكن الملكية ملكك وحدك.",
  },
  {
    q: "هل التدقيق المجاني مجاني حقًا وبلا أي التزام؟",
    a: "نعم، مجاني تمامًا وبلا أي التزام. ستون دقيقةً تخرج منها بخريطة واضحة لأنظمتك وثلاثة مكاسب سريعة، سواء عملنا معًا بعدها أم لا.",
  },
  {
    q: "هل الذكاء الاصطناعي في الموقع حقيقي أم مجرد عرض؟",
    a: "حقيقي وحيّ بالكامل. يمكنك تجربته بنفسك الآن، قبل أن نتحدّث أصلًا، عبر صفحة مختبر الذكاء الاصطناعي، وسترى كيف يستجيب فعلًا.",
  },
];

export default function HomeAr() {
  return (
    <>
      <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="container-bl">
          <div className="mx-auto mb-6 flex max-w-3xl justify-center">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-cream/10 bg-cream/5 px-3 py-1.5 font-mono text-xs text-cream-dim transition-colors hover:border-gold/50 hover:text-gold"
            >
              English
            </a>
          </div>
          <m.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-3xl text-center">
            <m.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-cream/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-gold"
            >
              استوديو تقني متكامل · دبي
            </m.span>
            <m.h1 variants={fadeUp} className="mt-7 text-3xl leading-[1.4] sm:text-4xl md:text-5xl">
              أنظمة الشركات الكبرى، للأعمال الصغيرة التي لا تملك فريقًا تقنيًا.
            </m.h1>
            <m.p variants={fadeUp} className="mx-auto mt-7 max-w-2xl text-lg leading-loose text-muted">
              معظم الأعمال الصغيرة في دبي تجمع بين موقع وجداول بيانات وعدّة تطبيقات لا تتحدث مع بعضها.
              نبني المواقع والتطبيقات وأنظمة أودو والأتمتة والذكاء الاصطناعي التي تعمل معًا فعلًا،
              بصدق، تحت سقف واحد، لتتوقف عن إدارة الأدوات وتعود إلى تنمية عملك.
            </m.p>
            <m.div variants={fadeUp} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={waHref}
                target="_blank"
                rel="noopener"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft sm:w-auto"
              >
                <MessageCircle size={17} />
                احجز تدقيق أنظمتك المجاني
              </a>
              <a
                href={CONTACT.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cream/15 px-7 py-3.5 text-sm font-semibold text-cream transition duration-300 hover:border-gold/50 hover:text-gold sm:w-auto"
              >
                <CalendarCheck size={16} />
                احجز موعدًا فورًا
              </a>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 py-14 sm:py-20">
        <div className="container-bl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl">
              خدماتنا في <span className="text-gradient-gold">دبي</span>
            </h2>
          </Reveal>
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2"
          >
            {SERVICE_PAGES_AR.map((s) => (
              <m.a
                key={s.slug}
                href={`/ar/${s.slug}`}
                variants={fadeUp}
                className="glass glass-hover group flex items-center justify-between gap-3 rounded-2xl p-6"
              >
                <span>
                  <span className="font-display text-lg text-cream transition-colors group-hover:text-gold">
                    {s.navLabel}
                  </span>
                  <span className="mt-1 block font-mono text-xs uppercase tracking-wider text-muted">
                    {s.eyebrow}
                  </span>
                </span>
                <ArrowUpRight size={18} className="rtl-flip shrink-0 text-muted-dark transition-colors group-hover:text-gold" aria-hidden />
              </m.a>
            ))}
          </m.div>
        </div>
      </section>

      {/* AI Lab */}
      <section className="py-14 sm:py-20">
        <div className="container-bl">
          <Reveal>
            <div className="glass border-glow mx-auto max-w-3xl rounded-3xl p-8 text-center sm:p-12">
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-gold">
                <FlaskConical size={14} />
                مختبر الذكاء الاصطناعي
              </span>
              <h2 className="mt-5 text-2xl leading-[1.5] sm:text-3xl">
                جرّب الذكاء الاصطناعي <span className="text-gradient-gold">لا تكتفِ بالقراءة عنه.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl leading-loose text-muted">
                هذه أدوات ذكاء اصطناعي حقيقية وعاملة، من النوع الذي أبنيه لعملائي: مساعدون آليون،
                وأتمتة واتساب، وإنشاء المحتوى، وحلول ثنائية اللغة بالعربية والإنجليزية. جرّبها مباشرةً
                الآن، فهي تستجيب لك فعلًا لا في عرضٍ مسجّل.
              </p>
              <a
                href="/ai-lab"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft"
              >
                <FlaskConical size={16} />
                جرّب أكثر من ٣٠ أداة حية
                <ArrowUpRight size={15} className="rtl-flip" />
              </a>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-dark">
                بلا تسجيل · تستجيب فعلًا
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20">
        <div className="container-bl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl">
              أسئلة <span className="text-gradient-gold">شائعة</span>
            </h2>
          </Reveal>
          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3">
            {FAQ_AR.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-cream/10 bg-ink-deep/40 px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-medium text-cream [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown size={18} className="shrink-0 text-gold/70 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 leading-loose text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="scroll-mt-24 py-16 sm:py-24">
        <div className="container-bl">
          <div className="glass border-glow mx-auto max-w-2xl rounded-3xl p-8 text-center sm:p-10">
            <h2 className="text-2xl sm:text-3xl">
              مستعد للبدء؟ <span className="text-gradient-gold">احجز تدقيقك المجاني.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-muted">
              ٦٠ دقيقة، بلا ضغط. تخرج بخريطة واضحة لأنظمتك وثلاثة مكاسب سريعة يمكنك تطبيقها فورًا.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={waHref}
                target="_blank"
                rel="noopener"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft sm:w-auto"
              >
                <MessageCircle size={17} />
                {CONTACT.whatsappDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
