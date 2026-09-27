import { useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { Domain, LedgerEntry } from '../../types/content';
import { domainLabels, ui } from '../../data/content';
import { cn } from '../../lib/utils';

/* ---------------------------------------------------------------------------
   THE PRACTICE MAP — the signature visual.

   Not a product shot and not decoration: it is a plot of the actual ledger.
   Three fields, CODE / AI / BUSINESS, sit as columns. Every record is
   positioned at the mean of the fields it draws on, so an entry that spans two
   fields lands between them, and one that spans all three lands dead centre.
   The geometry is the argument: the interesting work is the overlap.

   Because the marks are generated from content, the map improves as the
   ledger does. There is nothing here to redraw by hand.
   ------------------------------------------------------------------------ */

const VIEW_W = 1200;
const VIEW_H = 540;
const COLUMN_X: Record<Domain, number> = { code: 250, ai: 600, business: 950 };
const DOMAIN_ORDER: readonly Domain[] = ['code', 'ai', 'business'];
const TOP = 150;
const BOTTOM = 500;
/** Pointer radius, in viewBox units, for claiming a mark. */
const CATCH = 105;

interface Point {
  readonly x: number;
  readonly y: number;
}

const MARK_SIZE = 11;

function layout(entries: readonly LedgerEntry[]): Map<string, Point> {
  const columns = new Map<number, LedgerEntry[]>();

  for (const entry of entries) {
    const mean =
      entry.domains.reduce((sum, domain) => sum + COLUMN_X[domain], 0) / entry.domains.length;
    const x = Math.round(mean);
    const bucket = columns.get(x);
    if (bucket === undefined) columns.set(x, [entry]);
    else bucket.push(entry);
  }

  const points = new Map<string, Point>();
  for (const [x, bucket] of columns) {
    const span = BOTTOM - TOP;
    const step = span / bucket.length;
    bucket.forEach((entry, index) => {
      points.set(entry.id, { x, y: TOP + step * (index + 0.5) });
    });
  }
  return points;
}

function curve(a: Point, b: Point): string {
  const midY = (a.y + b.y) / 2;
  return `M ${a.x} ${a.y} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
}

export default function PracticeMap({ entries }: { readonly entries: readonly LedgerEntry[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const points = useMemo(() => layout(entries), [entries]);

  const related = useMemo(() => {
    if (activeId === null) return null;
    const ids = new Set<string>([activeId]);
    for (const entry of entries) {
      if (entry.id === activeId) {
        entry.links.forEach((id) => ids.add(id));
        continue;
      }
      if (entry.links.includes(activeId)) ids.add(entry.id);
    }
    return ids;
  }, [activeId, entries]);

  const onPointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    const svg = event.currentTarget;
    const box = svg.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * VIEW_W;
    const y = ((event.clientY - box.top) / box.height) * VIEW_H;

    let nearest: string | null = null;
    let nearestDistance = CATCH;
    for (const [id, point] of points) {
      const distance = Math.hypot(point.x - x, point.y - y);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = id;
      }
    }
    if (nearest !== activeId) setActiveId(nearest);
  };

  return (
    <figure className="w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`${ui.mapLabel}: three fields, code, AI and business, with ${entries.length} records positioned by the fields they draw on. The ledger below lists the same records.`}
        className="h-auto w-full touch-none overflow-visible"
        onPointerMove={onPointerMove}
        onPointerLeave={() => setActiveId(null)}
      >
        {/* The three fields. */}
        {DOMAIN_ORDER.map((domain) => (
          <g key={domain}>
            <line
              x1={COLUMN_X[domain]}
              y1={TOP - 56}
              x2={COLUMN_X[domain]}
              y2={BOTTOM + 24}
              stroke="var(--color-rule)"
              strokeWidth="1"
            />
            <text
              x={COLUMN_X[domain]}
              y={TOP - 74}
              textAnchor="middle"
              className="fill-[var(--color-ink-3)] font-mono text-[13px] tracking-[0.01em] uppercase"
            >
              {domainLabels[domain]}
            </text>
          </g>
        ))}

        {/* Relationships. */}
        {entries.flatMap((entry) =>
          entry.links
            .filter((target) => points.has(target))
            .map((target) => {
              const from = points.get(entry.id);
              const to = points.get(target);
              if (from === undefined || to === undefined) return null;
              const lit =
                related !== null && (related.has(entry.id) || related.has(target));
              return (
                <path
                  key={`${entry.id}-${target}`}
                  d={curve(from, to)}
                  fill="none"
                  stroke={lit ? 'var(--color-vermilion)' : 'var(--color-rule)'}
                  strokeWidth={lit ? 1.5 : 1}
                  opacity={related === null ? 1 : lit ? 1 : 0.25}
                />
              );
            }),
        )}

        {/* The records. */}
        {entries.map((entry) => {
          const point = points.get(entry.id);
          if (point === undefined) return null;
          const lit = related === null || related.has(entry.id);
          const isActive = activeId === entry.id;
          const fill =
            entry.status === 'building'
              ? 'var(--color-vermilion)'
              : entry.status === 'shipped'
                ? 'var(--color-ink)'
                : 'none';

          return (
            <g
              key={entry.id}
              opacity={lit ? 1 : 0.28}
              style={{ transition: 'opacity 240ms var(--ease-settle)' }}
            >
              <line
                x1={point.x - MARK_SIZE - 8}
                y1={point.y}
                x2={point.x - MARK_SIZE - 2}
                y2={point.y}
                stroke={isActive ? 'var(--color-vermilion)' : 'var(--color-rule-strong)'}
                strokeWidth="1"
              />
              <rect
                x={point.x - MARK_SIZE / 2}
                y={point.y - MARK_SIZE / 2}
                width={MARK_SIZE}
                height={MARK_SIZE}
                fill={fill}
                stroke={fill === 'none' ? 'var(--color-ink)' : 'none'}
                strokeWidth="1.25"
                style={{
                  transform: isActive ? 'scale(1.35)' : 'scale(1)',
                  transformOrigin: `${point.x}px ${point.y}px`,
                  transition: 'transform 240ms var(--ease-settle)',
                }}
              />
              <text
                x={point.x + MARK_SIZE + 12}
                y={point.y - 6}
                className={cn(
                  'text-[17px]',
                  isActive ? 'fill-[var(--color-ink)]' : 'fill-[var(--color-ink-2)]',
                )}
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
              >
                {entry.title}
              </text>
              <text
                x={point.x + MARK_SIZE + 12}
                y={point.y + 14}
                className="fill-[var(--color-ink-3)] font-mono text-[12px]"
              >
                {entry.kind} · {entry.period}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
