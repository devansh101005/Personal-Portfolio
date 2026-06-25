import Monogram from "./Monogram";

/** The PROFILE spec/ID card (§1B): titled card with key-above-value cells in a 2-col grid. */
export default function ProfileCard({
  items,
}: {
  items: { k: string; v: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      <div className="flex items-center justify-between px-4 py-[13px]">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
          Profile
        </span>
        <Monogram className="text-base" />
      </div>
      <div className="grid grid-cols-2">
        {items.map((it) => (
          <div
            key={it.k}
            className="border-t border-line px-4 py-[15px] [&:nth-child(odd)]:border-r"
          >
            <div className="mb-[7px] font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
              {it.k}
            </div>
            <div className="font-display text-[15.5px] font-semibold leading-tight tracking-[-0.01em]">
              {it.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
