import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

/* ---------------------------------------------------------------------------
   Motion signature 2 of 2: scroll-triggered reveal.

   Critically damped spring, no bounce. transform + opacity only, so nothing
   here can trigger layout. Under reduced motion we go straight to the visible
   end state rather than animating a shorter distance.
   ------------------------------------------------------------------------ */
const REVEAL_SPRING = { type: 'spring', bounce: 0, duration: 0.6 } as const;
const HIDDEN = { opacity: 0, y: 24 };
const VISIBLE = { opacity: 1, y: 0 };
const VIEWPORT = { once: true, margin: '-10% 0px' } as const;

export interface RevealProps {
  readonly children: ReactNode;
  /** Seconds to wait before revealing. Used to stagger siblings. */
  readonly delay?: number;
  readonly className?: string;
  /**
   * Render the motion wrapper as this element instead of a div. Required when
   * the child is a list item, because a div between <ul> and <li> breaks the
   * list structure for assistive technology.
   */
  readonly as?: 'div' | 'li';
}

export default function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const shared = { className };

  if (reduceMotion === true) {
    return as === 'li' ? <li {...shared}>{children}</li> : <div {...shared}>{children}</div>;
  }

  const transition = delay === 0 ? REVEAL_SPRING : { ...REVEAL_SPRING, delay };

  if (as === 'li') {
    return (
      <motion.li
        className={className}
        initial={HIDDEN}
        whileInView={VISIBLE}
        viewport={VIEWPORT}
        transition={transition}
      >
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div
      className={className}
      initial={HIDDEN}
      whileInView={VISIBLE}
      viewport={VIEWPORT}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
