import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import StatusBadge from "@/components/StatusBadge";
import type { Experience } from "@/content/types";
import { experience } from "@/content";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Devansh's work history — Founding Engineer at Be Educated (production LMS), Summer Research Intern at IIT BHU (model distillation), and ImpactBridge.",
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Experience · Devansh",
    description:
      "Production engineering at Be Educated, research at IIT BHU, and more.",
    url: "/experience",
    images: ["/opengraph-image"],
  },
};

function ExperienceDetail({ e }: { e: Experience }) {
  return (
    <article className="grid grid-cols-1 gap-6 border-t border-line py-10 last:border-b sm:grid-cols-[1fr_auto] sm:items-start">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-display text-[26px] font-semibold tracking-[-0.01em]">
            {e.company}
          </h2>
          {e.badge && <StatusBadge status={e.status} label={e.badge} />}
        </div>
        {e.role && <div className="mt-1.5 text-[15px] font-medium">{e.role}</div>}
        {e.url && (
          <a
            href={e.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block font-mono text-[11px] text-accent hover:underline"
          >
            {e.url.replace(/^https?:\/\//, "")} ↗
          </a>
        )}

        {e.bullets.length > 0 ? (
          <ul className="mt-4 max-w-[64ch] space-y-2.5">
            {e.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-[15.5px] leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 italic text-muted">Details coming soon.</p>
        )}
      </div>

      <div className="whitespace-nowrap text-left sm:text-right">
        <div className="font-mono text-xs tracking-[0.02em]">{e.period}</div>
        <div className="mt-1 font-mono text-[11px] text-muted">{e.location}</div>
      </div>
    </article>
  );
}

export default function ExperiencePage() {
  return (
    <main className="mx-auto max-w-prose px-8 py-14">
      <header className="mb-8">
        <Eyebrow icon="experience" label="Experience" />
        <h1 className="font-display text-[clamp(44px,8vw,84px)] font-black leading-[0.98] tracking-[-0.02em]">
          Where I&apos;ve shipped<span className="text-accent">.</span>
        </h1>
        <p className="mt-4 max-w-[60ch] text-[15.5px] text-muted">
          Three roles — production engineering, funded research, and an
          internship in progress.
        </p>
      </header>

      <div>
        {experience.map((e) => (
          <ExperienceDetail key={e.slug} e={e} />
        ))}
      </div>
    </main>
  );
}
