import { useState } from "react";
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Clock, Users, Building, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface StandaloneExam {
  id: string;
  title: string;
  duration: string;
  department: string;
  role: string;
  status: "active" | "draft" | "closed";
  assignedCount: number;
  completedCount: number;
}

const mockExams: StandaloneExam[] = [
  { id: "1", title: "Q3 Corporate Compliance Exam", duration: "60 mins", department: "All Staff", role: "All Roles", status: "active", assignedCount: 1250, completedCount: 840 },
  { id: "2", title: "Information Security Refresher - Exam", duration: "45 mins", department: "IT & Operations", role: "All Roles", status: "active", assignedCount: 300, completedCount: 280 },
  { id: "3", title: "New Senior Management Guidelines Exam", duration: "90 mins", department: "Management", role: "Senior Exec", status: "draft", assignedCount: 0, completedCount: 0 },
];

export default function LDExams() {
  const [exams, setExams] = useState<StandaloneExam[]>(mockExams);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const filteredExams = exams.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleUploadExam = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newExam: StandaloneExam = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.get("title") as string,
      duration: formData.get("duration") as string,
      department: formData.get("department") as string,
      role: formData.get("role") as string,
      status: "active",
      assignedCount: 0,
      completedCount: 0,
    };

    setExams([newExam, ...exams]);
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Stand-Alone Exams</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload and manage time-based exams for specific departments, roles, or all employees.
          </p>
        </div>
        
        <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shrink-0">
              <Plus className="h-4 w-4" /> Upload Exam
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Upload Stand-Alone Exam</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUploadExam} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium">Exam Title</label>
                  <input required name="title" className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="e.g. Annual Policy Update Exam" />
                </div>
                
                {/* Time-based condition */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration (Time Limit)</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input required name="duration" className="w-full rounded-md border bg-background py-2 pl-9 pr-3 text-sm" placeholder="e.g. 60 mins" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Availability Period</label>
                  <input required type="date" name="deadline" className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
                </div>

                {/* Assignment Filters */}
                <div className="col-span-2 border-t border-border mt-2 pt-4">
                  <h3 className="text-sm font-bold mb-3">Assignment Criteria</h3>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Department</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input required name="department" className="w-full rounded-md border bg-background py-2 pl-9 pr-3 text-sm" placeholder="e.g. All Staff, Retail" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Role</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input name="role" defaultValue="All Roles" className="w-full rounded-md border bg-background py-2 pl-9 pr-3 text-sm" placeholder="e.g. Teller, Manager" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Grade</label>
                  <input name="grade" className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="e.g. G2-G5" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Gender</label>
                  <select name="gender" className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                    <option value="all">All</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>

                <div className="col-span-2 space-y-2 border-t border-border mt-2 pt-4">
                  <label className="text-sm font-medium">Upload Exam Content (PDF, DOCX, ZIP)</label>
                  <input type="file" className="w-full rounded-md border bg-background px-3 py-2 text-sm cursor-pointer" />
                </div>
              </div>
              <DialogFooter className="mt-6 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setIsUpdateModalOpen(false)}>Cancel</Button>
                <Button type="submit">Publish Exam</Button>
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
              placeholder="Search exams..."
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
                <th className="px-6 py-4 font-medium">Exam Title</th>
                <th className="px-6 py-4 font-medium">Assignments</th>
                <th className="px-6 py-4 font-medium">Time Limit</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Completion Rates</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredExams.map((exam) => (
                <tr key={exam.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-md bg-secondary/10 text-secondary">
                        <FileSpreadsheet className="h-5 w-5" />
                      </div>
                      <div className="line-clamp-2 max-w-[250px]">{exam.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div>{exam.department}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{exam.role}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {exam.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${exam.status === 'active' ? 'bg-success/10 text-success border-success/20' : exam.status === 'draft' ? 'bg-muted text-muted-foreground border-border' : 'bg-destructive/10 text-destructive border-destructive/20'}`}>
                      {exam.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {exam.assignedCount > 0 ? (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{exam.completedCount}/{exam.assignedCount}</span>
                          <span className="font-medium">{Math.round((exam.completedCount / exam.assignedCount) * 100)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(exam.completedCount / exam.assignedCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-xs">Pending assignment</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-secondary">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredExams.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No exams found matching your criteria.
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
