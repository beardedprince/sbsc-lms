import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShieldAlert, AlertTriangle, Monitor, Maximize, Clock, LogOut, Camera, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockExams } from "@/data/mockExams";
import { cn } from "@/lib/utils";
import { Toaster, toast } from 'sonner';

export default function TakeExam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const exam = mockExams.find((e) => e.id === id);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [envChecked, setEnvChecked] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  
  if (!exam) return <div className="p-8">Exam not found.</div>;

  useEffect(() => {
    // Basic countdown simulation
    if (hasStarted) {
      const match = exam.duration.match(/\d+/);
      let mins = match ? parseInt(match[0], 10) : 60;
      let secs = 0;
      
      const interval = setInterval(() => {
        if (secs === 0) {
          if (mins === 0) {
            clearInterval(interval);
            handleAutoSubmit();
            return;
          }
          mins--;
          secs = 59;
        } else {
          secs--;
        }
        setTimeLeft(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [hasStarted, exam.duration]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
        if (hasStarted) {
          toast.error("Full screen exited! This incident has been logged.", { duration: 5000 });
        }
      } else {
        setIsFullscreen(true);
      }
    };
    
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [hasStarted]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && hasStarted) {
         toast.error("Tab switch detected! This has been reported to the invigilator.", { duration: 6000 });
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [hasStarted]);

  const handleCopyPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    toast.warning("Copy/Paste is disabled during the exam.");
  };

  const handleStartExam = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
      setEnvChecked(true);
      setTimeout(() => {
        setHasStarted(true);
        setTimeLeft(exam.duration.replace(" mins", ":00"));
      }, 2000);
    } catch (err) {
      toast.error("Failed to enter fullscreen mode. Required for exam.");
    }
  };
  
  const handleAutoSubmit = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    navigate("/exams");
    setTimeout(() => toast.success("Exam auto-submitted successfully due to time limit.", { duration: 5000 }), 500);
  };
  
  const handleManualSubmit = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    navigate("/exams");
    setTimeout(() => toast.success("Exam submitted successfully.", { duration: 5000 }), 500);
  };

  if (!hasStarted) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-6">
        <Toaster position="top-center" richColors />
        <div className="max-w-md w-full bg-card rounded-xl border border-border p-8 shadow-2xl flex flex-col items-center text-center">
          <ShieldAlert className="h-16 w-16 text-primary mb-6" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Secure Exam Portal</h1>
          <p className="text-muted-foreground text-sm mb-8">
            You are about to start the <strong>{exam.title}</strong>.<br />
            This exam uses a hardened browser mode.
          </p>
          
          <div className="w-full space-y-4 mb-8 text-left text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Maximize className="h-5 w-5 text-primary" /> Fullscreen presentation required
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Monitor className="h-5 w-5 text-destructive" /> Tab-switching is monitored and reported
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <AlertTriangle className="h-5 w-5 text-warning" /> Copying/pasting text is disabled
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Camera className="h-5 w-5 text-info" /> Webcam proctoring will be active
            </div>
          </div>
          
          {envChecked ? (
            <div className="text-center text-primary font-medium flex items-center gap-2 animate-pulse">
              Running environment checks...
            </div>
          ) : (
            <div className="flex w-full gap-4">
              <Button variant="outline" className="flex-1" onClick={() => navigate("/exams")}>Cancel</Button>
              <Button className="flex-1" onClick={handleStartExam}>Verify & Start</Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[100] bg-background flex flex-col select-none" 
      ref={containerRef}
      onCopy={handleCopyPaste}
      onPaste={handleCopyPaste}
      onCut={handleCopyPaste}
    >
      <Toaster position="top-center" richColors />
      {/* Header Bar */}
      <div className="h-16 border-b border-border bg-card px-6 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <ShieldAlert className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-foreground">{exam.title}</h2>
          {!isFullscreen && (
             <span className="bg-destructive/10 text-destructive text-xs px-2 py-1 rounded border border-destructive/20 font-bold animate-pulse">
               ⚠️ FULLSCREEN REQUIRED
             </span>
          )}
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-muted/50 px-4 py-1.5 rounded-full border border-border">
            <Clock className="h-4 w-4 text-warning" />
            <span className="font-mono font-bold text-lg text-foreground">{timeLeft}</span>
          </div>
          <Button variant="destructive" size="sm" onClick={handleManualSubmit}>Finish & Submit</Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Exam Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
              <p className="text-muted-foreground text-sm mb-4">Question 1 of 10</p>
              <h3 className="text-xl font-medium mb-6">Which of the following is a key objective of AML policies?</h3>
              <div className="space-y-3">
                {["Maximizing bank profits", "Detecting and preventing illicit fund transfers", "Improving customer service speed", "Reducing employee turnover"].map((option, idx) => (
                  <label key={idx} className="flex items-center gap-3 p-4 border border-border rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                    <input type="radio" name="q1" className="h-4 w-4 text-primary focus:ring-primary border-muted-foreground" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Dummy questions for scroll */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm opacity-50 pointer-events-none">
              <p className="text-muted-foreground text-sm mb-4">Question 2 of 10</p>
              <h3 className="text-xl font-medium mb-6">Placeholder Question...</h3>
              <div className="space-y-3">
                 <div className="h-12 border border-border rounded-md bg-muted/20"></div>
                 <div className="h-12 border border-border rounded-md bg-muted/20"></div>
                 <div className="h-12 border border-border rounded-md bg-muted/20"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Proctoring Sidebar */}
        <div className="w-64 border-l border-border bg-card flex flex-col shrink-0">
          <div className="p-4 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">
            Active Proctoring
          </div>
          <div className="p-4">
            <div className="aspect-video bg-zinc-900 rounded-lg overflow-hidden flex flex-col items-center justify-center relative border border-border shadow-inner">
              <div className="absolute top-2 right-2 flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Live</span>
              </div>
              <Camera className="h-8 w-8 text-zinc-700 mb-2" />
              <p className="text-xs text-zinc-500 font-medium tracking-wide">Webcam Active</p>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-success" /> Identity Verified
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle className="h-4 w-4 text-success" /> Audio Monitoring
              </div>
              <div className={cn("flex items-center gap-3 text-sm", isFullscreen ? "text-foreground" : "text-destructive font-semibold")}>
                {isFullscreen ? <CheckCircle className="h-4 w-4 text-success" /> : <AlertTriangle className="h-4 w-4" />} Fullscreen 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
