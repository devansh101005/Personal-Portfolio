import TiltCard from "./TiltCard";
import TagList from "./TagList";
import ProjectCover from "./ProjectCover";
import type { Project } from "@/content/types";

function CardLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-10 inline-flex min-h-6 items-center py-1 font-mono text-[11px] text-muted transition-colors hover:text-accent"
    >
      {label}
    </a>
  );
}

/**
 * Full project card (Group A — §5): image frame (parallax inner) → domain tag →
 * name + date → one-liner → tech tags → optional GitHub/Live links. Whole card
 * links to the detail page. Renders gracefully while content is still empty.
 */
export default function ProjectCard({ p, priority = false }: { p: Project; priority?: boolean }) {
  const hasGithub = Boolean(p.githubUrl && p.githubUrl !== "#");
  const hasLive = Boolean(p.liveUrl);

  return (
    <TiltCard href={`/projects/${p.slug}`} ariaLabel={`${p.name}: view project`}>
      <div className="card-img relative aspect-[16/9] overflow-hidden border-b border-line bg-bg">
        <div className="card-img-inner">
          <ProjectCover p={p} sizes="(min-width: 900px) 520px, 100vw" priority={priority} />
        </div>
      </div>
      <div className="p-[22px]">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-accent">
            {p.domainTag}
          </span>
          {p.period && (
            <span className="whitespace-nowrap font-mono text-[11px] text-muted">
              {p.period}
            </span>
          )}
        </div>
        <div className="font-display text-2xl font-semibold tracking-[-0.01em]">
          {p.name}
        </div>
        <p className="mb-4 mt-2 text-sm leading-relaxed text-muted">
          {p.oneLiner || (
            <span className="font-mono text-xs text-muted">Description coming soon</span>
          )}
        </p>
        {p.stack.length > 0 && <TagList items={p.stack} />}
        {(hasGithub || hasLive) && (
          <div className="mt-4 flex gap-4">
            {hasGithub && <CardLink href={p.githubUrl as string} label="GitHub ↗" />}
            {hasLive && <CardLink href={p.liveUrl as string} label="Live ↗" />}
          </div>
        )}
      </div>
    </TiltCard>
  );
}
