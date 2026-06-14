import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest): Promise<Response> {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  if (!q.trim()) return new Response("Missing q", { status: 400 });

  const CACHE = "public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=86400";

  // Try Wikipedia first
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "IdealPick/1.0 (https://idealpick.vercel.app; contact: kjoong1016@gmail.com)",
        "Api-User-Agent": "IdealPick/1.0 (https://idealpick.vercel.app)",
      },
    });
    if (res.ok) {
      const data = await res.json() as { thumbnail?: { source: string } };
      const src = data.thumbnail?.source;
      if (src) {
        return new Response(null, { status: 302, headers: { Location: src, "Cache-Control": CACHE } });
      }
    }
  } catch {}

  // Fallback: Jikan (MyAnimeList) character search — handles anime characters Wikipedia can't show
  try {
    const jikanUrl = `https://api.jikan.moe/v4/characters?q=${encodeURIComponent(q)}&limit=1`;
    const jikanRes = await fetch(jikanUrl);
    if (jikanRes.ok) {
      const jikanData = await jikanRes.json() as {
        data?: Array<{ images?: { jpg?: { image_url?: string } } }>;
      };
      const imgUrl = jikanData.data?.[0]?.images?.jpg?.image_url;
      if (imgUrl) {
        return new Response(null, { status: 302, headers: { Location: imgUrl, "Cache-Control": CACHE } });
      }
    }
  } catch {}

  return new Response("No image", { status: 404 });
}
