import ProjectCard from '../ui/ProjectCard';
import Reveal from '../ui/Reveal';
import { work } from '../../data/content';

/* Sibling stagger. Within the 80–120ms band the brief asks for. */
const CARD_STAGGER = 0.1;

export default function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-paper-alt py-section md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto w-full max-w-shell px-gutter md:px-gutter-md lg:px-gutter-lg">
        <Reveal>
          <h2 id="work-heading" className="max-w-[20ch] text-heading font-semibold text-balance text-ink">
            {work.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 max-w-prose text-lede text-ink-secondary">{work.subheading}</p>
        </Reveal>

        <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-2 md:gap-10">
          {work.projects.map((project, index) => (
            <Reveal key={project.title} delay={0.1 + index * CARD_STAGGER}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-16 max-w-prose border-t border-rule pt-6 text-label text-ink-secondary">
            {work.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
