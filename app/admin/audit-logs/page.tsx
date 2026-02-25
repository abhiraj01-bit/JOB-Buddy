"use client"

import { useState } from "react"
import { mockAuditLogs } from "@/lib/mock-data"
import { PageHeader } from "@/components/shared/page-header"
import { DataTable } from "@/components/shared/data-table"
import { StatusBadge } from "@/components/shared/status-badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Download } from "lucide-react"
import type { AuditLog } from "@/lib/types"

const columns = [
  {
    key: "timestamp",
    header: "Time",
    render: (item: AuditLog) => (
      <span className="text-xs text-foreground font-mono">
        {new Date(item.timestamp).toLocaleString("en-US", {
          month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
        })}
      </span>
    ),
  },
  {
    key: "action",
    header: "Action",
    render: (item: AuditLog) => (
      <span className="text-sm font-medium text-foreground">{item.action}</span>
    ),
  },
  {
    key: "user",
    header: "User",
    render: (item: AuditLog) => (
      <div>
        <p className="text-sm text-foreground">{item.user}</p>
        <p className="text-xs text-muted-foreground capitalize">{item.role}</p>
      </div>
    ),
  },
  {
    key: "details",
    header: "Details",
    render: (item: AuditLog) => (
      <span className="text-xs text-muted-foreground max-w-xs truncate block">{item.details}</span>
    ),
  },
  {
    key: "severity",
    header: "Severity",
    render: (item: AuditLog) => (
      <StatusBadge
        label={item.severity}
        variant={item.severity === "high" ? "destructive" : item.severity === "medium" ? "warning" : "default"}
      />
    ),
  },
]

export default function AuditLogsPage() {
  const [search, setSearch] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")

  const filtered = mockAuditLogs.filter((log) => {
    const matchSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase())
    const matchSeverity = severityFilter === "all" || log.severity === severityFilter
    return matchSearch && matchSeverity
  })

  return (
    <>
      <PageHeader
        title="Audit Logs"
        description="View system activity logs and security events."
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Audit Logs" },
        ]}
        actions={
          <Button variant="outline" size="sm" className="gap-1 text-xs">
            <Download className="h-3 w-3" /> Export Logs
          </Button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severity</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={filtered as unknown as Record<string, unknown>[]} />
    </>
  )
}
