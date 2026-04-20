import { useState } from "react";
import { MonitorPlay, Search, AlertTriangle, ShieldAlert, CheckCircle, Clock } from "lucide-react";

export default function LDInvigilator() {
  const [candidates] = useState([
    { id: 1, name: "Alice Johnson", exam: "Q3 Corporate Compliance Exam", status: "active", warnings: 0, progress: 45 },
    { id: 2, name: "Bob Smith", exam: "Q3 Corporate Compliance Exam", status: "flagged", warnings: 2, progress: 30 },
    { id: 3, name: "Charlie Davis", exam: "Information Security Refresher", status: "submitted", warnings: 0, progress: 100 },
    { id: 4, name: "Diana Prince", exam: "Information Security Refresher", status: "active", warnings: 1, progress: 60 }
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <MonitorPlay className="h-8 w-8 text-primary" />
            Live Invigilator Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor real-time candidate active sessions and flagging of unusual behaviors.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {candidates.map((cand) => (
          <div key={cand.id} className={`rounded-xl border bg-card p-5 shadow-sm transition-all focus-within:ring-2 ${cand.status === 'flagged' ? 'border-destructive shadow-destructive/10' : 'border-border'}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-medium text-foreground">{cand.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{cand.exam}</p>
              </div>
              {cand.status === "flagged" ? (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10">
                  <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                </span>
              ) : cand.status === "active" ? (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                </span>
              ) : (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle className="h-3.5 w-3.5 text-success" />
                </span>
              )}
            </div>
            
            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden relative border border-border/50 mb-4">
               {cand.status !== "submitted" ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <img src={`https://i.pravatar.cc/150?u=${cand.id}`} alt="feed" className="h-full w-full object-cover opacity-60 mix-blend-luminosity grayscale" />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded text-[10px] text-white">
                       <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse" /> REC
                    </div>
                 </div>
               ) : (
                 <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-xs font-medium">Session Ended</div>
               )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{cand.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                 <div className={`h-full rounded-full ${cand.status === 'flagged' ? 'bg-destructive' : 'bg-primary'}`} style={{ width: `${cand.progress}%` }} />
              </div>
              
              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                 <div className="flex items-center gap-1.5 text-muted-foreground">
                   <Clock className="h-3.5 w-3.5" /> 45:20 left
                 </div>
                 {cand.warnings > 0 && (
                   <div className="flex items-center gap-1 text-destructive font-medium">
                     <ShieldAlert className="h-3 w-3" /> {cand.warnings} flags
                   </div>
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
