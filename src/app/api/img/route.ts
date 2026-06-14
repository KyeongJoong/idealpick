import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest): Promise<Response> {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  if (!q.trim()) return new Response("Missing q", { status: 400 });

  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`;
    const res = await fetch(url, {
      headers: { "Api-User-Agent": "IdealPick/1.0 (https://idealpick.vercel.app)" },
    });
    if (res.ok) {
      const data = await res.json() as { thumbnail?: { source: string } };
      const src = data.thumbnail?.source;
      if (src) {
        return Response.redirect(src, 302);
      }
    }
  } catch {}

  return new Response("No image", { status: 404 });
}
