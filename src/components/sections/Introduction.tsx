import { introduction } from '../../data/content';

export default function Introduction() {
  const [lead, ...rest] = introduction.paragraphs;

  return (
    <section
      id="introduction"
      aria-labelledby="introduction-heading"
      className="bg-paper py-section md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto w-full max-w-shell px-gutter sm:px-gutter-sm lg:px-gutter-lg">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* The heading sits in the margin, not above a centred column. */}
          <h2
            id="introduction-heading"
            className="text-heading font-semibold tracking-heading text-ink lg:col-span-4"
          >
            {introduction.heading}
          </h2>

          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-sub text-ink">{lead}</p>
            <div className="mt-7 space-y-6 text-body text-ink-2">
              {rest.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <figure className="lg:col-span-3 lg:col-start-10 lg:row-start-1">
            <div className="relative">
              <img
                src={introduction.portrait.src}
                alt={introduction.portrait.alt}
                width={introduction.portrait.width}
                height={introduction.portrait.height}
                loading="lazy"
                decoding="async"
                className="w-full border border-rule bg-paper-deep"
              />
              <figcaption className="mt-3 font-mono text-data tracking-data text-ink-3 uppercase">
                {introduction.portrait.caption}
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
