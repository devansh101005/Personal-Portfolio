"use client";

import Link from "next/link";
import { useRef, type MouseEvent, type ReactNode } from "react";

/** CTA that leans toward the cursor (§1B). Subtle; off for touch / reduced-motion. */
export default function MagneticButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!matchMedia("(pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.45}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const base =
    "inline-flex items-center rounded-md px-[22px] py-[13px] font-mono text-xs uppercase tracking-[0.06em] transition-all";
  const styles =
    variant === "primary"
      ? "border border-ink bg-ink text-bg hover:border-accent hover:bg-accent hover:text-white"
      : "border border-line-strong text-ink hover:border-muted";

  return (
    <Link
      href={href}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${styles}`}
    >
      {children}
    </Link>
  );
}
