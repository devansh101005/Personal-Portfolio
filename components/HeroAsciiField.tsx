"use client";

import { useEffect, useRef } from "react";

/**
 * THE SIGNATURE (§1B) — a generative ASCII "distillation field" that encodes
 * 223M → 4M: a diffuse cloud of glyphs on the left condenses into a tight,
 * bright accent core on the right (the distilled student). A faint pulse drifts
 * toward the core; hovering lights up + densifies glyphs under the cursor.
 */
export default function HeroAsciiField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    const ramp = "·:+oxX%@";
    const cell = 12;

    let W = 0, H = 0, cols = 0, rows = 0, t = 0, raf = 0;
    let faint = "#E5E2DD", mid = "#6B6B6B", hot = "#CB6843";

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      faint = s.getPropertyValue("--border").trim() || faint;
      mid = s.getPropertyValue("--muted").trim() || mid;
      hot = s.getPropertyValue("--accent").trim() || hot;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = cv.clientWidth || 400;
      cv.width = size * dpr;
      cv.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      W = size;
      H = size;
      cols = Math.ceil(W / cell);
      rows = Math.ceil(H / cell);
      ctx.font = '11px "JetBrains Mono", ui-monospace, monospace';
      ctx.textBaseline = "top";
    };

    // cursor spotlight (fine pointers only)
    let mx = 0, my = 0, tmx = 0, tmy = 0, hover = 0, tHover = 0;
    const radius = 86;
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      tmx = e.clientX - r.left;
      tmy = e.clientY - r.top;
      tHover = 1;
    };
    const onLeave = () => {
      tHover = 0;
    };
    if (fine) {
      cv.addEventListener("pointermove", onMove);
      cv.addEventListener("pointerleave", onLeave);
    }

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      hover += (tHover - hover) * 0.08;
      mx += (tmx - mx) * 0.2;
      my += (tmy - my) * 0.2;
      const coreX = cols * 0.72;
      const coreY = rows * 0.5;
      const sigma = cols * 0.16;
      const pulse = (t * 4) % (cols * 1.4); // sweeps left → core
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const ambient =
            ((Math.sin(x * 0.4 + t) * Math.cos(y * 0.34 - t * 0.7) + 1) / 2) *
            (1 - (x / cols) * 0.55); // diffuse cloud, thins to the right
          const dx = x - coreX;
          const dy = y - coreY;
          const g = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma)); // bright core
          let v = ambient * 0.7 + g * 1.25;
          let glow = 0;
          if (hover > 0.01) {
            const d = Math.hypot(x * cell + cell / 2 - mx, y * cell + cell / 2 - my);
            glow = Math.max(0, 1 - d / radius) * hover;
            v += glow * 0.9;
          }
          v = Math.min(1, v);
          if (v < 0.06) continue;
          const ch = ramp[Math.min(ramp.length - 1, Math.floor(v * (ramp.length - 1)))];
          const onPulse = Math.abs(x - pulse) < 1.1 && x < coreX;
          ctx.fillStyle =
            g > 0.5 || glow > 0.12 ? hot : onPulse ? hot : v > 0.62 ? mid : faint;
          ctx.fillText(ch, x * cell, y * cell);
        }
      }
    };

    const loop = () => {
      t += 0.016;
      render();
      raf = requestAnimationFrame(loop);
    };

    readColors();
    resize();
    if (reduce) {
      t = 2;
      render();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) render();
    });
    ro.observe(cv);

    // recolor when the theme class flips
    const mo = new MutationObserver(() => {
      readColors();
      if (reduce) render();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`block cursor-crosshair ${className}`} />;
}
