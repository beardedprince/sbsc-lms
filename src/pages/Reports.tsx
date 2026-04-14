import { BarChart3, Download, FileText, PieChart, TrendingUp, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const reportsList = [
  {
    title: "Learning Transcript",
    description: "A complete record of all your enrolled, in-progress, and completed courses.",
    icon: FileText,
    date: "Last exported: Never",
  },
  {
    title: "Completion Statistics",
    description: "Detailed analytics on your course completion rates and time spent learning.",
    icon: PieChart,
    date: "Last exported: 2 days ago",
  },
  {
    title: "Skill Gap Analysis",
    description: "Overview of your current skills compared to your role requirements.",
    icon: TrendingUp,
    date: "Last exported: 1 month ago",
  },
];

export default function Reports() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">My Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate and download your personal learning analytics and transcripts.
          </p>
        </div>
        <Button className="shrink-0 gap-2">
          <Download className="h-4 w-4" /> 
          Export All Data
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-heading text-sm font-semibold text-muted-foreground">Total Hours</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
          </div>
          <p className="font-heading text-3xl font-bold text-foreground">48.5<span className="text-sm font-normal text-muted-foreground ml-1">hrs</span></p>
          <div className="mt-4 flex items-center text-xs text-success">
            <TrendingUp className="mr-1 h-3.5 w-3.5" />
            <span>+12% from last month</span>
          </div>
        </div>
        
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-heading text-sm font-semibold text-muted-foreground">Completion Rate</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <PieChart className="h-5 w-5 text-success" />
            </div>
          </div>
          <p className="font-heading text-3xl font-bold text-foreground">87%</p>
          <div className="mt-4 flex w-full h-1.5 rounded-full bg-muted">
            <div className="h-full rounded-full bg-success" style={{ width: "87%" }} />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-heading text-sm font-semibold text-muted-foreground">Courses Completed</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
              <FileText className="h-5 w-5 text-secondary" />
            </div>
          </div>
          <p className="font-heading text-3xl font-bold text-foreground">12</p>
          <div className="mt-4 flex items-center text-xs text-muted-foreground">
            <span>3 courses still in progress</span>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card overflow-hidden">
        <div className="border-b border-border bg-muted/20 px-6 py-4">
          <h2 className="font-heading text-lg font-semibold text-foreground">Available Reports</h2>
        </div>
        <div className="divide-y divide-border">
          {reportsList.map((report) => (
            <div key={report.title} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 transition-colors hover:bg-muted/10">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                  <report.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{report.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{report.description}</p>
                  <p className="mt-2 flex items-center text-xs text-muted-foreground">
                    <CalendarIcon className="mr-1.5 h-3 w-3" />
                    {report.date}
                  </p>
                </div>
              </div>
              <Button variant="outline" className="sm:w-auto w-full gap-2 shrink-0">
                <Download className="h-4 w-4" /> Generate
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
