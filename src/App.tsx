import Background from "./components/Background";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import { getServicePage } from "./data/servicePages";
import { pathToSlug } from "./lib/seo";

function Route({ path }: { path: string }) {
  const slug = pathToSlug(path);
  if (slug === "") return <Home />;

  const page = getServicePage(slug);
  if (page) return <ServicePage page={page} />;

  // Unknown path: fall back to home content.
  return <Home />;
}

export default function App({ path = "/" }: { path?: string }) {
  return (
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
  );
}
