import { thinking } from '../../data/content';

export default function Thinking() {
  return (
    <section
      id="thinking"
      aria-labelledby="thinking-heading"
      className="bg-white py-section md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto w-full max-w-shell px-gutter sm:px-gutter-sm lg:px-gutter-lg">
        <h2
          id="thinking-heading"
          className="max-w-2xl text-heading font-semibold tracking-tight text-ink"
        >
          {thinking.heading}
        </h2>

        <ul className="mt-14 border-t border-rule md:mt-20">
          {thinking.entries.map((entry) => (
            <li
              key={entry.title}
              className="grid gap-3 border-b border-rule py-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline md:gap-12"
            >
              <div className="max-w-prose">
                <h3 className="text-card font-semibold tracking-snug text-ink">{entry.title}</h3>
                <p className="mt-2 text-body text-ink-secondary">{entry.summary}</p>
              </div>
              <p className="text-micro font-semibold tracking-eyebrow text-ink-secondary uppercase md:justify-self-end">
                {entry.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
