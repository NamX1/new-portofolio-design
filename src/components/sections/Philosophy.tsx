import { philosophy } from '../../data/content';

/**
 * The one dark ground on the site. It earns the change by carrying the only
 * long-form statement, and it is set large enough to be felt rather than read.
 */
export default function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="bg-ink-ground py-section text-on-ink md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto w-full max-w-shell px-gutter sm:px-gutter-sm lg:px-gutter-lg">
        <p className="font-mono text-data tracking-data text-vermilion-hot uppercase">
          Philosophy
        </p>

        <h2
          id="philosophy-heading"
          className="mt-8 max-w-[24ch] text-statement font-semibold tracking-statement text-on-ink lg:mt-12"
        >
          {philosophy.quote}
        </h2>

        <p className="mt-12 border-t border-rule-ink pt-6 text-body text-on-ink-2 lg:mt-16">
          {philosophy.attribution}
        </p>
      </div>
    </section>
  );
}
