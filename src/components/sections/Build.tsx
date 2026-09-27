import PracticeMap from '../visuals/PracticeMap';
import { build, ledger } from '../../data/content';
import { domainLabels } from '../../data/content';

export default function Build() {
  return (
    <section id="build" aria-labelledby="build-heading" className="bg-paper-deep">
      <div className="mx-auto w-full max-w-shell px-gutter py-section sm:px-gutter-sm md:py-section-md lg:px-gutter-lg lg:py-section-lg">
        <div className="grid gap-8 lg:grid-cols-12">
          <h2
            id="build-heading"
            className="text-heading font-semibold tracking-heading text-ink lg:col-span-5"
          >
            {build.heading}
          </h2>
          <p className="text-sub text-ink-2 lg:col-span-6 lg:col-start-7">{build.intro}</p>
        </div>

        {/* Outcomes, as a numbered ledger of habits rather than cards. */}
        <ol className="mt-14 border-t border-rule md:mt-20">
          {build.capabilities.map((capability, index) => (
            <li
              key={capability.title}
              className="grid gap-4 border-b border-rule py-8 md:grid-cols-12 md:gap-8"
            >
              <span className="font-mono text-data tracking-data text-vermilion md:col-span-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-heading font-semibold tracking-heading text-ink md:col-span-4">
                {capability.title}
              </h3>
              <p className="text-body text-ink-2 md:col-span-5">{capability.description}</p>
              <p className="font-mono text-data tracking-data text-ink-3 uppercase md:col-span-2 md:text-right">
                {capability.domains.map((domain) => domainLabels[domain]).join(' · ')}
              </p>
            </li>
          ))}
        </ol>

        {/* The signature visual, given a full-bleed band of its own. */}
        <div className="mt-20 border-y border-rule py-12 md:mt-28 md:py-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
            <h3 className="text-sub font-semibold text-ink">{build.mapHeading}</h3>
            <p className="max-w-measure text-small text-ink-2">{build.mapCaption}</p>
          </div>
          <div className="mt-10">
            <PracticeMap entries={ledger.entries} />
          </div>
        </div>

        <div className="mt-14 md:mt-20">
          <h3 className="font-mono text-data tracking-data text-ink-3 uppercase">
            {build.toolsLabel}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-body text-ink-2">
            {build.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
