export interface Team {
  id: string;
  name: string;
  form: number;
  goalsScored: number;
  goalsConceded: number;
  history: MatchResult[];
}

export interface MatchResult {
  opponent: string;
  result: 'W' | 'L' | 'D';
  date: string;
  score: string;
}

export const teams: Team[] = [
  {
    id: "mci",
    name: "Manchester City",
    form: 9,
    goalsScored: 45,
    goalsConceded: 18,
    history: [
      { opponent: "Liverpool", result: "W", date: "2025-03-10", score: "3-1" },
      { opponent: "Arsenal", result: "W", date: "2025-03-03", score: "2-0" },
      { opponent: "Tottenham", result: "D", date: "2025-02-24", score: "1-1" },
      { opponent: "Chelsea", result: "W", date: "2025-02-17", score: "4-1" },
      { opponent: "Manchester United", result: "W", date: "2025-02-10", score: "2-1" },
    ]
  },
  {
    id: "liv",
    name: "Liverpool",
    form: 8,
    goalsScored: 42,
    goalsConceded: 20,
    history: [
      { opponent: "Manchester City", result: "L", date: "2025-03-10", score: "1-3" },
      { opponent: "Chelsea", result: "W", date: "2025-03-03", score: "2-1" },
      { opponent: "Manchester United", result: "W", date: "2025-02-24", score: "3-0" },
      { opponent: "Arsenal", result: "D", date: "2025-02-17", score: "2-2" },
      { opponent: "Tottenham", result: "W", date: "2025-02-10", score: "2-0" },
    ]
  },
  {
    id: "ars",
    name: "Arsenal",
    form: 8,
    goalsScored: 38,
    goalsConceded: 22,
    history: [
      { opponent: "Chelsea", result: "W", date: "2025-03-10", score: "2-0" },
      { opponent: "Manchester City", result: "L", date: "2025-03-03", score: "0-2" },
      { opponent: "Tottenham", result: "W", date: "2025-02-24", score: "3-1" },
      { opponent: "Liverpool", result: "D", date: "2025-02-17", score: "2-2" },
      { opponent: "Manchester United", result: "W", date: "2025-02-10", score: "2-1" },
    ]
  },
  {
    id: "tot",
    name: "Tottenham",
    form: 7,
    goalsScored: 35,
    goalsConceded: 25,
    history: [
      { opponent: "Manchester United", result: "W", date: "2025-03-10", score: "2-1" },
      { opponent: "Arsenal", result: "L", date: "2025-03-03", score: "1-3" },
      { opponent: "Manchester City", result: "D", date: "2025-02-24", score: "1-1" },
      { opponent: "Chelsea", result: "W", date: "2025-02-17", score: "2-0" },
      { opponent: "Liverpool", result: "L", date: "2025-02-10", score: "0-2" },
    ]
  },
  {
    id: "mun",
    name: "Manchester United",
    form: 7,
    goalsScored: 32,
    goalsConceded: 28,
    history: [
      { opponent: "Tottenham", result: "L", date: "2025-03-10", score: "1-2" },
      { opponent: "Chelsea", result: "W", date: "2025-03-03", score: "2-1" },
      { opponent: "Liverpool", result: "L", date: "2025-02-24", score: "0-3" },
      { opponent: "Arsenal", result: "L", date: "2025-02-17", score: "1-2" },
      { opponent: "Manchester City", result: "L", date: "2025-02-10", score: "1-2" },
    ]
  },
  {
    id: "che",
    name: "Chelsea",
    form: 6,
    goalsScored: 30,
    goalsConceded: 30,
    history: [
      { opponent: "Arsenal", result: "L", date: "2025-03-10", score: "0-2" },
      { opponent: "Manchester United", result: "L", date: "2025-03-03", score: "1-2" },
      { opponent: "Liverpool", result: "L", date: "2025-02-24", score: "1-2" },
      { opponent: "Tottenham", result: "L", date: "2025-02-17", score: "0-2" },
      { opponent: "Manchester City", result: "L", date: "2025-02-10", score: "1-4" },
    ]
  }
];