// Build-time Markdown → HTML for blog posts (runs only on the server / during
// `next build`, so readers download no Markdown code).
import { readFileSync } from "fs";
import path from "path";
import { Marked, type Tokens } from "marked";

export interface TocItem {
  id: string;
  text: string;
}

export interface RenderedPost {
  html: string;
  toc: TocItem[];
  minutes: number;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Inline Markdown only (for subtitles): `code`, *em*, links. */
export function renderInline(md: string): string {
  return new Marked().parseInline(md) as string;
}

export function renderPost(slug: string): RenderedPost {
  const file = path.join(process.cwd(), "content", "blog", `${slug}.md`);
  let src = readFileSync(file, "utf-8").replace(/\r\n/g, "\n");

  // The page renders the title + subtitle itself, so drop the leading
  // "# Title" and an italic one-line subtitle right under it, if present.
  src = src.replace(/^#\s+.+\n+/, "").replace(/^\*[^\n]+\*\n+/, "");

  const words = src.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));

  const toc: TocItem[] = [];
  const used = new Map<string, number>();
  const marked = new Marked({ gfm: true });

  marked.use({
    renderer: {
      heading({ tokens, depth }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        const base = slugify(inner) || "section";
        const n = used.get(base) ?? 0;
        used.set(base, n + 1);
        const id = n ? `${base}-${n}` : base;
        if (depth === 2) toc.push({ id, text: inner.replace(/<[^>]+>/g, "") });
        return `<h${depth} id="${id}"><a href="#${id}" class="anchor" aria-hidden="true" tabindex="-1">#</a>${inner}</h${depth}>\n`;
      },
      image({ href, text }: Tokens.Image) {
        // Markdown keeps the author's relative paths (images/x.png); the site
        // serves pre-converted WebP from /public/blog/<slug>/.
        const src = /^images\//.test(href)
          ? `/blog/${slug}/${href.replace(/^images\//, "").replace(/\.(png|jpe?g)$/i, ".webp")}`
          : href;
        const alt = text.replace(/"/g, "&quot;");
        return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" width="1600" height="900">`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const inner = this.parser.parseInline(tokens);
        const ext = /^https?:\/\//.test(href);
        const t = title ? ` title="${title}"` : "";
        return ext
          ? `<a href="${href}"${t} target="_blank" rel="noopener noreferrer">${inner}</a>`
          : `<a href="${href}"${t}>${inner}</a>`;
      },
    },
  });

  let html = marked.parse(src) as string;
  // Wide tables scroll inside their own box on phones instead of the page.
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, "</table></div>");

  return { html, toc, minutes };
}
