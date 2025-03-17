import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { teams } from "@/data/teams";
import { getPrediction } from "@/data/predictions";
import { useState } from "react";
import PredictionCard from "./PredictionCard";

export default function TeamComparison() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");

  const prediction = team1 && team2 ? getPrediction(team1, team2) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="text-sm font-medium">Home Team</label>
            <Select value={team1} onValueChange={setTeam1}>
              <SelectTrigger>
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium">Away Team</label>
            <Select value={team2} onValueChange={setTeam2}>
              <SelectTrigger>
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {prediction && (
          <div className="mt-8">
            <PredictionCard prediction={prediction} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
