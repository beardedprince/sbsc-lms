import { Users, BookOpen, GraduationCap, Clock, TrendingUp, BarChart3, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Headcount Managed", value: "8,245", icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { label: "Pending Onboarding", value: "34", icon: BookOpen, color: "text-secondary", bg: "bg-secondary/10" },
  { label: "Compliance Deficit", value: "12%", icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
  { label: "Avg. Tenure", value: "4.8 yrs", icon: Clock, color: "text-info", bg: "bg-info/10" },
];

export default function HRDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">HR Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Human Resources overview of personnel metrics and compliance status.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><BarChart3 className="h-4 w-4" /> Global Report</Button>
          <Button className="gap-2"><TrendingUp className="h-4 w-4" /> Sync HRIS</Button>
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
        <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-sm p-6 flex flex-col items-center justify-center min-h-[300px]">
           <div className="h-16 w-16 text-muted-foreground/30 mb-4 rounded-full bg-muted/50 flex items-center justify-center">
             <BarChart3 className="h-8 w-8 text-primary/40" />
           </div>
           <h3 className="font-heading text-lg font-semibold text-foreground">Personnel Demographic Metrics</h3>
           <p className="text-sm text-muted-foreground max-w-sm text-center mt-2">Connect to your primary HRIS system to populate live demographic graphs.</p>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-sm p-6 flex flex-col">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-6">HR Action Items</h3>
          <div className="space-y-4 flex-1">
            <div className="flex gap-4">
              <div className="mt-0.5 h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-warning/20 text-warning">
                <AlertCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Missing Employment Records</p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">42 employees have incomplete HR data sheets.</p>
                <Button variant="link" className="px-0 h-auto text-xs mt-1 text-primary">Review Staff</Button>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-0.5 h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-destructive/20 text-destructive">
                <AlertCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Compliance Failure Esc.</p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">12 employees require HR intervention for failed compliance.</p>
                <Button variant="link" className="px-0 h-auto text-xs mt-1 text-primary">Intervene</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
