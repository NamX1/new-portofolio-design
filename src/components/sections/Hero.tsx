import Button from '../ui/Button';
import RuleLink from '../ui/RuleLink';
import { brand, hero } from '../../data/content';
import { cn } from '../../lib/utils';

/* ---------------------------------------------------------------------------
   Motion values. The name rises out of a mask; it is never hidden, only
   offset, so a failed or suppressed animation still leaves it legible.
   ------------------------------------------------------------------------ */
const LINE_RISE = '0.4em';
const RISE_MS = 900;
const STAGGER_MS = 110;

export interface HeroProps {
  /** Opens the contact modal. */
  readonly onContact: () => void;
}

export default function Hero({ onContact }: HeroProps) {
  const [first, ...rest] = brand.name.split(' ');
  const remainder = rest.join(' ');

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="bg-paper pt-[var(--header-h)]"
    >
      <div className="mx-auto w-full max-w-shell px-gutter sm:px-gutter-sm lg:px-gutter-lg">
        {/* The three fields, stated as data rather than as a marketing kicker. */}
        <div className="flex items-baseline justify-between border-b border-rule pt-10 pb-4 lg:pt-14">
          <p className="font-mono text-data tracking-data text-ink-3 uppercase">
            Code <span className="text-vermilion">×</span> Ai <span className="text-vermilion">×</span>{' '}
            Business
          </p>
          <p className="hidden font-mono text-data tracking-data text-ink-3 uppercase sm:block">
            Portfolio
          </p>
        </div>

        {/* The name. Oversized on purpose, and set off-axis.
            The mask is a fixed height per line so a line is never clipped at
            any viewport; the rise is a transform only. */}
        <h1 id="hero-heading" className="mt-10 font-bold tracking-display text-ink lg:mt-14">
          {[
            { text: first, indent: '', tone: 'text-ink' },
            { text: remainder, indent: 'lg:pl-[8%]', tone: 'text-ink-3' },
          ].map((line, index) => (
            <span key={line.text} className="block">
              <span
                className={`block will-change-transform ${line.indent} ${line.tone}`}
                style={{
                  // Tight but not clipped: the leading must clear the cap
                  // height plus descender of Bricolage at display size.
                  fontSize: 'clamp(3.25rem, 12.5vw, 10.5rem)',
                  lineHeight: 0.92,
                  transform: `translateY(${LINE_RISE})`,
                  animation: `hero-rise ${RISE_MS}ms var(--ease-settle) ${index * STAGGER_MS}ms forwards`,
                }}
              >
                {line.text}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-12 grid gap-10 border-t border-rule pt-10 lg:mt-20 lg:grid-cols-12 lg:gap-8 lg:pt-12">
          <p className="text-statement font-medium tracking-statement text-ink lg:col-span-7 lg:col-start-6">
            {hero.statement}
          </p>

          <div className="flex flex-wrap items-start gap-x-10 gap-y-4 lg:col-span-12 lg:mt-8">
            <Button onClick={onContact}>{hero.primaryActionLabel}</Button>
            <RuleLink href={hero.secondaryHref}>{hero.secondaryActionLabel}</RuleLink>
          </div>
        </div>

        {/* Facts, not adjectives. */}
        <dl className="mt-16 grid gap-x-8 gap-y-6 border-t border-rule pt-8 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {hero.meta.map((item) => (
            <div key={item.label} className="border-l border-rule pl-4">
              <dt className="font-mono text-data tracking-data text-ink-3 uppercase">
                {item.label}
              </dt>
              <dd className={cn('mt-1.5 text-small text-ink-2')}>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
