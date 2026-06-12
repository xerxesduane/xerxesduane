import { lazy, Suspense } from "react";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import Background from "./components/Background";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import MobileCTA from "./components/MobileCTA";
import ConsentBanner from "./components/ConsentBanner";
import SmoothScroll from "./components/fx/SmoothScroll";
import Cursor from "./components/fx/Cursor";
import Preloader from "./components/fx/Preloader";
import PageTransition from "./components/fx/PageTransition";

// Route-level code splitting: each page ships as its own chunk, so a visitor
// only downloads the JS for the route they're on. The streaming prerender
// (entry-server) resolves these before writing HTML, so SEO is unaffected.
const Home = lazy(() => import("./pages/Home"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage"));
const About = lazy(() => import("./pages/About"));
const Insights = lazy(() => import("./pages/Insights"));
const InsightPost = lazy(() => import("./pages/InsightPost"));
const ServicePageAr = lazy(() => import("./pages/ServicePageAr"));
const HomeAr = lazy(() => import("./pages/HomeAr"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() =>
  import("./pages/Legal").then((m) => ({ default: m.Privacy })),
);
const Terms = lazy(() =>
  import("./pages/Legal").then((m) => ({ default: m.Terms })),
);
const Showreel = lazy(() => import("./pages/Showreel"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Demos = lazy(() => import("./pages/Demos"));
import { getServicePage } from "./data/servicePages";
import { getServicePageAr } from "./data/servicePagesAr";
import { getInsight } from "./data/insights";
import { CASE_STUDIES } from "./data/content";
import { pathToSlug } from "./lib/seo";

/** The matching page in the other language, for the Nav toggle. */
function altLanguage(path: string): { href: string; label: string } {
  const slug = pathToSlug(path);
  if (slug === "ar") return { href: "/", label: "English" };
  if (slug.startsWith("ar/")) return { href: `/${slug.slice(3)}`, label: "English" };
  if (getServicePage(slug) && getServicePageAr(slug)) {
    return { href: `/ar/${slug}`, label: "عربي" };
  }
  return { href: "/ar", label: "عربي" };
}

function Route({ path }: { path: string }) {
  const slug = pathToSlug(path);
  if (slug === "") return <Home />;
  if (slug === "case-studies") return <CaseStudies />;
  if (slug.startsWith("case-studies/")) {
    const study = CASE_STUDIES.find((item) => item.slug === slug.slice("case-studies/".length));
    if (study) return <CaseStudyPage study={study} />;
  }
  if (slug === "about") return <About />;
  if (slug === "insights") return <Insights />;
  if (slug === "privacy") return <Privacy />;
  if (slug === "terms") return <Terms />;
  if (slug === "showreel") return <Showreel />;
  if (slug === "portfolio") return <Portfolio />;
  if (slug === "ai-lab" || slug === "demos") return <Demos />;
  if (slug === "ar") return <HomeAr />;

  // Arabic service pages: /ar/<service-slug>
  if (slug.startsWith("ar/")) {
    const arPage = getServicePageAr(slug.slice("ar/".length));
    if (arPage) return <ServicePageAr page={arPage} />;
  }

  if (slug.startsWith("insights/")) {
    const post = getInsight(slug.slice("insights/".length));
    if (post) return <InsightPost post={post} />;
  }

  const page = getServicePage(slug);
  if (page) return <ServicePage page={page} />;

  // Unknown path: render a real 404 (Vercel serves this as 404.html).
  return <NotFound />;
}

export default function App({ path = "/" }: { path?: string }) {
  const slug = pathToSlug(path);
  const isArabic = slug === "ar" || slug.startsWith("ar/");
  const lang = altLanguage(path);
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
      <div className="grain relative min-h-dvh" dir={isArabic ? "rtl" : "ltr"} lang={isArabic ? "ar" : "en"}>
        <a
          href="#top"
          data-lenis-ignore
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-deep"
        >
          Skip to content
        </a>

        <SmoothScroll />
        <Cursor />
        <Preloader />
        <PageTransition />

        <Background />
        <Nav langHref={lang.href} langLabel={lang.label} locale={isArabic ? "ar" : "en"} />

        <main className="relative z-10">
          <Suspense fallback={null}>
            <Route path={path} />
          </Suspense>
        </main>

        <Footer locale={isArabic ? "ar" : "en"} />
        {/* mobile bar height, so the footer is never hidden behind it */}
        <div className="h-16 md:hidden" aria-hidden />
        <WhatsAppButton locale={isArabic ? "ar" : "en"} />
        <MobileCTA locale={isArabic ? "ar" : "en"} />
        <ConsentBanner />
      </div>
      </MotionConfig>
    </LazyMotion>
  );
}
