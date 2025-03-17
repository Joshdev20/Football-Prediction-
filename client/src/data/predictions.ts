import { teams } from "./teams";

export interface Prediction {
  winProbability: number;
  expectedGoals: number;
  formRating: number;
  insights: string;
}

export function getPrediction(team1Id: string, team2Id: string): Prediction {
  const team1 = teams.find((t) => t.id === team1Id)!;
  const team2 = teams.find((t) => t.id === team2Id)!;

  const formDiff = team1.form - team2.form;
  const goalDiff = (team1.goalsScored - team1.goalsConceded) - 
                  (team2.goalsScored - team2.goalsConceded);

  const winProbability = Math.min(Math.max(50 + (formDiff * 5) + (goalDiff * 2), 20), 80);
  const expectedGoals = ((team1.goalsScored / 20) + (team2.goalsConceded / 20)) / 2;
  const formRating = (team1.form + team2.form) / 2;

  return {
    winProbability: Math.round(winProbability),
    expectedGoals: Number(expectedGoals.toFixed(1)),
    formRating: Math.round(formRating),
    insights: generateInsights(team1, team2, winProbability),
  };
}

function generateInsights(team1: typeof teams[0], team2: typeof teams[0], probability: number): string {
  if (probability > 65) {
    return `${team1.name} are strong favorites based on recent form and scoring record.`;
  } else if (probability < 35) {
    return `${team2.name} have the edge in this matchup given current performance metrics.`;
  } else {
    return "This looks to be a closely contested match with both teams evenly matched.";
  }
}
