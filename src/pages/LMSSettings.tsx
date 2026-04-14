import { Settings, User, Bell, Shield, Mail, Smartphone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LMSSettings() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal profile, notifications, and application preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          <button className="flex w-full items-center gap-3 rounded-lg bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary">
            <User className="h-4 w-4" /> Profile
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
            <Bell className="h-4 w-4" /> Notifications
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
            <Shield className="h-4 w-4" /> Security
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
            <Globe className="h-4 w-4" /> Preferences
          </button>
        </aside>

        <div className="flex-1 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border px-6 py-4">
              <h2 className="font-heading text-lg font-semibold text-foreground">Profile Information</h2>
              <p className="text-sm text-muted-foreground">Update your photo and personal details here.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-xl font-bold text-primary">
                  JD
                </div>
                <div>
                  <Button variant="outline" size="sm" className="mb-2">Change Avatar</Button>
                  <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <input type="text" defaultValue="John" disabled className="w-full rounded-md border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <input type="text" defaultValue="Doe" disabled className="w-full rounded-md border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input type="email" defaultValue="john.doe@company.com" disabled className="w-full rounded-md border border-border bg-muted/50 py-2 pl-9 pr-4 text-sm text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Department</label>
                  <input type="text" defaultValue="Retail Banking" disabled className="w-full rounded-md border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Bio</label>
                <textarea rows={4} placeholder="Write a short summary about yourself..." className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"></textarea>
              </div>

              <div className="rounded-md bg-info/10 p-4 border border-info/20 flex gap-3">
                <Settings className="h-5 w-5 text-info shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-info">Controlled by IT</h4>
                  <p className="text-xs text-info/80 mt-1">Some fields like name and department can only be updated through the HR portal. Please contact HR to modify locked elements.</p>
                </div>
              </div>

            </div>
            <div className="flex items-center justify-end gap-4 border-t border-border bg-muted/20 px-6 py-4">
              <Button variant="ghost">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
