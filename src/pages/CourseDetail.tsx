import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft, Play, FileText, HelpCircle, ClipboardCheck,
  Lock, CheckCircle2, Circle, Clock, Users, Award,
  ChevronDown, ChevronRight, MessageSquare, AlertCircle,
} from "lucide-react";
import { mockCourses } from "@/data/mockCourses";
import { getModulesForCourse, type Module } from "@/data/mockModules";
import { cn } from "@/lib/utils";

const moduleTypeIcon = {
  video: Play,
  text: FileText,
  quiz: HelpCircle,
  exam: ClipboardCheck,
};

const moduleStatusStyle = {
  completed: { icon: CheckCircle2, className: "text-success", bg: "bg-success/10" },
  in_progress: { icon: Play, className: "text-info", bg: "bg-info/10" },
  available: { icon: Circle, className: "text-muted-foreground", bg: "bg-muted" },
  locked: { icon: Lock, className: "text-muted-foreground/50", bg: "bg-muted/50" },
};

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = mockCourses.find((c) => c.id === courseId);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [showDescription, setShowDescription] = useState(true);

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <AlertCircle className="h-16 w-16 text-muted-foreground/30" />
        <h1 className="mt-4 font-heading text-2xl font-bold text-foreground">Course Not Found</h1>
        <Link to="/courses" className="mt-4 text-sm font-medium text-secondary hover:underline">
          ← Back to Course Catalog
        </Link>
      </div>
    );
  }

  const modules = getModulesForCourse(course.id, course.modules);
  const completedModules = modules.filter((m) => m.status === "completed").length;
  const activeModule = activeModuleId ? modules.find((m) => m.id === activeModuleId) : null;
  const currentModule = activeModule || modules.find((m) => m.status === "in_progress") || modules.find((m) => m.status === "available");

  return (
    <div className="space-y-6">
      {/* Back nav */}
      <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Courses
      </Link>

      {/* Course header */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
                {course.category === "assigned" ? "Assigned" : course.category === "recommended" ? "Recommended" : "General"}
              </span>
              <span className="rounded-full bg-muted px-3 py-0.5 text-xs font-medium text-muted-foreground">
                {course.department}
              </span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-card-foreground">{course.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {course.instructor}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {course.duration}</span>
              <span className="flex items-center gap-1.5"><FileText className="h-4 w-4" /> {course.modules} modules</span>
              {course.dueDate && (
                <span className="flex items-center gap-1.5 text-warning">
                  <AlertCircle className="h-4 w-4" /> Due {new Date(course.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-2 rounded-xl border border-border bg-background p-5 lg:w-48">
            <div className="relative h-20 w-20">
              <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" strokeWidth="6" className="stroke-muted" />
                <circle cx="40" cy="40" r="34" fill="none" strokeWidth="6" strokeLinecap="round"
                  className="stroke-secondary" strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - course.progress / 100)}`} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-heading text-lg font-bold text-foreground">
                {course.progress}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{completedModules}/{modules.length} modules</p>
            {course.status === "completed" && (
              <button className="mt-1 flex items-center gap-1.5 rounded-lg bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground hover:bg-secondary/90">
                <Award className="h-3.5 w-3.5" /> View Certificate
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Video / Content area */}
        <div className="space-y-4 lg:col-span-2">
          {/* Player */}
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="relative flex aspect-video items-center justify-center bg-foreground/5">
              {currentModule?.status === "locked" ? (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Lock className="h-12 w-12" />
                  <p className="text-sm font-medium">Complete previous modules to unlock</p>
                </div>
              ) : currentModule?.type === "video" ? (
                <button className="group flex flex-col items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                    <Play className="h-7 w-7 ml-1" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Play Video</p>
                </button>
              ) : currentModule?.type === "text" ? (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <FileText className="h-12 w-12" />
                  <p className="text-sm font-medium">Reading Material</p>
                </div>
              ) : currentModule?.type === "quiz" || currentModule?.type === "exam" ? (
                <div className="flex flex-col items-center gap-3">
                  <ClipboardCheck className="h-12 w-12 text-accent" />
                  <p className="text-sm font-medium text-foreground">
                    {currentModule.type === "exam" ? "Start Exam" : "Start Quiz"}
                  </p>
                  <p className="text-xs text-muted-foreground">Time limit: {currentModule.duration}</p>
                </div>
              ) : null}
            </div>
            {/* Module info below player */}
            {currentModule && (
              <div className="border-t border-border p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-base font-semibold text-card-foreground">{currentModule.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{currentModule.description}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {currentModule.duration}
                  </span>
                </div>
                <div className="mt-4 flex gap-3">
                  {currentModule.status !== "locked" && currentModule.status !== "completed" && (
                    <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                      {currentModule.status === "in_progress" ? "Continue" : "Start"} {currentModule.type === "exam" ? "Exam" : currentModule.type === "quiz" ? "Quiz" : "Module"}
                    </button>
                  )}
                  {currentModule.status === "completed" && (
                    <span className="flex items-center gap-1.5 text-sm font-medium text-success">
                      <CheckCircle2 className="h-4 w-4" /> Completed
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Discussion section */}
          <div className="rounded-xl border border-border bg-card p-5">
            <button onClick={() => setShowDescription(!showDescription)} className="flex w-full items-center justify-between">
              <h3 className="font-heading text-sm font-semibold text-card-foreground flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Discussion
              </h3>
              {showDescription ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            </button>
            {showDescription && (
              <div className="mt-4">
                <textarea
                  placeholder="Add a comment or question about this module..."
                  className="h-20 w-full resize-none rounded-lg border border-input bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="mt-2 flex justify-end">
                  <button className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                    Post Comment
                  </button>
                </div>
                <div className="mt-4 space-y-3 border-t border-border pt-4">
                  <p className="text-center text-xs text-muted-foreground">No comments yet. Be the first to start a discussion!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Module list sidebar */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-4">
            <h3 className="font-heading text-sm font-semibold text-card-foreground">Course Modules</h3>
            <p className="mt-1 text-xs text-muted-foreground">{completedModules} of {modules.length} completed</p>
            <div className="mt-2 h-1.5 rounded-full bg-muted">
              <div className="h-full rounded-full bg-secondary transition-all" style={{ width: `${(completedModules / modules.length) * 100}%` }} />
            </div>
          </div>
          <ul className="max-h-[600px] overflow-y-auto">
            {modules.map((mod, index) => (
              <ModuleItem
                key={mod.id}
                module={mod}
                index={index}
                isActive={currentModule?.id === mod.id}
                onClick={() => mod.status !== "locked" && setActiveModuleId(mod.id)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ModuleItem({ module, index, isActive, onClick }: { module: Module; index: number; isActive: boolean; onClick: () => void }) {
  const statusStyle = moduleStatusStyle[module.status];
  const StatusIcon = statusStyle.icon;
  const TypeIcon = moduleTypeIcon[module.type];
  const isLocked = module.status === "locked";

  return (
    <li
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 border-b border-border px-4 py-3.5 text-sm transition-colors last:border-0",
        isActive && "bg-primary/5",
        isLocked ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-muted/50"
      )}
    >
      <StatusIcon className={cn("h-4 w-4 shrink-0", statusStyle.className)} />
      <div className="flex-1 min-w-0">
        <p className={cn("truncate font-medium", isActive ? "text-primary" : "text-card-foreground")}>
          {index + 1}. {module.title}
        </p>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          <TypeIcon className="h-3 w-3" />
          <span className="capitalize">{module.type}</span>
          <span>·</span>
          <span>{module.duration}</span>
        </div>
      </div>
    </li>
  );
}
