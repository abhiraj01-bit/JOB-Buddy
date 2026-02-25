export type UserRole = "candidate" | "institution" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  phone?: string
  institution?: string
  resumeUrl?: string
}

export interface Interview {
  id: string
  title: string
  type: string
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  date: string
  score?: number
  duration?: string
  difficulty: "easy" | "medium" | "hard"
  questions?: InterviewQuestion[]
}

export interface InterviewQuestion {
  id: string
  text: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  timeLimit?: number
  sampleAnswer?: string
}

export interface Exam {
  id: string
  title: string
  subject: string
  status: "not-started" | "in-progress" | "completed"
  date: string
  duration: number
  totalQuestions: number
  score?: number
  maxScore: number
  questions?: ExamQuestion[]
}

export interface ExamQuestion {
  id: string
  text: string
  type: "mcq" | "descriptive"
  options?: string[]
  correctAnswer?: number
  marks: number
}

export interface Report {
  id: string
  type: "interview" | "exam"
  title: string
  date: string
  overallScore: number
  maxScore: number
  strengths: string[]
  weaknesses: string[]
  feedback: string
  riskScore?: number
  details?: Record<string, number>
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  read: boolean
  date: string
}

export interface AuditLog {
  id: string
  action: string
  user: string
  role: UserRole
  timestamp: string
  details: string
  severity: "low" | "medium" | "high"
}
