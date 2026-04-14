import { useState } from "react";
import { FileText, Download, Filter, Search, Award, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialRecords = [
  { id: "1", user: "Sarah Jenkins", course: "AML/CFT Compliance 2026", date: "2026-05-12", status: "Compliant" },
  { id: "2", user: "David Osei", course: "InfoSec Basics", date: "2026-06-01", status: "Compliant" },
  { id: "3", user: "Michael Chang", course: "AML/CFT Compliance 2026", date: "-", status: "Non-Compliant" },
];

export default function LDRecords() {
  const [search, setSearch] = useState("");

  const filtered = initialRecords.filter(r => 
    r.user.toLowerCase().includes(search.toLowerCase()) || 
    r.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Records Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track course completions, audit logs, and compliance verifications.
          </p>
        </div>
        <Button className="gap-2 shrink-0">
          <Download className="h-4 w-4" /> Export CSV Log
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border bg-muted/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users or course IDs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" /> Filter by Date Range
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Employee Name</th>
                <th className="px-6 py-4 font-medium">Record / Training Area</th>
                <th className="px-6 py-4 font-medium">Date Achieved</th>
                <th className="px-6 py-4 font-medium">Compliance Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((record) => (
                <tr key={record.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{record.user}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" /> {record.course}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{record.date}</td>
                  <td className="px-6 py-4">
                    <span className={cn("flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border", 
                      record.status === "Compliant" ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"
                    )}>
                      {record.status === "Compliant" ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <Award className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No compliance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
