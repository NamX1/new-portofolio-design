import Reveal from '../ui/Reveal';
import { capabilities } from '../../data/content';

/* Sibling stagger, within the 80-120ms band. */
const ITEM_STAGGER = 0.1;

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="bg-paper py-section md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto w-full max-w-shell px-gutter md:px-gutter-md lg:px-gutter-lg">
        <Reveal>
          <h2
            id="capabilities-heading"
            className="max-w-[20ch] text-heading font-semibold text-balance text-ink"
          >
            {capabilities.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 max-w-prose text-lede text-ink-secondary">{capabilities.intro}</p>
        </Reveal>

        {/* Outcomes, not a wall of tech badges. No icons, no tiles, and no
            numbers: there is no real sequence to number. Reveal renders the
            list item itself, so no wrapper sits between the ul and the li. */}
        <ul role="list" className="mt-14 border-t border-rule md:mt-20">
          {capabilities.capabilities.map((capability, index) => (
            <Reveal
              key={capability.title}
              as="li"
              delay={0.1 + index * ITEM_STAGGER}
              className="grid gap-3 border-b border-rule py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12"
            >
              <h3 className="text-lede font-semibold text-ink">{capability.title}</h3>
              <p className="max-w-prose text-body text-ink-secondary">
                {capability.description}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-14">
            <p className="text-label font-semibold tracking-label text-ink-tertiary uppercase">
              {capabilities.toolsLabel}
            </p>
            <ul role="list" className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-body text-ink-secondary">
              {capabilities.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
