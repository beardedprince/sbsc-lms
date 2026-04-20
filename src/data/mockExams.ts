export interface StandaloneExam {
  id: string;
  title: string;
  duration: string;
  department: string;
  role: string;
  status: "active" | "draft" | "closed";
  startTime: string;
  endTime: string;
  assignedCount: number;
  completedCount: number;
}

export const mockExams: StandaloneExam[] = [
  { id: "1", title: "Q3 Corporate Compliance Exam", duration: "60 mins", department: "All Staff", role: "All Roles", status: "active", startTime: "2026-04-20T09:00", endTime: "2026-04-20T17:00", assignedCount: 1250, completedCount: 840 },
  { id: "2", title: "Information Security Refresher - Exam", duration: "45 mins", department: "IT & Operations", role: "All Roles", status: "active", startTime: "2026-04-21T10:00", endTime: "2026-04-21T14:00", assignedCount: 300, completedCount: 280 },
  { id: "3", title: "New Senior Management Guidelines Exam", duration: "90 mins", department: "Management", role: "Senior Exec", status: "draft", startTime: "2026-05-01T10:00", endTime: "2026-05-01T12:00", assignedCount: 0, completedCount: 0 },
];
