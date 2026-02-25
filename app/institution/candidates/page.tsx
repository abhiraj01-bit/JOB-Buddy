"use client"

import { PageHeader } from "@/components/shared/page-header"
import { DataTable } from "@/components/shared/data-table"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Upload } from "lucide-react"
import { useState } from "react"

const allCandidates = [
  { id: "c1", name: "Arjun Mehta", email: "arjun@example.com", institution: "IIT Delhi", examsCompleted: 4, avgScore: 82, status: "Active", riskLevel: "Low" },
  { id: "c2", name: "Sneha Gupta", email: "sneha@example.com", institution: "IIT Delhi", examsCompleted: 5, avgScore: 91, status: "Active", riskLevel: "Low" },
  { id: "c3", name: "Rahul Singh", email: "rahul@example.com", institution: "IIT Delhi", examsCompleted: 3, avgScore: 67, status: "Active", riskLevel: "Medium" },
  { id: "c4", name: "Priya Verma", email: "priya.v@example.com", institution: "IIT Delhi", examsCompleted: 4, avgScore: 74, status: "Active", riskLevel: "Low" },
  { id: "c5", name: "Amit Kumar", email: "amit@example.com", institution: "IIT Delhi", examsCompleted: 2, avgScore: 58, status: "Inactive", riskLevel: "High" },
  { id: "c6", name: "Kavita Sharma", email: "kavita@example.com", institution: "IIT Delhi", examsCompleted: 6, avgScore: 88, status: "Active", riskLevel: "Low" },
  { id: "c7", name: "Deepak Joshi", email: "deepak@example.com", institution: "IIT Delhi", examsCompleted: 1, avgScore: 45, status: "Active", riskLevel: "High" },
  { id: "c8", name: "Meera Nair", email: "meera@example.com", institution: "IIT Delhi", examsCompleted: 3, avgScore: 72, status: "Active", riskLevel: "Medium" },
]

const columns = [
  {
    key: "name",
    header: "Candidate",
    render: (item: Record<string, unknown>) => (
      <div>
        <p className="text-sm font-medium text-foreground">{String(item.name)}</p>
        <p className="text-xs text-muted-foreground">{String(item.email)}</p>
      </div>
    ),
  },
  { key: "examsCompleted", header: "Exams", render: (item: Record<string, unknown>) => <span className="text-sm text-foreground">{String(item.examsCompleted)}</span> },
  { key: "avgScore", header: "Avg Score", render: (item: Record<string, unknown>) => <span className="text-sm font-medium text-foreground">{String(item.avgScore)}%</span> },
  {
    key: "status",
    header: "Status",
    render: (item: Record<string, unknown>) => (
      <StatusBadge label={String(item.status)} variant={item.status === "Active" ? "success" : "default"} />
    ),
  },
  {
    key: "riskLevel",
    header: "Risk",
    render: (item: Record<string, unknown>) => (
      <StatusBadge
        label={String(item.riskLevel)}
        variant={item.riskLevel === "Low" ? "success" : item.riskLevel === "Medium" ? "warning" : "destructive"}
      />
    ),
  },
]

export default function InstitutionCandidatesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = allCandidates.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || c.status.toLowerCase() === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <>
      <PageHeader
        title="Candidates"
        description="View and manage all registered candidates."
        breadcrumbs={[
          { label: "Dashboard", href: "/institution/dashboard" },
          { label: "Candidates" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1 text-xs">
              <Download className="h-3 w-3" /> Export
            </Button>
            <Button size="sm" className="gap-1 text-xs">
              <Upload className="h-3 w-3" /> Import
            </Button>
          </div>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={filtered as unknown as Record<string, unknown>[]} />
    </>
  )
}
