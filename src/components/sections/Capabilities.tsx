import { capabilities } from '../../data/content';

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="bg-canvas py-section md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto w-full max-w-shell px-gutter sm:px-gutter-sm lg:px-gutter-lg">
        <div className="max-w-2xl">
          <h2
            id="capabilities-heading"
            className="text-heading font-semibold tracking-tight text-ink"
          >
            {capabilities.heading}
          </h2>
          <p className="mt-5 text-lede text-ink-secondary">{capabilities.intro}</p>
        </div>

        {/* Outcome first. No icons, no tiles, no numbering. */}
        <ul className="mt-14 grid gap-x-12 gap-y-10 md:mt-20 md:grid-cols-3">
          {capabilities.capabilities.map((capability) => (
            <li key={capability.title}>
              <h3 className="text-card font-semibold tracking-snug text-ink">
                {capability.title}
              </h3>
              <p className="mt-2 text-body text-ink-secondary">{capability.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 border-t border-rule pt-8">
          <h3 className="text-micro font-semibold tracking-eyebrow text-ink-secondary uppercase">
            {capabilities.toolsLabel}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2 text-body text-ink-secondary">
            {capabilities.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
