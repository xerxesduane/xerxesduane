import Reveal from "./ui/Reveal";

export default function Diagnosis() {
  return (
    <section className="py-24 sm:py-32" aria-label="The problem we solve">
      <div className="container-bl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">The diagnosis</span>
          <p className="mt-6 font-display text-3xl leading-snug text-cream sm:text-4xl md:text-[2.75rem]">
            Most small businesses in Dubai don't fail from{" "}
            <span className="text-muted-dark line-through decoration-gold/40">
              bad marketing
            </span>
            . They fail from{" "}
            <span className="text-gradient-gold">broken systems.</span>
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-prose text-center">
          <p className="text-lg text-muted">
            Your website doesn't talk to your CRM. Your CRM doesn't talk to your
            invoicing. Your ads spend money on people who'll never convert. And
            you're paying for software you don't fully use.
          </p>
          <p className="mt-5 text-lg text-cream-dim">
            You don't need more tools. You need someone to look at the whole
            picture, fix what's quietly costing you, and build the parts that are
            missing, calmly, honestly, in plain language.
          </p>
          <p className="mt-6 font-display text-xl italic text-gold">
            That's what Threshold Works is for.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
