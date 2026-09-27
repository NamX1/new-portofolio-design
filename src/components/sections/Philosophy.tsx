import Reveal from '../ui/Reveal';
import { philosophy } from '../../data/content';

/**
 * The one dark section, and the second of the two timothyronald.id moments.
 * A large editorial pull-quote: oversized quotation mark in the accent, a
 * generous leading, and a small signature line underneath.
 */
export default function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="bg-night py-section text-ink-night md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto w-full max-w-shell px-gutter md:px-gutter-md lg:px-gutter-lg">
        <Reveal>
          <figure className="mx-auto max-w-4xl">
            <span
              aria-hidden="true"
              className="block font-display text-[5rem] leading-[0.6] text-accent-night select-none"
            >
              &ldquo;
            </span>

            <blockquote className="mt-2">
              <h2
                id="philosophy-heading"
                className="text-quote font-medium text-balance text-ink-night"
              >
                {philosophy.quote}
              </h2>
            </blockquote>

            <figcaption className="mt-10 flex items-center gap-3 text-label text-ink-night-secondary">
              <span aria-hidden="true" className="h-px w-8 bg-rule-night" />
              <span className="font-semibold text-ink-night">{philosophy.signatureName}</span>
              <span aria-hidden="true">/</span>
              <span>{philosophy.signatureMeta}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
