import { useState } from "react";
import { MessageSquare, Plus, Send, Megaphone, Trash2, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const initialAnnouncements = [
  { id: 1, title: "System Maintenance This Weekend", target: "All Staff", time: "2 hrs ago", type: "Alert" },
];

export default function LDCommunications() {
  const [messages, setMessages] = useState(initialAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newMessage = {
      id: Math.random(),
      title: formData.get("title") as string,
      target: formData.get("target") as string,
      type: formData.get("type") as string,
      time: "Just now",
    };
    setMessages([newMessage, ...messages]);
    setIsModalOpen(false);
  };

  const filtered = messages.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Communications</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage announcements, broadcast messages, and push notifications.
          </p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shrink-0">
              <Megaphone className="h-4 w-4" /> New Broadcast
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Send Broadcast Alert</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleBroadcast} className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Notification Title</label>
                <input required name="title" className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="e.g. Mandatory Compliance Overdue" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message Body</label>
                <textarea required rows={4} className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="Type your full message here..."></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Group</label>
                  <select name="target" className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                    <option value="All Staff">All Staff</option>
                    <option value="Retail Banking">Retail Banking</option>
                    <option value="HQ">HQ Specific</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority Level</label>
                  <select name="type" className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                    <option value="Info">Info (Standard)</option>
                    <option value="Alert">Alert (High Priority)</option>
                  </select>
                </div>
              </div>
              <DialogFooter className="mt-6 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="gap-2"><Send className="h-4 w-4" /> Broadcast Now</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border bg-muted/20 p-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search past broadcasts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none transition-colors"
            />
          </div>
        </div>

        <div className="p-0">
          {filtered.map(msg => (
            <div key={msg.id} className="flex items-start justify-between p-4 border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
              <div className="flex gap-4">
                <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${msg.type === 'Alert' ? 'bg-destructive/10 text-destructive' : 'bg-info/10 text-info'}`}>
                  {msg.type === 'Alert' ? <Bell className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{msg.title}</h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="font-medium px-2 shrink-0 py-0.5 bg-muted rounded">Target: {msg.target}</span>
                    <span>{msg.time}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => setMessages(messages.filter(m => m.id !== msg.id))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {filtered.length === 0 && (
             <div className="p-12 text-center text-muted-foreground">No broadcasts found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
