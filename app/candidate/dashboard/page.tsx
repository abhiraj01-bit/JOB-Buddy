"use client"

import { useAppStore } from "@/lib/store"
import { mockInterviews, mockExams, weeklyActivity, candidateSkills } from "@/lib/mock-data"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge, getInterviewStatusVariant, getExamStatusVariant } from "@/components/shared/status-badge"
import { Mic, BookOpen, BarChart3, Brain, CalendarDays, Lightbulb, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
} from "recharts"

const upcomingInterviews = mockInterviews.filter((i) => i.status === "scheduled")
const upcomingExams = mockExams.filter((e) => e.status === "not-started" || e.status === "in-progress")
const completedInterviews = mockInterviews.filter((i) => i.status === "completed")
const avgScore = completedInterviews.length
  ? Math.round(completedInterviews.reduce((a, b) => a + (b.score || 0), 0) / completedInterviews.length)
  : 0

const recommendations = [
  { title: "Practice System Design", description: "Your system design scores are below average. Try mock interviews focused on this area.", priority: "high" },
  { title: "Review Graph Algorithms", description: "Based on your exam results, graph problems need more practice.", priority: "medium" },
  { title: "Schedule Behavioral Prep", description: "You have a behavioral round coming up. Prepare STAR-method answers.", priority: "low" },
]

export default function CandidateDashboard() {
  const { state } = useAppStore()

  return (
    <>
      <PageHeader
        title={`Welcome back, ${state.user?.name?.split(" ")[0] || "Candidate"}`}
        description="Here's an overview of your progress and upcoming activities."
        breadcrumbs={[{ label: "Dashboard" }]}
      />

      {/* Welcome Banner */}
      <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Interview Readiness Score</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Based on your recent performance across all categories</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{avgScore}%</p>
            </div>
            <Progress value={avgScore} className="w-32 h-2" />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Interviews Done"
          value={completedInterviews.length}
          subtitle={`${upcomingInterviews.length} upcoming`}
          icon={<Mic className="h-5 w-5" />}
          trend={{ value: 12, label: "this month" }}
        />
        <StatCard
          title="Exams Attempted"
          value={mockExams.filter((e) => e.status === "completed").length}
          subtitle={`${upcomingExams.length} pending`}
          icon={<BookOpen className="h-5 w-5" />}
          trend={{ value: 8, label: "this month" }}
        />
        <StatCard
          title="Average Score"
          value={`${avgScore}%`}
          subtitle="Across all assessments"
          icon={<BarChart3 className="h-5 w-5" />}
          trend={{ value: 5, label: "improvement" }}
        />
        <StatCard
          title="AI Insights"
          value="3"
          subtitle="New recommendations"
          icon={<Brain className="h-5 w-5" />}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Interviews */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <h3 className="text-sm font-semibold text-foreground">Upcoming Interviews</h3>
              <Link href="/candidate/interviews">
                <Button variant="ghost" size="sm" className="text-xs">View all</Button>
              </Link>
            </div>
            <div className="divide-y divide-border">
              {upcomingInterviews.length === 0 ? (
                <div className="px-5 py-8 text-center text-sm text-muted-foreground">No upcoming interviews</div>
              ) : (
                upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Mic className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{interview.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {new Date(interview.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <StatusBadge label={interview.status} variant={getInterviewStatusVariant(interview.status)} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Upcoming Exams */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <h3 className="text-sm font-semibold text-foreground">Upcoming Exams</h3>
              <Link href="/candidate/exams">
                <Button variant="ghost" size="sm" className="text-xs">View all</Button>
              </Link>
            </div>
            <div className="divide-y divide-border">
              {upcomingExams.length === 0 ? (
                <div className="px-5 py-8 text-center text-sm text-muted-foreground">No upcoming exams</div>
              ) : (
                upcomingExams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                        <BookOpen className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{exam.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{exam.duration} min</span>
                          <span>-</span>
                          <span>{exam.totalQuestions} questions</span>
                        </div>
                      </div>
                    </div>
                    <StatusBadge label={exam.status.replace("-", " ")} variant={getExamStatusVariant(exam.status)} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Weekly Activity Chart */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Weekly Activity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="interviews" fill="var(--primary)" radius={[4, 4, 0, 0]} name="Interviews" />
                  <Bar dataKey="exams" fill="var(--accent)" radius={[4, 4, 0, 0]} name="Exams" />
                  <Bar dataKey="studyHours" fill="var(--chart-3)" radius={[4, 4, 0, 0]} name="Study Hours" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skills Radar */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Skills Overview</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={candidateSkills}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                  <Radar name="Score" dataKey="score" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.15} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border px-5 py-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-warning" />
                AI Recommendations
              </h3>
            </div>
            <div className="divide-y divide-border">
              {recommendations.map((rec, i) => (
                <div key={i} className="px-5 py-3">
                  <div className="flex items-start gap-2">
                    <div className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${rec.priority === "high" ? "bg-destructive" : rec.priority === "medium" ? "bg-warning" : "bg-success"}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{rec.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Chart */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 text-sm font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              Score Trend
            </h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { week: "W1", score: 62 },
                  { week: "W2", score: 68 },
                  { week: "W3", score: 74 },
                  { week: "W4", score: 78 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                  <YAxis domain={[50, 100]} tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Line type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={2} dot={{ fill: "var(--primary)", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
