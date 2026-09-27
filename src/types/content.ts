/**
 * Shape of src/data/content.ts.
 *
 * The Ledger and Practice Map are both generated from these entries, so the
 * site gets better as real work is added rather than needing a redesign.
 * Nothing here may claim shipped work that does not exist: `status` exists so
 * that honesty is structural rather than a matter of remembering.
 */

export type SectionId =
  | 'introduction'
  | 'build'
  | 'ledger'
  | 'thinking'
  | 'philosophy'
  | 'now'
  | 'contact';

/** The three fields the whole site is organised around. */
export type Domain = 'code' | 'ai' | 'business';

export type WorkStatus = 'concept' | 'building' | 'shipped';

export interface NavItem {
  readonly id: SectionId;
  readonly label: string;
}

export interface HeroContent {
  readonly name: string;
  readonly statement: string;
  /** Small factual lines. Nothing here may be invented. */
  readonly meta: readonly { readonly label: string; readonly value: string }[];
  readonly primaryActionLabel: string;
  readonly secondaryActionLabel: string;
  readonly secondaryHref: string;
}

export interface IntroductionContent {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly portrait: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
    readonly caption: string;
  };
}

export interface CapabilityContent {
  readonly title: string;
  readonly description: string;
  /** Fields this capability draws on. Positions it on the Practice Map. */
  readonly domains: readonly Domain[];
}

export interface BuildContent {
  readonly heading: string;
  readonly intro: string;
  readonly capabilities: readonly CapabilityContent[];
  readonly mapHeading: string;
  readonly mapCaption: string;
  readonly toolsLabel: string;
  readonly tools: readonly string[];
}

/** One record in the archive. */
export interface LedgerEntry {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly status: WorkStatus;
  /** Real data: a year, a range, or "Now". */
  readonly period: string;
  readonly kind: string;
  readonly domains: readonly Domain[];
  /** Ids this entry connects to. Drawn as links on the Practice Map. */
  readonly links: readonly string[];
}

export interface LedgerContent {
  readonly heading: string;
  readonly intro: string;
  readonly entries: readonly LedgerEntry[];
  readonly footnote: string;
}

export type IdeaStatus = 'DRAFT IDEA' | 'COMING SOON';

export interface IdeaEntry {
  readonly title: string;
  readonly summary: string;
  readonly status: IdeaStatus;
}

export interface ThinkingContent {
  readonly heading: string;
  readonly entries: readonly IdeaEntry[];
}

export interface PhilosophyContent {
  readonly quote: string;
  readonly attribution: string;
}

export interface NowContent {
  readonly heading: string;
  readonly intro: string;
  /** Ids of Ledger entries that are live right now. */
  readonly activeIds: readonly string[];
  readonly closing: string;
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
  readonly tagline: string;
}

export interface UiStrings {
  readonly skipToContent: string;
  readonly navLabel: string;
  readonly openMenu: string;
  readonly closeMenu: string;
  readonly backToTop: string;
  readonly contactAction: string;
  readonly statusConcept: string;
  readonly statusBuilding: string;
  readonly statusShipped: string;
  readonly mapLabel: string;
}
