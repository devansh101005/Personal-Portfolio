/**
 * Loads a Google font as a TTF ArrayBuffer for use in ImageResponse (Satori
 * needs ttf/otf/woff — not woff2). The old MSIE User-Agent makes Google serve
 * truetype. Returns null on any failure so OG generation never breaks the build
 * (it falls back to the default font).
 */
export async function loadGoogleFont(
  family: string,
  weight: number,
  text: string
): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(
      / /g,
      "+"
    )}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (
      await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
        },
      })
    ).text();
    // Satori supports woff/ttf/otf (not woff2). Google returns woff for subset requests.
    const match = css.match(/src:\s*url\(([^)]+)\)\s*format\('(?:woff|truetype|opentype)'\)/);
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

// Shared palette for OG images (kept literal — ImageResponse can't read CSS vars).
export const OG = {
  bg: "#FBFAF8",
  ink: "#1A1A1A",
  muted: "#6B6B6B",
  accent: "#CB6843",
  size: { width: 1200, height: 630 },
  contentType: "image/png",
} as const;
