import Monogram from "./Monogram";
import { FOOTER_SOCIALS } from "@/lib/site";

/** Simple one-line footer (§1B): monogram · socials · copyright. */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-prose flex-wrap items-center justify-between gap-4 px-8 py-14">
        <Monogram className="text-[22px]" />
        <div className="flex gap-[22px]">
          {FOOTER_SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-[0.03em] text-muted transition-colors hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </div>
        <span className="font-mono text-[11px] tracking-[0.04em] text-muted">
          © {year} Devansh
        </span>
      </div>
    </footer>
  );
}
