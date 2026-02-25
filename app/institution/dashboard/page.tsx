"use client"

import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { DataTable } from "@/components/shared/data-table"
import { StatusBadge } from "@/components/shared/status-badge"
import { institutionCandidateStats, institutionExamPerformance, riskDistribution, mockExams } from "@/lib/mock-data"
import { Users, BookOpen, BarChart3, ShieldAlert, TrendingUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

const COLORS = ["var(--success)", "var(--chart-2)", "var(--warning)", "var(--chart-3)", "var(--destructive)"]

const topCandidates = [
  { name: "Arjun Mehta", email: "arjun@example.com", avgScore: 82, exams: 4, risk: "Low" },
  { name: "Sneha Gupta", email: "sneha@example.com", avgScore: 91, exams: 5, risk: "Low" },
  { name: "Rahul Singh", email: "rahul@example.com", avgScore: 67, exams: 3, risk: "Medium" },
  { name: "Priya Verma", email: "priya.v@example.com", avgScore: 74, exams: 4, risk: "Low" },
  { name: "Amit Kumar", email: "amit@example.com", avgScore: 58, exams: 2, risk: "High" },
]

const candidateColumns = [
  { key: "name", header: "Candidate", render: (item: Record<string, unknown>) => (
    <div>
      <p className="text-sm font-medium text-foreground">{String(item.name)}</p>
      <p className="text-xs text-muted-foreground">{String(item.email)}</p>
    </div>
  )},
  { key: "avgScore", header: "Avg Score", render: (item: Record<string, unknown>) => (
    <span className="text-sm font-medium text-foreground">{String(item.avgScore)}%</span>
  )},
  { key: "exams", header: "Exams", render: (item: Record<string, unknown>) => (
    <span className="text-sm text-foreground">{String(item.exams)}</span>
  )},
  { key: "risk", header: "Risk Level", render: (item: Record<string, unknown>) => (
    <StatusBadge
      label={String(item.risk)}
      variant={item.risk === "Low" ? "success" : item.risk === "Medium" ? "warning" : "destructive"}
    />
  )},
]

const examColumns = [
  { key: "exam", header: "Exam", render: (item: Record<string, unknown>) => (
    <span className="text-sm font-medium text-foreground">{String(item.exam)}</span>
  )},
  { key: "avgScore", header: "Avg Score", render: (item: Record<string, unknown>) => (
    <span className="text-sm text-foreground">{String(item.avgScore)}%</span>
  )},
  { key: "passRate", header: "Pass Rate", render: (item: Record<string, unknown>) => (
    <span className="text-sm text-foreground">{String(item.passRate)}%</span>
  )},
  { key: "attempts", header: "Attempts", render: (item: Record<string, unknown>) => (
    <span className="text-sm text-foreground">{String(item.attempts)}</span>
  )},
]

export default function InstitutionDashboard() {
  return (
    <>
      <PageHeader
        title="Institution Dashboard"
        description="Monitor candidate performance, exam analytics, and risk assessments."
        breadcrumbs={[{ label: "Dashboard" }]}
      />

      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Candidates"
          value="250"
          subtitle="220 active this month"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 8, label: "this month" }}
        />
        <StatCard
          title="Exams Published"
          value={String(mockExams.length)}
          subtitle="3 active exams"
          icon={<BookOpen className="h-5 w-5" />}
          trend={{ value: 15, label: "this month" }}
        />
        <StatCard
          title="Avg Pass Rate"
          value="65%"
          subtitle="Across all exams"
          icon={<BarChart3 className="h-5 w-5" />}
          trend={{ value: 3, label: "improvement" }}
        />
        <StatCard
          title="Risk Alerts"
          value="28"
          subtitle="8 critical"
          icon={<ShieldAlert className="h-5 w-5" />}
          trend={{ value: -12, label: "vs last month" }}
        />
      </div>

      {/* Charts Row */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Candidate Growth */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Candidate Trends
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={institutionCandidateStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }} />
                <Area type="monotone" dataKey="registered" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.1} strokeWidth={2} name="Registered" />
                <Area type="monotone" dataKey="active" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.1} strokeWidth={2} name="Active" />
                <Area type="monotone" dataKey="completed" stroke="var(--success)" fill="var(--success)" fillOpacity={0.1} strokeWidth={2} name="Completed" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold text-foreground flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-destructive" />
            Risk Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="count"
                  nameKey="label"
                >
                  {riskDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables */}
      <Tabs defaultValue="candidates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="candidates" className="text-xs">Top Candidates</TabsTrigger>
          <TabsTrigger value="exams" className="text-xs">Exam Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="candidates">
          <DataTable
            columns={candidateColumns}
            data={topCandidates as unknown as Record<string, unknown>[]}
          />
        </TabsContent>

        <TabsContent value="exams">
          <DataTable
            columns={examColumns}
            data={institutionExamPerformance as unknown as Record<string, unknown>[]}
          />
        </TabsContent>
      </Tabs>
    </>
  )
}
