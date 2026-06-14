"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import type { TournamentMeta } from "@/lib/tournaments";

function Inner({ tournament, others }: { tournament: TournamentMeta; others: TournamentMeta[] }) {
  const sp = useSearchParams();
  const winnerName = sp.get("name") ?? "Your Champion";
  const winnerImg  = sp.get("img")  ?? "";
  const [imgErr, setImgErr] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `🏆 My winner in "${tournament.title}" is: ${winnerName}!\n\nPlay at → https://idealpick.vercel.app/play/${tournament.id}`;

  function copyShare() {
    navigator.clipboard.writeText(shareText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="mx-auto max-w-lg px-4 pb-16 pt-6 text-center">
      <div className="animate-popIn">
        <div className="text-5xl mb-2">🏆</div>
        <h1 className="text-xl font-black text-brand-ink">Your Champion!</h1>
        <p className="text-sm text-brand-gray mt-1">{tournament.title}</p>
      </div>

      <div className="mt-6 rounded-2xl bg-white shadow-card overflow-hidden animate-fadeUp">
        <div className="relative aspect-video bg-gradient-to-br from-brand-indigo/20 to-brand-amber/20">
          {winnerImg && !imgErr ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={winnerImg} alt={winnerName} onError={() => setImgErr(true)} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-8xl font-black text-brand-indigo/30 select-none">
              {winnerName.charAt(0)}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-4 text-white text-left">
            <p className="text-xl font-black leading-tight">{winnerName}</p>
            <p className="text-xs opacity-75 mt-0.5">🏆 Ultimate Champion</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button onClick={copyShare}
          className="flex-1 rounded-xl bg-brand-indigo text-white font-bold py-3 text-sm hover:bg-indigo-700 transition-colors">
          {copied ? "✅ Copied!" : "📋 Copy & Share"}
        </button>
        <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank")}
          className="flex-1 rounded-xl bg-sky-500 text-white font-bold py-3 text-sm hover:bg-sky-600 transition-colors">
          𝕏 Tweet Result
        </button>
      </div>

      <div className="mt-3 flex gap-3">
        <Link href={`/play/${tournament.id}`}
          className="flex-1 rounded-xl bg-brand-amberLight text-amber-700 font-bold py-3 text-sm hover:bg-amber-100 transition-colors text-center">
          🔄 Play Again
        </Link>
        <Link href="/"
          className="flex-1 rounded-xl bg-brand-indigoLight text-brand-indigo font-bold py-3 text-sm hover:bg-indigo-100 transition-colors text-center">
          🏠 More Games
        </Link>
      </div>

      {others.length > 0 && (
        <section className="mt-8 text-left">
          <h2 className="font-bold text-brand-ink text-sm mb-3">You might also like</h2>
          <div className="grid grid-cols-2 gap-3">
            {others.map((t) => (
              <Link key={t.id} href={`/play/${t.id}`}
                className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-card hover:shadow-hover transition-all">
                <span className="text-2xl">{t.emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-brand-ink leading-tight truncate">{t.title}</p>
                  <p className="text-xs text-brand-gray">{t.contestants.length} options</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default function ResultContent({ tournament, others }: { tournament: TournamentMeta; others: TournamentMeta[] }) {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-brand-gray">Loading…</div>}>
      <Inner tournament={tournament} others={others} />
    </Suspense>
  );
}
