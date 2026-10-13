import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { posts } from "@/content/posts";
import { renderInline, renderPost } from "@/lib/blog";
import { formatDate } from "@/lib/date";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing by Devansh on ML systems, backend engineering, and the bugs and lessons from building real projects.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "Blog · Devansh",
    description: "Writing on ML systems, backend engineering, and lessons from real projects.",
    url: "/blog/",
    images: ["/opengraph-image"],
  },
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-prose px-8 py-14">
      <header className="mb-10">
        <Eyebrow icon="blog" label="Blog" />
        <h1 className="font-display text-[clamp(44px,8vw,84px)] font-black leading-[0.98] tracking-[-0.02em]">
          Writing<span className="text-accent-fill">.</span>
        </h1>
        <p className="mt-4 max-w-[60ch] text-[15.5px] text-muted">
          Write-ups from my own projects: what broke, why, and what I check now.
        </p>
      </header>

      <Reveal>
        <ol className="border-b border-line">
          {posts.map((p, i) => {
            const meta = p.external
              ? `${p.external.platform} ↗`
              : `${renderPost(p.slug).minutes} min`;
            const inner = (
              <div className="grid grid-cols-[2.2rem_1fr] gap-x-4 gap-y-1 py-6 sm:grid-cols-[2.6rem_1fr_auto] sm:items-baseline">
                <span className="font-mono text-[12px] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h2 className="font-display text-[clamp(19px,2.3vw,23px)] font-semibold leading-[1.3] tracking-[-0.01em] transition-colors group-hover:text-accent">
                    {p.title}
                  </h2>
                  <p
                    className="post-inline mt-1.5 text-[14.5px] leading-relaxed text-muted"
                    dangerouslySetInnerHTML={{ __html: renderInline(p.subtitle) }}
                  />
                </div>
                <div className="col-start-2 mt-2 flex items-center gap-3 font-mono text-[11px] text-muted sm:col-start-auto sm:mt-0 sm:justify-end">
                  <span className="rounded-full border border-line px-2 py-[2px] uppercase tracking-[0.06em]">
                    {p.tag}
                  </span>
                  <span className="whitespace-nowrap">{meta}</span>
                  <span className="hidden whitespace-nowrap md:inline">{formatDate(p.date)}</span>
                </div>
              </div>
            );
            return (
              <li key={p.slug} className="border-t border-line">
                {p.external ? (
                  <a href={p.external.url} target="_blank" rel="noopener noreferrer" className="group block">
                    {inner}
                  </a>
                ) : (
                  <Link href={`/blog/${p.slug}/`} className="group block">
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </Reveal>
    </main>
  );
}
