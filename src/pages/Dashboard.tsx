import { BookOpen, Award, Clock, TrendingUp, ArrowRight, Play, AlertCircle, Sparkles } from "lucide-react";
import { mockCourses } from "@/data/mockCourses";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Courses In Progress", value: "3", icon: BookOpen, color: "text-info" },
  { label: "Completed", value: "12", icon: Award, color: "text-success" },
  { label: "Hours Learned", value: "48", icon: Clock, color: "text-secondary" },
  { label: "Completion Rate", value: "87%", icon: TrendingUp, color: "text-accent" },
];

const notifications = [
  { id: 1, text: "AML Compliance course due in 3 days", type: "warning" as const },
  { id: 2, text: "New course assigned: Data Privacy & NDPR", type: "info" as const },
  { id: 3, text: "Certificate available: Customer Service Excellence", type: "success" as const },
];

const statusBadge = {
  in_progress: { label: "In Progress", className: "bg-info/10 text-info" },
  completed: { label: "Completed", className: "bg-success/10 text-success" },
  not_started: { label: "Not Started", className: "bg-muted text-muted-foreground" },
  failed: { label: "Failed", className: "bg-destructive/10 text-destructive" },
};

export default function Dashboard() {
  const assignedCourses = mockCourses.filter((c) => c.category === "assigned");
  const recommendedCourses = mockCourses.filter((c) => c.category === "recommended");

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <stat.icon className={cn("h-5 w-5", stat.color)} />
            </div>
            <p className="mt-2 font-heading text-3xl font-bold text-card-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Assigned Courses */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold text-foreground">Assigned Courses</h3>
              <Link to="/courses" className="flex items-center gap-1 text-sm font-medium text-secondary hover:underline">
                View All <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {assignedCourses.map((course) => (
                <Link to={`/courses/${course.id}`} key={course.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md">
                  <div className="relative overflow-hidden flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-muted">
                    {course.thumbnail ? (
                      <>
                        <img src={course.thumbnail} alt={course.title} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20"></div>
                        <Play className="h-5 w-5 text-white relative z-10 drop-shadow-md" />
                      </>
                    ) : (
                      <Play className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium text-card-foreground">{course.title}</p>
                    <p className="text-xs text-muted-foreground">{course.instructor} · {course.duration} · {course.modules} modules</p>
                    {course.progress > 0 && (
                      <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
                        <div className="h-full rounded-full bg-secondary" style={{ width: `${course.progress}%` }} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", statusBadge[course.status].className)}>
                      {statusBadge[course.status].label}
                    </span>
                    {course.dueDate && (
                      <span className="text-xs text-muted-foreground">Due {new Date(course.dueDate).toLocaleDateString()}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Recommended */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                 Recommended for You <span className="bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1"><Sparkles className="h-3 w-3" /> AI Suggested</span>
              </h3>
              <Link to="/courses" className="flex items-center gap-1 text-sm font-medium text-secondary hover:underline">
                View All <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Based on your role and recent progress, we suggest these following courses:</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {recommendedCourses.map((course) => (
                <div key={course.id} className="relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
                  {course.thumbnail && (
                    <>
                      <img src={course.thumbnail} alt={course.title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/30"></div>
                    </>
                  )}
                  <div className="relative z-10">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 backdrop-blur-md">
                      <BookOpen className="h-5 w-5 text-accent" />
                    </div>
                    <h4 className="font-medium text-card-foreground">{course.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{course.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-medium">{course.duration}</span>
                      <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium shadow-sm backdrop-blur-sm", statusBadge[course.status].className)}>
                        {statusBadge[course.status].label}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <section className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 font-heading text-sm font-semibold text-card-foreground">Notifications</h3>
            <div className="space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className="flex gap-3">
                  <AlertCircle className={cn("mt-0.5 h-4 w-4 shrink-0", {
                    "text-warning": n.type === "warning",
                    "text-info": n.type === "info",
                    "text-success": n.type === "success",
                  })} />
                  <p className="text-sm text-card-foreground">{n.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming */}
          <section className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 font-heading text-sm font-semibold text-card-foreground">Upcoming Training</h3>
            <div className="space-y-4">
              {[
                { title: "Risk Management Workshop", date: "Apr 28, 2026", type: "Classroom" },
                { title: "Cybersecurity Awareness", date: "May 5, 2026", type: "Virtual" },
                { title: "Q2 Compliance Assessment", date: "May 12, 2026", type: "Exam" },
              ].map((event) => (
                <div key={event.title} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-muted text-xs">
                    <span className="font-semibold text-foreground">{event.date.split(" ")[1].replace(",", "")}</span>
                    <span className="text-muted-foreground">{event.date.split(" ")[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
