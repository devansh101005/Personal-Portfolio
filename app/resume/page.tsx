import type { Metadata } from "next";
import { existsSync } from "fs";
import path from "path";
import Eyebrow from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download Devansh's resume (PDF) — full-stack engineer, B.Tech CSE '27.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Resume · Devansh",
    description: "Download Devansh's resume (PDF).",
    url: "/resume",
    images: ["/opengraph-image"],
  },
};

// NOTE (§8): serving /public/resume.pdf from our OWN domain is strictly better
// than a Drive link — better SEO, no Google sign-in friction, crawlable. The
// Drive URL is only a fallback for when the PDF isn't dropped in /public yet.
const driveUrl = process.env.RESUME_DRIVE_URL;

export default function ResumePage() {
  // Checked at build time — no broken download/embed if the PDF isn't added yet.
  const hasPdf = existsSync(path.join(process.cwd(), "public", "resume.pdf"));

  return (
    <main className="mx-auto max-w-prose px-8 py-14">
      <header className="mb-8">
        <Eyebrow icon="resume" label="Resume" />
        <h1 className="font-display text-[clamp(44px,8vw,84px)] font-black leading-[0.98] tracking-[-0.02em]">
          Resume<span className="text-accent">.</span>
        </h1>
        <p className="mt-4 max-w-[60ch] text-[15.5px] text-muted">
          A one-page summary of the work — production systems, the research
          internship, and the stack behind them.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        {hasPdf ? (
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center rounded-md border border-ink bg-ink px-[22px] py-[13px] font-mono text-xs uppercase tracking-[0.06em] text-bg transition-colors hover:border-accent hover:bg-accent hover:text-white"
          >
            Download Resume (PDF)
          </a>
        ) : (
          <p className="rounded-lg border border-dashed border-line px-5 py-6 font-mono text-xs uppercase tracking-[0.08em] text-muted">
            Resume not added yet — drop it at /public/resume.pdf
          </p>
        )}

        {driveUrl && (
          <a
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md border border-line-strong px-[22px] py-[13px] font-mono text-xs uppercase tracking-[0.06em] text-ink transition-colors hover:border-muted"
          >
            Open in Drive ↗
          </a>
        )}
      </div>

      {hasPdf && (
        <object
          data="/resume.pdf"
          type="application/pdf"
          className="mt-10 h-[80vh] w-full rounded-lg border border-line"
          aria-label="Resume preview"
        >
          <p className="p-6 text-muted">
            Your browser can&apos;t display the PDF inline.{" "}
            <a href="/resume.pdf" className="text-accent hover:underline">
              Download it instead
            </a>
            .
          </p>
        </object>
      )}
    </main>
  );
}
