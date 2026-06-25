import Icon, { type IconName } from "./Icon";

/** Section eyebrow: monoline icon + mono uppercase label, in the accent color. */
export default function Eyebrow({
  icon,
  label,
  className = "",
}: {
  icon: IconName;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`mb-[18px] flex items-center gap-[9px] font-mono text-[11.5px] uppercase tracking-[0.16em] text-accent ${className}`}
    >
      <Icon name={icon} className="h-4 w-4 shrink-0" />
      {label}
    </div>
  );
}
