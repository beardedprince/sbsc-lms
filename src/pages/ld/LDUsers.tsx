import { useState } from "react";
import { Users, Plus, Search, Filter, MoreVertical, Edit, UserMinus, Shield, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const initialUsers = [
  { id: "1", name: "Sarah Jenkins", email: "sarah.j@hq.bank.com", branch: "HQ - Lagos", role: "employee", status: "Active" },
  { id: "2", name: "David Osei", email: "david.osei@accra.bank.com", branch: "Accra Main", role: "management", status: "Active" },
  { id: "3", name: "Fatima Yusuf", email: "f.yusuf@kano.bank.com", branch: "Kano Branch", role: "l&d_admin", status: "Active" },
  { id: "4", name: "Michael Chang", email: "m.chang@hq.bank.com", branch: "HQ - Lagos", role: "hr", status: "Inactive" },
];

export default function LDUsers() {
  const [usersList, setUsersList] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newUser = {
      id: Math.random().toString(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      branch: formData.get("branch") as string,
      role: formData.get("role") as string,
      status: "Active",
    };
    setUsersList([newUser, ...usersList]);
    setIsModalOpen(false);
  };

  const filtered = usersList.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.branch.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">User & Tenant Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Onboard users, configure branches, and manage multi-tenant access.
          </p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shrink-0">
              <Plus className="h-4 w-4" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddUser} className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input required name="name" className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input required type="email" name="email" className="w-full rounded-md border bg-background px-3 py-2 text-sm" placeholder="john@company.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Branch / Tenant</label>
                  <select name="branch" className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                    <option value="HQ - Lagos">HQ - Lagos</option>
                    <option value="Accra Main">Accra Main</option>
                    <option value="Kano Branch">Kano Branch</option>
                    <option value="London Office">London Office</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <select name="role" className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                    <option value="employee">Employee</option>
                    <option value="management">Management</option>
                    <option value="hr">HR</option>
                    <option value="l&d_admin">L&D Admin</option>
                  </select>
                </div>
              </div>
              <DialogFooter className="mt-6 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">Create User</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-6">
        <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div><p className="text-xl font-bold">{usersList.length}</p><p className="text-xs text-muted-foreground">Total Users</p></div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
            <Briefcase className="h-5 w-5 text-secondary" />
          </div>
          <div><p className="text-xl font-bold">14</p><p className="text-xs text-muted-foreground">Active Tenants</p></div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border bg-muted/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users or branches..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">User Details</th>
                <th className="px-6 py-4 font-medium">Branch / Tenant</th>
                <th className="px-6 py-4 font-medium">System Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                      {user.branch}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 capitalize whitespace-nowrap">
                      <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                      {user.role.replace("_", " ")}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium border", 
                      user.status === "Active" ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground border-border"
                    )}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => setUsersList(usersList.filter(u => u.id !== user.id))}>
                        <UserMinus className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    No users found matching your search.
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
