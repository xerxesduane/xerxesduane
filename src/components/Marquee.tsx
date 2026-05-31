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
  // duplicate the list so the -50% translate loops seamlessly
  const row = [...CLIENTS, ...CLIENTS];

  return (
    <section className="border-y border-cream/5 bg-ink-deep/40 py-7" aria-label="Trusted by">
      <p className="container-bl mb-5 text-center font-mono text-xs uppercase tracking-[0.22em] text-muted-dark">
        Quietly trusted from Dubai to New Zealand
      </p>
      <div className="mask-fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-12 pr-12">
          {row.map((name, i) => (
            <li
              key={`${name}-${i}`}
              className="whitespace-nowrap font-display text-xl text-cream-dim/45 transition-colors hover:text-gold/80"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
