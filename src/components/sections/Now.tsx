import { ledger, now } from '../../data/content';

export default function Now() {
  const active = ledger.entries.filter((entry) => now.activeIds.includes(entry.id));

  return (
    <section
      id="now"
      aria-labelledby="now-heading"
      className="bg-paper py-section md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto w-full max-w-shell px-gutter sm:px-gutter-sm lg:px-gutter-lg">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="font-mono text-data tracking-data text-vermilion uppercase">Now</p>
            <h2
              id="now-heading"
              className="mt-6 text-heading font-semibold tracking-heading text-ink"
            >
              {now.heading}
            </h2>
            <p className="mt-5 max-w-measure text-sub text-ink-2">{now.intro}</p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="border-t border-rule">
              {active.map((entry) => (
                <li key={entry.id} className="flex items-baseline gap-5 border-b border-rule py-5">
                  <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-vermilion" />
                  <div>
                    <p className="text-sub font-semibold text-ink">{entry.title}</p>
                    <p className="mt-1 font-mono text-data tracking-data text-ink-3 uppercase">
                      {entry.kind}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-measure text-body text-ink-2">{now.closing}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
