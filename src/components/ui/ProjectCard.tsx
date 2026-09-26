import type { ProjectContent } from '../../types/content';
import { ui } from '../../data/content';
import ConceptVisual from '../visuals/ConceptVisual';
import { cn } from '../../lib/utils';

export interface ProjectCardProps {
  readonly project: ProjectContent;
}

/**
 * A project is not a card. There is no border, no shadow, and no container:
 * the visual carries the weight and the text sits beneath it, so the section
 * never reads as a grid of boxes.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex flex-col">
      <ConceptVisual kind={project.visual} title={project.title} />

      <div className="mt-6 flex items-center gap-3">
        <span
          className={cn(
            'rounded-full px-2.5 py-1 text-micro font-semibold tracking-eyebrow uppercase',
            // A darker accent than the link blue: this label sits on its own
            // accent tint, where #006edb would fall under 4.5:1.
            project.status === 'CONCEPT'
              ? 'bg-accent/10 text-accent-hover'
              : 'bg-canvas text-ink-secondary',
          )}
        >
          {project.status}
        </span>
        <span className="text-small text-ink-secondary">{project.meta.join(' · ')}</span>
      </div>

      <h3 className="mt-4 text-card font-semibold tracking-snug text-ink">{project.title}</h3>
      <p className="mt-2 max-w-prose text-body text-ink-secondary">{project.description}</p>

      {/* Placeholder actions. A destination that does not exist yet is
          rendered disabled and says so, rather than as a dead link. */}
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        {project.actions.map((action) => (
          <span
            key={action.label}
            aria-disabled="true"
            title={ui.unavailable}
            className="inline-flex cursor-not-allowed items-center gap-1.5 text-small text-ink-secondary"
          >
            {action.label}
            <span aria-hidden="true" className="text-micro tracking-eyebrow uppercase">
              {ui.unavailable}
            </span>
          </span>
        ))}
      </div>
    </article>
  );
}
