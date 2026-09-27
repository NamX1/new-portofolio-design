import Reveal from '../ui/Reveal';
import { about } from '../../data/content';

export default function About() {
  const [lead, ...rest] = about.paragraphs;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-paper py-section md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto w-full max-w-shell px-gutter md:px-gutter-md lg:px-gutter-lg">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
          <Reveal>
            <h2
              id="about-heading"
              className="max-w-[18ch] text-heading font-semibold text-balance text-ink"
            >
              {about.heading}
            </h2>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.1}>
              <p className="max-w-prose text-lede text-ink">{lead}</p>
            </Reveal>
            {rest.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.2 + index * 0.1}>
                <p className="max-w-prose text-body text-ink-secondary">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <figure className="mt-16 w-full max-w-[22rem] md:mt-20">
            <img
              src={about.portrait.src}
              alt={about.portrait.alt}
              width={about.portrait.width}
              height={about.portrait.height}
              loading="lazy"
              decoding="async"
              className="w-full rounded-2xl border border-rule bg-paper-alt"
            />
            <figcaption className="mt-3 text-label text-ink-tertiary">
              {about.portrait.caption}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
