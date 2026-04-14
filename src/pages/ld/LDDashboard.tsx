import { Users, BookOpen, GraduationCap, Clock, TrendingUp, BarChart3, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Active Users", value: "2,845", icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { label: "Total Courses", value: "156", icon: BookOpen, color: "text-secondary", bg: "bg-secondary/10" },
  { label: "Total Certifications", value: "1,204", icon: GraduationCap, color: "text-success", bg: "bg-success/10" },
  { label: "Avg. Completion Time", value: "4.2 hrs", icon: Clock, color: "text-info", bg: "bg-info/10" },
];

export default function LDDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Global Analytics Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            LMS administrative metrics, active users, and system performance.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><BarChart3 className="h-4 w-4" /> Custom Report</Button>
          <Button className="gap-2"><TrendingUp className="h-4 w-4" /> Export Data</Button>
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
            <div className="mt-4 flex items-center text-xs text-success">
              <TrendingUp className="mr-1 h-3.5 w-3.5" />
              <span>+{(Math.random() * 10 + 2).toFixed(1)}% from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Graph Mockup */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-sm p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Course Completion Trends</h3>
              <p className="text-xs text-muted-foreground">Monthly completions across all departments</p>
            </div>
            <select className="rounded-md border bg-background px-3 py-1.5 text-sm outline-none">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 flex items-end gap-2 justify-between mt-auto">
            {[40, 60, 45, 80, 55, 90, 75, 100, 85, 65, 70, 95].map((val, i) => (
              <div key={i} className="w-full relative group">
                <div 
                  className="bg-primary/20 hover:bg-primary transition-colors rounded-t-sm w-full absolute bottom-0"
                  style={{ height: `${val}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-xs text-muted-foreground border-t border-border pt-4">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
          </div>
        </div>

        {/* Action Items */}
        <div className="rounded-xl border border-border bg-card shadow-sm p-6 flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-heading text-lg font-semibold text-foreground">AI Action Insights</h3>
            <span className="bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1"><Sparkles className="h-3 w-3" /> Auto-Generated</span>
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex gap-4">
              <div className="mt-0.5 h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-warning/20 text-warning">
                <AlertCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">3 users at risk of non-compliance</p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">Alert: Executive branch management has not initiated Q3 training.</p>
                <Button variant="link" className="px-0 h-auto text-xs mt-1 text-primary">Escalate</Button>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-0.5 h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-info/20 text-info">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Content Engagement Warning</p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">AML Module 2 has low engagement — consider updating content or checking the video source.</p>
                <Button variant="link" className="px-0 h-auto text-xs mt-1 text-primary">Review Module</Button>
              </div>
            </div>
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">24 New Bulk Upload Profiles</p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">Requires mapping to target departments.</p>
                <Button variant="link" className="px-0 h-auto text-xs mt-1 text-primary">Assign Roles</Button>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-0.5 h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-destructive/20 text-destructive">
                <AlertCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">3 Support Tickets Escalated</p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">"Unable to access Leadership Course Module 3"</p>
                <Button variant="link" className="px-0 h-auto text-xs mt-1 text-primary">View Tickets</Button>
              </div>
            </div>
          </div>
        </div>
    //   </div>
    // </div>
  );
}
