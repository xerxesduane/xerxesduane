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

function Strip({
  items,
  useLogos,
  ariaHidden,
}: {
  items: { name: string; src: string }[];
  useLogos: boolean;
  ariaHidden?: boolean;
}) {
  return (
    <ul className="flex items-center gap-12 pr-12" aria-hidden={ariaHidden || undefined}>
      {items.map((item, i) =>
        useLogos ? (
          <li key={`${item.name}-${i}`} className="flex h-10 shrink-0 items-center">
            <img
              src={item.src}
              alt={ariaHidden ? "" : item.name}
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
  );
}

export default function Marquee() {
  // Once real client logos are added to src/data/trust.ts (files in
  // /public/brand/clients/), the strip shows logos; until then, client names.
  const useLogos = TRUST.logos.length > 0;
  const items = useLogos ? TRUST.logos : CLIENTS.map((name) => ({ name, src: "" }));

  return (
    <section
      className={`border-y ${useLogos ? "border-ink/10 bg-[#E8E1D2] py-6" : "border-cream/5 bg-ink-deep/40 py-7"}`}
      aria-label="Trusted by"
    >
      <p
        className={`container-bl mb-6 text-center font-mono text-xs uppercase tracking-[0.22em] ${
          useLogos ? "text-ink/70" : "text-muted-dark"
        }`}
      >
        Quietly trusted from Dubai to New Zealand
      </p>
      <div className="mask-fade-x overflow-hidden">
        {/* duplicate strip (aria-hidden) so the -50% translate loops seamlessly;
            pauses on hover and freezes at rest under reduced motion */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]">
          <Strip items={items} useLogos={useLogos} />
          <Strip items={items} useLogos={useLogos} ariaHidden />
        </div>
      </div>
    </section>
  );
}
