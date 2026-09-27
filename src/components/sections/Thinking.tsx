import { thinking } from '../../data/content';

export default function Thinking() {
  return (
    <section
      id="thinking"
      aria-labelledby="thinking-heading"
      className="bg-paper py-section md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto w-full max-w-shell px-gutter sm:px-gutter-sm lg:px-gutter-lg">
        <h2
          id="thinking-heading"
          className="max-w-2xl text-statement font-semibold tracking-statement text-ink"
        >
          {thinking.heading}
        </h2>

        {/* Unpublished writing. Listed as a bibliography, not dressed as posts. */}
        <ul className="mt-14 border-t border-rule md:mt-20">
          {thinking.entries.map((entry, index) => (
            <li
              key={entry.title}
              className="grid gap-4 border-b border-rule py-8 md:grid-cols-12 md:gap-8"
            >
              <span className="font-mono text-data tracking-data text-ink-3 md:col-span-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-sub font-semibold text-ink md:col-span-5">{entry.title}</h3>
              <p className="text-body text-ink-2 md:col-span-4">{entry.summary}</p>
              <p className="font-mono text-data tracking-data text-ink-3 uppercase md:col-span-2 md:text-right">
                {entry.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
