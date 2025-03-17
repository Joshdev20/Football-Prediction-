export interface Team {
  id: string;
  name: string;
  form: number;
  goalsScored: number;
  goalsConceded: number;
}

export const teams: Team[] = [
  {
    id: "mci",
    name: "Manchester City",
    form: 9,
    goalsScored: 45,
    goalsConceded: 18,
  },
  {
    id: "liv",
    name: "Liverpool",
    form: 8,
    goalsScored: 42,
    goalsConceded: 20,
  },
  {
    id: "ars",
    name: "Arsenal",
    form: 8,
    goalsScored: 38,
    goalsConceded: 22,
  },
  {
    id: "tot",
    name: "Tottenham",
    form: 7,
    goalsScored: 35,
    goalsConceded: 25,
  },
  {
    id: "mun",
    name: "Manchester United",
    form: 7,
    goalsScored: 32,
    goalsConceded: 28,
  },
  {
    id: "che",
    name: "Chelsea",
    form: 6,
    goalsScored: 30,
    goalsConceded: 30,
  }
];
