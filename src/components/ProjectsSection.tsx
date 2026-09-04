import useInViewAnimation, { fadeClass } from "../hooks/useInViewAnimation";
import { CASE_STUDIES } from "../data/content";

/**
 * Vertical projects layout. Two clearly separated groups, delivered work FIRST:
 *   1. "Real case studies" — actual delivered work from CASE_STUDIES
 *   2. "Interface directions" — reference visuals the studio can build toward,
 *      explicitly not client projects
 *
 * Delivered work leads because it is the only group that proves anything. The
 * reference visuals used to sit on top, which meant a visitor's first
 * impression of "the work" was material that isn't the studio's own.
 */

const REFERENCE_WORKS = [
  {
    name: "evr",
    description: "From idea to millions raised for a web3 AI product",
    image: "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  },
  {
    name: "Automation Machines",
    description: "Streamlining industrial automation processes",
    image: "https://motionsites.ai/assets/hero-automation-machines-preview-DlTveRIN.gif",
  },
  {
    name: "xPortfolio",
    description: "Modern portfolio management platform",
    image: "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  },
];

function ProjectItem({
  eyebrow,
  name,
  description,
  image,
  href,
  cta,
}: {
  eyebrow: string;
  name: string;
  description: string;
  image?: string;
  href?: string;
  cta?: string;
}) {
  const { ref, inView } = useInViewAnimation<HTMLDivElement>();
  return (
    <div ref={ref} className={fadeClass(inView)}>
      <div className="ml-20 md:ml-28">
        <p className="font-studio-pixel mb-2 text-xs uppercase text-[color:var(--studio-muted)]">
          {eyebrow}
        </p>
        <h3 className="font-studio-serif text-3xl text-[color:var(--studio-gold)] md:text-4xl">
          {href ? (
            <a href={href} className="transition-opacity hover:opacity-70">
              {name}
            </a>
          ) : (
            name
          )}
        </h3>
        <p className="font-studio-body mt-2 max-w-xl text-sm text-[color:var(--studio-cream-dim)] md:text-base">
          {description}
        </p>
        {href && cta && (
          <a
            href={href}
            className="font-studio-pixel mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[color:var(--studio-gold)] transition-opacity hover:opacity-70"
          >
            {cta}
            <span aria-hidden>&rarr;</span>
          </a>
        )}
      </div>
      {image && (
        <img
          src={image}
          alt={`${name} — interface preview`}
          loading="lazy"
          className="mt-6 aspect-video w-full rounded-2xl object-cover shadow-lg"
        />
      )}
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="work"
      aria-labelledby="studio-projects-heading"
      className="studio-reference-page studio-reference-section w-full scroll-mt-24"
    >
      <h2 id="studio-projects-heading" className="sr-only">
        Projects
      </h2>

      <div className="mx-auto flex max-w-[1200px] flex-col gap-16 px-6 py-12 md:gap-20">
        {/* Delivered work first — the only group that proves anything. */}
        <div className="ml-20 md:ml-28">
          <p className="font-studio-pixel text-xs uppercase text-[color:var(--studio-muted)]">
            Real case studies · delivered work
          </p>
        </div>
        {CASE_STUDIES.map((cs) => (
          <ProjectItem
            key={cs.slug}
            eyebrow={`${cs.category} · ${cs.location}`}
            name={cs.client}
            description={cs.takeaway}
            href={`/case-studies/${cs.slug}`}
            cta="Read the case study"
          />
        ))}

        {/* Reference visuals — clearly labelled as directions, not client work */}
        <div className="ml-20 border-t border-[color:var(--studio-line)] pt-12 md:ml-28">
          <p className="font-studio-pixel text-xs uppercase text-[color:var(--studio-muted)]">
            Interface directions · reference builds, not client work
          </p>
        </div>
        {REFERENCE_WORKS.map((w) => (
          <ProjectItem
            key={w.name}
            eyebrow="Interface direction · reference build"
            name={w.name}
            description={w.description}
            image={w.image}
          />
        ))}
      </div>
    </section>
  );
}
