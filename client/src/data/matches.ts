import { teams, Team } from "./teams";

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  competition: string;
  kickoff: string;
}

// Mock upcoming matches data
export const upcomingMatches: Match[] = [
  {
    id: "match1",
    homeTeam: teams.find(t => t.id === "mci")!,
    awayTeam: teams.find(t => t.id === "liv")!,
    date: "2025-03-18",
    competition: "Premier League",
    kickoff: "15:00",
  },
  {
    id: "match2",
    homeTeam: teams.find(t => t.id === "ars")!,
    awayTeam: teams.find(t => t.id === "tot")!,
    date: "2025-03-18",
    competition: "Premier League",
    kickoff: "17:30",
  },
  {
    id: "match3",
    homeTeam: teams.find(t => t.id === "che")!,
    awayTeam: teams.find(t => t.id === "mun")!,
    date: "2025-03-19",
    competition: "Premier League",
    kickoff: "20:00",
  },
];
