import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import PublicationEntry from "@/components/PublicationEntry";
import { publications } from "@/content";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research by Devansh Pandey: two papers accepted at IEEE conferences in 2026. LightDep (IEEE ANTS 2026, joint first author) and BioX-DTI (IEEE TENCON 2026).",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research · Devansh",
    description: "Two papers accepted at IEEE ANTS 2026 and IEEE TENCON 2026.",
    url: "/research",
    images: ["/opengraph-image"],
  },
};

export default function ResearchPage() {
  return (
    <main className="mx-auto max-w-prose px-8 py-14">
      <header className="mb-4">
        <Eyebrow icon="research" label="Research" />
        <h1 className="font-display text-[clamp(44px,8vw,84px)] font-black leading-[0.98] tracking-[-0.02em]">
          Research<span className="text-accent-fill">.</span>
        </h1>
        <p className="mt-4 max-w-[60ch] text-[15.5px] text-muted">
          Two papers accepted at IEEE conferences in 2026.
        </p>
      </header>

      <div className="mt-10 border-b border-line">
        {publications.map((p, i) => (
          <Reveal key={p.slug} variant={i % 2 === 0 ? "left" : "right"}>
            <PublicationEntry p={p} />
          </Reveal>
        ))}
      </div>
    </main>
  );
}
