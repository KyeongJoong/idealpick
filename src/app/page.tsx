"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getAllTournaments, CATEGORIES, type TournamentMeta } from "@/lib/tournaments";

function TournamentCard({ t }: { t: TournamentMeta }) {
  return (
    <Link
      href={`/play/${t.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-card hover:shadow-hover transition-all duration-200 hover:-translate-y-1"
    >
      <div className="flex items-center justify-center bg-gradient-to-br from-brand-indigo/10 to-brand-amber/10 h-28 text-5xl select-none">
        {t.emoji}
      </div>
      <div className="p-3">
        <h2 className="text-sm font-bold text-brand-ink leading-tight line-clamp-2">{t.title}</h2>
        {t.titleSub && (
          <p className="mt-0.5 text-xs text-brand-gray line-clamp-1">{t.titleSub}</p>
        )}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-brand-gray">
            {t.contestants.length} contestants
          </span>
          <span className="text-xs text-brand-indigo font-semibold">
            {(t.playCount / 1000).toFixed(0)}K plays
          </span>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-indigo scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </Link>
  );
}

export default function HomePage() {
  const all = useMemo(() => getAllTournaments(), []);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((t) => {
      const matchCat = category === "all" || t.category === category;
      const matchQ = q === "" || t.title.toLowerCase().includes(q) || (t.description ?? "").toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [all, category, query]);

  return (
    <main className="mx-auto max-w-2xl px-4 pb-16">
      {/* Header */}
      <header className="pt-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-indigoLight px-4 py-1 text-xs font-bold text-brand-indigo mb-3">
          🏆 THE ULTIMATE PICK GAME
        </div>
        <h1 className="text-3xl font-black text-brand-ink sm:text-4xl">
          Ideal Pick
        </h1>
        <p className="mt-2 text-sm text-brand-gray max-w-xs mx-auto">
          1-on-1 bracket tournaments — vote through every round to crown your ultimate favourite!
        </p>
      </header>

      {/* Search */}
      <div className="mt-6 relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray">🔍</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tournaments…"
          className="w-full rounded-full border-0 bg-white py-3 pl-11 pr-4 text-sm shadow-card outline-none ring-1 ring-brand-indigoLight placeholder:text-brand-gray/50 focus:ring-2 focus:ring-brand-indigo"
        />
      </div>

      {/* Category filter */}
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((c) => {
          const active = category === c.key;
          return (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={[
                "whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-colors",
                active
                  ? "bg-brand-indigo text-white shadow"
                  : "bg-white text-brand-gray ring-1 ring-brand-indigoLight hover:text-brand-indigo",
              ].join(" ")}
            >
              {c.emoji} {c.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-4">
          {filtered.map((t) => <TournamentCard key={t.id} t={t} />)}
        </div>
      ) : (
        <p className="mt-16 text-center text-brand-gray">No tournaments found 😢</p>
      )}

      {/* How it works */}
      <section className="mt-12 rounded-2xl bg-white p-5 shadow-card">
        <h2 className="font-bold text-brand-ink mb-3">How to Play</h2>
        <div className="grid grid-cols-3 gap-3 text-center text-xs text-brand-gray">
          <div><div className="text-2xl mb-1">👆</div>Pick your favourite in each 1v1 match</div>
          <div><div className="text-2xl mb-1">🏆</div>Keep picking until one champion remains</div>
          <div><div className="text-2xl mb-1">📤</div>Share your result with friends!</div>
        </div>
      </section>

      <footer className="mt-12 text-center text-xs text-brand-gray/50">
        <p>Ideal Pick © 2026 · For entertainment purposes</p>
      </footer>
    </main>
  );
}
