import type { Config } from "tailwindcss";

// Semantic tokens map to the CSS variables defined in app/globals.css (§2).
// Names are chosen to avoid clashing with Tailwind's own `text-*` / `border` utilities:
//   bg-bg, bg-surface, text-ink, text-muted, text-accent, border-line, border-line-strong
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--text)",
        muted: "var(--muted)",
        line: "var(--border)",
        "line-strong": "var(--border-strong)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        // Large decorative glyphs (the "." in Devansh. etc.) keep the brand hex.
        "accent-fill": "var(--accent)",
      },
      // `text-accent` uses the AA-safe text shade; bg-/border-accent keep --accent.
      textColor: {
        accent: "var(--accent-ink)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "1080px",
      },
    },
  },
  plugins: [],
};

export default config;
