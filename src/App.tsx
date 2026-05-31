import Background from "./components/Background";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Diagnosis from "./components/Diagnosis";
import Services from "./components/Services";
import Layers from "./components/Layers";
import Industries from "./components/Industries";
import Work from "./components/Work";
import Stats from "./components/Stats";
import Process from "./components/Process";
import WhyUs from "./components/WhyUs";
import Founder from "./components/Founder";
import Promise from "./components/Promise";
import Packages from "./components/Packages";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
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
        <Hero />
        <Marquee />
        <Diagnosis />
        <Services />
        <Layers />
        <Stats />
        <Work />
        <Industries />
        <Process />
        <WhyUs />
        <Founder />
        <Promise />
        <Packages />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
      <SpeedInsights />
    </div>
  );
}
