import { useState } from "react";
import { BookOpen, Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockCourses, Course } from "@/data/mockCourses";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export default function LDCourses() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredCourses = courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newCourse: Course = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as any,
      department: formData.get("department") as string,
      duration: formData.get("duration") as string,
      modules: parseInt(formData.get("modules") as string) || 0,
      progress: 0,
      status: "not_started",
      thumbnail: "",
      instructor: formData.get("instructor") as string,
      type: formData.get("type") as any,
      retakeLimit: parseInt(formData.get("retakeLimit") as string) || 1,
    };

    setCourses([newCourse, ...courses]);
    setIsCreateModalOpen(false);
  };

  const statusBadge = {
    assigned: "bg-primary/10 text-primary border-primary/20",
    recommended: "bg-secondary/10 text-secondary border-secondary/20",
    general: "bg-muted text-muted-foreground border-border",
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Course Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create, edit, and manage all training modules across the organization.
          </p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shrink-0">
              <Plus className="h-4 w-4" /> Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateCourse} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium">Course Title</label>
                  <input required name="title" className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="e.g. Advanced Compliance Training" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea required name="description" rows={3} className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="Brief course outline..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select name="category" className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                    <option value="assigned">Assigned (Mandatory)</option>
                    <option value="recommended">Recommended</option>
                    <option value="general">General Library</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Department</label>
                  <input required name="department" className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="e.g. All Staff, Retail" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <input required name="duration" className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="e.g. 2h 30m" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Number of Modules</label>
                  <input required type="number" name="modules" className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="e.g. 5" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Instructor</label>
                  <input required name="instructor" className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content Type</label>
                  <select name="type" className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                    <option value="video">Video Based</option>
                    <option value="text">Document/Text</option>
                    <option value="mixed">Mixed Media</option>
                    <option value="exam">Assessment Only</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Failed Exam Retake Limit</label>
                  <input required type="number" min="0" defaultValue="1" name="retakeLimit" className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="e.g. 1" />
                </div>
              </div>
              <DialogFooter className="mt-6 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                <Button type="submit">Publish Course</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border bg-muted/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Course Title</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Instructor</th>
                <th className="px-6 py-4 font-medium">Format</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-md bg-primary/10 text-primary">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div className="line-clamp-2 max-w-[250px]">{course.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{course.department}</td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium border", statusBadge[course.category as keyof typeof statusBadge])}>
                      {course.category.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{course.instructor}</td>
                  <td className="px-6 py-4 text-muted-foreground capitalize">{course.type}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No courses found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
