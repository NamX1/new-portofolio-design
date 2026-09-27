import Reveal from '../ui/Reveal';
import { thinking } from '../../data/content';

/* Sibling stagger, within the 80-120ms band. */
const ITEM_STAGGER = 0.1;

export default function Thinking() {
  return (
    <section
      id="thinking"
      aria-labelledby="thinking-heading"
      className="bg-paper-alt py-section md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto w-full max-w-shell px-gutter md:px-gutter-md lg:px-gutter-lg">
        <Reveal>
          <h2
            id="thinking-heading"
            className="max-w-[18ch] text-heading font-semibold text-balance text-ink"
          >
            {thinking.heading}
          </h2>
        </Reveal>

        {/* Unpublished writing, listed as a bibliography rather than dressed
            up as posts. Nothing here claims to be published. Reveal renders
            the list item itself so no wrapper breaks the list structure. */}
        <ul role="list" className="mt-14 border-t border-rule md:mt-20">
          {thinking.entries.map((entry, index) => (
            <Reveal
              key={entry.title}
              as="li"
              delay={0.1 + index * ITEM_STAGGER}
              className="grid gap-3 border-b border-rule py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] md:items-baseline md:gap-12"
            >
              <h3 className="text-lede font-semibold text-ink">{entry.title}</h3>
              <p className="max-w-prose text-body text-ink-secondary">{entry.summary}</p>
              <p className="text-label font-semibold tracking-label text-ink-tertiary uppercase md:justify-self-end">
                {entry.status}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
