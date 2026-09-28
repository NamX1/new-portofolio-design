import { createContext, createElement, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { navItems } from '../data/content';
import type { SectionId } from '../types/content';

/* ---------------------------------------------------------------------------
   Tuning. Named here rather than inlined at the call site.
   ------------------------------------------------------------------------ */

/** Shrinks the observation root to a band across the reading line. */
const OBSERVER_OPTIONS: IntersectionObserverInit = {
  rootMargin: '-28% 0px -48% 0px',
  threshold: [0, 0.25, 0.5, 0.75, 1],
};

/** Short window that keeps the choice stable when two sections share the band. */
const SORT_WINDOW_MS = 120;

/** Viewport fraction used to attribute a section when nothing intersects. */
const FALLBACK_LINE = 0.45;

interface ActiveSectionValue {
  readonly activeId: SectionId | null;
}

const ActiveSectionContext = createContext<ActiveSectionValue | null>(null);

/** Nav order, as section ids. */
const SECTION_IDS: readonly SectionId[] = navItems.map((item) => item.id);

/**
 * Provides the currently-read section to every consumer, from one observer.
 * The context exists so the header island and the expanded link list share
 * one observer rather than each attaching their own.
 */
export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const activeId = useActiveSection(SECTION_IDS);
  const value = useMemo<ActiveSectionValue>(() => ({ activeId }), [activeId]);

  // createElement keeps this module JSX-free so it can stay a .ts file.
  return createElement(ActiveSectionContext.Provider, { value }, children);
}

/** Read the section currently being read. Throws outside the provider. */
export function useActiveSectionId(): SectionId | null {
  const context = useContext(ActiveSectionContext);
  if (context === null) {
    throw new Error('useActiveSectionId must be used inside <ActiveSectionProvider>.');
  }
  return context.activeId;
}

/**
 * Tracks which of the given sections is being read, by intersection ratio so
 * a short section cannot steal the highlight from a long one it overlaps.
 * Returns null above the first section, which is the honest answer.
 */
export function useActiveSection(ids: readonly SectionId[]): SectionId | null {
  const [activeId, setActiveId] = useState<SectionId | null>(null);
  const ratios = useRef(new Map<SectionId, number>());
  const sortTimer = useRef<number | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId;
          ratios.current.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        if (sortTimer.current !== null) window.clearTimeout(sortTimer.current);
        sortTimer.current = window.setTimeout(() => {
          sortTimer.current = null;
          setActiveId(pickActive(ratios.current, ids));
        }, SORT_WINDOW_MS);
      },
      OBSERVER_OPTIONS,
    );

    for (const element of elements) observer.observe(element);
    setActiveId(pickActive(ratios.current, ids));

    return () => {
      observer.disconnect();
      if (sortTimer.current !== null) window.clearTimeout(sortTimer.current);
    };
  }, [ids]);

  return activeId;
}

function pickActive(ratios: Map<SectionId, number>, ids: readonly SectionId[]): SectionId | null {
  let best: SectionId | null = null;
  let bestRatio = 0;

  for (const id of ids) {
    const ratio = ratios.get(id) ?? 0;
    if (ratio > bestRatio) {
      bestRatio = ratio;
      best = id;
    }
  }

  if (best !== null) return best;

  // Nothing intersects the band: attribute to the last section already past
  // the reading line. Above the first section nothing is active.
  const line = window.innerHeight * FALLBACK_LINE;
  let candidate: SectionId | null = null;

  for (const id of ids) {
    const element = document.getElementById(id);
    if (element !== null && element.getBoundingClientRect().top <= line) candidate = id;
  }

  return candidate;
}
