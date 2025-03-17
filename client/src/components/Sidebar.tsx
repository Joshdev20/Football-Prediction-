import { Home, Trophy, ChartBar, Users } from "lucide-react";
import { Link, useLocation } from "wouter";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Predictions", href: "/predictions", icon: Trophy },
  { name: "Statistics", href: "/statistics", icon: ChartBar },
  { name: "Teams", href: "/teams", icon: Users },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="hidden md:flex h-screen w-64 flex-col fixed left-0 px-4 py-8 bg-sidebar border-r border-border">
      <div className="flex items-center gap-2 px-2 mb-8">
        <Trophy className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold">FootPredict</h1>
      </div>
      <nav className="space-y-1.5">
        {navigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <a
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
