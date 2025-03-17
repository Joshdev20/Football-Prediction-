import { teams, type Team } from "./teams";

export interface Prediction {
  winProbability: number;
  expectedGoals: number;
  formRating: number;
  insights: string;
  recentResults: string[];
  headToHead: string[];
  bettingAdvice: {
    recommendation: string;
    confidence: 'High' | 'Medium' | 'Low';
    suggestedBets: string[];
    predictedScore: string;
    odds: {
      home: number;
      draw: number;
      away: number;
    };
  };
}

function calculateFormWeight(matchIndex: number): number {
  // Exponential decay for form weight (more recent matches have higher weight)
  return Math.exp(-0.5 * matchIndex);
}

function calculateWinProbability(team1: Team, team2: Team): number {
  // Calculate weighted recent form
  const team1WeightedForm = team1.history.reduce((acc, match, index) => {
    const weight = calculateFormWeight(index);
    return acc + (match.result === 'W' ? weight : match.result === 'D' ? weight * 0.5 : 0);
  }, 0);

  const team2WeightedForm = team2.history.reduce((acc, match, index) => {
    const weight = calculateFormWeight(index);
    return acc + (match.result === 'W' ? weight : match.result === 'D' ? weight * 0.5 : 0);
  }, 0);

  // Calculate head-to-head performance with higher weight
  const team1VsTeam2 = team1.history.find(m => m.opponent === team2.name);
  const h2hBonus = team1VsTeam2?.result === 'W' ? 15 : team1VsTeam2?.result === 'L' ? -15 : 0;

  // Consider defensive and offensive strength
  const team1AttackStrength = team1.goalsScored / 5;
  const team2DefenseStrength = team2.goalsConceded / 5;
  const team1DefenseStrength = team1.goalsConceded / 5;
  const team2AttackStrength = team2.goalsScored / 5;

  const attackingAdvantage = (team1AttackStrength - team2DefenseStrength) * 5;
  const defensiveAdvantage = (team2AttackStrength - team1DefenseStrength) * 5;

  // Home advantage (assuming team1 is home)
  const homeAdvantage = 5;

  // Calculate final probability
  const baseProb = 50;
  const formImpact = ((team1WeightedForm - team2WeightedForm) * 10);
  const strengthImpact = (attackingAdvantage - defensiveAdvantage);

  let finalProb = baseProb + formImpact + strengthImpact + h2hBonus + homeAdvantage;

  // Clamp between 30 and 70 for more realistic probabilities
  return Math.min(Math.max(finalProb, 30), 70);
}

function generateBettingAdvice(team1: Team, team2: Team, winProbability: number, expectedGoals: number): Prediction['bettingAdvice'] {
  // Calculate more accurate goal predictions
  const team1DefensiveStrength = 1 - (team1.goalsConceded / (team1.goalsConceded + team2.goalsScored));
  const team2DefensiveStrength = 1 - (team2.goalsConceded / (team2.goalsConceded + team1.goalsScored));

  const team1ScoringRate = team1.goalsScored / 5;
  const team2ScoringRate = team2.goalsScored / 5;

  // Predicted goals considering both attacking and defensive capabilities
  const team1PredictedGoals = Math.round(team1ScoringRate * (1 - team2DefensiveStrength) * 2) / 2;
  const team2PredictedGoals = Math.round(team2ScoringRate * (1 - team1DefensiveStrength) * 2) / 2;

  const suggestedBets: string[] = [];
  let confidence: 'High' | 'Medium' | 'Low' = 'Medium';
  let recommendation = '';

  // More accurate odds calculation based on form and historical data
  const homeOdds = Math.max(1.2, 100 / winProbability);
  const awayOdds = Math.max(1.2, 100 / (100 - winProbability));
  const drawOdds = Math.max(1.2, (homeOdds + awayOdds) / 1.5);

  // Generate betting suggestions based on statistical analysis
  if (winProbability > 60) {
    suggestedBets.push(`${team1.name} to Win`);
    confidence = team1.form > 7 ? 'High' : 'Medium';
  } else if (winProbability < 40) {
    suggestedBets.push(`${team2.name} to Win`);
    confidence = team2.form > 7 ? 'High' : 'Medium';
  } else {
    suggestedBets.push('Draw or Under 2.5 Goals');
    confidence = 'Medium';
  }

  // Goal market suggestions based on scoring patterns
  const totalExpectedGoals = team1PredictedGoals + team2PredictedGoals;
  if (totalExpectedGoals > 2.5 && team1ScoringRate > 1.5 && team2ScoringRate > 1.5) {
    suggestedBets.push('Over 2.5 Goals');
  } else if (totalExpectedGoals < 2 && team1DefensiveStrength > 0.6 && team2DefensiveStrength > 0.6) {
    suggestedBets.push('Under 2.5 Goals');
  }

  // Both teams to score suggestion based on scoring consistency
  const team1ScoringConsistency = team1.history.filter(m => m.score.split('-')[0] !== '0').length / 5;
  const team2ScoringConsistency = team2.history.filter(m => m.score.split('-')[1] !== '0').length / 5;

  if (team1ScoringConsistency > 0.6 && team2ScoringConsistency > 0.6) {
    suggestedBets.push('Both Teams to Score (GG)');
  }

  // Generate main recommendation
  if (confidence === 'High') {
    recommendation = `Strong statistical advantage for ${winProbability > 60 ? team1.name : team2.name} based on recent form and head-to-head record`;
  } else {
    recommendation = 'Match statistics suggest a close contest - consider conservative betting options';
  }

  return {
    recommendation,
    confidence,
    suggestedBets,
    predictedScore: `${team1PredictedGoals}-${team2PredictedGoals}`,
    odds: {
      home: Number(homeOdds.toFixed(2)),
      draw: Number(drawOdds.toFixed(2)),
      away: Number(awayOdds.toFixed(2)),
    },
  };
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
  const expectedGoals = ((team1.goalsScored / 5) + (team2.goalsConceded / 5)) / 2;
  const formRating = Math.round((team1.form + team2.form) / 2);

  return {
    winProbability: Math.round(winProbability),
    expectedGoals: Number(expectedGoals.toFixed(1)),
    formRating,
    insights: generateInsights(team1, team2, winProbability),
    recentResults: getRecentResults(team1),
    headToHead: getHeadToHead(team1, team2),
    bettingAdvice: generateBettingAdvice(team1, team2, winProbability, expectedGoals),
  };
}

function generateInsights(team1: Team, team2: Team, probability: number): string {
  const team1Form = team1.history.slice(0, 3).filter(m => m.result === 'W').length;
  const team2Form = team2.history.slice(0, 3).filter(m => m.result === 'W').length;

  const team1GoalDiff = team1.goalsScored - team1.goalsConceded;
  const team2GoalDiff = team2.goalsScored - team2.goalsConceded;

  if (probability > 60) {
    return `${team1.name} show strong form with ${team1Form}/3 recent wins and a goal difference of ${team1GoalDiff > 0 ? '+' : ''}${team1GoalDiff}. Historical data strongly favors them.`;
  } else if (probability < 40) {
    return `${team2.name} demonstrate superior recent form with ${team2Form}/3 wins and a goal difference of ${team2GoalDiff > 0 ? '+' : ''}${team2GoalDiff}. Statistics favor an away result.`;
  } else {
    return `Both teams are closely matched in recent form and head-to-head encounters. ${team1.name}: ${team1Form}/3 wins, ${team2.name}: ${team2Form}/3 wins.`;
  }
}