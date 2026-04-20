import { useState } from "react";
import { Search, Filter, Clock, BookOpen, Play, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { mockExams, StandaloneExam } from "@/data/mockExams";
import { Button } from "@/components/ui/button";

export default function EmployeeExams() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const employeeExams = mockExams.filter(e => e.status === "active");
  const filteredExams = employeeExams.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">My Exams</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View and take your assigned stand-alone exams.
          </p>
        </div>
        
        <div className="flex flex-1 items-center gap-2 sm:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search exams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className="flex items-center justify-center rounded-lg border border-border bg-card p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {filteredExams.map((exam) => (
          <div key={exam.id} className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
            <div className="p-5 flex flex-col flex-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground line-clamp-2 mb-2">
                {exam.title}
              </h3>
              <div className="mt-auto pt-4 space-y-3">
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{exam.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 shrink-0" />
                    <span className="text-xs">
                       {new Date(exam.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(exam.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                </div>
                <Button asChild className="w-full gap-2 mt-2">
                  <Link to={`/exams/${exam.id}`}>
                    <Play className="h-4 w-4" /> Take Exam
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
        {filteredExams.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-muted-foreground">No exams found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
