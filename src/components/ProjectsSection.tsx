import useInViewAnimation, { fadeClass } from "../hooks/useInViewAnimation";
import { CASE_STUDIES } from "../data/content";

/**
 * Reference vertical projects layout. Two clearly separated groups:
 *   1. "Interface directions" — reference visual works (not client projects)
 *   2. "Real case studies" — actual Xerxes client work from CASE_STUDIES
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
}: {
  eyebrow: string;
  name: string;
  description: string;
  image?: string;
  href?: string;
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
      className="studio-reference-page studio-reference-section w-full"
    >
      <h2 id="studio-projects-heading" className="sr-only">
        Projects
      </h2>

      <div className="mx-auto flex max-w-[1200px] flex-col gap-16 px-6 py-12 md:gap-20">
        {REFERENCE_WORKS.map((w) => (
          <ProjectItem
            key={w.name}
            eyebrow="Interface directions · reference build"
            name={w.name}
            description={w.description}
            image={w.image}
          />
        ))}

        {/* Real, delivered client work — clearly separated from the visuals above */}
        <div className="ml-20 border-t border-[color:var(--studio-line)] pt-12 md:ml-28">
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
          />
        ))}
      </div>
    </section>
  );
}
