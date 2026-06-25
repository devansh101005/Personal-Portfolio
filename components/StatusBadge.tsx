import type { ExperienceStatus } from "@/content/types";

/** Status pill: ● Live (accent) / Research / Pending. */
export default function StatusBadge({
  status,
  label,
}: {
  status: ExperienceStatus;
  label: string;
}) {
  const live = status === "live";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.06em] ${
        live ? "bg-accent-soft text-accent" : "text-muted"
      }`}
    >
      {live && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
      {label}
    </span>
  );
}
