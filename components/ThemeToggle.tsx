"use client";

import { useEffect, useState } from "react";

/**
 * Light/dark toggle. The actual <html class="dark"> is set pre-paint by the
 * inline no-flash script in app/layout.tsx; this just flips it and persists the
 * choice. Light is always the default until the user opts into dark.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const el = document.documentElement;
    const next = !el.classList.contains("dark");
    el.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    setDark(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className="flex h-[34px] w-[34px] items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.2 17.2 18.6 18.6M18.6 5.4 17.2 6.8M6.8 17.2 5.4 18.6" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        )}
      </svg>
    </button>
  );
}
