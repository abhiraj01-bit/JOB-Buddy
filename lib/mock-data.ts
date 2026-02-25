import type { User, Interview, Exam, ExamQuestion, Report, Notification, AuditLog, InterviewQuestion } from "./types"

export const mockUsers: Record<string, User> = {
  candidate: {
    id: "u1",
    name: "Arjun Mehta",
    email: "arjun@example.com",
    role: "candidate",
    phone: "+91 98765 43210",
    institution: "IIT Delhi",
  },
  institution: {
    id: "u2",
    name: "Dr. Priya Sharma",
    email: "priya@iitd.edu",
    role: "institution",
    institution: "IIT Delhi",
  },
  admin: {
    id: "u3",
    name: "System Admin",
    email: "admin@proctora.ai",
    role: "admin",
  },
}

export const mockInterviewQuestions: InterviewQuestion[] = [
  { id: "iq1", text: "Tell me about a challenging project you worked on and how you overcame obstacles.", category: "Behavioral", difficulty: "medium", timeLimit: 120, sampleAnswer: "In my last project, I led a team of 5 engineers..." },
  { id: "iq2", text: "How would you design a URL shortening service like bit.ly?", category: "System Design", difficulty: "hard", timeLimit: 180, sampleAnswer: "I would start with the key components..." },
  { id: "iq3", text: "Explain the difference between REST and GraphQL APIs.", category: "Technical", difficulty: "easy", timeLimit: 90, sampleAnswer: "REST APIs use fixed endpoints..." },
  { id: "iq4", text: "What is your approach to debugging a production issue under pressure?", category: "Behavioral", difficulty: "medium", timeLimit: 120, sampleAnswer: "First, I would assess the severity..." },
  { id: "iq5", text: "Implement a function to detect a cycle in a linked list.", category: "DSA", difficulty: "medium", timeLimit: 150, sampleAnswer: "Using Floyd's cycle detection algorithm..." },
]

export const mockInterviews: Interview[] = [
  { id: "i1", title: "Frontend Developer - React", type: "Technical", status: "completed", date: "2026-02-20", score: 82, duration: "45 min", difficulty: "medium", questions: mockInterviewQuestions.slice(0, 3) },
  { id: "i2", title: "System Design Round", type: "System Design", status: "scheduled", date: "2026-03-01", difficulty: "hard", questions: mockInterviewQuestions.slice(1, 4) },
  { id: "i3", title: "Behavioral Assessment", type: "Behavioral", status: "completed", date: "2026-02-15", score: 74, duration: "30 min", difficulty: "easy", questions: mockInterviewQuestions.slice(3) },
  { id: "i4", title: "Backend Engineer - Node.js", type: "Technical", status: "scheduled", date: "2026-03-05", difficulty: "medium", questions: mockInterviewQuestions },
  { id: "i5", title: "ML Engineer Screening", type: "Technical", status: "cancelled", date: "2026-02-10", difficulty: "hard" },
]

export const mockExamQuestions: ExamQuestion[] = [
  { id: "eq1", text: "What is the time complexity of binary search?", type: "mcq", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correctAnswer: 1, marks: 2 },
  { id: "eq2", text: "Which data structure uses LIFO ordering?", type: "mcq", options: ["Queue", "Stack", "Array", "Linked List"], correctAnswer: 1, marks: 2 },
  { id: "eq3", text: "Explain the concept of polymorphism in object-oriented programming.", type: "descriptive", marks: 5 },
  { id: "eq4", text: "What is the output of: console.log(typeof null)?", type: "mcq", options: ["null", "undefined", "object", "string"], correctAnswer: 2, marks: 2 },
  { id: "eq5", text: "Which of the following is NOT a JavaScript framework?", type: "mcq", options: ["Angular", "Django", "React", "Vue"], correctAnswer: 1, marks: 2 },
  { id: "eq6", text: "Describe the difference between process and thread.", type: "descriptive", marks: 5 },
  { id: "eq7", text: "What is a closure in JavaScript?", type: "mcq", options: ["A function with its lexical scope", "A class method", "A loop construct", "A data type"], correctAnswer: 0, marks: 2 },
  { id: "eq8", text: "Explain the CAP theorem in distributed systems.", type: "descriptive", marks: 5 },
  { id: "eq9", text: "Which sorting algorithm has worst-case O(n log n)?", type: "mcq", options: ["Quick Sort", "Bubble Sort", "Merge Sort", "Selection Sort"], correctAnswer: 2, marks: 2 },
  { id: "eq10", text: "Write a brief essay on the importance of testing in software development.", type: "descriptive", marks: 10 },
]

export const mockExams: Exam[] = [
  { id: "e1", title: "Data Structures & Algorithms", subject: "Computer Science", status: "completed", date: "2026-02-18", duration: 90, totalQuestions: 30, score: 78, maxScore: 100, questions: mockExamQuestions.slice(0, 5) },
  { id: "e2", title: "Web Development Fundamentals", subject: "Web Dev", status: "not-started", date: "2026-03-02", duration: 60, totalQuestions: 25, maxScore: 80, questions: mockExamQuestions.slice(2, 7) },
  { id: "e3", title: "Operating Systems Midterm", subject: "OS", status: "in-progress", date: "2026-02-26", duration: 120, totalQuestions: 40, maxScore: 120, questions: mockExamQuestions.slice(4, 10) },
  { id: "e4", title: "Database Management Systems", subject: "DBMS", status: "completed", date: "2026-02-12", duration: 75, totalQuestions: 35, score: 65, maxScore: 100, questions: mockExamQuestions },
  { id: "e5", title: "Computer Networks", subject: "Networking", status: "not-started", date: "2026-03-10", duration: 90, totalQuestions: 30, maxScore: 90, questions: mockExamQuestions.slice(0, 8) },
]

export const mockReports: Report[] = [
  {
    id: "r1", type: "interview", title: "Frontend Developer - React", date: "2026-02-20", overallScore: 82, maxScore: 100,
    strengths: ["Strong React fundamentals", "Good component design", "Clear communication"],
    weaknesses: ["Could improve on state management patterns", "System design needs practice"],
    feedback: "Excellent performance in technical questions. Demonstrated solid understanding of React ecosystem. Recommended for next round.",
    details: { "React Knowledge": 90, "Problem Solving": 78, "Communication": 85, "System Design": 70, "Code Quality": 88 },
  },
  {
    id: "r2", type: "exam", title: "Data Structures & Algorithms", date: "2026-02-18", overallScore: 78, maxScore: 100,
    strengths: ["Strong in tree algorithms", "Good understanding of complexity analysis", "Clean code"],
    weaknesses: ["Graph algorithms need improvement", "Dynamic programming practice needed"],
    feedback: "Good overall performance. Above average in most categories. Focus on graph problems for improvement.",
    riskScore: 12,
    details: { "Arrays": 85, "Trees": 92, "Graphs": 60, "DP": 65, "Sorting": 88 },
  },
  {
    id: "r3", type: "interview", title: "Behavioral Assessment", date: "2026-02-15", overallScore: 74, maxScore: 100,
    strengths: ["Articulate responses", "Good examples from experience"],
    weaknesses: ["Could be more concise", "Need to highlight leadership more"],
    feedback: "Solid behavioral interview. Shows maturity and self-awareness.",
    details: { "Leadership": 70, "Teamwork": 80, "Communication": 78, "Problem Solving": 72, "Adaptability": 75 },
  },
  {
    id: "r4", type: "exam", title: "Database Management Systems", date: "2026-02-12", overallScore: 65, maxScore: 100,
    strengths: ["Good SQL knowledge", "Understanding of normalization"],
    weaknesses: ["Indexing concepts need work", "Transaction management is weak"],
    feedback: "Average performance. Needs to focus on advanced topics like indexing and transactions.",
    riskScore: 8,
    details: { "SQL": 80, "Normalization": 75, "Indexing": 50, "Transactions": 45, "NoSQL": 60 },
  },
]

export const mockNotifications: Notification[] = [
  { id: "n1", title: "Interview Scheduled", message: "System Design Round scheduled for March 1st", type: "info", read: false, date: "2026-02-25" },
  { id: "n2", title: "Exam Reminder", message: "Web Development Fundamentals exam in 4 days", type: "warning", read: false, date: "2026-02-26" },
  { id: "n3", title: "Report Available", message: "Your Frontend Developer interview report is ready", type: "success", read: true, date: "2026-02-21" },
  { id: "n4", title: "Score Updated", message: "DSA exam score has been finalized: 78/100", type: "info", read: true, date: "2026-02-19" },
  { id: "n5", title: "Proctoring Alert", message: "Unusual activity detected during OS exam - under review", type: "error", read: false, date: "2026-02-26" },
]

export const mockAuditLogs: AuditLog[] = [
  { id: "a1", action: "Login", user: "arjun@example.com", role: "candidate", timestamp: "2026-02-26T10:00:00Z", details: "Successful login from Chrome/Windows", severity: "low" },
  { id: "a2", action: "Exam Started", user: "arjun@example.com", role: "candidate", timestamp: "2026-02-26T10:05:00Z", details: "Started OS Midterm exam", severity: "low" },
  { id: "a3", action: "Proctoring Alert", user: "arjun@example.com", role: "candidate", timestamp: "2026-02-26T10:15:00Z", details: "Tab switch detected during exam", severity: "high" },
  { id: "a4", action: "Risk Threshold Updated", user: "admin@proctora.ai", role: "admin", timestamp: "2026-02-25T14:00:00Z", details: "Risk threshold changed from 0.7 to 0.8", severity: "medium" },
  { id: "a5", action: "AI Model Updated", user: "admin@proctora.ai", role: "admin", timestamp: "2026-02-24T09:00:00Z", details: "Proctoring model v2.3 deployed", severity: "medium" },
  { id: "a6", action: "User Registered", user: "newuser@example.com", role: "candidate", timestamp: "2026-02-23T16:30:00Z", details: "New candidate registration", severity: "low" },
  { id: "a7", action: "Exam Published", user: "priya@iitd.edu", role: "institution", timestamp: "2026-02-22T11:00:00Z", details: "Published Web Development Fundamentals exam", severity: "low" },
  { id: "a8", action: "Bulk Import", user: "priya@iitd.edu", role: "institution", timestamp: "2026-02-21T08:00:00Z", details: "Imported 150 candidate records", severity: "medium" },
]

export const weeklyActivity = [
  { day: "Mon", interviews: 2, exams: 1, studyHours: 3 },
  { day: "Tue", interviews: 0, exams: 2, studyHours: 4 },
  { day: "Wed", interviews: 1, exams: 0, studyHours: 2 },
  { day: "Thu", interviews: 1, exams: 1, studyHours: 5 },
  { day: "Fri", interviews: 0, exams: 3, studyHours: 3 },
  { day: "Sat", interviews: 2, exams: 1, studyHours: 6 },
  { day: "Sun", interviews: 0, exams: 0, studyHours: 1 },
]

export const candidateSkills = [
  { skill: "React", score: 90 },
  { skill: "System Design", score: 70 },
  { skill: "DSA", score: 78 },
  { skill: "Communication", score: 85 },
  { skill: "Node.js", score: 72 },
  { skill: "Databases", score: 65 },
]

export const institutionCandidateStats = [
  { month: "Sep", registered: 120, active: 100, completed: 45 },
  { month: "Oct", registered: 150, active: 130, completed: 78 },
  { month: "Nov", registered: 180, active: 155, completed: 110 },
  { month: "Dec", registered: 200, active: 170, completed: 140 },
  { month: "Jan", registered: 230, active: 200, completed: 165 },
  { month: "Feb", registered: 250, active: 220, completed: 190 },
]

export const institutionExamPerformance = [
  { exam: "DSA", avgScore: 72, passRate: 68, attempts: 245 },
  { exam: "Web Dev", avgScore: 78, passRate: 75, attempts: 198 },
  { exam: "OS", avgScore: 65, passRate: 58, attempts: 210 },
  { exam: "DBMS", avgScore: 70, passRate: 62, attempts: 180 },
  { exam: "Networks", avgScore: 68, passRate: 60, attempts: 156 },
]

export const riskDistribution = [
  { range: "0-20", count: 180, label: "Low Risk" },
  { range: "21-40", count: 95, label: "Moderate" },
  { range: "41-60", count: 45, label: "Medium" },
  { range: "61-80", count: 20, label: "High" },
  { range: "81-100", count: 8, label: "Critical" },
]
