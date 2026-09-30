import { ImageResponse } from "next/og";
import { loadGoogleFont, OG } from "@/lib/og";

// Static export (Cloudflare Pages): generated once at build time.
export const dynamic = "force-static";

export const alt = "Devansh · Full-stack Engineer";
export const size = OG.size;
export const contentType = OG.contentType;

// Default social card (§10): serif name + monogram on warm-white, accent tick.
export default async function Image() {
  const [serif, mono] = await Promise.all([
    loadGoogleFont(
      "Fraunces",
      900,
      "Devansh. Engineer working across backend, ML and deep learning."
    ),
    loadGoogleFont(
      "JetBrains Mono",
      500,
      "DEVANSH / PORTFOLIO Dv. SHIV NADAR UNIVERSITY · B.TECH CSE '27"
    ),
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
            color: OG.muted,
            fontFamily: monoFamily,
          }}
        >
          <span>DEVANSH / PORTFOLIO</span>
          <span style={{ color: OG.accent }}>Dv.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 150, fontWeight: 900, letterSpacing: -4, lineHeight: 1 }}>
            Devansh
            <span style={{ color: OG.accent }}>.</span>
          </div>
          <div style={{ display: "flex", maxWidth: 940, marginTop: 24, fontSize: 40, lineHeight: 1.3 }}>
            Engineer working across backend, ML and deep learning.
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
          SHIV NADAR UNIVERSITY · B.TECH CSE &#39;27
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
