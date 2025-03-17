import TeamComparison from "@/components/TeamComparison";
import StatisticsChart from "@/components/StatisticsChart";

const formData = [
  { name: "Week 1", value: 4 },
  { name: "Week 2", value: 3 },
  { name: "Week 3", value: 6 },
  { name: "Week 4", value: 8 },
  { name: "Week 5", value: 7 },
];

const goalsData = [
  { name: "Week 1", value: 2 },
  { name: "Week 2", value: 1 },
  { name: "Week 3", value: 3 },
  { name: "Week 4", value: 2 },
  { name: "Week 5", value: 4 },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Football Predictions</h1>
        <p className="text-muted-foreground mt-2">
          Compare teams and get AI-powered match predictions
        </p>
      </div>

      <TeamComparison />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatisticsChart
          title="Team Form"
          data={formData}
          color="hsl(var(--primary))"
        />
        <StatisticsChart
          title="Goals per Match"
          data={goalsData}
          color="hsl(var(--destructive))"
        />
      </div>
    </div>
  );
}
