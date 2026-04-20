import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Award,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  Users,
  FileText,
  Megaphone,
  MonitorPlay,
  Key,
  Briefcase,
  Terminal,
  Activity,
  ChevronDown,
  ClipboardList,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

const employeeNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: BookOpen, label: "Course Catalog", path: "/courses" },
  { icon: GraduationCap, label: "My Learning", path: "/my-learning" },
  { icon: ClipboardList, label: "My Exams", path: "/exams" },
  { icon: Award, label: "Certificates", path: "/certificates" },
  { icon: Calendar, label: "Training Calendar", path: "/calendar" },
  { icon: MessageSquare, label: "Discussions", path: "/discussions" },
  // { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: HelpCircle, label: "Support", path: "/support" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const ldNavItems = [
  { icon: LayoutDashboard, label: "L&D Dashboard", path: "/ld/dashboard" },
  { icon: BookOpen, label: "Course Management", path: "/ld/courses" },
  { icon: ClipboardList, label: "Exams", path: "/ld/exams" },
  { icon: FileText, label: "Records Management", path: "/ld/records" },
  { icon: MessageSquare, label: "Communications", path: "/ld/communications" },
  { icon: MonitorPlay, label: "Classroom Training", path: "/ld/classrooms" },
  { icon: BarChart3, label: "Global Reports", path: "/ld/reports" },
  { icon: HelpCircle, label: "Support Center", path: "/ld/support" },
  { icon: Megaphone, label: "Ad Space Mgmt", path: "/ld/ads" },
  { icon: Users, label: "Multi-tenant Users", path: "/ld/users" },
  { icon: Key, label: "Employee Privileges", path: "/ld/privileges" },
];

const hrNavItems = [
  { icon: LayoutDashboard, label: "HR Dashboard", path: "/hr/dashboard" },
  { icon: Key, label: "Employee Privileges", path: "/hr/privileges" },
  { icon: FileText, label: "Records Management", path: "/hr/records" },
  { icon: BarChart3, label: "HR Reports", path: "/hr/reports" },
];

const itNavItems = [
  { icon: LayoutDashboard, label: "IT Dashboard", path: "/it/dashboard" },
  { icon: HelpCircle, label: "Tech Support", path: "/it/support" },
  { icon: MessageSquare, label: "Messaging System", path: "/it/communications" },
  { icon: BarChart3, label: "System Reports", path: "/it/reports" },
  { icon: Key, label: "IAM Privileges", path: "/it/privileges" },
];

const managementNavItems = [
  { icon: LayoutDashboard, label: "Exec Dashboard", path: "/management/dashboard" },
  { icon: BarChart3, label: "BI & Reports", path: "/management/reports" },
];

export default function AppSidebar() {
  const { user, logout, switchRole } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isLdAdmin = user?.role === "l&d_admin";
  const isHr = user?.role === "hr";
  const isIt = user?.role === "it_admin";
  const isManagement = user?.role === "management";

  const navItems = isLdAdmin ? ldNavItems : isHr ? hrNavItems : isIt ? itNavItems : isManagement ? managementNavItems : employeeNavItems;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
        <div className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-heading text-sm font-bold",
          isLdAdmin ? "bg-primary text-primary-foreground" :
            isHr ? "bg-success text-success-foreground" :
              isIt ? "bg-destructive text-destructive-foreground" :
                isManagement ? "bg-warning text-warning-foreground" :
                  "bg-secondary text-secondary-foreground"
        )}>
          {isLdAdmin ? "L&D" : isHr ? "HR" : isIt ? "IT" : isManagement ? "EX" : "EM"}
        </div>
        {!collapsed && (
          <span className="font-heading text-lg font-bold text-sidebar-accent-foreground">
            TargetLearn
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname.startsWith('/ld') && item.path.includes(location.pathname)) || (location.pathname.startsWith('/hr') && item.path.includes(location.pathname)) || (location.pathname.startsWith('/it') && item.path.includes(location.pathname)) || (location.pathname.startsWith('/management') && item.path.includes(location.pathname));
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-border p-3 space-y-2 relative">
        <div className="px-2">
          {!collapsed && <p className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2">Switch View</p>}
          <div className="relative">
            {/* Visual Button matching the dropdown state */}
            <div
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors border border-sidebar-border shadow-sm justify-between bg-card text-foreground cursor-pointer"
              )}
            >
              <div className="flex items-center gap-3">
                {isLdAdmin ? <Shield className="h-4 w-4 shrink-0 text-primary" /> :
                  isHr ? <Briefcase className="h-4 w-4 shrink-0 text-success" /> :
                    isIt ? <Terminal className="h-4 w-4 shrink-0 text-destructive" /> :
                      isManagement ? <Activity className="h-4 w-4 shrink-0 text-warning" /> :
                        <Users className="h-4 w-4 shrink-0 text-secondary-foreground" />}
                {!collapsed && <span>
                  {isLdAdmin ? "L&D Admin View" : isHr ? "HR Admin View" : isIt ? "IT Admin View" : isManagement ? "Executive View" : "Employee View"}
                </span>}
              </div>
              {!collapsed && <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />}
            </div>

            {/* Native transparent select overlaying the button perfectly */}
            <select
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-base sm:text-sm"
              value={user?.role || "employee"}
              onChange={(e) => switchRole(e.target.value as any)}
              title="Change User View"
            >
              <option value="employee">Employee View</option>
              <option value="l&d_admin">L&D Admin View</option>
              <option value="hr">HR Admin View</option>
              <option value="it_admin">IT Admin View</option>
              <option value="management">Executive View</option>
            </select>
          </div>
        </div>

        <div className="h-px bg-sidebar-border my-2 w-full"></div>

        {user && (
          <div className={cn("flex items-center gap-3 rounded-lg px-3 py-2", collapsed && "justify-center px-0")}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
              {user.name.split(" ").map((n) => n[0]).join("")}
            </div>
            {!collapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-sidebar-accent-foreground">{user.name}</p>
                <p className="truncate text-xs text-sidebar-foreground capitalize">{user.role.replace('_', ' ')}</p>
              </div>
            )}
          </div>
        )}
        <button
          onClick={logout}
          className={cn(
            "mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-destructive",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm hover:bg-muted"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </aside>
  );
}
