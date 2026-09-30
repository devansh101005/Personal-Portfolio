// Server component — fetches GitHub contributions at build (revalidates daily)
// and renders a heatmap recolored to the brand's terracotta ramp (light + dark).
// No external dependency. Renders nothing if the API is unavailable.

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

// Terracotta ramp (empty → most active), light / dark. Literal classes so
// Tailwind's content scan generates them.
const LEVEL = [
  "bg-[#E7E3DD] dark:bg-[#232323]",
  "bg-[#F4DDCF] dark:bg-[#4A2E22]",
  "bg-[#E1A985] dark:bg-[#8A4F36]",
  "bg-[#CB6843] dark:bg-[#D98A5F]",
  "bg-[#9E4A2B] dark:bg-[#E8A678]",
];

function fmt(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function GithubHeatmap({ username }: { username: string }) {
  let days: Day[] = [];
  let total = 0;
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      // 4s cap: a slow third-party API must never stall page rendering.
      { next: { revalidate: 86400 }, signal: AbortSignal.timeout(4000) }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      total?: Record<string, number>;
      contributions?: Day[];
    };
    days = data.contributions ?? [];
    total = data.total?.lastYear ?? days.reduce((s, d) => s + d.count, 0);
  } catch {
    return null;
  }
  if (days.length === 0) return null;

  // Group days into week columns (pad the first week's leading days).
  const weeks: (Day | null)[][] = [];
  let week: (Day | null)[] = [];
  days.forEach((d, i) => {
    const wd = new Date(d.date).getUTCDay(); // 0 = Sunday
    if (i === 0 && wd !== 0) for (let p = 0; p < wd; p++) week.push(null);
    week.push(d);
    if (wd === 6) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length) weeks.push(week);

  return (
    <div className="rounded-lg border border-line bg-surface p-6 sm:p-7">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            Contributions
          </div>
          <h2 className="font-display text-[clamp(22px,3vw,28px)] font-black tracking-[-0.01em]">
            Still shipping.
          </h2>
        </div>
        <span className="font-mono text-xs text-muted">
          {total.toLocaleString()} in the last year
        </span>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="flex gap-[3px]">
          {weeks.map((w, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {w.map((d, di) =>
                d ? (
                  <div
                    key={d.date}
                    title={`${d.count === 0 ? "No contributions" : `${d.count} contribution${d.count > 1 ? "s" : ""}`} on ${fmt(d.date)}`}
                    className={`h-[11px] w-[11px] rounded-[2px] ${LEVEL[d.level]}`}
                  />
                ) : (
                  <div key={`pad-${wi}-${di}`} className="h-[11px] w-[11px]" />
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
        <span>Less</span>
        {LEVEL.map((c, i) => (
          <span key={i} className={`h-[11px] w-[11px] rounded-[2px] ${c}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
