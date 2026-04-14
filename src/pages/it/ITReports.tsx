import { BarChart3, Download, FileSpreadsheet, PieChart, ShieldAlert, Cpu, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const reportTypes = [
  { title: "Infrastructure Uptime Logs", desc: "SLA compliance and minute-by-minute downtime reports.", icon: BarChart3, color: "text-primary", bg: "bg-primary/10" },
  { title: "Authentication Failures", desc: "Failed login attempts and suspected brute-force incidents.", icon: ShieldAlert, color: "text-destructive", bg: "bg-destructive/10" },
  { title: "Hardware Assignment", desc: "Devices assigned per employee mapped through HRIS.", icon: Cpu, color: "text-secondary", bg: "bg-secondary/10" },
  { title: "License Utilization", desc: "Seats used vs active subscriptions for 3rd party tooling.", icon: PieChart, color: "text-warning", bg: "bg-warning/10" },
  { title: "Database Audit Scripts", desc: "Raw SQL execution histories on production DBs.", icon: FileSpreadsheet, color: "text-info", bg: "bg-info/10" },
];

export default function ITReports() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">IT Analytics & Export</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate and export system-level analytics, uptime stats, and security reports.
          </p>
        </div>
        <Button className="gap-2 shrink-0">
          <Calendar className="h-4 w-4" /> Config Data Dumps
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reportTypes.map((report, idx) => (
          <div key={idx} className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-primary/30">
            <div className="p-6 flex-1 text-center flex flex-col items-center">
              <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 ${report.bg}`}>
                <report.icon className={`h-8 w-8 ${report.color}`} />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{report.title}</h3>
              <p className="text-sm text-muted-foreground">{report.desc}</p>
            </div>
            <div className="border-t border-border bg-muted/30 p-3 grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="w-full text-xs font-mono" onClick={() => alert('Tracing Query...')}>
                Run Script
              </Button>
              <Button size="sm" className="w-full text-xs" onClick={() => alert('Downloading SEC_LOG...')}>
                <Download className="mr-2 h-3.5 w-3.5" /> Pull Dump
              </Button>
            </div>
          </div>
        ))}

        {/* Custom Report Builder Card */}
        <div className="group flex flex-col rounded-xl border border-dashed border-border bg-card/50 overflow-hidden shadow-sm hover:bg-muted/30 transition-all justify-center items-center p-6 text-center cursor-pointer min-h-[250px]">
           <div className="h-16 w-16 rounded-full flex items-center justify-center mb-4 bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <BarChart3 className="h-8 w-8" />
           </div>
           <h3 className="font-heading font-semibold text-lg text-foreground mb-2">Custom Splunk Query</h3>
           <p className="text-sm text-muted-foreground max-w-[200px]">Define raw log-level queries for specific sub-systems.</p>
        </div>
      </div>
    </div>
  );
}
