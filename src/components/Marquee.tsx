import { TRUST } from "../data/trust";

const CLIENTS = [
  "Gilani Mobility",
  "We Aspire",
  "Caronic",
  "AYA Home Spa",
  "Keystone Events",
  "Wellington Cash for Cars",
  "Al Mumtaz Kitchen Equipment",
  "Blocktec",
];

export default function Marquee() {
  // Once real client logos are added to src/data/trust.ts (files in
  // /public/brand/clients/), the strip shows logos; until then, client names.
  const useLogos = TRUST.logos.length > 0;
  const items = useLogos ? TRUST.logos : CLIENTS.map((name) => ({ name, src: "" }));
  // duplicate the list so the -50% translate loops seamlessly
  const row = [...items, ...items];

  return (
    <section
      className={`border-y py-7 ${useLogos ? "border-ink/10 bg-cream" : "border-cream/5 bg-ink-deep/40"}`}
      aria-label="Trusted by"
    >
      <p
        className={`container-bl mb-6 text-center font-mono text-xs uppercase tracking-[0.22em] ${
          useLogos ? "text-ink/45" : "text-muted-dark"
        }`}
      >
        Quietly trusted from Dubai to New Zealand
      </p>
      <div className="mask-fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-12 pr-12">
          {row.map((item, i) =>
            useLogos ? (
              <li key={`${item.name}-${i}`} className="flex h-10 shrink-0 items-center">
                <img
                  src={item.src}
                  alt={item.name}
                  height={36}
                  loading="lazy"
                  className="max-h-9 w-auto object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
                />
              </li>
            ) : (
              <li
                key={`${item.name}-${i}`}
                className="shrink-0 whitespace-nowrap font-display text-xl text-cream-dim/45 transition-colors hover:text-gold/80"
              >
                {item.name}
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
