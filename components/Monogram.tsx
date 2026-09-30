/**
 * The "Dv." monogram with the accent period — used in nav and footer.
 * `expandable`: on hover/focus of the parent `.group`, the hidden letters slide
 * out so "Dv." becomes "Devansh." (nav only). Pure CSS, see `.mono-x`.
 */
export default function Monogram({
  className = "",
  expandable = false,
}: {
  className?: string;
  expandable?: boolean;
}) {
  if (!expandable) {
    return (
      <span className={`font-display font-black tracking-[-0.02em] ${className}`} aria-label="Devansh">
        Dv<span className="text-accent-fill">.</span>
      </span>
    );
  }
  return (
    <span className={`font-display font-black tracking-[-0.02em] ${className}`}>
      <span className="sr-only">Devansh, home</span>
      <span aria-hidden className="inline-flex items-baseline">
        D<span className="mono-x mono-x-1">e</span>v<span className="mono-x mono-x-4">ansh</span>
        <span className="text-accent-fill">.</span>
      </span>
    </span>
  );
}
