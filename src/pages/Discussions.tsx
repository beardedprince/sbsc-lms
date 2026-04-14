import { MessageSquare, Users, Clock, Search, ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const forums = [
  {
    id: 1,
    title: "General L&D Announcements",
    description: "Official communications from the Learning and Development team regarding new programs and company-wide initiatives.",
    topics: 24,
    replies: 156,
    lastActive: "2 hours ago",
    active: true,
  },
  {
    id: 2,
    title: "Course: Retail Banking Fundamentals",
    description: "Discuss modules, ask questions, and share insights related to the Retail Banking curriculum.",
    topics: 89,
    replies: 432,
    lastActive: "5 mins ago",
    active: true,
  },
  {
    id: 3,
    title: "Leadership Book Club",
    description: "Monthly discussions on recommended reading for aspiring and current management.",
    topics: 12,
    replies: 84,
    lastActive: "1 day ago",
    active: false,
  },
  {
    id: 4,
    title: "Technical Skills Swap",
    description: "Peer-to-peer knowledge sharing for Excel, Python, PowerBI, and other technical tools.",
    topics: 156,
    replies: 890,
    lastActive: "Just now",
    active: true,
  }
];

export default function Discussions() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Discussions</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Engage with peers, ask questions, and share your knowledge across learning communities.
          </p>
        </div>
        <Button className="gap-2">
          <MessageCircle className="h-4 w-4" /> New Topic
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="border-b border-border bg-muted/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search discussions..."
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground overflow-x-auto whitespace-nowrap pb-1 sm:pb-0">
            <button className="text-foreground border-b-2 border-primary pb-1">All Forums</button>
            <button className="hover:text-foreground transition-colors pb-1 border-b-2 border-transparent">My Topics</button>
            <button className="hover:text-foreground transition-colors pb-1 border-b-2 border-transparent">Following</button>
          </div>
        </div>

        <div className="divide-y divide-border">
          {forums.map((forum) => (
            <div key={forum.id} className="group p-6 flex flex-col sm:flex-row gap-6 transition-colors hover:bg-muted/10">
              <div className="flex flex-1 items-start gap-4">
                <div className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${forum.active ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer">
                    {forum.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {forum.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
                    <span className="flex items-center gap-1.5"><MessageCircle className="h-4 w-4" /> {forum.topics} Topics</span>
                    <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {forum.replies} Replies</span>
                    <span className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-md"><Clock className="h-3.5 w-3.5" /> Active {forum.lastActive}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-border pt-4 sm:pt-0 shrink-0">
                <Button variant="ghost" className="gap-2 group-hover:bg-primary group-hover:text-primary-foreground sm:w-full justify-between">
                  View Forum <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
