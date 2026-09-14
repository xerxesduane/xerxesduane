import PageHeader from "../components/page/PageHeader";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

/**
 * `/contact` — the audit form and the questions people ask before sending it.
 *
 * Side by side rather than stacked: stacked they ran to 2262px, and someone
 * deciding whether to write usually wants to skim the answers first. Both
 * render compact here, which drops the standalone section padding they carry
 * when they appear on a page of their own.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQs / Contact"
        title={<>Let&rsquo;s connect the dots.</>}
        lede="Tell me what your business needs. Start with a free systems audit, or skim the common questions."
      />
      <div className="grid gap-3 board:grid-cols-[1.4fr_0.6fr]">
        <Contact compact />
        <FAQ compact />
      </div>
    </>
  );
}
