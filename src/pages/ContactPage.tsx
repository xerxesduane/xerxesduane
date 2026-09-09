import { ArrowLeft } from "lucide-react";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import PageHeader from "../components/page/PageHeader";
import { GhostAction } from "../components/page/PageActions";

/**
 * `/contact` — the FAQ and the audit form, previously stacked under the
 * homepage bento. Split out so the dashboard home fits one viewport.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQs & Contact"
        title={<>Questions first, then a plan.</>}
        lede="The honest answers to what people usually ask, and a free systems audit when you're ready."
        actions={
          <GhostAction href="/" icon={<ArrowLeft size={15} strokeWidth={2.2} aria-hidden />}>
            Home
          </GhostAction>
        }
      />
      <FAQ />
      <Contact />
    </>
  );
}
