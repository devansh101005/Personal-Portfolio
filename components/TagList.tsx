/** Bordered mono pill tags for tech stacks (never bright-filled — §5). */
export default function TagList({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-[7px] ${className}`}>
      {items.map((t) => (
        <span
          key={t}
          className="rounded border border-line px-[9px] py-1 font-mono text-[11px] text-muted"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
