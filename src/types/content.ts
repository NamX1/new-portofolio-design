/**
 * Shape of src/data/content.ts. Every string on the page is described here.
 */

export type SectionId =
  | 'about'
  | 'work'
  | 'capabilities'
  | 'thinking'
  | 'philosophy'
  | 'contact';

export interface NavItem {
  /** Section id — also the DOM id and the scroll-spy key. */
  readonly id: SectionId;
  readonly label: string;
}

export interface HeroContent {
  readonly eyebrow: string;
  readonly headline: string;
  /** Second line of the headline, set as its own display line. */
  readonly headlineAccent: string;
  readonly body: string;
  readonly primaryActionLabel: string;
  readonly secondaryActionLabel: string;
  /** Caption for the product visual under the hero. */
  readonly visualCaption: string;
}

export interface PortraitContent {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  /** Honest label, so the placeholder is never mistaken for a real photo. */
  readonly placeholderLabel: string;
}

export interface AboutContent {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly portrait: PortraitContent;
}

export type ProjectStatus = 'CONCEPT' | 'IN PROGRESS';

/** Which schematic the concept visual draws. */
export type ConceptVisual = 'landing' | 'workflow';

export interface ProjectAction {
  readonly label: string;
  /**
   * Placeholder actions carry no destination and are rendered disabled.
   * Real actions would carry an href.
   */
  readonly href?: string;
  readonly available: boolean;
}

export interface ProjectContent {
  readonly title: string;
  readonly description: string;
  readonly status: ProjectStatus;
  readonly visual: ConceptVisual;
  /** Short factual metadata. Never a metric. */
  readonly meta: readonly string[];
  readonly actions: readonly ProjectAction[];
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
  readonly copyright: string;
}

export interface BrandContent {
  readonly name: string;
  readonly short: string;
}

export interface UiStrings {
  readonly skipToContent: string;
  readonly navLabel: string;
  readonly openMenu: string;
  readonly closeMenu: string;
  readonly backToTop: string;
  readonly contactAction: string;
  readonly unavailable: string;
  readonly visualLabel: string;
}
