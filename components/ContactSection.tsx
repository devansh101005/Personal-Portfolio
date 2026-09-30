import { Mail, Hash } from "lucide-react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import ContactCat from "./ContactCat";
import { profile } from "@/content";

// set false to remove the easter-egg cat
const SHOW_CONTACT_CAT = true;

const ICON_CLASS =
  "h-[17px] w-[17px] shrink-0 text-muted transition-colors group-hover:text-accent";

// lucide 1.x dropped the brand icons, so GitHub / LinkedIn are inline marks.
function RowIcon({ k }: { k: string }) {
  switch (k) {
    case "email":
      return <Mail size={17} strokeWidth={1.7} className={ICON_CLASS} aria-hidden />;
    case "hashnode":
      return <Hash size={17} strokeWidth={1.7} className={ICON_CLASS} aria-hidden />;
    case "github":
      return (
        <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 .5C5.37.5 0 5.78 0 12.292c0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.297-.54-1.497.105-3.121 0 0 1.005-.31 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.519 3.285-1.209 3.285-1.209.645 1.624.24 2.824.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.561C20.565 21.917 24 17.495 24 12.292 24 5.78 18.627.5 12 .5z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      );
    default:
      return null;
  }
}

const rows = [
  { k: "email", label: "Email", desc: profile.email, href: `mailto:${profile.email}`, ext: false },
  { k: "github", label: "GitHub", desc: "Where the code lives", href: profile.socials.github, ext: true },
  { k: "linkedin", label: "LinkedIn", desc: "The formal version", href: profile.socials.linkedin, ext: true },
  { k: "hashnode", label: "Hashnode", desc: "Long-form, when I write it", href: profile.socials.hashnode, ext: true },
];

/** Home Contact section (REVISION-04): left-aligned, labeled hairline rows. */
export default function ContactSection() {
  return (
    <section className="mx-auto max-w-prose px-8 py-24">
      <Reveal variant="up">
        <Eyebrow icon="contact" label="Contact" />
        <h2 className="font-display text-[clamp(36px,6vw,52px)] font-black leading-[1.04] tracking-[-0.02em]">
          My inbox is open.
        </h2>
        <p className="mt-5 max-w-[480px] font-display text-[19px] font-medium leading-[1.5] text-muted">
          Whether it&apos;s a role, a project, or a question about something I
          built, I&apos;ll reply.
        </p>

        <div className="mt-9">
          {rows.map((r) => (
            <a
              key={r.k}
              href={r.href}
              {...(r.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center gap-4 border-t border-line py-[17px] last:border-b"
            >
              <RowIcon k={r.k} />
              <span className="w-[92px] shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-muted transition-colors group-hover:text-accent sm:w-[150px]">
                {r.label}
              </span>
              <span className="min-w-0 flex-1 break-words font-display text-[clamp(15px,2vw,19px)] font-medium tracking-[-0.01em]">
                {r.desc}
              </span>
              <span className="ml-2 shrink-0 font-mono text-muted transition-all group-hover:translate-x-1 group-hover:text-accent">
                →
              </span>
            </a>
          ))}
        </div>

        <p className="mt-8 font-mono text-[12.5px] leading-relaxed text-muted">
          When I&apos;m not shipping: quizzing, Indian history rabbit holes, and
          the occasional build log on Hashnode.
        </p>

        {SHOW_CONTACT_CAT && (
          <div className="mt-8 flex justify-end">
            <ContactCat />
          </div>
        )}
      </Reveal>
    </section>
  );
}
