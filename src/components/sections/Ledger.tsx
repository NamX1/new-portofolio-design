import type { LedgerEntry, WorkStatus } from '../../types/content';
import { domainLabels, ledger, ui } from '../../data/content';
import { cn } from '../../lib/utils';

/* A status mark shared with the Practice Map, so the legend is consistent. */
const MARK: Record<WorkStatus, string> = {
  concept: 'border border-ink bg-transparent',
  building: 'border border-vermilion bg-vermilion',
  shipped: 'border border-ink bg-ink',
};

const STATUS_LABEL: Record<WorkStatus, string> = {
  concept: ui.statusConcept,
  building: ui.statusBuilding,
  shipped: ui.statusShipped,
};

function Entry({ entry }: { readonly entry: LedgerEntry }) {
  return (
    <li className="grid gap-4 border-b border-rule py-9 md:grid-cols-12 md:gap-8">
      {/* Real data, in mono, in the margin. */}
      <p className="font-mono text-data tracking-data text-ink-3 uppercase md:col-span-2">
        {entry.period}
      </p>

      <div className="md:col-span-6">
        <h3 className="text-heading font-semibold tracking-heading text-ink">{entry.title}</h3>
        <p className="mt-3 max-w-measure text-body text-ink-2">{entry.summary}</p>
      </div>

      <dl className="flex flex-wrap items-baseline gap-x-8 gap-y-2 md:col-span-4 md:flex-col md:items-end md:gap-1.5 md:text-right">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className={cn('h-2 w-2 shrink-0', MARK[entry.status])} />
          <dt className="sr-only">Status</dt>
          <dd className="text-small text-ink">{STATUS_LABEL[entry.status]}</dd>
        </div>
        <div>
          <dt className="sr-only">Kind</dt>
          <dd className="font-mono text-data tracking-data text-ink-3 uppercase">
            {entry.kind}
          </dd>
        </div>
        <div>
          <dt className="sr-only">Fields</dt>
          <dd className="font-mono text-data tracking-data text-ink-3 uppercase">
            {entry.domains.map((domain) => domainLabels[domain]).join(' / ')}
          </dd>
        </div>
      </dl>
    </li>
  );
}

export default function Ledger() {
  return (
    <section
      id="ledger"
      aria-labelledby="ledger-heading"
      className="bg-paper py-section md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto w-full max-w-shell px-gutter sm:px-gutter-sm lg:px-gutter-lg">
        <div className="grid gap-8 lg:grid-cols-12">
          <h2
            id="ledger-heading"
            className="text-heading font-semibold tracking-heading text-ink lg:col-span-5"
          >
            {ledger.heading}
          </h2>
          <p className="text-sub text-ink-2 lg:col-span-6 lg:col-start-7">{ledger.intro}</p>
        </div>

        <ol className="mt-14 border-t border-rule md:mt-20">
          {ledger.entries.map((entry) => (
            <Entry key={entry.id} entry={entry} />
          ))}
        </ol>

        <p className="mt-10 max-w-measure text-small text-ink-3">{ledger.footnote}</p>
      </div>
    </section>
  );
}
