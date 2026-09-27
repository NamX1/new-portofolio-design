import type {
  BrandContent,
  BuildContent,
  CapabilityContent,
  ContactContent,
  ContactModalContent,
  Domain,
  FooterContent,
  HeroContent,
  IdeaEntry,
  IntroductionContent,
  LedgerContent,
  LedgerEntry,
  NavItem,
  NowContent,
  PhilosophyContent,
  ThinkingContent,
  UiStrings,
} from '../types/content';

/* ---------------------------------------------------------------------------
   Copy is written to be specific and human. No superlatives, no
   "passionate developer", no invented employers, clients, or results.
   Where a fact is not known it is left out rather than filled in.
   ------------------------------------------------------------------------ */

export const brand: BrandContent = {
  name: 'Kevin Charlie',
  tagline: 'Building what should exist.',
};

export const ui: UiStrings = {
  skipToContent: 'Skip to content',
  navLabel: 'Primary',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  backToTop: 'Back to top',
  contactAction: 'Contact Me',
  statusConcept: 'Concept',
  statusBuilding: 'In progress',
  statusShipped: 'Shipped',
  mapLabel: 'Practice map',
};

export const navItems: readonly NavItem[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'build', label: 'What I Build' },
  { id: 'ledger', label: 'Ledger' },
  { id: 'thinking', label: 'Thinking' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'now', label: 'Now' },
];

export const hero: HeroContent = {
  name: 'Kevin Charlie',
  statement: 'I turn half-formed ideas into things that are actually useful.',
  meta: [
    { label: 'Builds', value: 'Interfaces, tools, systems' },
    { label: 'Works across', value: 'Code, AI, business' },
    { label: 'Practice', value: 'Find the real problem, then build it' },
    { label: 'Status', value: 'Building, in public' },
  ],
  primaryActionLabel: 'Contact Me',
  secondaryActionLabel: 'Read the ledger',
  secondaryHref: '#ledger',
};

export const introduction: IntroductionContent = {
  heading: 'A builder, working out loud.',
  paragraphs: [
    'Most of what I build starts as a disagreement. Someone describes a problem, and the description is wrong in a way nobody has noticed yet. Getting to the version that is actually true is most of the work.',
    'I am interested in the seam where code, AI, and business meet, because that is where most ideas quietly fail. Code without a decision about what to build produces the wrong thing, efficiently. I want to be the person who makes the decision first.',
    'This site is a record rather than a pitch. What is here is what exists; what is coming is marked as coming.',
  ],
  portrait: {
    src: '/portrait-placeholder.svg',
    alt: 'Portrait placeholder',
    width: 800,
    height: 1000,
    caption: 'Portrait pending',
  },
};

/* Outcomes first. Domains position each one on the Practice Map. */
const capabilities: readonly CapabilityContent[] = [
  {
    title: 'Make it tangible',
    description:
      'Turn something argued about in the abstract into something you can click, use, and be wrong about.',
    domains: ['code', 'business'],
  },
  {
    title: 'Find the leverage',
    description:
      'Locate the one change that moves the outcome, instead of the ten that make it look like effort.',
    domains: ['ai', 'business'],
  },
  {
    title: 'Join the disciplines',
    description:
      'Code, AI, and commercial judgement are not three skills. Used together they are one way of seeing.',
    domains: ['code', 'ai', 'business'],
  },
];

export const build: BuildContent = {
  heading: 'What I build.',
  intro:
    'Three habits, and the technologies underneath them. The habits are the part that is hard to copy.',
  capabilities,
  mapHeading: 'Where the work sits.',
  mapCaption:
    'Each mark is something I have actually built or am building. Lines are the relationships between them. The map is drawn from the ledger below, so it changes as the work does.',
  toolsLabel: 'Underneath',
  tools: [
    'Python',
    'TypeScript',
    'Node.js',
    'Automation',
    'AI-assisted development',
    'Problem solving',
  ],
};

/* ---------------------------------------------------------------------------
   The archive. Status is explicit so the record cannot overstate itself.
   Nothing is marked shipped, because nothing has shipped yet.
   ------------------------------------------------------------------------ */
const ledgerEntries: readonly LedgerEntry[] = [
  {
    id: 'landing-system',
    title: 'Business Landing Page System',
    summary:
      'A flexible direction for turning a business idea into a clear, useful first impression, without rebuilding it from nothing each time.',
    status: 'concept',
    period: '2026',
    kind: 'Direction',
    domains: ['code', 'business'],
    links: ['internal-tool'],
  },
  {
    id: 'internal-tool',
    title: 'Internal Tool',
    summary:
      'An exploration of simpler workflows, clearer information, and less repetitive work. Currently the most concrete thing in progress.',
    status: 'building',
    period: 'Now',
    kind: 'Tool',
    domains: ['code', 'ai'],
    links: ['landing-system', 'automation'],
  },
  {
    id: 'automation',
    title: 'Repetitive Work, Removed',
    summary:
      'Auditing my own week for the parts that do not need a human, then removing them properly rather than half-way.',
    status: 'building',
    period: '2026',
    kind: 'Experiment',
    domains: ['ai', 'business'],
    links: ['internal-tool'],
  },
];

export const ledger: LedgerContent = {
  heading: 'The ledger.',
  intro:
    'A running record of what I have built and what is in progress. It grows as the work does.',
  entries: ledgerEntries,
  footnote:
    'Concept visuals are illustrative. Nothing here is presented as client work, and nothing is marked shipped until it is.',
};

const ideaEntries: readonly IdeaEntry[] = [
  {
    title: 'Why most AI features feel like demos',
    summary:
      'Interfaces that demonstrate a model instead of removing a task. What it actually takes to make the capability disappear into the product.',
    status: 'DRAFT IDEA',
  },
  {
    title: 'Automation worth the maintenance',
    summary:
      'Not every repeated process should be automated. Where the effort genuinely pays back, and where it quietly does not.',
    status: 'COMING SOON',
  },
  {
    title: 'The quiet cost of a growing codebase',
    summary:
      'Small structural decisions compound. What is worth fixing early, and what can wait until it hurts.',
    status: 'COMING SOON',
  },
];

export const thinking: ThinkingContent = {
  heading: 'How I think, in writing.',
  entries: ideaEntries,
};

export const philosophy: PhilosophyContent = {
  quote:
    'Good work begins with good questions. The goal is not to build more. It is to build what creates value, holds up over time, and should exist in the first place.',
  attribution: 'Kevin Charlie',
};

export const now: NowContent = {
  heading: 'Now.',
  intro: 'What has my attention at the moment, and what comes out of it.',
  activeIds: ['internal-tool', 'automation'],
  closing:
    'If any of this is the kind of problem you are sitting with, I would like to hear about it.',
};

export const contact: ContactContent = {
  heading: 'Have something worth building?',
  line: 'Tell me what is broken, or what is missing. That is usually enough to start.',
  actionLabel: 'Contact Me',
};

export const contactModal: ContactModalContent = {
  title: 'Contact details coming soon',
  body: 'Direct contact details are not published yet. They will be added here as soon as they are ready.',
  closeLabel: 'Close',
};

export const footer: FooterContent = {
  columns: [
    {
      heading: 'The record',
      links: [
        { label: 'Introduction', href: '#introduction' },
        { label: 'What I build', href: '#build' },
        { label: 'Ledger', href: '#ledger' },
      ],
    },
    {
      heading: 'Thinking',
      links: [
        { label: 'Writing', href: '#thinking' },
        { label: 'Philosophy', href: '#philosophy' },
        { label: 'Now', href: '#now' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  ],
  legal: 'A working record. Concept work is labelled; nothing is claimed as shipped until it is.',
  copyright: 'Kevin Charlie',
};

export const domainLabels: Record<Domain, string> = {
  code: 'Code',
  ai: 'AI',
  business: 'Business',
};
