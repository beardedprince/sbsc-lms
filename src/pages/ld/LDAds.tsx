import { useState } from "react";
import { Megaphone, Plus, Search, Trash2, Calendar, Image as ImageIcon } from "lucide-react";
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

const initialAds = [
  { id: 1, title: "Q3 Mandatory Compliance Push", target: "All Staff", startDate: "2026-07-01", endDate: "2026-07-31", status: "Scheduled", clicks: 0, image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=300&h=200&auto=format&fit=crop" },
  { id: 2, title: "Leadership Seminar 2026", target: "Management", startDate: "2026-01-01", endDate: "2026-12-31", status: "Active", clicks: 1245, image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=300&h=200&auto=format&fit=crop" },
];

export default function LDAds() {
  const [ads, setAds] = useState(initialAds);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleAddAd = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newAd = {
      id: Math.random(),
      title: formData.get("title") as string,
      target: formData.get("target") as string,
      startDate: formData.get("start") as string,
      endDate: formData.get("end") as string,
      status: "Scheduled",
      clicks: 0,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=300&h=200&auto=format&fit=crop", // placeholder
    };
    setAds([newAd, ...ads]);
    setIsModalOpen(false);
  };

  const filtered = ads.filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Ad Space Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure promotional banners and pushes for the employee dashboard.
          </p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shrink-0">
              <Plus className="h-4 w-4" /> Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Setup Banner Campaign</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddAd} className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign Title</label>
                <input required name="title" className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="e.g. End of Year Security Reminder" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Audience / Department</label>
                <select name="target" className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                  <option value="All Staff">All Staff</option>
                  <option value="Retail Banking">Retail Banking</option>
                  <option value="Management">Management</option>
                  <option value="New Hires">New Hires</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <input required type="date" name="start" className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <input required type="date" name="end" className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Banner Artwork (URL or Upload)</label>
                <div className="flex items-center gap-2 w-full rounded-md border border-dashed bg-muted/30 px-3 py-6 text-sm text-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors">
                  <ImageIcon className="h-6 w-6" /> Click to upload image (1200x400)
                </div>
              </div>
              <DialogFooter className="mt-6 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">Schedule Campaign</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-border bg-card shadow-sm py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((ad) => (
          <div key={ad.id} className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md flex flex-col">
            <div className="relative aspect-[21/9] w-full bg-muted overflow-hidden">
              <img src={ad.image} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 flex gap-2">
                <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md bg-background/80 shadow-sm border", 
                  ad.status === "Active" ? "border-success/50 text-success" : "border-info/50 text-info"
                )}>
                  {ad.status}
                </span>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-2 gap-4">
                <h3 className="font-heading text-lg font-semibold text-foreground line-clamp-2">{ad.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground bg-muted/50 w-fit px-2 py-0.5 rounded flex items-center gap-1.5 mb-4 border border-border">
                Target: {ad.target}
              </p>
              
              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(ad.startDate).toLocaleDateString()} - {new Date(ad.endDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  {ad.clicks} Clicks
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-between border-t border-border bg-muted/30 p-2 px-4 shadow-inner">
               <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Campaign Options</span>
               <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => setAds(ads.filter(a => a.id !== ad.id))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
               </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-24 text-center text-muted-foreground border border-dashed rounded-xl">
            No ad campaigns found.
          </div>
        )}
      </div>
    </div>
  );
}
