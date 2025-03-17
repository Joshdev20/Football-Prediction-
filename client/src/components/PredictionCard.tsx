import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Prediction } from "@/data/predictions";
import { Badge } from "@/components/ui/badge";

interface PredictionCardProps {
  prediction: Prediction;
}

export default function PredictionCard({ prediction }: PredictionCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Win Probability</span>
              <span>{prediction.winProbability}%</span>
            </div>
            <Progress value={prediction.winProbability} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Expected Goals</p>
              <p className="text-2xl font-bold">{prediction.expectedGoals}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Form Rating</p>
              <p className="text-2xl font-bold">{prediction.formRating}/10</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Recent Results</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {prediction.recentResults.map((result, i) => (
                  <li key={i}>{result}</li>
                ))}
              </ul>
            </div>

            {prediction.headToHead.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Head-to-Head</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {prediction.headToHead.map((result, i) => (
                    <li key={i}>{result}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <h3 className="font-medium">Key Insights</h3>
              <p className="text-sm text-muted-foreground">{prediction.insights}</p>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Betting Advice</h3>
                  <Badge variant={prediction.bettingAdvice.confidence === 'High' ? 'default' : 'secondary'}>
                    {prediction.bettingAdvice.confidence} Confidence
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{prediction.bettingAdvice.recommendation}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Suggested Bets</h4>
                <div className="flex flex-wrap gap-2">
                  {prediction.bettingAdvice.suggestedBets.map((bet, i) => (
                    <Badge key={i} variant="outline">{bet}</Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Home</p>
                  <p className="font-mono">{prediction.bettingAdvice.odds.home}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Draw</p>
                  <p className="font-mono">{prediction.bettingAdvice.odds.draw}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Away</p>
                  <p className="font-mono">{prediction.bettingAdvice.odds.away}</p>
                </div>
              </div>

              <div className="text-center bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Predicted Score</p>
                <p className="text-xl font-bold font-mono">{prediction.bettingAdvice.predictedScore}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}