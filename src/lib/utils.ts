import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * twMerge only knows Tailwind's stock theme. This project defines its own
 * type scale in src/index.css, so an unregistered name like `text-quote` would
 * be read as a text *colour* and silently deleted when it collided with one.
 * Registering the real scale keeps conflict resolution honest.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['label', 'body', 'lede', 'heading', 'display', 'quote'] }],
      tracking: [{ tracking: ['display', 'heading', 'body', 'label'] }],
    },
  },
});

/** Merge conditional class names, resolving conflicts last-wins. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Press feedback. Responds on pointer-down, not release: the fill steps
 * darker on contact, with a small scale. 100ms, critically damped, no bounce.
 */
export const PRESS =
  'transition-[transform,background-color,border-color] duration-[var(--duration-press)] ease-[var(--ease-instant)] active:scale-[0.97] motion-reduce:active:scale-100';

/**
 * Press feedback for text controls. Opacity only, so it never shifts type and
 * never reflows the line box.
 */
export const PRESS_TEXT =
  'transition-[color,background-color,opacity] duration-[var(--duration-press)] ease-[var(--ease-instant)] active:opacity-65';
