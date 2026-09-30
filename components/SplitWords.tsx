"use client";

import {
  createElement,
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
} from "react";

/**
 * Word-by-word headline reveal (§1B). Each word rises out of a mask, staggered
 * by index. `accent` (case-insensitive) colors a matching word/phrase. The full
 * sentence is still present as text for SEO/no-JS (hidden state gated by `.js`).
 */
export default function SplitWords({
  text,
  accent,
  as = "span",
  className = "",
}: {
  text: string;
  accent?: string;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false); // state, so re-renders keep `.in`

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          // Also reveal anything already scrolled past (fast scroll / anchor jump
          // before hydration) — otherwise it would stay hidden above the fold.
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
            setShown(true);
            io.unobserve(el);
          }
        }),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const accentWords = accent ? accent.toLowerCase().split(" ") : [];
  const words = text.split(" ");

  return createElement(
    as,
    { ref, className: `split-words ${shown ? "in" : ""} ${className}`.trim() },
    words.map((w, i) => {
      const isAccent = accentWords.includes(w.toLowerCase().replace(/[.,]/g, ""));
      // The space must live BETWEEN word spans (a real text node) — a trailing
      // space inside an overflow:hidden inline-block gets clipped, killing the gap.
      return (
        <Fragment key={i}>
          <span className="word" style={{ ["--i"]: i } as CSSProperties}>
            <i className={isAccent ? "text-accent" : undefined}>{w}</i>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      );
    })
  );
}
