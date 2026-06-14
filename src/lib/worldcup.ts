export interface Contestant {
  id: string;
  name: string;
  nameKo?: string;
  image: string;
}

export interface Tournament {
  id: string;
  title: string;
  titleSub?: string;
  category: string;
  description?: string;
  contestants: Contestant[];
}

export interface Matchup {
  left: Contestant;
  right: Contestant;
}

export function isPowerOfTwo(n: number): boolean {
  return n >= 2 && (n & (n - 1)) === 0;
}

export function largestPowerOfTwo(n: number): number {
  let p = 1;
  while (p * 2 <= n) p *= 2;
  return p;
}

export function shuffle<T>(arr: T[], rng: () => number = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function roundLabel(remaining: number): string {
  if (remaining <= 1) return "Champion";
  if (remaining === 2) return "Final";
  if (remaining === 4) return "Semi-Final";
  return `Top ${remaining}`;
}

export function roundSequence(size: number): string[] {
  const labels: string[] = [];
  let n = size;
  while (n >= 2) { labels.push(roundLabel(n)); n = n / 2; }
  return labels;
}

export interface GameState {
  size: number;
  round: Contestant[];
  nextRound: Contestant[];
  pairIndex: number;
}

export function createGame(contestants: Contestant[], rng: () => number = Math.random): GameState {
  const size = largestPowerOfTwo(contestants.length);
  const pool = shuffle(contestants, rng).slice(0, size);
  return { size, round: pool, nextRound: [], pairIndex: 0 };
}

export function currentMatchup(state: GameState): Matchup | null {
  if (isFinished(state)) return null;
  return { left: state.round[state.pairIndex * 2], right: state.round[state.pairIndex * 2 + 1] };
}

export function pairsInRound(state: GameState): number { return state.round.length / 2; }
export function isFinished(state: GameState): boolean { return state.round.length <= 1; }
export function getWinner(state: GameState): Contestant | null { return state.round.length === 1 ? state.round[0] : null; }

export function pick(state: GameState, side: "left" | "right", rng: () => number = Math.random): GameState {
  const matchup = currentMatchup(state);
  if (!matchup) return state;
  const winner = side === "left" ? matchup.left : matchup.right;
  const nextRound = [...state.nextRound, winner];
  const pairIndex = state.pairIndex + 1;
  if (pairIndex < pairsInRound(state)) return { ...state, nextRound, pairIndex };
  return { size: state.size, round: shuffle(nextRound, rng), nextRound: [], pairIndex: 0 };
}

export interface Progress {
  roundLabel: string;
  matchInRound: number;
  matchesInRound: number;
  totalMatches: number;
  completedMatches: number;
  percent: number;
  sequence: string[];
  currentRoundIndex: number;
}

export function getProgress(state: GameState): Progress {
  const sequence = roundSequence(state.size);
  const totalMatches = state.size - 1;
  let completedInPrev = 0;
  let n = state.size;
  while (n > state.round.length) { completedInPrev += n / 2; n = n / 2; }
  const completedMatches = completedInPrev + state.pairIndex;
  const currentRoundIndex = sequence.length - (Math.log2(state.round.length) | 0);
  return {
    roundLabel: roundLabel(state.round.length),
    matchInRound: state.pairIndex + 1,
    matchesInRound: pairsInRound(state),
    totalMatches,
    completedMatches,
    percent: totalMatches === 0 ? 0 : Math.round((completedMatches / totalMatches) * 100),
    sequence,
    currentRoundIndex,
  };
}
