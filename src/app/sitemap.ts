import type { MetadataRoute } from "next";
import { getAllTournaments } from "@/lib/tournaments";

const BASE = "https://idealpick.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const tournaments = getAllTournaments();
  const now = new Date();

  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    ...tournaments.map((t) => ({
      url: `${BASE}/play/${t.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
