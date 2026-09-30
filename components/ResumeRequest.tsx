"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content";

const SUBJECT = "Resume request";
const BODY = "Hi Devansh,\n\nCould you share your resume? A bit of context: ";
const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

/** The "ask me by email" content — used in the popup and on the /resume page. */
export function ResumeRequestBody({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const [copied, setCopied] = useState(false);
  const H = headingLevel;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the address is still visible to select */
    }
  };

  return (
    <div>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Resume</p>
      <H className="font-display text-[clamp(30px,4.5vw,40px)] font-black leading-[1.05] tracking-[-0.015em]">
        Want my resume<span className="text-accent-fill">?</span>
      </H>
      <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-muted">
        I share it on request, so you always get the latest version. Drop me an
        email with a line about the role or why you&apos;re asking, and I&apos;ll
        send it over.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3 rounded-lg border border-line bg-bg px-4 py-3.5">
        <span className="min-w-0 flex-1 break-all font-mono text-[14px] text-ink">
          {profile.email}
        </span>
        <button
          type="button"
          onClick={copy}
          className="rounded-md border border-line-strong px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-muted transition-colors hover:border-muted hover:text-ink"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      <a
        href={mailto}
        className="mt-5 inline-flex items-center rounded-md border border-ink bg-ink px-[22px] py-[13px] font-mono text-xs uppercase tracking-[0.06em] text-bg transition-colors hover:border-accent hover:bg-accent hover:text-white"
      >
        Write the email →
      </a>
    </div>
  );
}

/**
 * Site-wide: any click on a link to /resume (nav, hero button, mobile menu)
 * opens this small dialog instead of navigating. The /resume page still exists
 * for direct visits and no-JS. Native <dialog>: Esc, focus and a11y for free.
 */
export default function ResumeRequest() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.href, location.href);
      // trailingSlash export renders links as "/resume/", so compare without it.
      if (url.origin !== location.origin || url.pathname.replace(/\/$/, "") !== "/resume") return;
      e.preventDefault(); // next/link skips navigation when defaultPrevented
      ref.current?.showModal();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label="Request my resume"
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close(); // backdrop click
      }}
      className="resume-dialog w-[min(92vw,520px)] rounded-xl border border-line bg-surface p-0 text-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]"
    >
      <div className="relative p-7 sm:p-9">
        <button
          type="button"
          aria-label="Close"
          onClick={() => ref.current?.close()}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-bg hover:text-ink"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <ResumeRequestBody />
      </div>
    </dialog>
  );
}
