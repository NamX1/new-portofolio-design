import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowDownIcon } from '@phosphor-icons/react';
import { cn, PRESS, PRESS_TEXT } from '../../lib/utils';

/* ---------------------------------------------------------------------------
   Two shapes, one job each.

   The pill is the solid action and nothing else competes with it. It carries
   no mark: an icon beside the label would only repeat what the label already
   says, and the pill is the loudest thing on the page without one. The text
   action is the quiet alternative and it scrolls the page, so its arrow points
   down, which is the one place an icon earns its place.

   Neither inflates and neither bounces. Press feedback is a fill step plus a
   0.97 scale over 100ms, which reads as direct rather than animated.
   ------------------------------------------------------------------------ */
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  readonly children: ReactNode;
  readonly className?: string;
}

const PILL_CLASSES = cn(
  'inline-flex select-none items-center justify-center',
  'min-h-11 rounded-full bg-ink px-7 text-body text-paper',
  'hover:bg-ink-secondary',
  PRESS,
  'disabled:pointer-events-none disabled:opacity-45',
);

export default function Button({ children, className, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} {...rest} className={cn(PILL_CLASSES, className)}>
      {children}
    </button>
  );
}

export interface TextActionProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  readonly children: ReactNode;
  readonly className?: string;
}

const TEXT_CLASSES = cn(
  'group inline-flex min-h-11 items-center gap-1.5 text-body text-accent',
  PRESS_TEXT,
);

/**
 * The quiet secondary action. It scrolls down the page, so the affordance
 * points down: the arrow nudges 2px on hover, transform only, at the snap
 * duration, and does not move at all under reduced motion.
 */
export function TextAction({ children, className, ...rest }: TextActionProps) {
  return (
    <a {...rest} className={cn(TEXT_CLASSES, className)}>
      {children}
      <ArrowDownIcon
        aria-hidden="true"
        className="shrink-0 transition-transform duration-[var(--duration-snap)] ease-[var(--ease-settle)] group-hover:translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
      />
    </a>
  );
}
