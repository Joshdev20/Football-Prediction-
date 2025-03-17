import { teams, type Team } from "./teams";

export interface Prediction {
  winProbability: number;
  expectedGoals: number;
  formRating: number;
  insights: string;
  recentResults: string[];
  headToHead: string[];
}

function calculateWinProbability(team1: Team, team2: Team): number {
  // Calculate win rate from recent matches
  const team1Wins = team1.history.filter(m => m.result === 'W').length;
  const team2Wins = team2.history.filter(m => m.result === 'W').length;

  // Calculate head-to-head performance
  const team1VsTeam2 = team1.history.find(m => m.opponent === team2.name);
  const h2hBonus = team1VsTeam2?.result === 'W' ? 10 : team1VsTeam2?.result === 'L' ? -10 : 0;

  // Consider form difference
  const formDiff = team1.form - team2.form;

  // Consider goal difference
  const team1GoalDiff = team1.goalsScored - team1.goalsConceded;
  const team2GoalDiff = team2.goalsScored - team2.goalsConceded;
  const goalDiffImpact = team1GoalDiff - team2GoalDiff;

  // Calculate final probability
  const baseProb = 50;
  const winRateImpact = ((team1Wins - team2Wins) * 5);
  const formImpact = formDiff * 3;
  const goalDiffWeight = goalDiffImpact * 2;

  let finalProb = baseProb + winRateImpact + formImpact + goalDiffWeight + h2hBonus;

  // Clamp between 20 and 80
  return Math.min(Math.max(finalProb, 20), 80);
}

function getRecentResults(team: Team): string[] {
  return team.history.slice(0, 3).map(match => 
    `${match.date}: ${team.name} ${match.result === 'W' ? 'won' : match.result === 'L' ? 'lost' : 'drew'} against ${match.opponent} (${match.score})`
  );
}

function getHeadToHead(team1: Team, team2: Team): string[] {
  const team1VsTeam2 = team1.history.find(m => m.opponent === team2.name);
  const team2VsTeam1 = team2.history.find(m => m.opponent === team1.name);

  const results: string[] = [];
  if (team1VsTeam2) {
    results.push(`${team1VsTeam2.date}: ${team1.name} ${team1VsTeam2.score} ${team2.name}`);
  }
  if (team2VsTeam1) {
    results.push(`${team2VsTeam1.date}: ${team2.name} ${team2VsTeam1.score} ${team1.name}`);
  }
  return results;
}

export function getPrediction(team1Id: string, team2Id: string): Prediction {
  const team1 = teams.find((t) => t.id === team1Id)!;
  const team2 = teams.find((t) => t.id === team2Id)!;

  const winProbability = calculateWinProbability(team1, team2);
  const expectedGoals = ((team1.goalsScored / 20) + (team2.goalsConceded / 20)) / 2;
  const formRating = (team1.form + team2.form) / 2;

  return {
    winProbability: Math.round(winProbability),
    expectedGoals: Number(expectedGoals.toFixed(1)),
    formRating: Math.round(formRating),
    insights: generateInsights(team1, team2, winProbability),
    recentResults: getRecentResults(team1),
    headToHead: getHeadToHead(team1, team2),
  };
}

function generateInsights(team1: Team, team2: Team, probability: number): string {
  const team1Form = team1.history.slice(0, 3).filter(m => m.result === 'W').length;
  const team2Form = team2.history.slice(0, 3).filter(m => m.result === 'W').length;

  if (probability > 65) {
    return `${team1.name} are strong favorites with ${team1Form}/3 recent wins and superior goal difference of ${team1.goalsScored - team1.goalsConceded}.`;
  } else if (probability < 35) {
    return `${team2.name} have the advantage with ${team2Form}/3 recent wins and better recent form.`;
  } else {
    return `Both teams are evenly matched based on recent performances and head-to-head history.`;
  }
}