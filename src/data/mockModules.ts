export interface Module {
  id: string;
  courseId: string;
  title: string;
  type: "video" | "text" | "quiz" | "exam";
  duration: string;
  status: "locked" | "available" | "in_progress" | "completed";
  description: string;
}

export const mockModules: Record<string, Module[]> = {
  "1": [
    { id: "m1-1", courseId: "1", title: "Introduction to AML", type: "video", duration: "25m", status: "completed", description: "Overview of Anti-Money Laundering regulations and their importance in banking." },
    { id: "m1-2", courseId: "1", title: "Know Your Customer (KYC)", type: "video", duration: "35m", status: "completed", description: "Understanding KYC requirements, customer due diligence, and enhanced due diligence procedures." },
    { id: "m1-3", courseId: "1", title: "Suspicious Transaction Reporting", type: "text", duration: "30m", status: "completed", description: "How to identify and report suspicious transactions in compliance with CBN regulations." },
    { id: "m1-4", courseId: "1", title: "KYC Assessment Quiz", type: "quiz", duration: "15m", status: "completed", description: "Test your knowledge on KYC and customer due diligence concepts." },
    { id: "m1-5", courseId: "1", title: "Compliance Frameworks", type: "video", duration: "40m", status: "in_progress", description: "Deep dive into FATF recommendations and local compliance frameworks." },
    { id: "m1-6", courseId: "1", title: "Case Studies: AML Failures", type: "text", duration: "35m", status: "available", description: "Analysis of real-world AML compliance failures and lessons learned." },
    { id: "m1-7", courseId: "1", title: "Risk-Based Approach", type: "video", duration: "30m", status: "locked", description: "Implementing a risk-based approach to AML compliance in your daily operations." },
    { id: "m1-8", courseId: "1", title: "Final Assessment", type: "exam", duration: "45m", status: "locked", description: "Comprehensive exam covering all AML compliance topics. Minimum score: 70%." },
  ],
  "2": [
    { id: "m2-1", courseId: "2", title: "Customer-Centric Banking", type: "video", duration: "30m", status: "completed", description: "Foundations of customer-centric service in retail banking." },
    { id: "m2-2", courseId: "2", title: "Communication Skills", type: "video", duration: "25m", status: "completed", description: "Effective verbal and written communication with banking customers." },
    { id: "m2-3", courseId: "2", title: "Handling Complaints", type: "text", duration: "20m", status: "completed", description: "Best practices for resolving customer complaints professionally." },
    { id: "m2-4", courseId: "2", title: "Service Recovery", type: "video", duration: "30m", status: "completed", description: "Turning negative customer experiences into positive outcomes." },
    { id: "m2-5", courseId: "2", title: "Digital Customer Experience", type: "text", duration: "25m", status: "completed", description: "Delivering excellent service across digital banking channels." },
    { id: "m2-6", courseId: "2", title: "Final Assessment", type: "exam", duration: "30m", status: "completed", description: "Comprehensive exam on customer service excellence. Minimum score: 75%." },
  ],
  "3": [
    { id: "m3-1", courseId: "3", title: "Evolution of Digital Banking", type: "video", duration: "30m", status: "completed", description: "Historical overview and current state of digital banking worldwide." },
    { id: "m3-2", courseId: "3", title: "Mobile Banking Platforms", type: "video", duration: "35m", status: "completed", description: "Understanding mobile banking architecture, features, and user experience." },
    { id: "m3-3", courseId: "3", title: "Mobile Banking Quiz", type: "quiz", duration: "10m", status: "completed", description: "Quick assessment on mobile banking concepts." },
    { id: "m3-4", courseId: "3", title: "Payment Systems & Fintech", type: "video", duration: "40m", status: "in_progress", description: "Overview of modern payment systems, APIs, and fintech innovations." },
    { id: "m3-5", courseId: "3", title: "Blockchain & Crypto Basics", type: "text", duration: "30m", status: "available", description: "Introduction to blockchain technology and cryptocurrency in banking." },
    { id: "m3-6", courseId: "3", title: "Open Banking & APIs", type: "video", duration: "35m", status: "locked", description: "Understanding open banking regulations and API integrations." },
    { id: "m3-7", courseId: "3", title: "Digital Security", type: "text", duration: "25m", status: "locked", description: "Cybersecurity considerations for digital banking platforms." },
    { id: "m3-8", courseId: "3", title: "AI in Banking", type: "video", duration: "30m", status: "locked", description: "How AI and machine learning are transforming banking services." },
    { id: "m3-9", courseId: "3", title: "RegTech & Compliance", type: "text", duration: "25m", status: "locked", description: "Regulatory technology solutions for digital banking compliance." },
    { id: "m3-10", courseId: "3", title: "Final Assessment", type: "exam", duration: "45m", status: "locked", description: "Comprehensive exam on digital banking fundamentals. Minimum score: 70%." },
  ],
};

// Generate generic modules for courses without specific data
export function getModulesForCourse(courseId: string, moduleCount: number): Module[] {
  if (mockModules[courseId]) return mockModules[courseId];
  return Array.from({ length: moduleCount }, (_, i) => ({
    id: `m${courseId}-${i + 1}`,
    courseId,
    title: `Module ${i + 1}`,
    type: (["video", "text", "quiz", "exam"] as const)[i % 4],
    duration: `${20 + (i * 5)}m`,
    status: "locked" as const,
    description: `Module ${i + 1} content for this course.`,
  }));
}
