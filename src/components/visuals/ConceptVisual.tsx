import type { ConceptVisual as ConceptVisualKind } from '../../types/content';
import { ui } from '../../data/content';
import { cn } from '../../lib/utils';

/* ---------------------------------------------------------------------------
   Concept visuals are diagrams, not screenshots.

   Nothing here renders invented interface text, numbers, or results, so a
   visitor can never mistake a schematic for real product evidence. The block
   grammar is deliberately flat and monochrome: bars stand in for content, the
   single blue block marks the one thing the concept is actually about.
   ------------------------------------------------------------------------ */

export interface ConceptVisualProps {
  readonly kind: ConceptVisualKind;
  readonly title: string;
}

function Bar({ w, className }: { readonly w: string; readonly className?: string }) {
  return <span className={cn('block h-2 rounded-full bg-ink/12', className)} style={{ width: w }} />;
}

/** A landing page structure: hero stack, then a three-up feature row. */
function LandingDiagram() {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-5 sm:gap-6 sm:p-8">
      <div className="flex flex-col items-center gap-3 pt-4 text-center">
        <Bar w="58%" className="h-2.5 bg-ink/20" />
        <Bar w="38%" />
        <span className="mt-1 h-6 w-24 rounded-full bg-accent" />
      </div>
      <div className="mt-auto grid grid-cols-3 gap-3 sm:gap-5">
        {[0, 1, 2].map((index) => (
          <div key={index} className="flex flex-col gap-2 rounded-lg border border-rule p-3">
            <span className="h-4 w-4 rounded-[5px] bg-ink/14" />
            <Bar w="82%" className="h-1.5" />
            <Bar w="60%" className="h-1.5" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** A tool structure: a rail, a list of rows, and a detail column. */
function WorkflowDiagram() {
  return (
    <div className="flex h-full w-full gap-3 p-5 sm:gap-5 sm:p-8">
      <div className="flex w-10 shrink-0 flex-col gap-2.5 sm:w-12">
        {[0, 1, 2, 3].map((index) => (
          <span
            key={index}
            className={cn(
              'h-6 w-full rounded-md',
              index === 1 ? 'bg-accent/85' : 'bg-ink/10',
            )}
          />
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={cn(
              'flex items-center gap-2.5 rounded-lg border p-2',
              index === 0 ? 'border-rule-strong bg-white' : 'border-rule',
            )}
          >
            <span className="h-4 w-4 shrink-0 rounded-[5px] bg-ink/12" />
            <Bar w={index === 0 ? '52%' : '38%'} className="h-1.5" />
            <span className="ml-auto h-2 w-8 shrink-0 rounded-full bg-ink/8" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ConceptVisual({ kind, title }: ConceptVisualProps) {
  return (
    <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-rule bg-canvas">
      <div className="absolute inset-0">
        {kind === 'landing' ? <LandingDiagram /> : <WorkflowDiagram />}
      </div>
      <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/85 px-2.5 py-1 text-micro tracking-eyebrow text-ink-secondary uppercase backdrop-blur-sm">
        {ui.visualLabel}
      </figcaption>
      <span className="sr-only">{title}</span>
    </figure>
  );
}
