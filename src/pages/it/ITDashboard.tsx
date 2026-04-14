import { Server, Activity, AlertTriangle, Cpu, Terminal, Users, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Active Nodes", value: "1,204", icon: Server, color: "text-primary", bg: "bg-primary/10" },
  { label: "Network Health", value: "99.9%", icon: Activity, color: "text-success", bg: "bg-success/10" },
  { label: "Critical Alerts", value: "3", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
  { label: "Avg. Load", value: "42%", icon: Cpu, color: "text-info", bg: "bg-info/10" },
];

export default function ITDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">IT Operations Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            System health, infrastructure overview, and active environment telemetry.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Terminal className="h-4 w-4" /> Root Access</Button>
          <Button className="gap-2"><Server className="h-4 w-4" /> Server Management</Button>
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
             <Activity className="h-8 w-8 text-primary/40" />
           </div>
           <h3 className="font-heading text-lg font-semibold text-foreground">API Latency Telemetry</h3>
           <p className="text-sm text-muted-foreground max-w-sm text-center mt-2">Connect to AWS or Azure monitor to stream live endpoint degradation charts.</p>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-sm p-6 flex flex-col">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-6">Active Infrastructure Logs</h3>
          <div className="space-y-4 flex-1">
            <div className="flex gap-4">
              <div className="mt-0.5 h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Auth Gateway Timed Out</p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">Node 4 on us-east is dropping packets on token verification.</p>
                <p className="mt-1 text-[10px] uppercase font-bold text-destructive">2 mins ago</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-0.5 h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-warning/10 text-warning">
                <Wifi className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">High Traffic Spike</p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">Database reads exceeded 80% capacity threshold.</p>
                <p className="mt-1 text-[10px] uppercase font-bold text-warning">14 mins ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
