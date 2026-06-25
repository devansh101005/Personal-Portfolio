"use client";

import Link from "next/link";
import { useRef, type MouseEvent, type ReactNode } from "react";

/**
 * Project card shell (§5): a 3D tilt layer that leans toward the pointer, with a
 * full-card overlay link for navigation. The overlay is a sibling of any inner
 * links (which sit at `z-10`), so cards can carry their own GitHub/Live links
 * without invalid nested anchors.
 */
export default function TiltCard({
  href,
  ariaLabel,
  children,
}: {
  href: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  const innerRef = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!matchMedia("(pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const inner = innerRef.current;
    if (!inner) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    inner.style.transform = `rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (innerRef.current) innerRef.current.style.transform = "";
  };

  return (
    <article
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-line-strong [perspective:1100px]"
    >
      <div
        ref={innerRef}
        className="relative transition-transform duration-300 will-change-transform [transform-style:preserve-3d]"
      >
        {children}
        <Link
          href={href}
          aria-label={ariaLabel ?? "View project"}
          className="absolute inset-0 z-0"
        />
      </div>
    </article>
  );
}
