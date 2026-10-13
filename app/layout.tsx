import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ResumeRequest from "@/components/ResumeRequest";
import { SITE, SITE_URL, SOCIALS } from "@/lib/site";

// §2 typography — Fraunces (display, variable weight + optical-size axis),
// Inter (body/UI), JetBrains Mono (labels). Self-hosted from app/fonts (the
// Google Fonts latin files) so builds never depend on fetching from Google:
// a Cloudflare build failed when Google served unexpected font URLs.
// next/font/local still preloads them and adds size-matched fallbacks (no CLS).
const fraunces = localFont({
  src: "./fonts/fraunces-latin.woff2",
  weight: "100 900", // variable; 600/900 applied via CSS, opsz is automatic
  style: "normal",
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "400 600",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: "Arial",
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  weight: "400 500",
  style: "normal",
  variable: "--font-mono",
  display: "swap",
  adjustFontFallback: "Arial",
});

// §10 — everything absolute flows through NEXT_PUBLIC_SITE_URL (metadataBase),
// so moving to a custom domain is one env change.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE.title,
    template: "%s · Devansh",
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: "/",
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
};

// Light loads first; switch to dark only if the user previously chose it. Also
// tags <html> with `.js` so the reveal hidden-states only apply when JS runs.
const noFlashScript = `(function(){try{var e=document.documentElement;e.classList.add('js');if(localStorage.getItem('theme')==='dark'){e.classList.add('dark');}}catch(e){}})();`;

// §10 — Person structured data. Placeholder ("#") socials are filtered out.
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE_URL,
  jobTitle: SITE.jobTitle,
  sameAs: [SOCIALS.github, SOCIALS.linkedin, SOCIALS.hashnode].filter(
    (u) => u && u !== "#"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <ResumeRequest />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </body>
    </html>
  );
}
