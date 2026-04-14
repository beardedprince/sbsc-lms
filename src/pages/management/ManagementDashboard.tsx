import { TrendingUp, Users, Target, Activity, BarChart3, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Overall ROI (Training)", value: "24.5%", icon: TrendingUp, color: "text-success", bg: "bg-success/10" },
  { label: "Company Headcount", value: "8,245", icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { label: "Quarterly OKR Status", value: "On Track", icon: Target, color: "text-info", bg: "bg-info/10" },
  { label: "Risk & Compliance", value: "98.2%", icon: Activity, color: "text-warning", bg: "bg-warning/10" },
];

export default function ManagementDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Executive Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            C-Suite dashboard aggregating platform-wide OKRs and ROI metrics.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><BarChart3 className="h-4 w-4" /> Download Exec Summary</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="mt-2 font-heading text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-sm p-6 flex flex-col items-center justify-center min-h-[350px]">
           <div className="h-20 w-20 text-muted-foreground/30 mb-4 rounded-full bg-muted/50 flex items-center justify-center">
             <LineChart className="h-10 w-10 text-primary/40" />
           </div>
           <h3 className="font-heading text-lg font-semibold text-foreground">Revenue per Employee vs Training Hours</h3>
           <p className="text-sm text-muted-foreground max-w-md text-center mt-2">Correlate L&D expenditure against organizational productivity. Integrates with your BI tools.</p>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-sm p-6 flex flex-col">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-6">Strategic Actionable Insights</h3>
          <div className="space-y-4 flex-1">
            <div className="bg-muted/30 p-4 rounded-xl border border-border">
              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" /> High Performers
              </p>
              <p className="text-xs text-muted-foreground mt-2">Branches with &gt;90% training completion report 14% higher sales volume.</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-xl border border-border">
              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Activity className="h-4 w-4 text-warning" /> Compliance Risk
              </p>
              <p className="text-xs text-muted-foreground mt-2">12 Executives require immediate AML/CFT renewal to meet Q3 audit targets.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
