import PageHeader from "../components/page/PageHeader";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

export default function ContactPage() {
  return <>
    <PageHeader eyebrow="FAQs / Contact" title={<>Let’s connect the dots.</>}
      lede="Tell me what your business needs. Start with a free systems audit, or read the answers to common questions below." />
    <Contact />
    <FAQ />
  </>;
}
