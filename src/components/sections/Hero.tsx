import Button from '../ui/Button';
import ChevronLink from '../ui/ChevronLink';
import SignatureObject from '../visuals/SignatureObject';
import { hero } from '../../data/content';

export interface HeroProps {
  /** Opens the contact modal. */
  readonly onContact: () => void;
}

export default function Hero({ onContact }: HeroProps) {
  return (
    <section id="top" aria-labelledby="hero-heading" className="bg-white pt-28 md:pt-36">
      {/* Centred stack, the way Apple opens a product page. */}
      <div className="mx-auto flex w-full max-w-shell flex-col items-center px-gutter text-center sm:px-gutter-sm lg:px-gutter-lg">
        <p className="text-micro font-semibold uppercase tracking-eyebrow text-ink-secondary">
          {hero.eyebrow}
        </p>

        <h1
          id="hero-heading"
          className="mt-6 text-display font-semibold tracking-display text-ink"
        >
          <span className="block">{hero.headline}</span>
          <span className="block text-ink-secondary">{hero.headlineAccent}</span>
        </h1>

        <p className="mt-7 max-w-prose text-lede text-ink-secondary">{hero.body}</p>

        <div className="mt-9 flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-6">
          <Button onClick={onContact}>{hero.primaryActionLabel}</Button>
          <ChevronLink href="#work">{hero.secondaryActionLabel}</ChevronLink>
        </div>
      </div>

      {/* The product visual runs to the edges of the page, as on apple.com. */}
      <figure className="mt-16 md:mt-24">
        <div className="mx-auto w-full max-w-[86rem] px-gutter sm:px-gutter-sm lg:px-gutter-lg">
          <SignatureObject />
        </div>
        <figcaption className="mx-auto mt-5 w-full max-w-shell px-gutter text-center text-micro tracking-eyebrow text-ink-secondary uppercase sm:px-gutter-sm lg:px-gutter-lg">
          {hero.visualCaption}
        </figcaption>
      </figure>
    </section>
  );
}
