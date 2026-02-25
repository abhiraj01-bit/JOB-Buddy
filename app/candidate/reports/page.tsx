"use client"

import { useState } from "react"
import { mockReports } from "@/lib/mock-data"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, BarChart3, Mic, BookOpen, AlertTriangle } from "lucide-react"
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState(mockReports[0])
  const interviewReports = mockReports.filter((r) => r.type === "interview")
  const examReports = mockReports.filter((r) => r.type === "exam")

  const radarData = selectedReport.details
    ? Object.entries(selectedReport.details).map(([key, val]) => ({ subject: key, score: val, fullMark: 100 }))
    : []

  const barData = selectedReport.details
    ? Object.entries(selectedReport.details).map(([key, val]) => ({ name: key, score: val }))
    : []

  return (
    <>
      <PageHeader
        title="Reports"
        description="View detailed performance reports for interviews and exams."
        breadcrumbs={[
          { label: "Dashboard", href: "/candidate/dashboard" },
          { label: "Reports" },
        ]}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Report List */}
        <div className="space-y-4">
          <Tabs defaultValue="all">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1 text-xs">All</TabsTrigger>
              <TabsTrigger value="interviews" className="flex-1 text-xs">Interviews</TabsTrigger>
              <TabsTrigger value="exams" className="flex-1 text-xs">Exams</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-3 space-y-2">
              {mockReports.map((r) => (
                <ReportCard key={r.id} report={r} isSelected={selectedReport.id === r.id} onClick={() => setSelectedReport(r)} />
              ))}
            </TabsContent>
            <TabsContent value="interviews" className="mt-3 space-y-2">
              {interviewReports.map((r) => (
                <ReportCard key={r.id} report={r} isSelected={selectedReport.id === r.id} onClick={() => setSelectedReport(r)} />
              ))}
            </TabsContent>
            <TabsContent value="exams" className="mt-3 space-y-2">
              {examReports.map((r) => (
                <ReportCard key={r.id} report={r} isSelected={selectedReport.id === r.id} onClick={() => setSelectedReport(r)} />
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Report Detail */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {selectedReport.type === "interview" ? <Mic className="h-4 w-4 text-primary" /> : <BookOpen className="h-4 w-4 text-accent" />}
                  <h2 className="text-base font-semibold text-foreground">{selectedReport.title}</h2>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(selectedReport.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">{selectedReport.overallScore}<span className="text-sm text-muted-foreground font-normal">/{selectedReport.maxScore}</span></p>
                <p className="text-xs text-muted-foreground">{Math.round((selectedReport.overallScore / selectedReport.maxScore) * 100)}% Overall</p>
              </div>
            </div>

            {selectedReport.riskScore !== undefined && (
              <div className="flex items-center gap-2 rounded-lg bg-warning/10 px-3 py-2">
                <AlertTriangle className="h-4 w-4 text-warning-foreground" />
                <span className="text-xs font-medium text-warning-foreground">Risk Score: {selectedReport.riskScore}/100</span>
              </div>
            )}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Performance Radar</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} stroke="var(--muted-foreground)" />
                    <Radar dataKey="score" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.15} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Score Breakdown</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={80} stroke="var(--muted-foreground)" />
                    <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }} />
                    <Bar dataKey="score" fill="var(--primary)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Feedback</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{selectedReport.feedback}</p>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-success/20 bg-success/5 p-5">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Strengths</h3>
              <ul className="space-y-2">
                {selectedReport.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Areas for Improvement</h3>
              <ul className="space-y-2">
                {selectedReport.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function ReportCard({ report, isSelected, onClick }: { report: typeof mockReports[0]; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border p-4 text-left transition-colors ${isSelected ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-secondary/50"}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {report.type === "interview" ? <Mic className="h-4 w-4 text-primary" /> : <BookOpen className="h-4 w-4 text-accent" />}
          <span className="text-sm font-medium text-foreground">{report.title}</span>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-2 flex items-center gap-3">
        <span className="text-xs text-muted-foreground">{new Date(report.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        <span className="text-xs font-medium text-foreground">{report.overallScore}/{report.maxScore}</span>
        <StatusBadge label={report.type} variant={report.type === "interview" ? "info" : "default"} />
      </div>
    </button>
  )
}
