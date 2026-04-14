import { useState } from "react";
import { HelpCircle, Search, Filter, MessageCircle, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialTickets = [
  { id: "TCK-4019", subject: "Course Module Won't Load", user: "Ahmed T.", dept: "IT Support", priority: "High", status: "Open", date: "2 hrs ago" },
  { id: "TCK-4020", subject: "Missing Certificate", user: "Sarah J.", dept: "Retail Banking", priority: "Medium", status: "In Progress", date: "4 hrs ago" },
  { id: "TCK-4018", subject: "Compliance Quiz Locked", user: "Michael C.", dept: "HR", priority: "Low", status: "Closed", date: "Yesterday" },
];

export default function LDSupport() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");

  const filtered = tickets.filter(t => t.subject.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()));

  const resolveTicket = (id: string) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: "Closed" } : t));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Support Tickets</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage inquiries, technical issues, and certificate requests from staff.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm font-medium text-muted-foreground">Open Tickets</p>
          <p className="mt-2 text-3xl font-bold flex items-center gap-2">
            1 <span className="text-xs font-normal text-success bg-success/10 px-2 py-0.5 rounded-full">-5%</span>
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm font-medium text-muted-foreground">Unassigned</p>
          <p className="mt-2 text-3xl font-bold flex items-center gap-2 text-warning">
            0
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm font-medium text-muted-foreground">Avg. Resolution Time</p>
          <p className="mt-2 text-3xl font-bold">14 hrs</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border bg-muted/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search ticket IDs or subjects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" /> Filter Views
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Ticket ID</th>
                <th className="px-6 py-4 font-medium">Requester</th>
                <th className="px-6 py-4 font-medium">Subject</th>
                <th className="px-6 py-4 font-medium">Priority</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{ticket.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{ticket.user}</p>
                    <p className="text-xs text-muted-foreground">{ticket.dept}</p>
                  </td>
                  <td className="px-6 py-4 font-medium max-w-[200px] truncate">{ticket.subject}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {ticket.priority === "High" ? <AlertCircle className="h-4 w-4 text-destructive" /> : <Clock className="h-4 w-4 text-muted-foreground" />}
                      <span className={ticket.priority === "High" ? "text-destructive" : ""}>{ticket.priority}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border", 
                      ticket.status === "Open" ? "bg-warning/10 text-warning border-warning/20" : 
                      ticket.status === "In Progress" ? "bg-primary/10 text-primary border-primary/20" : 
                      "bg-muted text-muted-foreground border-border"
                    )}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                        <MessageCircle className="h-3.5 w-3.5" /> Reply
                      </Button>
                      {ticket.status !== "Closed" && (
                        <Button variant="outline" size="sm" className="h-8 text-xs gap-1 text-success border-success/30 hover:bg-success/10 hover:text-success" onClick={() => resolveTicket(ticket.id)}>
                          <CheckCircle className="h-3.5 w-3.5" /> Resolve
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
