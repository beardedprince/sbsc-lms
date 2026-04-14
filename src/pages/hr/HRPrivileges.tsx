import { useState } from "react";
import { Key, Shield, Check, X, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = ["Employee", "Junior Staff", "Mid Level", "Senior Management"];

const permissions = [
  { module: "Request Time Off", access: [true, true, true, true] },
  { module: "View PaySlips", access: [true, true, true, true] },
  { module: "View Subordinate Reviews", access: [false, false, true, true] },
  { module: "Manage Team Schedules", access: [false, false, true, true] },
  { module: "Approve Appraisals", access: [false, false, false, true] },
];

export default function HRPrivileges() {
  const [matrix, setMatrix] = useState(permissions);

  const togglePermission = (rowIndex: number, colIndex: number) => {
    const newMatrix = [...matrix];
    newMatrix[rowIndex].access[colIndex] = !newMatrix[rowIndex].access[colIndex];
    setMatrix(newMatrix);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Employee Privileges (HR)</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Define organizational hierarchy permissions and access controls.
          </p>
        </div>
        <Button className="gap-2 shrink-0 bg-primary">
          <Key className="h-4 w-4" /> Save ACL Config
        </Button>
      </div>

      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 flex items-start gap-4">
        <ShieldAlert className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-destructive">HR Privileges Warning</h3>
          <p className="text-xs text-muted-foreground mt-1">These settings affect data-privacy configurations across the entire company. Do not grant subordinate access to inappropriate roles.</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-semibold text-foreground border-r border-border">HR Data Module</th>
              {roles.map(role => (
                <th key={role} className="px-6 py-4 font-medium text-center border-r border-border last:border-0 min-w-[120px]">
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-center">
            {matrix.map((row, rowIndex) => (
              <tr key={row.module} className="hover:bg-muted/10 transition-colors">
                <td className="px-6 py-4 font-medium text-left text-foreground bg-muted/5 border-r border-border flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" /> {row.module}
                </td>
                {row.access.map((hasAccess, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 border-r border-border last:border-0 relative">
                    <button 
                      onClick={() => togglePermission(rowIndex, colIndex)}
                      className={`h-8 w-8 rounded-md mx-auto flex items-center justify-center transition-colors focus:ring-2 focus:ring-primary focus:outline-none ${hasAccess ? 'bg-success/20 text-success hover:bg-success/30' : 'bg-muted text-muted-foreground/30 hover:bg-muted/80'}`}
                    >
                      {hasAccess ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
