import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { localPosts, getPost } from "@/content/posts";
import { renderInline, renderPost } from "@/lib/blog";
import { formatDate } from "@/lib/date";
import { SITE_URL } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return localPosts.map((p) => ({ slug: p.slug }));
}

const plain = (md: string) => md.replace(/`([^`]+)`/g, "$1");

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const url = `/blog/${p.slug}/`;
  return {
    title: p.title,
    description: plain(p.subtitle),
    // This site is the original: copies on Medium/Dev.to/Hashnode should set
    // their canonical to this URL so search engines credit it here.
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${p.title} · Devansh`,
      description: plain(p.subtitle),
      publishedTime: p.date,
      authors: ["Devansh Pandey"],
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.title} · Devansh`,
      description: plain(p.subtitle),
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const { html, toc, minutes } = renderPost(p.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: plain(p.subtitle),
    datePublished: p.date,
    author: { "@type": "Person", name: "Devansh Pandey", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${p.slug}/`,
  };

  return (
    <main className="mx-auto max-w-prose px-8 py-14">
      <Link href="/blog/" className="viewall">
        ← All posts
      </Link>

      <header className="mt-8 border-b border-line pb-10">
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          <span className="text-accent">{p.tag}</span>
          <span>· {formatDate(p.date)}</span>
          <span>· {minutes} min read</span>
        </div>
        <h1 className="max-w-[22ch] font-display text-[clamp(34px,5.6vw,60px)] font-black leading-[1.04] tracking-[-0.02em]">
          {p.title}
        </h1>
        <p
          className="post-inline mt-5 max-w-[60ch] font-display text-[clamp(17px,2vw,21px)] font-semibold leading-[1.45] tracking-[-0.01em] text-muted"
          dangerouslySetInnerHTML={{ __html: renderInline(p.subtitle) }}
        />
        {p.alsoOn && p.alsoOn.length > 0 && (
          <p className="mt-5 font-mono text-[11px] text-muted">
            Also on{" "}
            {p.alsoOn.map((c, i) => (
              <span key={c.url}>
                {i > 0 && ", "}
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  {c.platform} ↗
                </a>
              </span>
            ))}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 gap-12 pt-10 lg:grid-cols-[minmax(0,1fr)_200px]">
        <article className="post-body min-w-0" dangerouslySetInnerHTML={{ __html: html }} />

        {toc.length > 1 && (
          <aside className="order-first lg:order-none">
            <nav
              aria-label="On this page"
              className="lg:sticky lg:top-24"
            >
              <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                On this page
              </p>
              <ul className="space-y-2 border-l border-line pl-4">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="block text-[13.5px] leading-snug text-muted transition-colors hover:text-accent"
                    >
                      {t.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>

      <footer className="mt-14 border-t border-line pt-8">
        <Link href="/blog/" className="viewall">
          ← All posts
        </Link>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
