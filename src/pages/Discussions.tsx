import { useState } from "react";
import { MessageSquare, Users, Clock, Search, ChevronRight, MessageCircle, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const initialForums = [
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

const initialTopics = [
  { id: 101, forumId: 1, title: "Welcome to the new platform!", author: "L&D Admin", replies: 45, views: 230, lastActive: "1 hr ago" },
  { id: 102, forumId: 1, title: "Quarterly Compliance Deadline", author: "Hr System", replies: 12, views: 98, lastActive: "3 hrs ago" },
  { id: 103, forumId: 2, title: "Can someone explain the Basel III module?", author: "Sarah Jenkins", replies: 3, views: 42, lastActive: "10 mins ago" },
];

export default function Discussions() {
  const [forums, setForums] = useState(initialForums);
  const [topics, setTopics] = useState(initialTopics);
  const [activeForumId, setActiveForumId] = useState<number | null>(null);
  const [isNewTopicOpen, setIsNewTopicOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTopicForm, setNewTopicForm] = useState({ title: "", content: "", forumId: 1 });

  const activeForum = forums.find(f => f.id === activeForumId);
  const currentTopics = activeForumId ? topics.filter(t => t.forumId === activeForumId) : [];

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicForm.title.trim()) return;

    const newTopic = {
      id: Math.random(),
      forumId: activeForumId || newTopicForm.forumId, 
      title: newTopicForm.title,
      author: "Current User",
      replies: 0,
      views: 0,
      lastActive: "Just now"
    };

    setTopics([newTopic, ...topics]);
    setForums(forums.map(f => f.id === newTopic.forumId ? { ...f, topics: f.topics + 1 } : f));
    setIsNewTopicOpen(false);
    setNewTopicForm({ title: "", content: "", forumId: 1 });
  };

  const filteredForums = forums.filter(f => f.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            {activeForum ? activeForum.title : "Discussion Forums"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
            {activeForum ? activeForum.description : "Engage with peers, ask questions, and share your knowledge across learning communities."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {activeForum && (
             <Button variant="outline" className="gap-2 shrink-0" onClick={() => setActiveForumId(null)}>
               <ArrowLeft className="h-4 w-4" /> All Forums
             </Button>
          )}
          <Dialog open={isNewTopicOpen} onOpenChange={setIsNewTopicOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 shrink-0" onClick={() => setNewTopicForm(prev => ({ ...prev, forumId: activeForumId || 1 }))}>
                <MessageCircle className="h-4 w-4" /> New Topic
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Discussion Topic</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateTopic} className="space-y-4 py-4">
                {!activeForumId && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Forum</label>
                    <select 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={newTopicForm.forumId}
                      onChange={(e) => setNewTopicForm({ ...newTopicForm, forumId: Number(e.target.value) })}
                    >
                      {forums.map(f => (
                        <option key={f.id} value={f.id}>{f.title}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Topic Title</label>
                  <input 
                    required 
                    value={newTopicForm.title}
                    onChange={(e) => setNewTopicForm({ ...newTopicForm, title: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                    placeholder="e.g. Any study groups for Module 3?" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message Body</label>
                  <textarea 
                    required 
                    rows={6}
                    value={newTopicForm.content}
                    onChange={(e) => setNewTopicForm({ ...newTopicForm, content: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                    placeholder="Provide details about your discussion topic..."></textarea>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsNewTopicOpen(false)}>Cancel</Button>
                  <Button type="submit" className="gap-2"><Send className="h-4 w-4" /> Post Topic</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="border-b border-border bg-muted/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          {!activeForum && (
            <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground overflow-x-auto whitespace-nowrap pb-1 sm:pb-0">
              <button className="text-foreground border-b-2 border-primary pb-1">All Forums</button>
              <button className="hover:text-foreground transition-colors pb-1 border-b-2 border-transparent">My Topics</button>
              <button className="hover:text-foreground transition-colors pb-1 border-b-2 border-transparent">Following</button>
            </div>
          )}
        </div>

        <div className="divide-y divide-border">
          {!activeForum ? (
             filteredForums.map((forum) => (
                <div key={forum.id} className="group p-6 flex flex-col sm:flex-row gap-6 transition-colors hover:bg-muted/10">
                  <div className="flex flex-1 items-start gap-4">
                    <div className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${forum.active ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer" onClick={() => setActiveForumId(forum.id)}>
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
                    <Button variant="ghost" onClick={() => setActiveForumId(forum.id)} className="gap-2 group-hover:bg-primary group-hover:text-primary-foreground sm:w-full justify-between">
                      View Forum <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
          ) : (
            currentTopics.length === 0 ? (
               <div className="p-12 text-center text-muted-foreground">
                  <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                  <p>No topics have been posted in this forum yet.</p>
                  <Button variant="link" onClick={() => setIsNewTopicOpen(true)}>Start the first discussion</Button>
               </div>
            ) : (
               currentTopics.map(topic => (
                  <div key={topic.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-muted/10 transition-colors cursor-pointer">
                    <div className="flex items-start gap-4 flex-1">
                       <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
                         {topic.author.charAt(0)}
                       </div>
                       <div>
                         <h4 className="font-semibold text-foreground text-base hover:text-primary transition-colors">{topic.title}</h4>
                         <p className="text-xs text-muted-foreground mt-1">Started by <span className="font-medium text-foreground">{topic.author}</span> • {topic.lastActive}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground shrink-0 border-t sm:border-t-0 border-border pt-3 sm:pt-0 w-full sm:w-auto">
                       <div className="text-center">
                         <span className="block font-bold text-foreground text-base">{topic.replies}</span>
                         <span className="text-[10px] uppercase">Replies</span>
                       </div>
                       <div className="text-center">
                         <span className="block font-bold text-foreground text-base">{topic.views}</span>
                         <span className="text-[10px] uppercase">Views</span>
                       </div>
                    </div>
                  </div>
               ))
            )
          )}
        </div>
      </div>
    </div>
  );
}
