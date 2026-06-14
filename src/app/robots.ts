import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://idealpick.vercel.app/sitemap.xml",
    host: "https://idealpick.vercel.app",
  };
}
