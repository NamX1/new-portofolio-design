/**
 * Interfaces describing the shape of src/data/content.ts.
 *
 * Section ids are fixed by the site structure and must match the DOM ids the
 * scroll-spy observes.
 */

export type SectionId = 'about' | 'work' | 'capabilities' | 'thinking' | 'philosophy' | 'contact';

export interface NavItem {
  /** Also the DOM id of the section. */
  readonly id: SectionId;
  readonly label: string;
}

export interface BrandContent {
  readonly name: string;
  readonly tagline: string;
}

export interface UiStrings {
  readonly skipToContent: string;
  readonly navLabel: string;
  readonly openMenu: string;
  readonly closeMenu: string;
  readonly contactAction: string;
  readonly backToTop: string;
  readonly unavailable: string;
  readonly visualLabel: string;
}

export interface HeroContent {
  readonly eyebrow: string;
  /** First line of the headline. */
  readonly headlineLead: string;
  /** Second line. Carries the one display-italic treatment on the site. */
  readonly headlineAccent: string;
  readonly body: string;
  readonly primaryActionLabel: string;
  readonly secondaryActionLabel: string;
  /** Anchor the secondary action targets. */
  readonly secondaryActionHref: string;
}

export interface PortraitContent {
  readonly src: string;
  readonly alt: string;
  /** Intrinsic size, declared so the image can never shift layout. */
  readonly width: number;
  readonly height: number;
  readonly caption: string;
}

export interface AboutContent {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly portrait: PortraitContent;
}

export type ProjectStatus = 'CONCEPT' | 'IN PROGRESS';

export interface ProjectContent {
  readonly title: string;
  readonly description: string;
  readonly status: ProjectStatus;
}

export interface WorkContent {
  readonly heading: string;
  readonly subheading: string;
  readonly projects: readonly ProjectContent[];
  readonly footnote: string;
}

export interface CapabilityContent {
  readonly title: string;
  readonly description: string;
}

export interface CapabilitiesContent {
  readonly heading: string;
  readonly intro: string;
  readonly capabilities: readonly CapabilityContent[];
  readonly toolsLabel: string;
  readonly tools: readonly string[];
}

export type DraftStatus = 'DRAFT IDEA' | 'COMING SOON';

export interface ThinkingEntry {
  readonly title: string;
  readonly summary: string;
  readonly status: DraftStatus;
}

export interface ThinkingContent {
  readonly heading: string;
  readonly entries: readonly ThinkingEntry[];
}

export interface PhilosophyContent {
  readonly quote: string;
  readonly signatureName: string;
  readonly signatureMeta: string;
}

export interface ContactContent {
  readonly heading: string;
  readonly line: string;
  readonly actionLabel: string;
}

export interface ContactModalContent {
  readonly title: string;
  readonly body: string;
  readonly closeLabel: string;
}

export interface FooterColumn {
  readonly heading: string;
  readonly links: readonly { readonly label: string; readonly href: string }[];
}

export interface FooterContent {
  readonly columns: readonly FooterColumn[];
  readonly legal: string;
}
