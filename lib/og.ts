import { readFile } from "fs/promises";
import path from "path";

/**
 * Fonts for ImageResponse (Satori needs ttf/otf/woff, not woff2). Bundled in
 * app/fonts/og (downloaded once from Google Fonts) so building the share
 * images never depends on reaching Google: a Cloudflare build broke when
 * Google served unexpected font URLs. Returns null on failure so OG
 * generation falls back to a default font instead of breaking the build.
 * (Name kept for the existing call sites; `text` is no longer needed.)
 */
const OG_FONTS: Record<string, string> = {
  "Fraunces:900": "fraunces-900.woff",
  "JetBrains Mono:500": "jetbrains-mono-500.woff",
};

export async function loadGoogleFont(
  family: string,
  weight: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _text?: string
): Promise<ArrayBuffer | null> {
  const file = OG_FONTS[`${family}:${weight}`];
  if (!file) return null;
  try {
    const buf = await readFile(path.join(process.cwd(), "app", "fonts", "og", file));
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
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
