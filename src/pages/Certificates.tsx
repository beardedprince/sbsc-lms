import { Award, Download, Eye, CheckCircle, Search, Filter, X } from "lucide-react";
import { mockCourses } from "@/data/mockCourses";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function Certificates() {
  const completedCourses = mockCourses.filter(c => c.status === "completed");

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">My Certificates</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View, download, and share your earned course certificates.
          </p>
        </div>
        
        <div className="flex flex-1 items-center gap-2 sm:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search certificates..."
              className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className="flex items-center justify-center rounded-lg border border-border bg-card p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {completedCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {completedCourses.map((course) => (
            <div key={course.id} className="group relative flex flex-col items-center rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
              <div className="w-full p-6 pb-0 flex flex-col items-center">
                <div className="relative flex h-32 w-full max-w-[240px] items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-4 shadow-sm group-hover:shadow-md transition-shadow">
                  <div className="absolute top-2 right-2">
                    <Award className="h-6 w-6 text-primary/40" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-semibold tracking-widest text-primary/70 uppercase">Certificate of Completion</p>
                    <p className="mt-2 text-xs font-bold text-foreground line-clamp-2 leading-tight">{course.title}</p>
                    <p className="mt-2 text-[10px] text-muted-foreground">Presented to Student</p>
                  </div>
                </div>
              </div>
              <div className="w-full flex-1 p-5 text-center flex flex-col">
                <h3 className="font-heading text-sm font-semibold text-foreground line-clamp-2 flex-1">
                  {course.title}
                </h3>
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle className="h-3.5 w-3.5 text-success" />
                  <span>Issued: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex w-full items-center justify-center gap-2 border-t border-border bg-muted/30 p-3">
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full text-xs h-8">
                      <Eye className="mr-2 h-3.5 w-3.5" /> View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-3xl p-0 border-0 bg-transparent shadow-none">
                    <div className="relative aspect-[1.414/1] w-full rounded-sm bg-card border-8 border-double border-primary/20 p-8 shadow-2xl flex flex-col items-center justify-center text-center bg-white dark:bg-zinc-950 overflow-hidden">
                      {/* Decorative corners */}
                      <div className="absolute top-2 left-2 w-16 h-16 border-t-2 border-l-2 border-primary/30"></div>
                      <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-primary/30"></div>
                      <div className="absolute bottom-2 left-2 w-16 h-16 border-b-2 border-l-2 border-primary/30"></div>
                      <div className="absolute bottom-2 right-2 w-16 h-16 border-b-2 border-r-2 border-primary/30"></div>
                      
                      <DialogClose className="absolute top-4 right-4 rounded-full p-2 bg-muted/50 hover:bg-muted transition-colors opacity-70 hover:opacity-100 z-10">
                        <X className="h-4 w-4" />
                      </DialogClose>
                      
                      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
                      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/5 blur-3xl"></div>

                      <div className="space-y-6 flex flex-col justify-center h-full relative z-0 w-full px-8 pt-8">
                        <div>
                          <Award className="h-16 w-16 text-primary/40 mx-auto mb-4" strokeWidth={1} />
                          <p className="text-sm font-semibold tracking-[0.2em] text-primary/80 uppercase mb-4">Certificate of Completion</p>
                          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground px-12 leading-tight">{course.title}</h2>
                        </div>
                        
                        <div className="py-6 sm:py-8">
                          <p className="text-sm text-muted-foreground mb-2">This is to certify that</p>
                          <p className="text-2xl sm:text-3xl font-serif text-foreground font-semibold italic">John Doe</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                            has passed the final assessment and successfully completed the requirements for the above mentioned course.
                          </p>
                        </div>
                        
                        <div className="flex items-end justify-between w-full px-4 sm:px-12 mt-auto pt-12 pb-4">
                          <div className="text-center w-32">
                            <div className="border-b border-muted-foreground/30 mb-2 pb-1">
                              <p className="text-sm font-medium text-foreground">{new Date().toLocaleDateString()}</p>
                            </div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Date Issued</p>
                          </div>
                          
                          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-primary/30 rotate-[15deg]">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                              <CheckCircle className="h-8 w-8 text-primary/50" strokeWidth={1.5} />
                            </div>
                          </div>
                          
                          <div className="text-center w-32">
                            <div className="border-b border-muted-foreground/30 mb-2 pb-1">
                              <span className="text-lg font-serif italic text-foreground opacity-80">Director</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Authorized Signature</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button size="sm" className="w-full text-xs h-8">
                  <Download className="mr-2 h-3.5 w-3.5" /> Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-24 text-center mt-6">
          <div className="rounded-full bg-muted/50 p-6 mb-4">
            <Award className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-foreground">No certificates yet</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Complete assigned or recommended courses to earn certificates. They will appear here once earned.
          </p>
        </div>
      )}
    </div>
  );
}
