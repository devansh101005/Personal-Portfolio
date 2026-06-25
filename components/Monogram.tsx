/** The "Dv." monogram with the accent period — used in nav, footer, ID card. */
export default function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display font-black tracking-[-0.02em] ${className}`}
      aria-label="Devansh"
    >
      Dv<span className="text-accent">.</span>
    </span>
  );
}
