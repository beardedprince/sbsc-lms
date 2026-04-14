import { useState } from "react";
import { MonitorPlay, Plus, Video, MapPin, Search, User, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const initialSessions = [
  { id: 1, title: "Leadership Executive Coaching", type: "Virtual", instructor: "Dr. Ahmed", date: "2026-06-15T14:00", attendees: 15, maxAttendees: 20 },
  { id: 2, title: "Fire Safety Drill", type: "Classroom", instructor: "Safety Team", date: "2026-06-18T10:00", attendees: 50, maxAttendees: 50 },
  { id: 3, title: "New Banking Platform Walkthrough", type: "Hybrid", instructor: "IT Dept", date: "2026-06-20T09:00", attendees: 120, maxAttendees: 500 },
];

export default function LDClassrooms() {
  const [sessions, setSessions] = useState(initialSessions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newSession = {
      id: Math.random(),
      title: formData.get("title") as string,
      type: formData.get("type") as string,
      instructor: formData.get("instructor") as string,
      date: formData.get("date") as string,
      attendees: 0,
      maxAttendees: parseInt(formData.get("max") as string) || 100,
    };
    setSessions([newSession, ...sessions]);
    setIsModalOpen(false);
  };

  const filtered = sessions.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Classroom Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Schedule virtual and physical ILT (Instructor-Led Training) sessions.
          </p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shrink-0">
              <Plus className="h-4 w-4" /> Schedule Session
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule New Session</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSchedule} className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Session Title</label>
                <input required name="title" className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="e.g. Risk Management Workshop" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Format</label>
                  <select name="type" className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                    <option value="Virtual">Virtual (Zoom/Teams)</option>
                    <option value="Classroom">Physical Classroom</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Instructor</label>
                  <input required name="instructor" className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="Instructor Name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date & Time</label>
                  <input required type="datetime-local" name="date" className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Attendees</label>
                  <input required type="number" name="max" className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="100" />
                </div>
              </div>
              <DialogFooter className="mt-6 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">Publish Schedule</Button>
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
              placeholder="Search sessions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
          {filtered.map((session) => (
            <div key={session.id} className="group relative flex flex-col rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("px-2.5 py-1 rounded-md text-xs font-medium border flex items-center gap-1.5", 
                  session.type === "Virtual" ? "bg-info/10 text-info border-info/20" : 
                  session.type === "Classroom" ? "bg-secondary/10 text-secondary border-secondary/20" : 
                  "bg-primary/10 text-primary border-primary/20"
                )}>
                  {session.type === "Virtual" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                  {session.type}
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setSessions(sessions.filter(s => s.id !== session.id))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{session.title}</h3>
              
              <div className="space-y-2 mt-auto text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 shrink-0" /> {session.instructor}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0" /> {new Date(session.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex justify-between text-xs mb-1">
                  <span>Capacity</span>
                  <span className="font-medium text-foreground">{session.attendees} / {session.maxAttendees}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all duration-500", (session.attendees/session.maxAttendees) > 0.9 ? "bg-destructive" : "bg-success")} style={{ width: `${(session.attendees/session.maxAttendees)*100}%` }} />
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">No sessions found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
