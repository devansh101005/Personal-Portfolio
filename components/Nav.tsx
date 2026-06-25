"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Monogram from "./Monogram";
import ThemeToggle from "./ThemeToggle";
import { NAV } from "@/lib/site";

/** Persistent top nav: monogram · animated-underline links · sun/moon toggle (§1B), with a mobile menu. */
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => href !== "/" && pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="mx-auto flex h-16 max-w-prose items-center justify-between px-8">
        <Link href="/" aria-label="Devansh — home">
          <Monogram className="text-[23px]" />
        </Link>

        <div className="hidden items-center gap-[30px] md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`navlink ${isActive(item.href) ? "active" : ""}`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-line-strong hover:text-ink md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              aria-hidden
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg md:hidden">
          <div className="mx-auto flex max-w-prose flex-col px-8 py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`border-b border-line py-3.5 font-mono text-[13px] uppercase tracking-[0.06em] transition-colors last:border-b-0 ${
                  isActive(item.href) ? "text-accent" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
