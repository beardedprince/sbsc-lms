import { useState } from "react";
import { Play, Search, Filter, Clock, Award, BookOpen } from "lucide-react";
import { mockCourses, Course } from "@/data/mockCourses";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const statusBadge = {
  in_progress: { label: "In Progress", className: "bg-info/10 text-info" },
  completed: { label: "Completed", className: "bg-success/10 text-success" },
  not_started: { label: "Not Started", className: "bg-muted text-muted-foreground" },
  failed: { label: "Failed", className: "bg-destructive/10 text-destructive" },
};

function CourseCard({ course }: { course: Course }) {
  return (
    <Link to={`/courses/${course.id}`} className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
      <div className="relative aspect-video w-full bg-muted/50 flex items-center justify-center overflow-hidden">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <BookOpen className="h-10 w-10 text-muted-foreground/30 transition-transform duration-300 group-hover:scale-110" />
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
            <Play className="h-6 w-6 text-white fill-white" />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground px-2 py-1 bg-secondary/10 rounded-md">
            {course.department}
          </span>
          <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap", statusBadge[course.status].className)}>
            {statusBadge[course.status].label}
          </span>
        </div>
        <h3 className="font-heading text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2 flex-1">
          {course.description}
        </p>
        
        <div className="mt-4 space-y-3">
          {course.progress > 0 && course.status !== "completed" && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{course.progress}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all duration-500 ease-in-out" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
            <div className="flex items-center gap-1.5 flex-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{course.modules} modules</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function MyLearning() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const inProgressCourses = mockCourses.filter((c) => c.status === "in_progress");
  const completedCourses = mockCourses.filter((c) => c.status === "completed");
  const notStartedCourses = mockCourses.filter((c) => c.status === "not_started");

  // Only filtering based on title for demonstration
  const filterCourses = (courses: Course[]) => {
    if (!searchQuery) return courses;
    return courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">My Learning</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your progress, resume courses, and view your achievements.
          </p>
        </div>
        
        <div className="flex flex-1 items-center gap-2 sm:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search your courses..."
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-info/10">
            <Play className="h-6 w-6 text-info" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{inProgressCourses.length}</p>
            <p className="text-sm font-medium text-muted-foreground">In Progress</p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
            <Award className="h-6 w-6 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{completedCourses.length}</p>
            <p className="text-sm font-medium text-muted-foreground">Completed</p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
            <BookOpen className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{notStartedCourses.length}</p>
            <p className="text-sm font-medium text-muted-foreground">To Do</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="in-progress" className="w-full">
        <div className="flex items-center justify-between border-b border-border pb-1">
          <TabsList className="h-auto bg-transparent p-0">
            <TabsTrigger 
              value="in-progress"
              className="relative rounded-none px-4 py-2 text-sm font-medium text-muted-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:opacity-0 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:after:opacity-100"
            >
              In Progress <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{inProgressCourses.length}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="not-started"
              className="relative rounded-none px-4 py-2 text-sm font-medium text-muted-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:opacity-0 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:after:opacity-100"
            >
              Not Started <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{notStartedCourses.length}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="completed"
              className="relative rounded-none px-4 py-2 text-sm font-medium text-muted-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:opacity-0 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:after:opacity-100"
            >
              Completed <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{completedCourses.length}</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="in-progress" className="mt-6 border-none p-0 outline-none">
          {filterCourses(inProgressCourses).length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filterCourses(inProgressCourses).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
              <div className="rounded-full bg-muted/50 p-4 mb-4">
                <Play className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">No courses in progress</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                You don't have any courses currently in progress. Start a new course to see it here.
              </p>
              <Link to="/courses" className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                Browse Courses
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="not-started" className="mt-6 border-none p-0 outline-none">
          {filterCourses(notStartedCourses).length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filterCourses(notStartedCourses).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
              <div className="rounded-full bg-muted/50 p-4 mb-4">
                <BookOpen className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">All caught up!</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                You have started or completed all your assigned courses. Check out recommended courses.
              </p>
              <Link to="/courses" className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                Explore More
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6 border-none p-0 outline-none">
          {filterCourses(completedCourses).length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filterCourses(completedCourses).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
              <div className="rounded-full bg-muted/50 p-4 mb-4">
                <Award className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">No completed courses yet</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                Complete your courses to earn certificates and see your achievements here.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
