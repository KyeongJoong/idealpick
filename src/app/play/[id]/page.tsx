import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllTournaments, getTournament } from "@/lib/tournaments";
import BracketGame from "@/components/BracketGame";

export function generateStaticParams() {
  return getAllTournaments().map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const t = getTournament(params.id);
  if (!t) return { title: "Not Found | Ideal Pick" };
  const BASE = "https://idealpick.vercel.app";
  const count = t.contestants.length;
  const desc =
    t.description ??
    t.titleSub ??
    `${count} options, one champion. Pick your favourite in the ${t.title} bracket tournament!`;
  return {
    title: `${t.title} Worldcup | Ideal Pick`,
    description: desc,
    keywords: [`${t.title} worldcup`, `${t.title} bracket`, "ideal pick", "1v1 game", "who is the best"],
    alternates: { canonical: `${BASE}/play/${t.id}` },
    openGraph: {
      title: `${t.emoji} ${t.title} — Who is the Ultimate Champion?`,
      description: desc,
      url: `${BASE}/play/${t.id}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${t.emoji} ${t.title} Worldcup`,
      description: desc,
    },
  };
}

export default function PlayPage({ params }: { params: { id: string } }) {
  const tournament = getTournament(params.id);
  if (!tournament) notFound();
  return <BracketGame tournament={tournament} />;
}
