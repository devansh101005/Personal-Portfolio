import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import { profile } from "@/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing by Devansh on backend systems, ML, and shipping real software, published on Hashnode.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog · Devansh",
    description: "Writing on backend systems, ML, and shipping real software.",
    url: "/blog",
    images: ["/opengraph-image"],
  },
};

// Hashnode publication URL (env override wins; otherwise the profile constant).
const hashnodeUrl =
  process.env.NEXT_PUBLIC_HASHNODE_URL || profile.socials.hashnode;

// Optionally surface a few posts manually for now.
// UPGRADE: (a) point a `blog.<domain>` subdomain at Hashnode, OR
//          (b) pull posts live via the Hashnode GraphQL API and map them here.
const posts: { title: string; href: string; date?: string }[] = [];

export default function BlogPage() {
  const hasPublication = hashnodeUrl && hashnodeUrl !== "#";

  return (
    <main className="mx-auto max-w-prose px-8 py-14">
      <header className="mb-8">
        <Eyebrow icon="blog" label="Blog" />
        <h1 className="font-display text-[clamp(44px,8vw,84px)] font-black leading-[0.98] tracking-[-0.02em]">
          Writing<span className="text-accent-fill">.</span>
        </h1>
        <p className="mt-4 max-w-[60ch] text-[15.5px] text-muted">
          Notes on backend systems, ML, and what I learn shipping real software.
          Posts live on Hashnode.
        </p>
      </header>

      <div className="mt-8">
        {hasPublication ? (
          <a
            href={hashnodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md border border-ink bg-ink px-[22px] py-[13px] font-mono text-xs uppercase tracking-[0.06em] text-bg transition-colors hover:border-accent hover:bg-accent hover:text-white"
          >
            Read on Hashnode →
          </a>
        ) : (
          <p className="rounded-lg border border-dashed border-line px-5 py-6 font-mono text-xs uppercase tracking-[0.08em] text-muted">
            Publication link coming soon. See content/TODO.md
          </p>
        )}
      </div>

      {posts.length > 0 && (
        <ul className="mt-12 border-t border-line">
          {posts.map((post) => (
            <li key={post.href} className="border-b border-line py-5">
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-xl font-semibold tracking-[-0.01em] transition-colors hover:text-accent"
              >
                {post.title}
              </a>
              {post.date && (
                <div className="mt-1 font-mono text-[11px] text-muted">
                  {post.date}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
