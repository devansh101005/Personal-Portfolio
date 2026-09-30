import type { Metadata } from "next";
import { ResumeRequestBody } from "@/components/ResumeRequest";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Request Devansh's resume by email. Full-stack engineer working across backend, ML and deep learning, B.Tech CSE '27.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Resume · Devansh",
    description: "Request Devansh's resume by email.",
    url: "/resume",
    images: ["/opengraph-image"],
  },
};

// The resume is shared on request (Devansh's choice), not as a public PDF.
// Clicking any "Resume" link opens the same content in a small dialog
// (components/ResumeRequest.tsx); this page covers direct visits and no-JS.
export default function ResumePage() {
  return (
    <main className="mx-auto max-w-prose px-8 py-20">
      <div className="max-w-[560px] rounded-xl border border-line bg-surface p-8 sm:p-10">
        <ResumeRequestBody headingLevel="h1" />
      </div>
    </main>
  );
}
