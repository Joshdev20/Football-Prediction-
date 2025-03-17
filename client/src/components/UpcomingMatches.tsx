import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { upcomingMatches } from "@/data/matches";
import { getPrediction } from "@/data/predictions";
import PredictionCard from "./PredictionCard";

export default function UpcomingMatches() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Matches</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {upcomingMatches.map((match) => (
            <div key={match.id} className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">{match.competition}</p>
                  <p className="text-sm text-muted-foreground">
                    {match.date} - {match.kickoff}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{match.homeTeam.name}</p>
                  <p className="text-sm">vs</p>
                  <p className="font-medium">{match.awayTeam.name}</p>
                </div>
              </div>
              <PredictionCard 
                prediction={getPrediction(match.homeTeam.id, match.awayTeam.id)} 
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
