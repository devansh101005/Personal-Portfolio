import { ImageResponse } from "next/og";
import { loadGoogleFont, OG } from "@/lib/og";
import { projects, getProject } from "@/content";

// Static export (Cloudflare Pages): generated once at build time.
export const dynamic = "force-static";

export const size = OG.size;
export const contentType = OG.contentType;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Per-project social card (§10).
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  const name = p?.name ?? "Project";
  const oneLiner = p?.oneLiner ?? "";

  const [serif, mono] = await Promise.all([
    loadGoogleFont("Fraunces", 900, `${name} ${oneLiner}`),
    loadGoogleFont("JetBrains Mono", 500, "PROJECT Dv. DEVANSH · PORTFOLIO"),
  ]);
  const serifFamily = serif ? "Fraunces" : "serif";
  const monoFamily = mono ? "JetBrains Mono" : "monospace";

  const fonts = [
    ...(serif ? [{ name: "Fraunces", data: serif, weight: 900 as const, style: "normal" as const }] : []),
    ...(mono ? [{ name: "JetBrains Mono", data: mono, weight: 500 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: OG.bg,
          color: OG.ink,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: serifFamily,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            letterSpacing: 4,
            color: OG.accent,
            fontFamily: monoFamily,
          }}
        >
          <span>PROJECT</span>
          <span>Dv.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 110, fontWeight: 900, letterSpacing: -3, lineHeight: 1 }}>
            {name}
          </div>
          <div style={{ display: "flex", maxWidth: 980, marginTop: 24, fontSize: 34, lineHeight: 1.3, color: OG.muted }}>
            {oneLiner}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            color: OG.muted,
            fontFamily: monoFamily,
          }}
        >
          <span style={{ display: "flex", width: 44, height: 3, background: OG.accent }} />
          DEVANSH · PORTFOLIO
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
