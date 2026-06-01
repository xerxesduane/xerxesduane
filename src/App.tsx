import { LazyMotion, domAnimation } from "framer-motion";
import Background from "./components/Background";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import CaseStudies from "./pages/CaseStudies";
import Insights from "./pages/Insights";
import InsightPost from "./pages/InsightPost";
import NotFound from "./pages/NotFound";
import { getServicePage } from "./data/servicePages";
import { getInsight } from "./data/insights";
import { pathToSlug } from "./lib/seo";

function Route({ path }: { path: string }) {
  const slug = pathToSlug(path);
  if (slug === "") return <Home />;
  if (slug === "case-studies") return <CaseStudies />;
  if (slug === "insights") return <Insights />;

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
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="grain relative min-h-dvh">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-deep"
        >
          Skip to content
        </a>

        <Background />
        <Nav />

        <main className="relative z-10">
          <Route path={path} />
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </LazyMotion>
  );
}
