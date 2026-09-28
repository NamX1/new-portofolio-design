import Reveal from '../ui/Reveal';
import BrandIcon from '../ui/BrandIcon';
import { siGit, siGo, siNextdotjs, siNodedotjs, siPython, siTailwindcss, siTypescript } from 'simple-icons';
import { capabilities } from '../../data/content';
import type { SimpleIcon } from 'simple-icons';

/* Sibling stagger, within the 80-120ms band. */
const ITEM_STAGGER = 0.1;

/**
 * Every entry in capabilities.tools is a real, named technology with an
 * official mark, so the map is total. A missing key is a data bug, not a
 * fallback, which is why the lookup below is exhaustive rather than optional.
 *
 * The fill is the mark's own brand colour, except where that colour is too
 * light to read against paper. Three of them are: Go, Node.js, and Tailwind
 * CSS measure 2.46, 2.96, and 2.26:1 on #f6f7f9, all under the 3:1 that WCAG
 * 1.4.11 wants from a meaningful graphic. Each is darkened here in OKLCH to
 * the lightest value that clears 3:1, holding hue and chroma fixed, so the
 * mark still reads as itself — #00ADD8 becomes #009AC4, not a grey. The text
 * label always carries the name, so the mark is reinforcement either way.
 */
const TOOL_LOGOS: Readonly<Record<string, SimpleIcon>> = {
  Python: siPython,
  TypeScript: siTypescript,
  Go: siGo,
  'Next.js': siNextdotjs,
  'Node.js': siNodedotjs,
  'Tailwind CSS': siTailwindcss,
  Git: siGit,
};

/** The marks that needed darkening to clear 3:1 on paper, and by how much. */
const DARKENED: Readonly<Record<string, string>> = {
  Go: '009AC4',
  'Node.js': '5D9D4C',
  'Tailwind CSS': '009BB9',
};

function ToolLabel({ tool }: { readonly tool: string }) {
  const logo = TOOL_LOGOS[tool];
  const darkened = DARKENED[tool];

  // Passed only when there is something to override, so an exact-optional
  // prop never receives an explicit undefined.
  const fillProps = darkened === undefined ? {} : { fill: `#${darkened}` };

  return (
    <li className="inline-flex items-center gap-2">
      {/* The text label is always present, so the mark is decorative and
          never the only carrier of the name. */}
      {logo !== undefined && <BrandIcon icon={logo} {...fillProps} />}
      <span>{tool}</span>
    </li>
  );
}

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="bg-paper py-section md:py-section-md lg:py-section-lg"
    >
      <div className="mx-auto w-full max-w-shell px-gutter md:px-gutter-md lg:px-gutter-lg">
        <Reveal>
          <h2
            id="capabilities-heading"
            className="max-w-[20ch] text-heading font-semibold text-balance text-ink"
          >
            {capabilities.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 max-w-prose text-lede text-ink-secondary">{capabilities.intro}</p>
        </Reveal>

        {/* Outcomes, not a wall of tech badges. No icons, no tiles, and no
            numbers: there is no real sequence to number. Reveal renders the
            list item itself, so no wrapper sits between the ul and the li. */}
        <ul role="list" className="mt-14 border-t border-rule md:mt-20">
          {capabilities.capabilities.map((capability, index) => (
            <Reveal
              key={capability.title}
              as="li"
              delay={0.1 + index * ITEM_STAGGER}
              className="grid gap-3 border-b border-rule py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12"
            >
              <h3 className="text-lede font-semibold text-ink">{capability.title}</h3>
              <p className="max-w-prose text-body text-ink-secondary">
                {capability.description}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-14">
            <p className="text-label font-semibold tracking-label text-ink-tertiary uppercase">
              {capabilities.toolsLabel}
            </p>
            <ul role="list" className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-body text-ink-secondary">
              {capabilities.tools.map((tool) => (
                <ToolLabel key={tool} tool={tool} />
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
