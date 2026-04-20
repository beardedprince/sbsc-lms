import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Courses from "@/pages/Courses";
import MyLearning from "@/pages/MyLearning";
import Certificates from "@/pages/Certificates";
import TrainingCalendar from "@/pages/TrainingCalendar";
import EmployeeExams from "@/pages/EmployeeExams";
import TakeExam from "@/pages/TakeExam";
import Discussions from "@/pages/Discussions";
import Reports from "@/pages/Reports";
import Support from "@/pages/Support";
import LMSSettings from "@/pages/LMSSettings";
import CourseDetail from "@/pages/CourseDetail";
import NotFound from "@/pages/NotFound";

// L&D Pages
import LDDashboard from "@/pages/ld/LDDashboard";
import LDCourses from "@/pages/ld/LDCourses";
import LDRecords from "@/pages/ld/LDRecords";
import LDCommunications from "@/pages/ld/LDCommunications";
import LDExams from "@/pages/ld/LDExams";
import LDInvigilator from "@/pages/ld/LDInvigilator";
import LDClassrooms from "@/pages/ld/LDClassrooms";
import LDReports from "@/pages/ld/LDReports";
import LDSupport from "@/pages/ld/LDSupport";
import LDAds from "@/pages/ld/LDAds";
import LDUsers from "@/pages/ld/LDUsers";
import LDPrivileges from "@/pages/ld/LDPrivileges";

// HR Pages
import HRDashboard from "@/pages/hr/HRDashboard";
import HRRecords from "@/pages/hr/HRRecords";
import HRReports from "@/pages/hr/HRReports";
import HRPrivileges from "@/pages/hr/HRPrivileges";

// IT Pages
import ITDashboard from "@/pages/it/ITDashboard";
import ITSupport from "@/pages/it/ITSupport";
import ITCommunications from "@/pages/it/ITCommunications";
import ITReports from "@/pages/it/ITReports";
import ITPrivileges from "@/pages/it/ITPrivileges";

// Management Pages
import ManagementDashboard from "@/pages/management/ManagementDashboard";
import ManagementReports from "@/pages/management/ManagementReports";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        {/* Employee Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/exams" element={<EmployeeExams />} />
        <Route path="/exams/:id" element={<TakeExam />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/calendar" element={<TrainingCalendar />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/support" element={<Support />} />
        <Route path="/settings" element={<LMSSettings />} />

        {/* L&D Routes */}
        <Route path="/ld/dashboard" element={<LDDashboard />} />
        <Route path="/ld/courses" element={<LDCourses />} />
        <Route path="/ld/exams" element={<LDExams />} />
        <Route path="/ld/exams/invigilator" element={<LDInvigilator />} />
        <Route path="/ld/records" element={<LDRecords />} />
        <Route path="/ld/communications" element={<LDCommunications />} />
        <Route path="/ld/classrooms" element={<LDClassrooms />} />
        <Route path="/ld/reports" element={<LDReports />} />
        <Route path="/ld/support" element={<LDSupport />} />
        <Route path="/ld/ads" element={<LDAds />} />
        <Route path="/ld/users" element={<LDUsers />} />
        <Route path="/ld/privileges" element={<LDPrivileges />} />

        {/* HR Routes */}
        <Route path="/hr/dashboard" element={<HRDashboard />} />
        <Route path="/hr/records" element={<HRRecords />} />
        <Route path="/hr/reports" element={<HRReports />} />
        <Route path="/hr/privileges" element={<HRPrivileges />} />

        {/* IT Routes */}
        <Route path="/it/dashboard" element={<ITDashboard />} />
        <Route path="/it/support" element={<ITSupport />} />
        <Route path="/it/communications" element={<ITCommunications />} />
        <Route path="/it/reports" element={<ITReports />} />
        <Route path="/it/privileges" element={<ITPrivileges />} />

        {/* Management Routes */}
        <Route path="/management/dashboard" element={<ManagementDashboard />} />
        <Route path="/management/reports" element={<ManagementReports />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
