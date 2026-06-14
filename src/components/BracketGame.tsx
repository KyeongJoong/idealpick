"use client";

import { useRouter } from "next/navigation";
import { useReducer, useEffect, useState } from "react";
import {
  createGame, currentMatchup, pick, getProgress, isFinished, getWinner,
  type GameState, type Contestant,
} from "@/lib/worldcup";
import type { TournamentMeta } from "@/lib/tournaments";
import Link from "next/link";

function ContestantCard({ c, onClick, side }: { c: Contestant; onClick: () => void; side: "left" | "right" }) {
  const [err, setErr] = useState(false);
  const anim = side === "left" ? "animate-slideLeft" : "animate-slideRight";
  return (
    <button
      onClick={onClick}
      className={`group relative flex-1 flex flex-col overflow-hidden rounded-2xl bg-white shadow-card hover:shadow-hover transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${anim}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-brand-indigo/20 to-brand-amber/20">
        {err ? (
          <div className="flex h-full w-full items-center justify-center text-6xl font-black text-brand-indigo/30 select-none">
            {c.name.charAt(0)}
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.image} alt={c.name} loading="lazy" onError={() => setErr(true)}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
        )}
      </div>
      <div className="p-3 text-center">
        <p className="font-bold text-sm text-brand-ink leading-tight">{c.name}</p>
        {c.nameKo && <p className="text-xs text-brand-gray mt-0.5">{c.nameKo}</p>}
      </div>
      <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-4 ring-brand-indigo/40 transition-all pointer-events-none" />
    </button>
  );
}

function reducer(state: GameState, action: { type: "pick"; side: "left" | "right" }): GameState {
  return pick(state, action.side);
}

export default function BracketGame({ tournament }: { tournament: TournamentMeta }) {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, null, () => createGame(tournament.contestants));
  const [navigated, setNavigated] = useState(false);

  useEffect(() => {
    if (navigated) return;
    if (isFinished(state)) {
      const w = getWinner(state);
      if (w) {
        setNavigated(true);
        router.push(`/result/${tournament.id}?name=${encodeURIComponent(w.name)}&img=${encodeURIComponent(w.image)}`);
      }
    }
  }, [state, navigated, router, tournament.id]);

  const matchup = currentMatchup(state);
  const progress = getProgress(state);

  if (!matchup) return <div className="flex min-h-screen items-center justify-center text-brand-gray">Loading result…</div>;

  return (
    <main className="mx-auto max-w-lg px-4 pb-10 pt-6">
      <div className="flex items-center gap-3 mb-4">
        <Link href="/" className="text-sm text-brand-gray hover:text-brand-indigo">← All Games</Link>
        <h1 className="flex-1 text-sm font-bold text-brand-ink truncate min-w-0">{tournament.title}</h1>
      </div>

      <div className="text-center mb-4">
        <span className="inline-block rounded-full bg-brand-indigo text-white text-xs font-bold px-4 py-1.5">
          {progress.roundLabel} · Match {progress.matchInRound} / {progress.matchesInRound}
        </span>
      </div>

      <div className="w-full h-1.5 rounded-full bg-brand-indigoLight mb-6 overflow-hidden">
        <div className="h-full rounded-full bg-brand-indigo transition-all duration-500" style={{ width: `${progress.percent}%` }} />
      </div>

      <p className="text-center text-xs font-bold text-brand-gray mb-3 tracking-widest">PICK YOUR FAVOURITE ↓</p>

      <div className="flex gap-3 items-stretch">
        <ContestantCard c={matchup.left}  side="left"  onClick={() => dispatch({ type: "pick", side: "left" })} />
        <div className="flex items-center justify-center shrink-0">
          <span className="text-xl font-black text-brand-gray">VS</span>
        </div>
        <ContestantCard c={matchup.right} side="right" onClick={() => dispatch({ type: "pick", side: "right" })} />
      </div>

      <p className="mt-4 text-center text-xs text-brand-gray/50">
        {progress.totalMatches - progress.completedMatches} matches left
      </p>
    </main>
  );
}
