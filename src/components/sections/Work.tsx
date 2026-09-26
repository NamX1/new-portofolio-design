import ProjectCard from '../ui/ProjectCard';
import { work } from '../../data/content';

export default function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-white py-section md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto w-full max-w-shell px-gutter sm:px-gutter-sm lg:px-gutter-lg">
        <div className="max-w-2xl">
          <h2 id="work-heading" className="text-heading font-semibold tracking-tight text-ink">
            {work.heading}
          </h2>
          <p className="mt-5 text-lede text-ink-secondary">{work.subheading}</p>
        </div>

        <div className="mt-14 grid gap-16 md:mt-20 md:grid-cols-2 md:gap-10 lg:gap-14">
          {work.projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <p className="mt-16 max-w-prose border-t border-rule pt-6 text-small text-ink-secondary">
          {work.footnote}
        </p>
      </div>
    </section>
  );
}
