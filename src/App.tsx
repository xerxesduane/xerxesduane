import { LazyMotion, domAnimation } from "framer-motion";
import Background from "./components/Background";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import CaseStudies from "./pages/CaseStudies";
import About from "./pages/About";
import Insights from "./pages/Insights";
import InsightPost from "./pages/InsightPost";
import ServicePageAr from "./pages/ServicePageAr";
import HomeAr from "./pages/HomeAr";
import NotFound from "./pages/NotFound";
import { Privacy, Terms } from "./pages/Legal";
import ConsentBanner from "./components/ConsentBanner";
import { getServicePage } from "./data/servicePages";
import { getServicePageAr } from "./data/servicePagesAr";
import { getInsight } from "./data/insights";
import { pathToSlug } from "./lib/seo";

/** The matching page in the other language, for the Nav toggle. */
function altLanguage(path: string): { href: string; label: string } {
  const slug = pathToSlug(path);
  if (slug === "ar") return { href: "/", label: "English" };
  if (slug.startsWith("ar/")) return { href: `/${slug.slice(3)}`, label: "English" };
  if (getServicePage(slug)) return { href: `/ar/${slug}`, label: "عربي" };
  return { href: "/ar", label: "عربي" };
}

function Route({ path }: { path: string }) {
  const slug = pathToSlug(path);
  if (slug === "") return <Home />;
  if (slug === "case-studies") return <CaseStudies />;
  if (slug === "about") return <About />;
  if (slug === "insights") return <Insights />;
  if (slug === "privacy") return <Privacy />;
  if (slug === "terms") return <Terms />;
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
      <div className="grain relative min-h-dvh" dir={isArabic ? "rtl" : "ltr"} lang={isArabic ? "ar" : "en"}>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-deep"
        >
          Skip to content
        </a>

        <Background />
        <Nav langHref={lang.href} langLabel={lang.label} locale={isArabic ? "ar" : "en"} />

        <main className="relative z-10">
          <Route path={path} />
        </main>

        <Footer locale={isArabic ? "ar" : "en"} />
        <WhatsAppButton locale={isArabic ? "ar" : "en"} />
        <ConsentBanner />
      </div>
    </LazyMotion>
  );
}
