"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps the About → Experience → Projects sequence (§1B). Draws the accent rail
 * downward as you scroll (comet tip + nodes lighting up). Each child section is
 * a `.jsec` containing a `.jnode`. Disabled under reduced-motion.
 */
export default function JourneySpine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const journey = ref.current;
    const fill = fillRef.current;
    if (!journey || !fill) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let nodes: { el: HTMLElement; top: number }[] = [];
    let jTop = 0, jH = 0, ticking = false;
    const build = () => {
      jTop = journey.getBoundingClientRect().top + window.scrollY;
      jH = journey.offsetHeight;
      nodes = Array.from(journey.querySelectorAll<HTMLElement>(".jnode")).map((el) => {
        const sec = el.closest(".jsec") as HTMLElement;
        return { el, top: sec.offsetTop + el.offsetTop + 10 };
      });
    };
    // Geometry is measured in build() (on resize), not on every scroll event;
    // scroll work is batched to one update per frame.
    const update = () => {
      ticking = false;
      const read = window.scrollY + window.innerHeight * 0.45 - jTop;
      const f = Math.max(0, Math.min(read, jH));
      fill.style.height = f + "px";
      nodes.forEach((n) => n.el.classList.toggle("on", f >= n.top));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    build();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => {
      build();
      onScroll();
    });
    ro.observe(journey);

    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="journey" ref={ref}>
      <span className="rail" />
      <span className="rail-fill" ref={fillRef} />
      {children}
    </div>
  );
}
