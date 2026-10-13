// Blog posts. Two kinds:
//  - local: the Markdown lives in content/blog/<slug>.md and is rendered at
//    /blog/<slug>/ (this site is the original; its canonical points here).
//  - external: a post that lives on another platform (shown with "↗").
//
// To add a post: drop <slug>.md into content/blog/ (images into
// public/blog/<slug>/, referenced as images/<name>.png in the Markdown) and
// add an entry below. Newest first.
//
// Cross-posting to Medium/Dev.to/Hashnode: publish here first, then import the
// URL there so their canonical points back to this site. Optionally record
// the copy's URL in `alsoOn` so the post links to it.

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string; // one-line hook; inline `code` allowed
  date: string; // ISO date, e.g. "2026-10-13"
  tag: string; // short topic label
  external?: { url: string; platform: string }; // lives elsewhere
  alsoOn?: { url: string; platform: string }[]; // syndicated copies
}

export const posts: BlogPost[] = [
  {
    slug: "onnx-threads-latency",
    title: "My “single-thread” benchmark was using 28 threads",
    subtitle:
      "`torch.set_num_threads(1)` doesn't pin ONNX Runtime: a latency bug I caught before publication",
    date: "2026-10-13",
    tag: "ML Systems",
  },
  {
    slug: "client-server-architecture-for-beginners",
    title: "Client-Server Architecture for Beginners",
    subtitle: "Step-by-step explanation of client-server systems, networks, and protocols for beginners",
    date: "2025-10-29",
    tag: "Systems",
    external: {
      url: "https://devansh1010.hashnode.dev/client-server-architecture-for-beginners",
      platform: "Hashnode",
    },
  },
];

export const localPosts = posts.filter((p) => !p.external);

export function getPost(slug: string): BlogPost | undefined {
  return localPosts.find((p) => p.slug === slug);
}
