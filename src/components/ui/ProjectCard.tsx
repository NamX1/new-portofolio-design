import type { ProjectContent } from '../../types/content';
import { ui } from '../../data/content';
import { cn } from '../../lib/utils';

export interface ProjectCardProps {
  readonly project: ProjectContent;
}

/**
 * One project, shown as a large schematic rather than a fake screenshot.
 * The visual is a diagram of structure, not an imitation of a real interface,
 * so it can never be mistaken for evidence of shipped work.
 */
function ConceptVisual({ title }: { readonly title: string }) {
  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-rule bg-paper-alt"
      role="img"
      aria-label={`${ui.visualLabel} for ${title}`}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ink-tertiary" />
          <span aria-hidden="true" className="h-px flex-1 bg-rule" />
        </div>

        <div className="space-y-2.5">
          <span className="block h-2.5 w-2/5 rounded-full bg-ink-tertiary" />
          <span className="block h-2 w-4/5 rounded-full bg-ink-tertiary/50" />
          <span className="block h-2 w-3/5 rounded-full bg-ink-tertiary/50" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((index) => (
            <div key={index} className="h-14 rounded-lg border border-rule bg-paper" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isConcept = project.status === 'CONCEPT';

  return (
    <article className="flex flex-col">
      <ConceptVisual title={project.title} />

      <div className="mt-6 flex items-center gap-3">
        <span
          className={cn(
            'rounded-full px-2.5 py-1 text-label font-semibold tracking-label uppercase',
            isConcept ? 'bg-accent-wash text-accent' : 'bg-ink/8 text-ink-secondary',
          )}
        >
          {project.status}
        </span>
      </div>

      <h3 className="mt-4 text-lede font-semibold text-ink">{project.title}</h3>
      <p className="mt-2 max-w-prose text-body text-ink-secondary">{project.description}</p>

      {/* Placeholder actions. A destination that does not exist yet is
          rendered inert and says so, rather than as a dead link. */}
      <p className="mt-5 text-label text-ink-tertiary">
        Live preview and repository: {ui.unavailable}
      </p>
    </article>
  );
}
