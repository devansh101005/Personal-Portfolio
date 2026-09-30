// Central site config used by the global shell + SEO.
// Profile facts (name, socials, email) live in content/profile.ts — the single
// source of truth; this file owns the canonical URL + nav and re-derives socials.
import { profile } from "@/content/profile";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE = {
  name: "Devansh",
  monogram: "Dv.",
  title: "Devansh · Full-stack Engineer",
  description:
    "Devansh is a full-stack engineer (B.Tech CSE '27) working across backend, ML and deep learning, and now getting into distributed systems. Next.js, backend, ML.",
  jobTitle: "Full-stack Engineer",
} as const;

export const NAV: { href: string; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

// Socials come from content/profile.ts. "#" placeholders are filtered out of
// JSON-LD `sameAs` (see app/layout.tsx) until real URLs are provided (§13).
export const SOCIALS = {
  email: profile.email,
  github: profile.socials.github,
  linkedin: profile.socials.linkedin,
  hashnode: profile.socials.hashnode,
} as const;

export const FOOTER_SOCIALS: { label: string; href: string }[] = [
  { label: "GitHub", href: SOCIALS.github },
  { label: "LinkedIn", href: SOCIALS.linkedin },
  { label: "Hashnode", href: SOCIALS.hashnode },
];
