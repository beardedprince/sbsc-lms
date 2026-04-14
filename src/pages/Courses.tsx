import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, BookOpen, Play, Clock, Users, Sparkles } from "lucide-react";
import { mockCourses, type Course } from "@/data/mockCourses";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "all", label: "All Courses" },
  { key: "assigned", label: "Assigned" },
  { key: "recommended", label: "Recommended" },
  { key: "general", label: "General" },
] as const;

const statusBadge = {
  in_progress: { label: "In Progress", className: "bg-info/10 text-info" },
  completed: { label: "Completed", className: "bg-success/10 text-success" },
  not_started: { label: "Not Started", className: "bg-muted text-muted-foreground" },
  failed: { label: "Failed", className: "bg-destructive/10 text-destructive" },
};

const typeIcon = {
  video: Play,
  text: BookOpen,
  mixed: BookOpen,
  exam: Clock,
};

export default function Courses() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = mockCourses.filter((c) => {
    const matchesTab = activeTab === "all" || c.category === activeTab;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Course Catalog</h1>
        <p className="mt-1 text-sm text-muted-foreground">Browse and enroll in courses to advance your skills</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses or ask for a suggestion..."
            className="h-10 w-full max-w-md rounded-lg border border-input bg-card pl-10 pr-28 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px] uppercase font-bold pointer-events-none">
            <Sparkles className="h-3 w-3" /> AI Search
          </div>
        </div>
        <button className="flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground hover:bg-muted">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-border bg-muted p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground/40" />
          <p className="mt-4 font-heading text-lg font-semibold text-foreground">No courses found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const Icon = typeIcon[course.type];

  return (
    <Link to={`/courses/${course.id}`} className="group flex flex-col rounded-xl border border-border bg-card transition-all hover:shadow-lg">
      {/* Thumbnail */}
      <div className="relative flex h-40 overflow-hidden items-center justify-center rounded-t-xl bg-muted group-hover:bg-muted/80 transition-colors">
        {course.thumbnail ? (
          <>
            <img src={course.thumbnail} alt={course.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Icon className="h-10 w-10 text-white/50 backdrop-blur-sm rounded-lg p-2 bg-black/20 drop-shadow-md" />
            </div>
          </>
        ) : (
          <Icon className="h-10 w-10 text-primary/30 relative z-10 transition-transform duration-500 group-hover:scale-110" />
        )}
        <span className={cn("absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-medium z-20 shadow-sm backdrop-blur-md", statusBadge[course.status].className)}>
          {statusBadge[course.status].label}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {course.department}
          </span>
        </div>
        <h3 className="font-heading text-base font-semibold text-card-foreground group-hover:text-primary">
          {course.title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{course.description}</p>

        {course.progress > 0 && course.status !== "completed" && (
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{course.progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted">
              <div className="h-full rounded-full bg-secondary" style={{ width: `${course.progress}%` }} />
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {course.modules} modules
          </div>
        </div>
      </div>
    </Link>
  );
}
