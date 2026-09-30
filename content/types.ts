// Strong types for all site content (§9). No `any`. Pages render from this data.

export interface Profile {
  name: string;
  monogram: string;
  /** Hero positioning line (one sentence, no inflation). */
  positioning: string;
  /** Factual hero sub-line. */
  subline: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    hashnode: string;
  };
}

export interface Education {
  school: string;
  degree: string;
  classOf: string; // "2027"
  focus: string;
}

export type ExperienceStatus = "live" | "research" | "pending" | "past";

export interface Experience {
  slug: string;
  company: string;
  /** Official logo in /public/logos (taken from the org's own website). */
  logo?: string;
  /** Empty string allowed only when `pending`. */
  role: string;
  url?: string;
  period: string; // "2024 — Present"
  location: string; // "Remote · Part-time"
  status: ExperienceStatus;
  /** Short badge label; the component adds the ● for `live`. */
  badge?: string;
  /** One-line detail used on the home preview. */
  summary: string;
  /** Detailed bullets for /experience. */
  bullets: string[];
  /** Content not supplied yet — render a graceful "details coming" state (§4). */
  pending?: boolean;
}

// Projects are organized by tier/seriousness, NOT by tech domain (§5).
// Domain is shown as a tag on each card, never as a section.
export type ProjectGroup = "production" | "experiment" | "personal-tool" | "guided";
export type ProjectStatus = "live" | "built" | "in-progress";

/**
 * screenshot = UI capture (fills its frame) · figure = chart/paper figure on a
 * white plate (kept white in dark mode, like a printed plate).
 */
export type ProjectImageKind = "screenshot" | "figure";

export interface ProjectImage {
  src: string; // /public path
  alt: string;
  caption?: string;
  kind?: ProjectImageKind; // default "screenshot"
}

/** Hand-drawn SVG diagrams (components/diagrams) for projects with no UI to screenshot. */
export type DiagramId = "lockforge" | "limitron" | "vidhivault";

export interface Project {
  slug: string; // url slug, e.g. "be-educated"
  name: string;
  group: ProjectGroup;
  domainTag: string; // "Full-stack", "Distributed Systems", "GenAI", "ML Research", …
  guided?: boolean; // Group D — renders the "GUIDED BUILD" marker

  // ── short card fields (leave empty until filled) ──
  oneLiner: string; // "what it does — problem it solves"
  stack: string[]; // tech tags
  status?: ProjectStatus;
  liveUrl?: string;
  githubUrl?: string;
  image?: ProjectImage; // cover; empty => diagram or serif-initial placeholder
  diagram?: DiagramId; // used as the cover when there's no screenshot

  // ── detail-page fields (/projects/[slug]) — leave empty until filled ──
  period?: string; // "2025" / "Jan–Apr 2026"
  overview?: string; // 2–3 short paragraphs
  problem?: string; // the engineering problem
  approach?: string; // how it was solved
  architecture?: string[]; // key technical decisions
  highlights?: string[]; // punchy key wins, surfaced first on the detail page (optional)
  outcomes?: string; // what shipped / what was learned
  gallery?: ProjectImage[];
}

// ── Research (/research) ──
// "accepted" until the paper is actually out; then flip to "published" and add
// the IEEE Xplore / DOI link. Never say "published" before that.
export type PublicationStatus = "accepted" | "published";

export interface PublicationAuthor {
  name: string;
  title?: "Dr."; // only when confirmed by Devansh
  me?: boolean; // rendered bold
  equal?: boolean; // equal contribution (*)
  aff?: number[]; // 1-based indexes into Publication.affiliations
}

export interface Publication {
  slug: string; // anchor id on /research
  title: string;
  authors: PublicationAuthor[];
  affiliations?: string[]; // short institution names, numbered in order
  venue: string; // full conference name
  venueShort: string; // "IEEE ANTS 2026"
  where?: string; // "IIT Roorkee · 17–20 Dec 2026"
  status: PublicationStatus;
  myPart: string; // one or two lines, student voice
  summary?: string; // what the paper is about, plain words
  results?: string[]; // only verified numbers
  projectSlug?: string; // links to /projects/[slug] when the full story lives there
  experienceNote?: string; // e.g. "From my IIT BHU summer research internship"
  links?: { label: string; href: string }[]; // code, DOI (once published)
}

export interface StackGroup {
  category: string; // "Languages"
  items: string[];
}
