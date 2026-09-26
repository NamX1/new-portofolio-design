import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * twMerge only knows Tailwind's stock theme. This project defines its own
 * type scale in src/index.css, so twMerge would classify a name like
 * `text-small` as a *text colour* — collide it with `text-ink`, and it
 * silently deletes the font size. Every custom size is registered here so
 * conflict resolution stays honest.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'micro',
            'small',
            'body',
            'lede',
            'card',
            'display',
            'heading',
            'statement',
          ],
        },
      ],
      tracking: [{ tracking: ['display', 'tight', 'snug', 'normal', 'eyebrow'] }],
    },
  },
});

/** Merge conditional class names, resolving conflicts last-wins. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Press feedback. Responds on pointer-down, not release: the background
 * steps darker immediately, with a whisper of scale so the target feels
 * physical. Fast enough to read as direct rather than animated.
 */
export const PRESS = 'active:scale-[0.985] motion-reduce:active:scale-100';

/**
 * Press feedback for text-style controls. A scale would shift adjacent
 * inline text, so these dim instead. Opacity is compositor-only.
 */
export const PRESS_TEXT =
  'transition-[color,background-color,opacity] duration-[var(--duration-press)] ease-apple active:opacity-60';
