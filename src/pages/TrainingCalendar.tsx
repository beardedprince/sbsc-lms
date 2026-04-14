import { useState } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, Video, User, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const upcomingEvents = [
  {
    id: 1,
    title: "Risk Management Workshop",
    date: new Date(2026, 3, 28, 10, 0), // Apr 28, 2026
    endDate: new Date(2026, 3, 28, 12, 0),
    type: "Classroom",
    location: "Main Auditorium, HQ",
    instructor: "Sarah Jenkins",
    status: "registered",
  },
  {
    id: 2,
    title: "Cybersecurity Awareness",
    date: new Date(2026, 4, 5, 14, 0), // May 5, 2026
    endDate: new Date(2026, 4, 5, 15, 30),
    type: "Virtual",
    location: "Microsoft Teams",
    instructor: "IT Security Team",
    status: "mandatory",
  },
  {
    id: 3,
    title: "Leadership Strategy Session",
    date: new Date(2026, 4, 12, 9, 0), // May 12, 2026
    endDate: new Date(2026, 4, 12, 16, 0),
    type: "Hybrid",
    location: "Boardroom A / Zoom",
    instructor: "Michael Chang",
    status: "registered",
  },
];

export default function TrainingCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Training Calendar</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Schedule, manage, and join your upcoming instructor-led training sessions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="h-4 w-4" /> Download Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Calendar Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-4 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
            />
          </div>
          
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Legend</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="h-3 w-3 rounded-full bg-primary/20 border border-primary"></span>
                <span>Registered Sessions</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="h-3 w-3 rounded-full bg-destructive/20 border border-destructive"></span>
                <span>Mandatory Training</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="h-3 w-3 rounded-full bg-secondary/20 border border-secondary"></span>
                <span>Optional Workshops</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">Upcoming Sessions</h2>
          
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="group flex flex-col sm:flex-row gap-0 sm:gap-6 rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md hover:border-primary/30">
                <div className="mb-4 sm:mb-0 flex w-24 shrink-0 flex-col items-center justify-center rounded-lg bg-muted/50 p-3 pt-4 text-center">
                  <span className="text-xs font-semibold uppercase text-muted-foreground">
                    {event.date.toLocaleString('default', { month: 'short' })}
                  </span>
                  <span className="font-heading text-3xl font-bold text-foreground">
                    {event.date.getDate()}
                  </span>
                </div>
                
                <div className="flex flex-1 flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium border", 
                      event.status === "registered" ? "bg-primary/5 text-primary border-primary/20" : 
                      event.status === "mandatory" ? "bg-destructive/5 text-destructive border-destructive/20" : 
                      "bg-secondary/5 text-secondary border-secondary/20"
                    )}>
                      {event.status === "registered" ? "Registered" : "Mandatory"}
                    </span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground flex items-center gap-1">
                      {event.type === 'Virtual' ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                      {event.type}
                    </span>
                  </div>
                  
                  <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span>{event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {event.endDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {event.type === 'Virtual' ? <Video className="h-4 w-4 shrink-0" /> : <MapPin className="h-4 w-4 shrink-0" />}
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <User className="h-4 w-4 shrink-0" />
                      <span>Instructor: {event.instructor}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-0 flex items-center justify-end sm:flex-col sm:justify-center border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-6">
                  <Button variant="ghost" size="icon" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors h-10 w-10 rounded-full">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
