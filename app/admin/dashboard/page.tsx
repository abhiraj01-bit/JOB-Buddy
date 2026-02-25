"use client"

import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { Users, Server, ShieldCheck, Activity, Cpu, Database, Wifi, HardDrive } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const systemMetrics = [
  { time: "00:00", cpu: 45, memory: 62, requests: 120 },
  { time: "04:00", cpu: 32, memory: 58, requests: 80 },
  { time: "08:00", cpu: 68, memory: 72, requests: 280 },
  { time: "12:00", cpu: 82, memory: 78, requests: 450 },
  { time: "16:00", cpu: 75, memory: 75, requests: 380 },
  { time: "20:00", cpu: 55, memory: 68, requests: 200 },
  { time: "Now", cpu: 48, memory: 64, requests: 150 },
]

const aiModels = [
  { name: "Proctor Vision v2.3", type: "Video Analysis", status: "active", accuracy: "96.8%", lastUpdated: "2 days ago" },
  { name: "Speech Analyzer v1.8", type: "Audio Analysis", status: "active", accuracy: "94.2%", lastUpdated: "1 week ago" },
  { name: "Risk Scorer v3.1", type: "Risk Assessment", status: "active", accuracy: "92.5%", lastUpdated: "3 days ago" },
  { name: "Answer Evaluator v2.0", type: "NLP", status: "maintenance", accuracy: "91.0%", lastUpdated: "1 day ago" },
  { name: "Behavioral Detector v1.5", type: "Anomaly Detection", status: "active", accuracy: "89.7%", lastUpdated: "5 days ago" },
]

export default function AdminDashboard() {
  return (
    <>
      <PageHeader
        title="System Overview"
        description="Monitor system health, AI models, and platform metrics."
        breadcrumbs={[{ label: "Admin Dashboard" }]}
      />

      {/* System Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="1,247"
          subtitle="43 new this week"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 12, label: "growth" }}
        />
        <StatCard
          title="Active Sessions"
          value="89"
          subtitle="12 exams in progress"
          icon={<Activity className="h-5 w-5" />}
        />
        <StatCard
          title="AI Models"
          value="5"
          subtitle="4 active, 1 maintenance"
          icon={<Cpu className="h-5 w-5" />}
        />
        <StatCard
          title="System Health"
          value="99.8%"
          subtitle="Uptime last 30 days"
          icon={<Server className="h-5 w-5" />}
          trend={{ value: 0.2, label: "improvement" }}
        />
      </div>

      {/* System Metrics Chart */}
      <div className="mb-6 rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">System Metrics (24h)</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={systemMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="cpu" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.1} strokeWidth={2} name="CPU %" />
              <Area type="monotone" dataKey="memory" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.1} strokeWidth={2} name="Memory %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Model Status Cards */}
      <div className="mb-6">
        <h3 className="mb-4 text-sm font-semibold text-foreground">AI Model Status</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiModels.map((model) => (
            <div key={model.name} className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Cpu className="h-4 w-4 text-primary" />
                </div>
                <StatusBadge
                  label={model.status}
                  variant={model.status === "active" ? "success" : "warning"}
                />
              </div>
              <h4 className="text-sm font-semibold text-foreground">{model.name}</h4>
              <p className="text-xs text-muted-foreground mb-3">{model.type}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="font-medium text-foreground">{model.accuracy}</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-muted-foreground">Updated</span>
                <span className="text-foreground">{model.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick System Status */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Database", icon: Database, status: "Healthy", latency: "2ms" },
          { label: "API Gateway", icon: Wifi, status: "Healthy", latency: "15ms" },
          { label: "Storage", icon: HardDrive, status: "Healthy", latency: "8ms" },
          { label: "Auth Service", icon: ShieldCheck, status: "Healthy", latency: "5ms" },
        ].map((svc) => (
          <div key={svc.label} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
                <svc.icon className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{svc.label}</p>
                <p className="text-xs text-muted-foreground">{svc.status} - {svc.latency}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
