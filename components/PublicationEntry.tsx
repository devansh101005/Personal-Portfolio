import Link from "next/link";
import type { Publication } from "@/content/types";

function StatusPill({ status }: { status: Publication["status"] }) {
  const accepted = status === "accepted";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.06em] ${
        accepted ? "bg-accent-soft text-accent" : "text-muted"
      }`}
    >
      {accepted && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
      {accepted ? "Accepted" : "Published"}
    </span>
  );
}

function Authors({ p }: { p: Publication }) {
  const affs = p.affiliations ?? [];
  // Number affiliations when there's more than one institution, or when some
  // author's institution is unknown (a bare single line would imply everyone).
  const numbered = affs.length > 1 || p.authors.some((a) => !a.aff?.length);
  return (
    <div>
      <p className="text-[14.5px] leading-relaxed text-muted">
        {p.authors.map((a, i) => (
          <span key={a.name}>
            <span className={a.me ? "font-semibold text-ink" : undefined}>
              {a.title ? `${a.title} ` : ""}
              {a.name}
            </span>
            {a.equal && <span className="text-accent">*</span>}
            {numbered && a.aff && a.aff.length > 0 && (
              <sup className="ml-px font-mono text-[9.5px] text-muted">{a.aff.join(",")}</sup>
            )}
            {i < p.authors.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      {affs.length > 0 && (
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
          {affs.map((name, i) => (
            <span key={name}>
              {numbered && <sup className="mr-0.5 text-[9px]">{i + 1}</sup>}
              {name}
              {i < affs.length - 1 ? <span className="mx-2 text-line-strong">·</span> : ""}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

function Meta({ p }: { p: Publication }) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
        {p.venueShort}
        {p.where && <span className="text-muted"> · {p.where}</span>}
      </span>
      <StatusPill status={p.status} />
    </div>
  );
}

/**
 * One paper, laid out like an entry on a researcher's homepage: venue + status,
 * serif title, author line (me bold, * = equal contribution). `compact` is the
 * home-page preview (links to the full entry on /research).
 */
export default function PublicationEntry({
  p,
  compact = false,
}: {
  p: Publication;
  compact?: boolean;
}) {
  const hasEqual = p.authors.some((a) => a.equal);

  if (compact) {
    return (
      <Link
        href={`/research#${p.slug}`}
        className="group block border-t border-line py-6"
      >
        <Meta p={p} />
        <h3 className="font-display text-[clamp(19px,2.3vw,23px)] font-semibold leading-[1.3] tracking-[-0.01em] transition-colors group-hover:text-accent">
          {p.title}
        </h3>
        <div className="mt-2">
          <Authors p={p} />
        </div>
      </Link>
    );
  }

  return (
    <article id={p.slug} className="scroll-mt-24 border-t border-line py-12">
      <Meta p={p} />
      <h2 className="max-w-[40ch] font-display text-[clamp(23px,3vw,31px)] font-bold leading-[1.25] tracking-[-0.01em]">
        {p.title}
      </h2>
      <div className="mt-3">
        <Authors p={p} />
      </div>
      <p className="mt-1 text-[13.5px] italic text-muted">{p.venue}</p>

      <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-[130px_1fr]">
        {p.summary && (
          <>
            <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              The paper
            </dt>
            <dd className="max-w-[64ch] text-[16px] leading-relaxed">{p.summary}</dd>
          </>
        )}
        <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
          My part
        </dt>
        <dd className="max-w-[64ch] text-[16px] leading-relaxed">
          {p.myPart}
          {p.experienceNote && (
            <span className="block pt-1 text-[14px] text-muted">{p.experienceNote}</span>
          )}
        </dd>
        {p.results && p.results.length > 0 && (
          <>
            <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              Results
            </dt>
            <dd>
              <ul className="max-w-[64ch] space-y-2.5">
                {p.results.map((r) => (
                  <li key={r} className="flex gap-3 text-[16px] leading-relaxed">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </>
        )}
      </dl>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        {p.projectSlug && (
          <Link href={`/projects/${p.projectSlug}`} className="viewall">
            Full project write-up →
          </Link>
        )}
        {p.links?.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="viewall"
          >
            {l.label} ↗
          </a>
        ))}
        {hasEqual && (
          <span className="font-mono text-[11px] text-muted">
            <span className="text-accent">*</span> equal contribution
          </span>
        )}
      </div>
    </article>
  );
}
