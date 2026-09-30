import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TagList from "@/components/TagList";
import Reveal from "@/components/Reveal";
import ProjectCover from "@/components/ProjectCover";
import { projects, getProject, getPublicationForProject } from "@/content";
import type { ProjectGroup, ProjectImage, ProjectStatus } from "@/content/types";

type Params = { params: Promise<{ slug: string }> };

const groupLabel: Record<ProjectGroup, string> = {
  production: "Production & Systems",
  experiment: "Experiment",
  "personal-tool": "Personal tool",
  guided: "Guided build",
};

const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  built: "Built",
  "in-progress": "In progress",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const url = `/projects/${p.slug}`;
  const description =
    p.oneLiner || p.overview || `${p.name}, a ${p.domainTag} project by Devansh.`;
  return {
    title: p.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${p.name} · Devansh`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.name} · Devansh`,
      description,
    },
  };
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-12">
      <Reveal as="h2" variant="wipe" className="mb-5 font-mono text-[11.5px] uppercase tracking-[0.16em] text-accent">
        {label}
      </Reveal>
      <Reveal>{children}</Reveal>
    </section>
  );
}

function GalleryItem({ img, i }: { img: ProjectImage; i: number }) {
  const figure = img.kind === "figure";
  return (
    <Reveal as="figure" variant={i % 2 ? "right" : "left"} className="m-0">
      <div
        className={`overflow-hidden rounded-lg border border-line ${figure ? "plate p-4 sm:p-6" : "bg-bg"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.src} alt={img.alt} loading="lazy" className="block h-auto w-full" />
      </div>
      {img.caption && (
        <figcaption className="mt-3 max-w-[60ch] font-mono text-[11.5px] leading-relaxed text-muted">
          {img.caption}
        </figcaption>
      )}
    </Reveal>
  );
}

// Render `backtick` segments as inline code chips.
function inline(text: string) {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code
        key={i}
        className="rounded bg-accent-soft px-1.5 py-0.5 font-mono text-[0.82em] text-ink"
      >
        {part.slice(1, -1)}
      </code>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="max-w-[64ch] space-y-3">
      {items.map((a) => (
        <li key={a} className="flex gap-3 text-[16px] leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>{inline(a)}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-md border border-line-strong px-4 py-2 font-mono text-[11px] uppercase tracking-[0.06em] text-ink transition-colors hover:border-muted hover:text-accent"
    >
      {label}
    </a>
  );
}

export default async function ProjectDetail({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === slug);
  const prev = idx > 0 ? projects[idx - 1] : undefined;
  const next = idx < projects.length - 1 ? projects[idx + 1] : undefined;

  const hasGithub = Boolean(p.githubUrl && p.githubUrl !== "#");
  const paper = getPublicationForProject(p.slug);
  const hasDetail = Boolean(
    (p.highlights && p.highlights.length) ||
      p.overview ||
      p.problem ||
      p.approach ||
      (p.architecture && p.architecture.length) ||
      p.outcomes ||
      (p.gallery && p.gallery.length)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: p.name,
    description: p.oneLiner || `${p.name} (${p.domainTag})`,
    ...(p.stack.length ? { programmingLanguage: p.stack } : {}),
    author: { "@type": "Person", name: "Devansh" },
    ...(hasGithub ? { codeRepository: p.githubUrl } : {}),
    ...(p.liveUrl ? { url: p.liveUrl } : {}),
  };

  return (
    <main className="mx-auto max-w-prose px-8 py-14">
      <Link href="/projects" className="viewall">
        ← All projects
      </Link>

      {/* Hero */}
      <header className="mt-8 border-b border-line pb-12">
        <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <span className="text-accent">{p.domainTag}</span>
          <span>· {groupLabel[p.group]}</span>
          {p.status && <span>· {statusLabel[p.status]}</span>}
          {p.period && <span>· {p.period}</span>}
        </div>
        <h1 className="font-display text-[clamp(40px,7vw,76px)] font-black leading-[0.98] tracking-[-0.02em]">
          {p.name}
        </h1>
        {p.oneLiner && (
          <p className="mt-5 max-w-[60ch] font-display text-[clamp(18px,2.2vw,23px)] font-semibold leading-[1.4] tracking-[-0.01em]">
            {p.oneLiner}
          </p>
        )}
        {paper && (
          <Link
            href={`/research#${paper.slug}`}
            className="group mt-6 inline-flex items-center gap-2.5 font-mono text-[11.5px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-accent"
          >
            <span className="rounded-full border border-line bg-accent-soft px-2 py-[3px] text-[10px] text-accent">
              Paper
            </span>
            {paper.status === "accepted" ? "Accepted at " : "Published at "}
            {paper.venueShort} →
          </Link>
        )}
        {(hasGithub || p.liveUrl) && (
          <div className="mt-7 flex flex-wrap gap-3">
            {p.liveUrl && <ProjectLink href={p.liveUrl} label="Live ↗" />}
            {hasGithub && <ProjectLink href={p.githubUrl as string} label="GitHub ↗" />}
          </div>
        )}
      </header>

      {(p.image || p.diagram) && (
        <Reveal variant="zoom" as="figure" className="dg-live m-0 py-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-line bg-bg">
            <ProjectCover p={p} sizes="(min-width: 1080px) 1016px, 100vw" priority />
          </div>
          {p.image?.caption && (
            <figcaption className="mt-3 font-mono text-[11.5px] text-muted">
              {p.image.caption}
            </figcaption>
          )}
        </Reveal>
      )}

      {hasDetail ? (
        <>
          {p.highlights && p.highlights.length > 0 && (
            <Section label="Highlights">
              <Bullets items={p.highlights} />
            </Section>
          )}
          {p.overview && (
            <Section label="Overview">
              <p className="max-w-[64ch] whitespace-pre-line text-[17px] leading-relaxed">
                {inline(p.overview)}
              </p>
            </Section>
          )}
          {p.problem && (
            <Section label="Problem">
              <p className="max-w-[64ch] whitespace-pre-line text-[17px] leading-relaxed">{inline(p.problem)}</p>
            </Section>
          )}
          {p.approach && (
            <Section label="Approach">
              <p className="max-w-[64ch] whitespace-pre-line text-[17px] leading-relaxed">{inline(p.approach)}</p>
            </Section>
          )}
          {p.architecture && p.architecture.length > 0 && (
            <Section label="Architecture / how it works">
              <Bullets items={p.architecture} />
            </Section>
          )}
          {p.stack.length > 0 && (
            <Section label="Tech stack">
              <TagList items={p.stack} />
            </Section>
          )}
          {p.outcomes && (
            <Section label="Outcomes">
              <p className="max-w-[64ch] whitespace-pre-line text-[17px] leading-relaxed">{inline(p.outcomes)}</p>
            </Section>
          )}
          {p.gallery && p.gallery.length > 0 && (
            <Section label="Gallery">
              <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 sm:grid-cols-2">
                {p.gallery.map((img, i) => (
                  <GalleryItem key={img.src} img={img} i={i} />
                ))}
              </div>
            </Section>
          )}
        </>
      ) : (
        <p className="border-t border-line py-12 font-mono text-xs uppercase tracking-[0.08em] text-muted">
          Full write-up coming soon.
        </p>
      )}

      {/* Prev / next */}
      <nav className="grid grid-cols-2 gap-4 border-t border-line pt-10">
        <div>
          {prev && (
            <Link href={`/projects/${prev.slug}`} className="group block">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">
                ← Previous
              </div>
              <div className="mt-1 font-display text-lg font-semibold transition-colors group-hover:text-accent">
                {prev.name}
              </div>
            </Link>
          )}
        </div>
        <div className="text-right">
          {next && (
            <Link href={`/projects/${next.slug}`} className="group block">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">
                Next →
              </div>
              <div className="mt-1 font-display text-lg font-semibold transition-colors group-hover:text-accent">
                {next.name}
              </div>
            </Link>
          )}
        </div>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
