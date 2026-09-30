import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ResumeRequest from "@/components/ResumeRequest";
import { SITE, SITE_URL, SOCIALS } from "@/lib/site";

// §2 typography — Fraunces (display, weights 600 + 900 via CSS, high optical
// size), Inter (body/UI), JetBrains Mono (labels). next/font for zero CLS.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable", // variable font; opsz axis requires weight be "variable". 600/900 applied via CSS.
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
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
