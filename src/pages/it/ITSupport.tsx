import { useState } from "react";
import { Terminal, Search, Filter, Monitor, Code, Settings, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialTickets = [
  { id: "INC-9921", subject: "SSO Login Failure - Token Expired", user: "Michael Chang", severity: "Sev-2", status: "Investigating", device: "MacBook Pro M2" },
  { id: "INC-9922", subject: "LMS Videos buffering indefinitely", user: "David Osei", severity: "Sev-3", status: "Open", device: "Windows PC" },
  { id: "INC-9910", subject: "Cannot connect to central DB", user: "Sarah Jenkins", severity: "Sev-1", status: "Resolved", device: "Linux Workstation" },
];

export default function ITSupport() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");

  const filtered = tickets.filter(t => t.subject.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()));

  const resolveTicket = (id: string) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: "Resolved" } : t));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Technical User Support</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage infrastructure incidents, bug reports, and software access keys.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        <div className="rounded-xl border border-destructive bg-destructive/5 p-4">
          <p className="text-sm font-medium text-destructive">Sev-1 Critical Incidents</p>
          <p className="mt-2 text-3xl font-bold text-destructive">0</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm font-medium text-muted-foreground">Open Backlog</p>
          <p className="mt-2 text-3xl font-bold">2</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm font-medium text-muted-foreground">Mean Time to Resolve (MTTR)</p>
          <p className="mt-2 text-3xl font-bold flex items-center gap-2">45m <span className="text-xs font-normal text-success bg-success/10 px-2 py-0.5 rounded-full">-12m</span></p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border bg-muted/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search INC # or payloads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" /> Filter Priority
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Incident ID</th>
                <th className="px-6 py-4 font-medium">Reporter / Device</th>
                <th className="px-6 py-4 font-medium">Diagnostic Subject</th>
                <th className="px-6 py-4 font-medium">Severity</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-primary">{ticket.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{ticket.user}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Monitor className="h-3 w-3" /> {ticket.device}</p>
                  </td>
                  <td className="px-6 py-4 font-medium">{ticket.subject}</td>
                  <td className="px-6 py-4 text-xs font-bold">
                    <span className={cn("px-2 py-1 rounded", 
                       ticket.severity === "Sev-1" ? "bg-destructive text-destructive-foreground" :
                       ticket.severity === "Sev-2" ? "bg-warning text-warning-foreground" : "text-muted-foreground"
                    )}>
                      {ticket.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-[10px] uppercase">
                     {ticket.status}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                        <Code className="h-3.5 w-3.5" /> View Dump
                      </Button>
                      {ticket.status !== "Resolved" && (
                        <Button variant="outline" size="sm" className="h-8 text-xs gap-1" onClick={() => resolveTicket(ticket.id)}>
                          <CheckCircle className="h-3.5 w-3.5" /> Mark Resolved
                        </Button>
                      )}
                    </div>
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
