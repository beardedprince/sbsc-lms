export interface Course {
  id: string;
  title: string;
  description: string;
  category: "assigned" | "recommended" | "general";
  department: string;
  duration: string;
  modules: number;
  progress: number;
  status: "not_started" | "in_progress" | "completed" | "failed";
  thumbnail: string;
  instructor: string;
  dueDate?: string;
  type: "video" | "text" | "mixed" | "exam";
}

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Anti-Money Laundering Compliance",
    description: "Comprehensive training on AML regulations, suspicious transaction reporting, and compliance frameworks.",
    category: "assigned",
    department: "Compliance",
    duration: "4h 30m",
    modules: 8,
    progress: 65,
    status: "in_progress",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    instructor: "Dr. Fatima Ibrahim",
    dueDate: "2026-05-01",
    type: "mixed",
  },
  {
    id: "2",
    title: "Customer Service Excellence",
    description: "Master the art of delivering exceptional customer experiences in retail banking.",
    category: "assigned",
    department: "Retail Banking",
    duration: "3h",
    modules: 6,
    progress: 100,
    status: "completed",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    instructor: "Emeka Johnson",
    type: "video",
  },
  {
    id: "3",
    title: "Digital Banking Fundamentals",
    description: "Understanding modern digital banking platforms, mobile banking, and fintech innovations.",
    category: "recommended",
    department: "Technology",
    duration: "5h",
    modules: 10,
    progress: 30,
    status: "in_progress",
    thumbnail: "https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?w=800&q=80",
    instructor: "Ngozi Adeyemi",
    type: "mixed",
  },
  {
    id: "4",
    title: "Leadership & People Management",
    description: "Essential leadership skills for managing teams effectively in a corporate environment.",
    category: "recommended",
    department: "HR",
    duration: "6h",
    modules: 12,
    progress: 0,
    status: "not_started",
    thumbnail: "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80",
    instructor: "Chidi Okafor",
    type: "text",
  },
  {
    id: "5",
    title: "Credit Risk Assessment",
    description: "Learn credit analysis techniques, risk rating models, and portfolio management strategies.",
    category: "general",
    department: "Risk Management",
    duration: "8h",
    modules: 15,
    progress: 0,
    status: "not_started",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    instructor: "Aisha Mohammed",
    dueDate: "2026-06-15",
    type: "mixed",
  },
  {
    id: "6",
    title: "Data Privacy & NDPR Compliance",
    description: "Nigeria Data Protection Regulation compliance training for all staff.",
    category: "assigned",
    department: "Legal",
    duration: "2h",
    modules: 4,
    progress: 0,
    status: "not_started",
    thumbnail: "https://images.unsplash.com/photo-1562813733-b31f71025d54?w=800&q=80",
    instructor: "Uche Nwankwo",
    dueDate: "2026-04-30",
    type: "text",
  },
];
