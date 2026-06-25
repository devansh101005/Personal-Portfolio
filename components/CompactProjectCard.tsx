import TiltCard from "./TiltCard";
import TagList from "./TagList";
import type { Project } from "@/content/types";

function CardLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-10 font-mono text-[11px] text-muted transition-colors hover:text-accent"
    >
      {label}
    </a>
  );
}

/**
 * Compact project card (Groups B/C/D — §5): no image, lighter visual weight.
 * Domain tag (accent) + optional GUIDED BUILD marker, name, one-liner, tags, links.
 * Group A uses the larger ProjectCard so the eye lands there first.
 */
export default function CompactProjectCard({ p }: { p: Project }) {
  const hasGithub = Boolean(p.githubUrl && p.githubUrl !== "#");
  const hasLive = Boolean(p.liveUrl);

  return (
    <TiltCard href={`/projects/${p.slug}`} ariaLabel={`${p.name} — view project`}>
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-accent">
            {p.domainTag}
          </span>
          {p.guided && (
            <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.08em] text-muted">
              Guided build
            </span>
          )}
        </div>
        <div className="font-display text-lg font-semibold tracking-[-0.01em]">
          {p.name}
        </div>
        <p className="mb-3 mt-1.5 text-[13px] leading-relaxed text-muted">
          {p.oneLiner || (
            <span className="font-mono text-[11px] text-muted">Description coming soon</span>
          )}
        </p>
        {p.stack.length > 0 && <TagList items={p.stack} />}
        {(hasGithub || hasLive) && (
          <div className="mt-3 flex gap-4">
            {hasGithub && <CardLink href={p.githubUrl as string} label="GitHub ↗" />}
            {hasLive && <CardLink href={p.liveUrl as string} label="Live ↗" />}
          </div>
        )}
      </div>
    </TiltCard>
  );
}
