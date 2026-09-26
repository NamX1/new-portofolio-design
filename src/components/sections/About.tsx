import { about } from '../../data/content';

export default function About() {
  const [lead, ...rest] = about.paragraphs;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-canvas py-section md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto grid w-full max-w-shell items-center gap-12 px-gutter sm:px-gutter-sm lg:grid-cols-2 lg:gap-20 lg:px-gutter-lg">
        <div className="max-w-prose">
          <h2 id="about-heading" className="text-heading font-semibold tracking-tight text-ink">
            {about.heading}
          </h2>
          <div className="mt-6 space-y-5 text-body text-ink-secondary">
            {lead !== undefined && <p className="text-ink">{lead}</p>}
            {rest.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
          <img
            src={about.portrait.src}
            alt={about.portrait.alt}
            width={about.portrait.width}
            height={about.portrait.height}
            loading="lazy"
            decoding="async"
            className="w-full rounded-2xl border border-rule"
          />
          <figcaption className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/85 px-3 py-1 text-micro tracking-eyebrow whitespace-nowrap text-ink-secondary uppercase backdrop-blur-sm">
            {about.portrait.placeholderLabel}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
