import Link from "next/link";
import HeroAsciiField from "@/components/HeroAsciiField";
import JourneySpine from "@/components/JourneySpine";
import SectionHeading from "@/components/SectionHeading";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import SplitWords from "@/components/SplitWords";
import MagneticButton from "@/components/MagneticButton";
import ExperienceRow from "@/components/ExperienceRow";
import ProjectCard from "@/components/ProjectCard";
import StackList from "@/components/StackList";
import GithubHeatmap from "@/components/GithubHeatmap";
import ContactSection from "@/components/ContactSection";
import { profile, experience, productionProjects, stack } from "@/content";

export default function Home() {
  return (
    <main>
      {/* ── HERO ── */}
      <header className="mx-auto grid max-w-prose grid-cols-1 items-center gap-10 px-8 py-[72px] md:grid-cols-[1fr_400px]">
        <div>
          <h1 className="font-display text-[clamp(58px,9.4vw,120px)] font-black leading-[0.95] tracking-[-0.02em]">
            Devansh<span className="text-accent">.</span>
          </h1>
          <p className="mt-6 max-w-[32ch] font-display text-[clamp(21px,2.7vw,29px)] font-semibold leading-[1.38] tracking-[-0.01em]">
            <SplitWords text={profile.positioning} accent="growing depth" />
          </p>
          <p className="mt-4 max-w-[56ch] text-[15.5px] text-muted">{profile.subline}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <MagneticButton href="/projects">View Projects →</MagneticButton>
            <MagneticButton href="/resume" variant="ghost">
              Resume
            </MagneticButton>
            <span className="ml-2 flex gap-[18px]">
              <a
                href={profile.socials.github}
                className="font-mono text-xs text-muted transition-colors hover:text-accent"
              >
                GitHub
              </a>
              <a
                href={profile.socials.twitter}
                className="font-mono text-xs text-muted transition-colors hover:text-accent"
              >
                Twitter
              </a>
              <a
                href={profile.socials.linkedin}
                className="font-mono text-xs text-muted transition-colors hover:text-accent"
              >
                LinkedIn
              </a>
            </span>
          </div>
        </div>
        <HeroAsciiField className="ml-auto hidden h-[400px] w-[400px] md:block" />
      </header>

      {/* ── JOURNEY: About → Experience → Projects ── */}
      <JourneySpine>
        {/* About preview */}
        <section className="jsec">
          <span className="jnode" />
          <Eyebrow icon="about" label="About" />
          <Reveal variant="left" className="max-w-[62ch]">
            <p className="font-display text-[22px] font-semibold leading-[1.45] tracking-[-0.01em] first-letter:float-left first-letter:mr-3 first-letter:mt-1.5 first-letter:font-black first-letter:text-[3.1em] first-letter:leading-[0.8] first-letter:text-accent">
              A backend-leaning full-stack engineer who ships things people
              actually use, now closing an ML-depth gap on purpose.
            </p>
            <p className="mt-4 max-w-[54ch] text-[17px] text-muted">
              Most of my work is production integration — payments, auth, exam
              engines, queues. The IIT BHU research internship is deliberate: a
              focused push into model compression and applied ML, not a pivot
              away from building.
            </p>
            <Link href="/about" className="viewall mt-4 inline-block">
              Read full about →
            </Link>
          </Reveal>
        </section>

        {/* Experience */}
        <section className="jsec">
          <span className="jnode" />
          <SectionHeading
            icon="experience"
            eyebrow="Experience"
            title="Where I've shipped"
            viewAllHref="/experience"
            viewAllLabel="All experience →"
          />
          <div>
            {experience.map((e) => (
              <ExperienceRow key={e.slug} e={e} />
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section className="jsec">
          <span className="jnode" />
          <SectionHeading
            icon="projects"
            eyebrow="Featured Projects"
            title="Production & systems work"
            viewAllHref="/projects"
            viewAllLabel="All projects →"
          />
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            {productionProjects.slice(0, 2).map((p, i) => (
              <Reveal key={p.slug} variant={i % 2 === 0 ? "left" : "right"}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* Activity — the spine ends on the "still shipping" evidence */}
        <section className="jsec">
          <span className="jnode" />
          <GithubHeatmap username="devansh101005" />
        </section>
      </JourneySpine>

      {/* ── STACK ── */}
      <section className="mx-auto max-w-prose px-8 py-16">
        <Eyebrow icon="stack" label="Stack" />
        <Reveal variant="up">
          <StackList groups={stack} />
        </Reveal>
      </section>

      {/* ── CONTACT ── */}
      <ContactSection />
    </main>
  );
}
