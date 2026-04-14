import { useState } from "react";
import { Key, Shield, Check, X, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = ["L1 Support", "L2 Engineers", "DevOps", "SysAdmin"];

const permissions = [
  { module: "Reset User Passwords", access: [true, true, true, true] },
  { module: "Reboot Production Servers", access: [false, false, true, true] },
  { module: "Access Production DB", access: [false, false, false, true] },
  { module: "Modify Cloud VPC Rules", access: [false, false, true, true] },
  { module: "Deploy Code Patches", access: [false, true, true, true] },
  { module: "Read Admin Audit Logs", access: [false, false, false, true] },
];

export default function ITPrivileges() {
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
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Technical Privileges (IT IAM)</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Map Identity and Access Management privileges for internal IT teams.
          </p>
        </div>
        <Button className="gap-2 shrink-0 bg-primary">
          <Key className="h-4 w-4" /> Save IAM Policies
        </Button>
      </div>

      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 flex items-start gap-4">
        <ShieldAlert className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-destructive">CRITICAL INFRASTRUCTURE WARNING</h3>
          <p className="text-xs text-muted-foreground mt-1 font-mono">Modifying these policies immediately alters production authorization logic via AWS IAM mapping. Do not revoke Root SysAdmin access without secondary bypass verification.</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-semibold text-foreground border-r border-border">IT Control Plane Module</th>
              {roles.map(role => (
                <th key={role} className="px-6 py-4 font-medium text-center border-r border-border last:border-0 min-w-[120px] font-mono text-xs">
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
