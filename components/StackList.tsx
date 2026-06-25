import type { StackGroup } from "@/content/types";

/**
 * Stack as quiet editorial hairline rows (REVISION-02): two columns — a small
 * mono muted category label, and the tools in Fraunces 500 joined by middots.
 * No filled chips, no accent labels. (Project-card tech tags stay as bordered
 * mono pills — that's a different component.)
 */
export default function StackList({ groups }: { groups: StackGroup[] }) {
  return (
    <div>
      {groups.map((g) => (
        <div
          key={g.category}
          className="grid grid-cols-1 gap-1.5 border-t border-line py-4 last:border-b sm:grid-cols-[130px_1fr] sm:gap-6 sm:py-5"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted sm:pt-1">
            {g.category}
          </div>
          <div className="font-display text-[19px] font-medium tracking-[-0.01em]">
            {g.items.map((it, i) => (
              <span key={it}>
                {it}
                {i < g.items.length - 1 && <span className="text-muted"> · </span>}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
