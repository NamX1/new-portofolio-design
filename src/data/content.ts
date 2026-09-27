import type {
  AboutContent,
  BrandContent,
  CapabilitiesContent,
  ContactContent,
  ContactModalContent,
  FooterColumn,
  FooterContent,
  HeroContent,
  NavItem,
  PhilosophyContent,
  ProjectContent,
  ThinkingContent,
  ThinkingEntry,
  UiStrings,
  WorkContent,
} from '../types/content';

/* ---------------------------------------------------------------------------
   Every user-visible string on the site. Nothing is hardcoded in JSX.

   The portfolio, contact, and concept copy is fixed by the brief and is
   reproduced exactly. Three slots were specified by shape rather than by
   text — the contact line, the two capability one-liners, and the three
   thinking entries — and are written here in the same plain, non-marketing
   register as the rest.
   ------------------------------------------------------------------------ */

export const brand: BrandContent = {
  name: 'Kevin Charlie',
  tagline: 'Building What Should Exist.',
};

export const ui: UiStrings = {
  skipToContent: 'Skip to content',
  navLabel: 'Primary',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  contactAction: 'Contact Me',
  backToTop: 'Back to top',
  unavailable: 'Not available yet',
  visualLabel: 'Concept visual',
};

export const navItems: readonly NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'thinking', label: 'Thinking' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'contact', label: 'Contact' },
];

export const hero: HeroContent = {
  eyebrow: 'CODE × AI × BUSINESS',
  headlineLead: 'Building What',
  headlineAccent: 'Should Exist.',
  body: 'I turn ideas into useful things, bringing code, AI, and business thinking together to solve the right problems.',
  primaryActionLabel: 'Contact Me',
  secondaryActionLabel: 'Explore Work',
  secondaryActionHref: '#work',
};

export const about: AboutContent = {
  heading: 'Curious by nature. Intentional by design.',
  paragraphs: [
    "I'm Kevin Charlie, a builder interested in the space where code, AI, and business meet.",
    'I care about understanding the real problem, making thoughtful decisions, and creating things that are genuinely useful. The best ideas deserve more than just execution. They deserve clarity, care, and a reason to exist.',
  ],
  portrait: {
    src: '/portrait-placeholder.svg',
    alt: 'Portrait placeholder',
    width: 800,
    height: 1000,
    caption: 'Portrait to come',
  },
};

const projects: readonly ProjectContent[] = [
  {
    title: 'Business Landing Page System',
    description:
      'A flexible direction for turning a business idea into a clear, useful digital first impression.',
    status: 'CONCEPT',
  },
  {
    title: 'Internal Tool',
    description: 'An exploration of simpler workflows, clearer information, and less repetitive work.',
    status: 'IN PROGRESS',
  },
];

export const work: WorkContent = {
  heading: 'Selected work, in progress.',
  subheading: 'Early concepts, shown honestly as ideas rather than finished client work.',
  projects,
  footnote:
    'Concept visuals are illustrative. Live previews and repositories will be linked when available.',
};

export const capabilities: CapabilitiesContent = {
  heading: 'From the right question to the right thing.',
  intro: 'The tools matter. What matters more is knowing what to build, why it matters, and how to make it work.',
  capabilities: [
    {
      title: 'Make ideas tangible',
      description: 'Turn something argued about in the abstract into something you can see, use, and react to.',
    },
    {
      title: 'Find the leverage',
      description: 'Find the smallest change that moves the result further than the obvious one.',
    },
    {
      title: 'Connect the dots',
      description: 'Link problems that look unrelated into a single, workable shape.',
    },
  ],
  toolsLabel: 'Tools',
  tools: [
    'Python',
    'TypeScript',
    'Node.js',
    'Automation',
    'AI-assisted development',
    'Problem solving',
  ],
};

const thinkingEntries: readonly ThinkingEntry[] = [
  {
    title: 'Why most AI features feel like demos',
    summary:
      'Interfaces that show off a model instead of removing a task, and what it takes to make the capability disappear into the product.',
    status: 'DRAFT IDEA',
  },
  {
    title: 'Automation worth the maintenance',
    summary:
      'Not every repeated process should be automated. A closer look at where the effort actually pays back.',
    status: 'COMING SOON',
  },
  {
    title: 'The quiet cost of a growing codebase',
    summary:
      'How small structural decisions compound, and what is worth fixing early rather than later.',
    status: 'COMING SOON',
  },
];

export const thinking: ThinkingContent = {
  heading: 'Ideas worth exploring.',
  entries: thinkingEntries,
};

export const philosophy: PhilosophyContent = {
  quote:
    "Good work begins with good questions. The goal is not to build more. It's to build what creates value, holds up over time, and should exist in the first place.",
  signatureName: 'Kevin Charlie',
  signatureMeta: 'Build with intention',
};

export const contact: ContactContent = {
  heading: 'Have something worth building?',
  line: 'Tell me what is broken, or what is missing. That is usually enough to start.',
  actionLabel: 'Contact Me',
};

export const contactModal: ContactModalContent = {
  title: 'Contact details coming soon',
  body: "Direct contact details aren't published yet. They'll be added here as soon as they're ready.",
  closeLabel: 'Close',
};

const footerColumns: readonly FooterColumn[] = [
  {
    heading: 'Sections',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Work', href: '#work' },
      { label: 'Capabilities', href: '#capabilities' },
    ],
  },
  {
    heading: 'More',
    links: [
      { label: 'Thinking', href: '#thinking' },
      { label: 'Philosophy', href: '#philosophy' },
      { label: 'Contact', href: '#contact' },
    ],
  },
];

export const footer: FooterContent = {
  columns: footerColumns,
  legal: 'This site is a prototype. Concept work is labelled as such.',
};
