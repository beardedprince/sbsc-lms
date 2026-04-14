import { BarChart3, Download, PieChart, TrendingUp, Layers, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const reportTypes = [
  { title: "Organizational OKR Progress", desc: "High-level goal tracking mapped directly to L&D metrics.", icon: BarChart3, color: "text-primary", bg: "bg-primary/10" },
  { title: "Budget & ROI Analysis", desc: "Expenditure on tools vs projected revenue impacts.", icon: TrendingUp, color: "text-success", bg: "bg-success/10" },
  { title: "Staff Distribution map", desc: "Visual map of company hierarchy and compensation bands.", icon: Layers, color: "text-secondary", bg: "bg-secondary/10" },
  { title: "Quarterly Audit Package", desc: "Compiled security, IT, and HR compliance states.", icon: PieChart, color: "text-warning", bg: "bg-warning/10" }
];

export default function ManagementReports() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Business Intelligence</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Extracted strategic intelligence and holistic organizational viewpoints.
          </p>
        </div>
        <Button className="gap-2 shrink-0 bg-primary">
          <Calendar className="h-4 w-4" /> Automate Executive Drop
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report, idx) => (
          <div key={idx} className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-primary/30">
            <div className="p-6 flex-1 text-center flex flex-col items-center">
              <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 ${report.bg}`}>
                <report.icon className={`h-8 w-8 ${report.color}`} />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{report.title}</h3>
              <p className="text-sm text-muted-foreground max-w-sm">{report.desc}</p>
            </div>
            <div className="border-t border-border bg-muted/30 p-3 grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => alert('Opening Tableau Dashboard...')}>
                View PowerBI / Tableau
              </Button>
              <Button size="sm" className="w-full text-xs" onClick={() => alert('Downloading PDF Brief...')}>
                <Download className="mr-2 h-3.5 w-3.5" /> Export PDF Brief
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
