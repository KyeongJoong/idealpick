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
  return {
    title: `${t.title} | Ideal Pick`,
    description: t.description ?? t.titleSub ?? `Pick your favourite in the ${t.title}!`,
    openGraph: {
      title: `${t.title} 🏆`,
      description: `Can you pick the ultimate winner? Play the ${t.title} now!`,
    },
  };
}

export default function PlayPage({ params }: { params: { id: string } }) {
  const tournament = getTournament(params.id);
  if (!tournament) notFound();
  return <BracketGame tournament={tournament} />;
}
