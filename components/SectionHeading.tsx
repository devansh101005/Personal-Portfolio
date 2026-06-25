import Link from "next/link";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import type { IconName } from "./Icon";

/**
 * Section header: icon eyebrow + serif title (wipes in) + optional "view all →".
 * `as` lets a page promote the title to <h1> where it's the page's real title.
 */
export default function SectionHeading({
  icon,
  eyebrow,
  title,
  as = "h2",
  viewAllHref,
  viewAllLabel = "View all →",
  className = "",
}: {
  icon: IconName;
  eyebrow: string;
  title: string;
  as?: "h1" | "h2";
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={`mb-9 flex flex-wrap items-baseline justify-between gap-3 ${className}`}
    >
      <div>
        <Eyebrow icon={icon} label={eyebrow} />
        <Reveal
          variant="wipe"
          as={as}
          className="font-display text-[clamp(30px,4.4vw,44px)] font-black leading-[1.04] tracking-[-0.01em]"
        >
          {title}
        </Reveal>
      </div>
      {viewAllHref && (
        <Link href={viewAllHref} className="viewall">
          {viewAllLabel}
        </Link>
      )}
    </div>
  );
}
