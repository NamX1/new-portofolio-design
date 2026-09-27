import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn, PRESS, PRESS_TEXT } from '../../lib/utils';

/* ---------------------------------------------------------------------------
   Two shapes, one job each.

   The pill is the solid action: the primary CTA, and nothing else competes
   with it. The text action sits beside it for secondary moves. Neither
   inflates, and neither bounces — press feedback is a fill step plus a 0.97
   scale over 100ms, which reads as direct rather than animated.
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

/** A quiet secondary action: an arrow that advances on hover. */
export function TextAction({ children, className, ...rest }: TextActionProps) {
  return (
    <a {...rest} className={cn(TEXT_CLASSES, className)}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 14 10"
        className="h-2.5 w-3.5 shrink-0 transition-transform duration-[var(--duration-snap)] ease-[var(--ease-settle)] group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        fill="none"
      >
        <path
          d="M1 5h11M8.5 1.5 12 5l-3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
