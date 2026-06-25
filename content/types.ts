// Strong types for all site content (§9). No `any`. Pages render from this data.

export interface Profile {
  name: string;
  monogram: string;
  /** Hero positioning line (one sentence, no inflation). */
  positioning: string;
  /** Factual hero sub-line. */
  subline: string;
  email: string;
  /** Hometown (§6: Pratapgarh, Uttar Pradesh — nowhere else). */
  location: string;
  /** Availability line for the About ID card. */
  openTo: string;
  socials: {
    github: string;
    twitter: string;
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
  image?: string; // /public path; empty => placeholder

  // ── detail-page fields (/projects/[slug]) — leave empty until filled ──
  period?: string; // "2025" / "Jan–Apr 2026"
  overview?: string; // 2–3 short paragraphs
  problem?: string; // the engineering problem
  approach?: string; // how it was solved
  architecture?: string[]; // key technical decisions
  outcomes?: string; // what shipped / what was learned
  gallery?: string[]; // /public image paths
}

export interface StackGroup {
  category: string; // "Languages"
  items: string[];
}
