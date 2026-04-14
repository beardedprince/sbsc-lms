import { useState, useRef, useEffect } from "react";
import { Bell, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const mockNotifications = [
  { id: 1, text: "AML Compliance course due in 3 days", type: "warning", time: "2 hrs ago", read: false },
  { id: 2, text: "New course assigned: Data Privacy & NDPR", type: "info", time: "5 hrs ago", read: false },
  { id: 3, text: "Certificate available: Customer Service Excellence", type: "success", time: "1 day ago", read: false },
];

export default function AppHeader() {
  const { user } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-4">
        <h2 className="font-heading text-lg font-semibold text-foreground">
          Welcome back, {user?.name.split(" ")[0]} 👋
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses, exams..."
            className="h-9 w-64 rounded-lg border border-input bg-background pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground animate-in zoom-in">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border bg-card shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="border-b border-border bg-muted/30 px-4 py-3 flex justify-between items-center">
                <h3 className="font-semibold text-sm text-foreground">Notifications</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-primary hover:underline font-medium">Mark all as read</button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? notifications.map((n) => (
                  <div key={n.id} className={`p-4 border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer ${!n.read ? 'bg-primary/5' : ''}`}>
                    <div className="flex gap-3 items-start">
                      <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${n.type === 'warning' ? 'bg-warning' : n.type === 'success' ? 'bg-success' : 'bg-info'}`} />
                      <div>
                        <p className={`text-sm ${!n.read ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{n.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <p className="text-sm">No new notifications</p>
                  </div>
                )}
              </div>
              <div className="p-3 bg-muted/10 text-center border-t border-border/50 hover:bg-muted/30 transition-colors cursor-pointer">
                 <button className="text-sm text-primary font-medium w-full text-center">View All Notifications</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
