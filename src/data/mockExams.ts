export interface StandaloneExam {
  id: string;
  title: string;
  duration: string;
  department: string;
  role: string;
  status: "active" | "draft" | "closed";
  assignedCount: number;
  completedCount: number;
}

export const mockExams: StandaloneExam[] = [
  { id: "1", title: "Q3 Corporate Compliance Exam", duration: "60 mins", department: "All Staff", role: "All Roles", status: "active", assignedCount: 1250, completedCount: 840 },
  { id: "2", title: "Information Security Refresher - Exam", duration: "45 mins", department: "IT & Operations", role: "All Roles", status: "active", assignedCount: 300, completedCount: 280 },
  { id: "3", title: "New Senior Management Guidelines Exam", duration: "90 mins", department: "Management", role: "Senior Exec", status: "draft", assignedCount: 0, completedCount: 0 },
];
