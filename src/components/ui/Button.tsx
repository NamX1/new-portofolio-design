import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn, PRESS } from '../../lib/utils';

/* ---------------------------------------------------------------------------
   The site's one button. Apple's pill: solid accent, light label, and press
   feedback that responds on pointer-down by stepping the fill darker with a
   whisper of scale. 100ms, no overshoot.

   Deliberately single-purpose. An earlier draft carried four variants and a
   link branch that nothing used; text-navigation actions belong to
   ChevronLink, which is the pattern Apple actually uses beside a pill.
   ------------------------------------------------------------------------ */
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  readonly children: ReactNode;
  readonly className?: string;
}

const BASE_CLASSES = cn(
  'inline-flex select-none items-center justify-center gap-2',
  'min-h-11 rounded-full bg-accent px-6 text-body text-on-accent',
  'transition-[transform,background-color] duration-[var(--duration-press)] ease-apple',
  'hover:bg-accent-hover',
  PRESS,
  'disabled:pointer-events-none disabled:opacity-45',
);

export default function Button({ children, className, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} {...rest} className={cn(BASE_CLASSES, className)}>
      {children}
    </button>
  );
}
