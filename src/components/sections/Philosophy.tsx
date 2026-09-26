import { philosophy } from '../../data/content';

/**
 * The one full-bleed black section. It earns the page's single dramatic
 * ground change by carrying the only long-form statement on the site.
 */
export default function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="bg-black py-section md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto w-full max-w-4xl px-gutter text-center sm:px-gutter-sm lg:px-gutter-lg">
        <h2
          id="philosophy-heading"
          className="text-statement font-medium tracking-tight text-balance text-ink-dark"
        >
          {philosophy.quote}
        </h2>
        <p className="mt-10 text-body text-ink-dark-secondary">
          <span className="font-semibold text-ink-dark">{philosophy.signatureName}</span>
          <span aria-hidden="true" className="px-2 text-ink-dark-tertiary">
            /
          </span>
          {philosophy.signatureMeta}
        </p>
      </div>
    </section>
  );
}
