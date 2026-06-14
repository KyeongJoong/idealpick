import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllTournaments, getTournament } from "@/lib/tournaments";
import ResultContent from "@/components/ResultContent";

export function generateStaticParams() {
  return getAllTournaments().map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const t = getTournament(params.id);
  if (!t) return { title: "Result | Ideal Pick" };
  return {
    title: `My ${t.title} Result | Ideal Pick`,
    description: `See who won the ${t.title}! Play and find your ultimate favourite.`,
  };
}

export default function ResultPage({ params }: { params: { id: string } }) {
  const tournament = getTournament(params.id);
  if (!tournament) notFound();
  const others = getAllTournaments().filter((t) => t.id !== params.id).slice(0, 4);
  return <ResultContent tournament={tournament} others={others} />;
}
