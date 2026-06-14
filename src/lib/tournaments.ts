import type { Tournament } from "./worldcup";

import marvel from "@/data/tournaments/marvel-heroes.json";
import anime from "@/data/tournaments/anime-characters.json";
import disney from "@/data/tournaments/disney-characters.json";
import taylorSwift from "@/data/tournaments/taylor-swift-songs.json";
import football from "@/data/tournaments/football-legends.json";
import pokemon from "@/data/tournaments/pokemon.json";
import games from "@/data/tournaments/game-characters.json";
import kpop from "@/data/tournaments/kpop-girlgroups.json";
import bts from "@/data/tournaments/bts-members.json";
import nba from "@/data/tournaments/nba-legends.json";

export interface TournamentMeta extends Tournament {
  playCount: number;
  emoji: string;
}

const RAW: TournamentMeta[] = [
  { ...(pokemon as Tournament),     playCount: 284_500, emoji: "⚡" },
  { ...(marvel as Tournament),      playCount: 241_300, emoji: "🦸" },
  { ...(anime as Tournament),       playCount: 198_700, emoji: "⚔️" },
  { ...(bts as Tournament),         playCount: 187_200, emoji: "💜" },
  { ...(kpop as Tournament),        playCount: 172_400, emoji: "💖" },
  { ...(disney as Tournament),      playCount: 165_800, emoji: "✨" },
  { ...(taylorSwift as Tournament), playCount: 158_900, emoji: "🎵" },
  { ...(football as Tournament),    playCount: 143_600, emoji: "⚽" },
  { ...(nba as Tournament),         playCount: 128_300, emoji: "🏀" },
  { ...(games as Tournament),       playCount: 112_100, emoji: "🎮" },
];

export const CATEGORIES: { key: string; label: string; emoji: string }[] = [
  { key: "all",    label: "All",       emoji: "🌍" },
  { key: "games",  label: "Games",     emoji: "🎮" },
  { key: "anime",  label: "Anime",     emoji: "⚔️" },
  { key: "comics", label: "Comics",    emoji: "🦸" },
  { key: "disney", label: "Disney",    emoji: "✨" },
  { key: "kpop",   label: "K-POP",     emoji: "💖" },
  { key: "music",  label: "Music",     emoji: "🎵" },
  { key: "sports", label: "Sports",    emoji: "⚽" },
];

export function getAllTournaments(): TournamentMeta[] { return RAW; }
export function getTournament(id: string): TournamentMeta | undefined { return RAW.find((t) => t.id === id); }
export function getOtherTournaments(id: string): TournamentMeta[] { return RAW.filter((t) => t.id !== id); }
