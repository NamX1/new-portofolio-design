import Button, { TextAction } from '../ui/Button';
import Reveal from '../ui/Reveal';
import { hero } from '../../data/content';

export interface HeroProps {
  /** Opens the contact modal. */
  readonly onContact: () => void;
}

export default function Hero({ onContact }: HeroProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-[calc(var(--header-h)+4rem)] pb-section-md md:pt-[calc(var(--header-h)+7rem)]"
    >
      {/* Soft, slow, low-opacity ambient glow. CSS only: no canvas, no 3D,
          nothing decorative that is unrelated to the content. It fades in once
          on load and never loops, so it cannot become a distraction. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80%] animate-[glow-in_var(--duration-glow)_var(--ease-settle)_both] bg-[image:var(--glow-image)] motion-reduce:animate-none"
      />

      <div className="mx-auto w-full max-w-shell px-gutter md:px-gutter-md lg:px-gutter-lg">
        {/* The eyebrow is a single mark on this page. No other section
            carries one, so it cannot become a repeated kicker. */}
        <Reveal>
          <p className="text-label font-semibold tracking-label text-ink-tertiary uppercase">
            {hero.eyebrow}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            id="hero-heading"
            className="mt-6 max-w-[16ch] text-display font-semibold tracking-display text-balance text-ink"
          >
            {hero.headlineLead}
            <br />
            {/* The single display-italic treatment on the site. */}
            <span className="font-display italic tracking-heading text-ink-secondary">
              {hero.headlineAccent}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-prose text-lede text-ink-secondary">{hero.body}</p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Button onClick={onContact}>{hero.primaryActionLabel}</Button>
            <TextAction href={hero.secondaryActionHref}>{hero.secondaryActionLabel}</TextAction>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
