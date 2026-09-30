/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for Cloudflare Pages: `next build` writes plain HTML/CSS/JS
  // to /out. Every route here is already static; the GitHub heatmap refreshes
  // on each rebuild (a nightly GitHub Action triggers one — see README).
  output: "export",
  // /about -> /about/index.html. Pages and asset folders share names
  // (e.g. /projects/be-educated/ holds both the page and its images), so
  // folder-style URLs resolve reliably on any static host.
  trailingSlash: true,
  // No image-optimization server on a static host. Our images are already
  // small, pre-cropped WebP files, so serving them as-is costs very little.
  images: { unoptimized: true },
  // Inline the (small) global CSS into the HTML: removes the render-blocking
  // stylesheet request Lighthouse flagged (~0.9s on mobile).
  experimental: { inlineCss: true },
};

export default nextConfig;
