import type { FeaturedResult } from "../../data/homeBento";

/**
 * One measured outcome, attributed to the case study it came from.
 *
 * Shared by the desktop bento card and the phone's stacked list so the two can
 * never quote different numbers for the same project.
 */
export default function ResultCard({
  result,
  statCount = 2,
}: {
  result: FeaturedResult;
  statCount?: number;
}) {
  return (
    <a
      href={`/case-studies/${result.slug}`}
      className="group/result flex h-full flex-col rounded-xl border border-line bg-panel-alt p-3.5 transition duration-300 ease-smooth hover:-translate-y-[3px] hover:border-accent/45 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-panel"
    >
      <p className="text-[0.9rem] font-bold leading-tight text-fg transition-colors group-hover/result:text-accent-deep">
        {result.client}
      </p>
      <p className="mt-0.5 text-[0.72rem] text-fg-faint">
        {result.category} · {result.location}
      </p>
      <dl className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-2">
        {result.stats.slice(0, statCount).map((stat) => (
          <div key={stat.label}>
            <dd className="font-display text-[1.35rem] font-extrabold leading-none tracking-tight text-accent-deep">
              {stat.value}
            </dd>
            <dt className="mt-1 text-[0.7rem] leading-tight text-fg-soft">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </a>
  );
}
