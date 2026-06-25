import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import { profile } from "@/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Devansh — email devanshpandeyji4321@gmail.com, or find him on GitHub, Twitter/X, LinkedIn and Hashnode.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Devansh",
    description: "Email and socials for Devansh.",
    url: "/contact",
    images: ["/opengraph-image"],
  },
};

const channels: { label: string; value: string; href: string }[] = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  {
    label: "GitHub",
    value: profile.socials.github.replace(/^https?:\/\//, ""),
    href: profile.socials.github,
  },
  { label: "Twitter / X", value: "", href: profile.socials.twitter },
  { label: "LinkedIn", value: "", href: profile.socials.linkedin },
  { label: "Hashnode", value: "", href: profile.socials.hashnode },
];

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-prose px-8 py-14">
      <header className="mb-10">
        <Eyebrow icon="contact" label="Contact" />
        <h1 className="font-display text-[clamp(44px,8vw,84px)] font-black leading-[0.98] tracking-[-0.02em]">
          Let&apos;s talk<span className="text-accent">.</span>
        </h1>
        <p className="mt-4 max-w-[58ch] text-[15.5px] text-muted">
          Recruiting, building something, or just want to compare notes — email
          is the fastest way to reach me.
        </p>
      </header>

      <ul className="border-y border-line">
        {channels.map((c) => {
          const live = c.href && c.href !== "#";
          return (
            <li
              key={c.label}
              className="flex items-center justify-between gap-4 border-b border-line py-5 last:border-b-0"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                {c.label}
              </span>
              {live ? (
                <a
                  href={c.href}
                  target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="font-display text-[clamp(18px,2.4vw,26px)] font-semibold tracking-[-0.01em] transition-colors hover:text-accent"
                >
                  {c.value || c.label} ↗
                </a>
              ) : (
                <span className="font-mono text-xs text-muted">Coming soon</span>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
