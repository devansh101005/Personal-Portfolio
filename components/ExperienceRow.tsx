import StatusBadge from "./StatusBadge";
import type { Experience } from "@/content/types";

/** A single experience row: company + badge + role + summary, dates/location right-aligned (§1B). */
export default function ExperienceRow({ e }: { e: Experience }) {
  return (
    <div className="group grid grid-cols-1 gap-6 border-t border-line py-[22px] last:border-b sm:grid-cols-[1fr_auto] sm:items-start">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-[23px] font-semibold tracking-[-0.01em] transition-colors group-hover:text-accent">
            {e.company}
          </span>
          {e.badge && <StatusBadge status={e.status} label={e.badge} />}
        </div>
        {e.role && <div className="mt-1.5 text-[14.5px] font-medium">{e.role}</div>}
        <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted">{e.summary}</p>
      </div>
      <div className="whitespace-nowrap text-left sm:text-right">
        <div className="font-mono text-xs tracking-[0.02em]">{e.period}</div>
        <div className="mt-1 font-mono text-[11px] text-muted">{e.location}</div>
      </div>
    </div>
  );
}
