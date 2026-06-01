import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Diagnosis from "../components/Diagnosis";
import Services from "../components/Services";
import Layers from "../components/Layers";
import Industries from "../components/Industries";
import Work from "../components/Work";
import Testimonials from "../components/Testimonials";
import Clients from "../components/Clients";
import Stats from "../components/Stats";
import Process from "../components/Process";
import WhyUs from "../components/WhyUs";
import Founder from "../components/Founder";
import Promise from "../components/Promise";
import Packages from "../components/Packages";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Diagnosis />
      <Services />
      <Layers />
      <Stats />
      <Work />
      <Testimonials />
      <Clients />
      <Industries />
      <Process />
      <WhyUs />
      <Founder />
      <Promise />
      <Packages />
      <FAQ />
      <Contact />
    </>
  );
}
