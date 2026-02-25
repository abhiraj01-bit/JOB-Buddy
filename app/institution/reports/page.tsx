"use client"

import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { institutionExamPerformance } from "@/lib/mock-data"
import { BarChart3, TrendingUp, Users, AlertTriangle } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

export default function InstitutionReportsPage() {
  return (
    <>
      <PageHeader
        title="Reports & Analytics"
        description="Detailed performance analytics and reporting across all exams."
        breadcrumbs={[
          { label: "Dashboard", href: "/institution/dashboard" },
          { label: "Reports" },
        ]}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Avg Score" value="70%" icon={<BarChart3 className="h-5 w-5" />} trend={{ value: 4, label: "vs last semester" }} />
        <StatCard title="Pass Rate" value="65%" icon={<TrendingUp className="h-5 w-5" />} trend={{ value: 2, label: "improvement" }} />
        <StatCard title="Total Attempts" value="989" icon={<Users className="h-5 w-5" />} />
        <StatCard title="Flagged Exams" value="28" icon={<AlertTriangle className="h-5 w-5" />} trend={{ value: -5, label: "vs last month" }} />
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">Exam Performance Comparison</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={institutionExamPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="exam" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="avgScore" fill="var(--primary)" name="Avg Score" radius={[4, 4, 0, 0]} />
              <Bar dataKey="passRate" fill="var(--accent)" name="Pass Rate" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}
