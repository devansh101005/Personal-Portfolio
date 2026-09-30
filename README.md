# Devansh — Portfolio

Personal portfolio + personal-brand site for **Devansh** (B.Tech CSE '27, Shiv Nadar University). Editorial / print-magazine aesthetic, light-mode-first with a dark toggle, one terracotta accent. Built to (1) convince a recruiter this is production-grade engineering and (2) share cleanly as a link with a good preview card.

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

- **Before deploying:** set `NEXT_PUBLIC_SITE_URL` in the Vercel env to the real URL. Without it, canonical links, the sitemap and OG images point at `http://localhost:3000`.
- **Incoming company:** not shown anywhere yet (by choice). Add it when you're ready to share.
- Socials (GitHub, LinkedIn, Hashnode) are set. Twitter/X is intentionally not on the site.

---

## Resume

The resume is shared **on request**, not as a public PDF. Any "Resume" link opens a small dialog (`components/ResumeRequest.tsx`) with the email address, a Copy button, and a prefilled "Resume request" email. `/resume` shows the same card for direct visits.

---

## Swap to a custom domain

Everything absolute (canonical URLs, OG images, sitemap, `robots.txt`) flows through one env var.

1. Add the domain in Cloudflare Pages → your project → Custom domains.
2. Set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` in the Pages environment variables (and locally in `.env`), then redeploy.

That's the only change.

### Environment variables

Copy `.env.example` → `.env`:

| Var | Purpose |
|-----|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (defaults to `http://localhost:3000`) |
| `NEXT_PUBLIC_HASHNODE_URL` | Optional override for the `/blog` Hashnode link |

---

## Deploy (Cloudflare Pages, static export)

The site is a static export (`output: "export"` in `next.config.mjs`): `npm run build` writes plain files to `/out`.

1. Push the repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → **Pages** → Connect to Git → pick the repo.
3. Build settings: framework preset **Next.js (Static HTML Export)**, build command `npm run build`, output directory `out`.
4. Environment variables: `NEXT_PUBLIC_SITE_URL=https://<project>.pages.dev` (or your custom domain). Node version comes from `.node-version` (20).
5. Deploy. `public/_headers` sets PNG content-type for the share images and long caching for build assets.
6. Nightly heatmap refresh: Pages → Settings → Builds → **Deploy hooks** → create one, then add it as the GitHub repo secret `CF_PAGES_DEPLOY_HOOK`. `.github/workflows/nightly-rebuild.yml` calls it at 02:00 IST.

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
