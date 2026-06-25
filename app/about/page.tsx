import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import ProfileCard from "@/components/ProfileCard";
import GithubHeatmap from "@/components/GithubHeatmap";
import { profile, education } from "@/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Devansh — a backend-leaning full-stack engineer (Shiv Nadar University, B.Tech CSE '27) closing an ML-depth gap on purpose through research at IIT BHU.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · Devansh",
    description:
      "A backend-leaning full-stack engineer closing an ML-depth gap on purpose.",
    url: "/about",
    images: ["/opengraph-image"],
  },
};

const profileItems = [
  { k: "Education", v: education.school },
  { k: "Degree", v: "B.Tech CSE" },
  { k: "Class of", v: education.classOf },
  { k: "Focus", v: education.focus },
  { k: "Based in", v: profile.location },
  { k: "Open to", v: profile.openTo },
];

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

      <section className="grid grid-cols-1 gap-16 border-b border-line py-16 lg:grid-cols-[1.45fr_1fr]">
        <div>
          <Reveal variant="left">
            <p className="max-w-[24ch] font-display text-[clamp(23px,3vw,31px)] font-semibold leading-[1.34] tracking-[-0.01em] first-letter:float-left first-letter:mr-3 first-letter:mt-1.5 first-letter:font-black first-letter:text-[3.4em] first-letter:leading-[0.78] first-letter:text-accent">
              I build software that real people use, then go deeper where the hard
              problems are.
            </p>
          </Reveal>
          <div className="mt-8 space-y-[18px] text-[17px] leading-relaxed">
            <p className="max-w-[58ch]">
              My center of gravity is full-stack and backend integration —
              payments, authentication, exam engines, job queues, the
              unglamorous plumbing that has to work. The clearest example is{" "}
              <span className="text-accent">Be Educated</span>, a production
              ed-tech LMS I built solo and that serves real users today.
            </p>
            <p className="max-w-[58ch]">
              The research internship at IIT BHU is a deliberate move, not a
              detour. I&apos;m closing an ML-depth gap on purpose — compressing
              223M-parameter multimodal models into a 3–5M-parameter student for
              in-browser inference. I treat that depth as something to earn, not
              to claim.
            </p>
            <p className="max-w-[58ch]">
              I care about honest engineering: real numbers, verifiable claims,
              and systems that hold up when someone actually depends on them.
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Reveal variant="right">
            <ProfileCard items={profileItems} />
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
          — How I think about building
        </cite>
      </section>

      <section className="py-16">
        <Eyebrow icon="spark" label="Outside the editor" />
        <h2 className="mb-4 font-display text-[clamp(26px,4vw,38px)] font-black tracking-[-0.01em]">
          A few other things
        </h2>
        <p className="max-w-[60ch] text-[17px]">
          When I&apos;m not shipping, I&apos;m usually deep in a quiz set or
          reading about Indian civilizational history. Both are the same habit,
          really — chasing specifics until they&apos;re precise.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {["Competitive quizzing", "Indian history", "Tech Twitter"].map((t) => (
            <span
              key={t}
              className="rounded border border-line px-[11px] py-[5px] font-mono text-[11px] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
        <Link href="/contact" className="viewall mt-10 inline-block">
          Get in touch →
        </Link>
      </section>
    </main>
  );
}
