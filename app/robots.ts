import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Static export (Cloudflare Pages): generated once at build time.
export const dynamic = "force-static";

// Allow all, point crawlers to the sitemap (§10).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
