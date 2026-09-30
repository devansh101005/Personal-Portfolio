import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import GithubHeatmap from "@/components/GithubHeatmap";
import HeroAsciiField from "@/components/HeroAsciiField";
import { education } from "@/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Devansh, a full-stack engineer (B.Tech CSE '27) who works across backend and ML/deep learning, and is now getting into distributed systems.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · Devansh",
    description:
      "Backend, ML and deep learning, and now distributed systems.",
    url: "/about",
    images: ["/opengraph-image"],
  },
};

// One quiet line instead of the old PROFILE card (removed at Devansh's request).
// College name intentionally not shown (privacy, Devansh Sep 2026).
const facts = ["B.Tech CSE", `Class of ${education.classOf}`];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-prose px-8">
      <header className="border-b border-line py-[72px]">
        <Eyebrow icon="about" label="About" />
        <h1 className="font-display text-[clamp(44px,8vw,88px)] font-black leading-[0.98] tracking-[-0.02em]">
          Engineer first,
          <br />
          researcher on purpose.
        </h1>
      </header>

      <section className="grid grid-cols-1 gap-14 border-b border-line py-16 lg:grid-cols-[1.45fr_1fr]">
        <div>
          <Reveal variant="left">
            <p className="max-w-[24ch] font-display text-[clamp(23px,3vw,31px)] font-semibold leading-[1.34] tracking-[-0.01em] first-letter:float-left first-letter:mr-3 first-letter:mt-1.5 first-letter:font-black first-letter:text-[3.4em] first-letter:leading-[0.78] first-letter:text-accent">
              I like building the parts that have to work, then going deeper where
              the problems get hard.
            </p>
          </Reveal>
          <div className="mt-8 space-y-[18px] text-[17px] leading-relaxed">
            <p className="max-w-[58ch]">
              I work across backend and ML, and I like it most when the two
              meet. On the backend I&apos;ve built payments, logins, exam engines
              and job queues, the parts that just have to work. The clearest
              example is <span className="text-accent">Be Educated</span>, the
              full platform I built on my own for a JEE/NEET coaching institute.
            </p>
            <p className="max-w-[58ch]">
              ML and deep learning are the other half. At IIT BHU I built
              LightDep, a 3.96 MB distilled model for depression screening that
              runs in a browser, and the paper got accepted at IEEE ANTS 2026. I
              also built the cross-attention module for BioX-DTI, a drug–target
              interaction model accepted at IEEE TENCON 2026, and a RAG system
              for Indian legal documents.
            </p>
            <p className="max-w-[58ch]">
              Lately I&apos;ve been getting into distributed systems. I&apos;ve
              built a job queue, a distributed lock service and a rate limiter on
              Redis, mostly to see what breaks when things have to scale.
            </p>
            <p className="max-w-[58ch]">
              I care about honest engineering: real numbers, verifiable claims,
              and systems that hold up when someone actually depends on them.
            </p>
          </div>
          <p className="mt-9 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11.5px] uppercase tracking-[0.08em] text-muted">
            {facts.map((f, i) => (
              <span key={f}>
                {f}
                {i < facts.length - 1 && <span className="ml-3 text-line-strong">·</span>}
              </span>
            ))}
          </p>
        </div>

        {/* Same ASCII field as the home hero (cursor spotlight on hover). Desktop only. */}
        <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <Reveal variant="right">
            <HeroAsciiField className="ml-auto h-[380px] w-[380px]" />
          </Reveal>
        </aside>
      </section>

      <section className="border-b border-line py-16">
        <GithubHeatmap username="devansh101005" />
      </section>

      <section className="border-b border-line py-16">
        <blockquote className="max-w-[24ch] font-display text-[clamp(26px,4vw,40px)] font-semibold leading-[1.22] tracking-[-0.015em]">
          <span className="text-accent">&ldquo;</span>If a claim can&apos;t be
          checked, it doesn&apos;t belong on the page.
          <span className="text-accent">&rdquo;</span>
        </blockquote>
        <cite className="mt-5 block font-mono text-xs uppercase not-italic tracking-[0.06em] text-muted">
          How I think about building
        </cite>
      </section>

      <section className="py-16">
        <Eyebrow icon="spark" label="Outside the editor" />
        <h2 className="mb-4 font-display text-[clamp(26px,4vw,38px)] font-black tracking-[-0.01em]">
          A few other things
        </h2>
        <p className="max-w-[60ch] text-[17px]">
          When I&apos;m not shipping, I&apos;m usually deep in a quiz set or
          reading about Indian civilizational history. Honestly, it&apos;s the
          same habit as engineering: chasing the details until they&apos;re
          exactly right.
        </p>
        <Link href="/contact" className="viewall mt-10 inline-block">
          Get in touch →
        </Link>
      </section>
    </main>
  );
}
