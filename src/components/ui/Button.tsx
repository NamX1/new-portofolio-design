import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn, PRESS } from '../../lib/utils';

/* ---------------------------------------------------------------------------
   The solid action. A sharp-cornered rectangle, not a pill: this system
   separates with hairlines and lets type carry the weight, so controls stay
   plain. One solid vermilion action per view is the entire budget.
   ------------------------------------------------------------------------ */
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  readonly children: ReactNode;
  readonly className?: string;
}

const BASE_CLASSES = cn(
  'inline-flex select-none items-center justify-center',
  'min-h-11 rounded-[3px] bg-vermilion-deep px-7 py-3 text-body text-paper',
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
