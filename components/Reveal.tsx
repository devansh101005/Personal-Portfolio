"use client";

import { createElement, useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Variant = "up" | "left" | "right" | "zoom" | "wipe";

const variantClass: Record<Variant, string> = {
  up: "reveal",
  left: "reveal from-left",
  right: "reveal from-right",
  zoom: "reveal zoom",
  wipe: "wipe",
};

/**
 * One-shot scroll-entrance wrapper (§1B). Adds `.in` when the element scrolls
 * into view, then disconnects. The hidden start state lives in globals.css and
 * is gated behind `.js`, so content is never hidden for crawlers / no-JS.
 */
export default function Reveal({
  children,
  variant = "up",
  as = "div",
  className = "",
  threshold = 0.15,
}: {
  children: ReactNode;
  variant?: Variant;
  as?: ElementType;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  // Kept in React state (not a raw classList.add) so a re-render can't strip
  // `.in` and hide already-revealed content again.
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // Also reveal anything already scrolled past (fast scroll / anchor jump
          // before hydration) — otherwise it would stay hidden above the fold.
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
            setShown(true);
            io.unobserve(el);
          }
        });
      },
      // A wipe starts fully clipped (clip-path), so its intersectionRatio is
      // always 0 and a non-zero threshold would never fire — use 0 for it.
      { threshold: variant === "wipe" ? 0 : threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, variant]);

  return createElement(
    as,
    { ref, className: `${variantClass[variant]} ${shown ? "in" : ""} ${className}`.trim() },
    children
  );
}
