import { useState } from "react";
import { FileText, Download, Filter, Search, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialRecords = [
  { id: "HR-1209", user: "Sarah Jenkins", type: "Onboarding File", date: "2024-05-12", status: "Complete" },
  { id: "HR-1002", user: "David Osei", type: "Annual Appraisal", date: "2025-12-01", status: "Pending Signature" },
  { id: "HR-9481", user: "Michael Chang", type: "Disciplinary Log", date: "2026-01-14", status: "Confidential" },
];

export default function HRRecords() {
  const [search, setSearch] = useState("");

  const filtered = initialRecords.filter(r => 
    r.user.toLowerCase().includes(search.toLowerCase()) || 
    r.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">HR Records Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Central repository for employee files, contracts, and appraisals.
          </p>
        </div>
        <Button className="gap-2 shrink-0">
          <Download className="h-4 w-4" /> Export HR Data
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border bg-muted/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search employee names or doc IDs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" /> Filter Typology
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Doc ID</th>
                <th className="px-6 py-4 font-medium">Employee Subject</th>
                <th className="px-6 py-4 font-medium">Document Type</th>
                <th className="px-6 py-4 font-medium">Date Filed</th>
                <th className="px-6 py-4 font-medium">Status / Access</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((record) => (
                <tr key={record.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium text-xs font-mono text-muted-foreground">{record.id}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{record.user}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" /> {record.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{record.date}</td>
                  <td className="px-6 py-4 font-medium text-xs uppercase tracking-wider">{record.status}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
