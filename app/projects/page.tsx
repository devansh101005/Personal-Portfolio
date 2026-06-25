import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import CompactProjectCard from "@/components/CompactProjectCard";
import {
  productionProjects,
  experimentProjects,
  personalToolProjects,
  guidedProjects,
} from "@/content";
import type { Project } from "@/content/types";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Devansh — shipped production work and original systems, experiments, a personal tool, and guided learning builds.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects · Devansh",
    description:
      "Shipped production work, original systems, experiments, and learning builds.",
    url: "/projects",
    images: ["/opengraph-image"],
  },
};

function GroupHeader({
  label,
  title,
  blurb,
}: {
  label: string;
  title: string;
  blurb: string;
}) {
  return (
    <>
      <Eyebrow icon="projects" label={label} />
      <Reveal
        variant="wipe"
        as="h2"
        className="font-display text-[clamp(28px,4vw,40px)] font-black leading-[1.05] tracking-[-0.01em]"
      >
        {title}
      </Reveal>
      <p className="mb-9 mt-3 max-w-[62ch] text-[15.5px] text-muted">{blurb}</p>
    </>
  );
}

function FullGrid({ items }: { items: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
      {items.map((p, i) => (
        <Reveal key={p.slug} variant={i % 2 === 0 ? "left" : "right"}>
          <ProjectCard p={p} />
        </Reveal>
      ))}
    </div>
  );
}

function CompactGrid({ items }: { items: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <Reveal key={p.slug} variant="up">
          <CompactProjectCard p={p} />
        </Reveal>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-prose px-8 py-14">
      <header className="mb-10">
        <h1 className="font-display text-[clamp(44px,8vw,84px)] font-black leading-[0.98] tracking-[-0.02em]">
          Projects<span className="text-accent">.</span>
        </h1>
        <p className="mt-4 max-w-[60ch] text-[15.5px] text-muted">
          Organized by what each one is — shipped products and original systems
          first, then experiments, a personal tool, and guided learning builds.
        </p>
      </header>

      {/* Group A */}
      <section className="border-t border-line py-14">
        <GroupHeader
          label="Production & Systems Work"
          title="Production & systems work"
          blurb="Shipped products and original systems — the work I'd put my name on."
        />
        <FullGrid items={productionProjects} />
      </section>

      {/* Group B */}
      <section className="border-t border-line py-14">
        <GroupHeader
          label="Experiments"
          title="Experiments"
          blurb="Smaller builds for learning and exploration."
        />
        <CompactGrid items={experimentProjects} />
      </section>

      {/* Group C */}
      <section className="border-t border-line py-14">
        <GroupHeader
          label="A Tool I Built for Myself"
          title="A tool I built for myself"
          blurb="Built to scratch my own itch — and to feed my Tech Twitter. A personal-use tool, not a product."
        />
        <CompactGrid items={personalToolProjects} />
      </section>

      {/* Group D */}
      <section className="border-t border-line py-14">
        <GroupHeader
          label="Guided Builds (Learning)"
          title="Guided builds"
          blurb="Projects I built by following tutorials to learn new stacks. Included for completeness — the original work is above."
        />
        <CompactGrid items={guidedProjects} />
      </section>
    </main>
  );
}
