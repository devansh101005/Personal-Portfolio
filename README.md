# Devansh — Portfolio

Personal portfolio + personal-brand site for **Devansh** (B.Tech CSE '27, Shiv Nadar University). Editorial / print-magazine aesthetic, light-mode-first with a dark toggle, one terracotta accent. Built to (1) convince a recruiter this is production-grade engineering and (2) share cleanly on Twitter/X.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS 3 · deployed on Vercel. Every route is statically prerendered.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (do NOT run while `npm run dev` is live — it corrupts .next)
npm run start      # serve the production build
```

Requires Node 18.18+.

> If you ever hit a `Cannot find module './xxx.js'` runtime error in dev, it's a stale `.next`. Stop the dev server, delete `.next`, and `npm run dev` again.

---

## Where to edit content

All real content is typed data under [`/content`](./content) — change data, not components.

| File | What's in it |
|------|--------------|
| `content/profile.ts` | Name, tagline, sub-line, **email**, location, socials |
| `content/experience.ts` | The 3 roles (Be Educated / IIT BHU / ImpactBridge) |
| `content/projects.ts` | All projects (two groups) + detail-page fields |
| `content/education.ts` | School, degree, class of, focus |
| `content/stack.ts` | The categorized tech stack |
| `content/types.ts` | The TypeScript shapes (don't loosen these) |

### Add a project

Append one object to the `projects` array in [`content/projects.ts`](./content/projects.ts):

```ts
{
  slug: "my-project",            // becomes /projects/my-project
  name: "My Project",
  group: "production",           // "production" | "learning"
  period: "2025",
  featured: true,                // show on the home "Featured Projects" preview (optional)
  oneLiner: "What it does — and the problem it solves, on one line.",
  whatItDoes: "...",             // detail page: Overview
  problemSolved: "...",          // detail page: Problem
  approach: "...",               // detail page: Approach (optional)
  architecture: ["...", "..."],  // detail page: bullets (optional)
  outcomes: ["..."],             // detail page: bullets (optional)
  stack: ["Next.js", "Redis"],
  github: "https://github.com/...",  // optional (omit or "#" hides the link)
  live: "https://...",               // optional
  image: "/projects/my-project.png", // optional (else a placeholder initial shows)
  research: true,                    // optional — labels it as research
}
```

The list page, `/projects/[slug]` detail, sitemap, and the per-project OG image all pick it up automatically — no other edits.

> ⚠️ Don't add FrameForge or any "LinkedIn automation" project (abandoned).

---

## The things you still need to fill in

All collected in [`content/TODO.md`](./content/TODO.md). Quick version:

- **Socials** (`content/profile.ts`): Twitter/X and LinkedIn URLs (currently `"#"`; Hashnode is set). `"#"` links show "Coming soon" and are excluded from SEO `sameAs`.
- **ImpactBridge** (`content/experience.ts`): role + bullets (currently `pending`, renders "Details coming soon").
- **Repo links** (`content/projects.ts`): ConquerManage + Legal Wakeel GitHub URLs.
- **Project images**: drop in `/public` and set the `image` field.
- **Group B projects**: add Learning & Experiments entries (commented example in the file).
- **Resume PDF** — see below.

---

## Replace the resume PDF

Drop your file at **`public/resume.pdf`**. The `/resume` page detects it at build and shows the Download button + an inline preview. No file = a tasteful "not added yet" note.

A Google Drive link is supported as a fallback via `RESUME_DRIVE_URL` (use the direct-download format, shared "Anyone with the link"). Self-hosting from `/public` is strictly better for SEO and avoids sign-in friction.

---

## Swap to a custom domain

Everything absolute (canonical URLs, OG images, sitemap, `robots.txt`) flows through one env var.

1. Point the domain at the Vercel project.
2. Set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` in the Vercel env (and locally in `.env`).

That's the only change.

### Environment variables

Copy `.env.example` → `.env`:

| Var | Purpose |
|-----|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (defaults to `http://localhost:3000`) |
| `RESUME_DRIVE_URL` | Optional Drive fallback for the resume |
| `NEXT_PUBLIC_HASHNODE_URL` | Optional override for the `/blog` Hashnode link |

---

## Deploy (Vercel)

Push to GitHub, import the repo in Vercel — it auto-detects Next.js. Set `NEXT_PUBLIC_SITE_URL` to your `*.vercel.app` (or custom) URL. Done.

> Real search ranking also needs the domain to be linked-to and crawled over time — the code makes the site *eligible* to rank (metadata, OG, JSON-LD, sitemap, fast static HTML); it can't guarantee #1 on day one.

---

## Project structure

```
app/                 routes (home, about, experience, projects, blog, resume, contact)
  opengraph-image.tsx        default social card
  projects/[slug]/           detail page + per-project OG card
  sitemap.ts · robots.ts     SEO
components/           Nav, Footer, SectionHeading, ProjectCard, JourneySpine,
                      HeroAsciiField (the signature), Reveal, SplitWords, …
content/             all typed site content (edit here)
lib/                 site config (nav, URL) + OG font loader
```
