import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [staffId, setStaffId] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(staffId, email);
      navigate("/dashboard");
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary font-heading text-sm font-bold text-secondary-foreground">
            TL
          </div>
          <span className="font-heading text-xl font-bold text-primary-foreground">TargetLearn</span>
        </div>
        <div>
          <h1 className="font-heading text-4xl font-extrabold leading-tight text-primary-foreground">
            Empower your<br />workforce through<br />continuous learning
          </h1>
          <p className="mt-4 max-w-md text-base text-primary-foreground/70">
            Access courses, track progress, earn certificates and grow your career — all in one platform.
          </p>
        </div>
        <div className="flex items-center gap-8">
          <div>
            <p className="font-heading text-3xl font-bold text-secondary">2,400+</p>
            <p className="text-sm text-primary-foreground/60">Active Learners</p>
          </div>
          <div className="h-10 w-px bg-primary-foreground/20" />
          <div>
            <p className="font-heading text-3xl font-bold text-secondary">350+</p>
            <p className="text-sm text-primary-foreground/60">Courses</p>
          </div>
          <div className="h-10 w-px bg-primary-foreground/20" />
          <div>
            <p className="font-heading text-3xl font-bold text-secondary">98%</p>
            <p className="text-sm text-primary-foreground/60">Completion Rate</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center bg-background p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="font-heading text-xl font-bold text-foreground">TargetLearn</span>
          </div>

          <h2 className="font-heading text-2xl font-bold text-foreground">Sign in to your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your staff credentials to access the learning portal
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Staff ID</label>
              <input
                type="text"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                placeholder="e.g. STF-2024-0042"
                className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <div className="mt-6 text-center">
            {/* <button className="text-sm text-secondary hover:underline">
              Alternate Login / Register (Multi-Tenant)
            </button> */}
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Having trouble? Contact IT Support or your L&D Administrator
          </p>
        </div>
      </div>
    </div>
  );
}
