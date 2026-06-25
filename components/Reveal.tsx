"use client";

import { createElement, useEffect, useRef, type ElementType, type ReactNode } from "react";

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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.unobserve(el);
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return createElement(
    as,
    { ref, className: `${variantClass[variant]} ${className}`.trim() },
    children
  );
}
