import { BarChart3, Download, FileSpreadsheet, PieChart, TrendingUp, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const reportTypes = [
  { title: "Employee Turnover Rates", desc: "Detailed breakdown of leavers by department.", icon: BarChart3, color: "text-primary", bg: "bg-primary/10" },
  { title: "Compensation Logs", desc: "Export base salary and bounds across bands.", icon: FileSpreadsheet, color: "text-success", bg: "bg-success/10" },
  { title: "Leave / Absence Tracking", desc: "Vacation hours taken vs accrued per person.", icon: TrendingUp, color: "text-secondary", bg: "bg-secondary/10" },
  { title: "Performance Bell Curve", desc: "Q3 Appraisal scores distribution against standard.", icon: PieChart, color: "text-warning", bg: "bg-warning/10" },
  { title: "Demographic Spread", desc: "Age, gender, and geographical spread of staff.", icon: Users, color: "text-info", bg: "bg-info/10" },
];

export default function HRReports() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">HR Data & Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate and export organization-wide analytics on HR performance logic.
          </p>
        </div>
        <Button className="gap-2 shrink-0">
          <Calendar className="h-4 w-4" /> Schedule Automated Reports
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
              <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => alert('Generating Preview...')}>
                Preview
              </Button>
              <Button size="sm" className="w-full text-xs" onClick={() => alert('Downloading CSV...')}>
                <Download className="mr-2 h-3.5 w-3.5" /> Export (.csv)
              </Button>
            </div>
          </div>
        ))}

        {/* Custom Report Builder Card */}
        <div className="group flex flex-col rounded-xl border border-dashed border-border bg-card/50 overflow-hidden shadow-sm hover:bg-muted/30 transition-all justify-center items-center p-6 text-center cursor-pointer min-h-[250px]">
           <div className="h-16 w-16 rounded-full flex items-center justify-center mb-4 bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <BarChart3 className="h-8 w-8" />
           </div>
           <h3 className="font-heading font-semibold text-lg text-foreground mb-2">Build Custom Query</h3>
           <p className="text-sm text-muted-foreground max-w-[200px]">Define specific filters, organizational units, and parameters.</p>
        </div>
      </div>
    </div>
  );
}
