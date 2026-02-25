"use client"

import Link from "next/link"
import { mockInterviews } from "@/lib/mock-data"
import { PageHeader } from "@/components/shared/page-header"
import { DataTable } from "@/components/shared/data-table"
import { StatusBadge, getInterviewStatusVariant } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw } from "lucide-react"
import type { Interview } from "@/lib/types"

const columns = [
  {
    key: "title",
    header: "Interview",
    render: (item: Interview) => (
      <div>
        <p className="text-sm font-medium text-foreground">{item.title}</p>
        <p className="text-xs text-muted-foreground">{item.type}</p>
      </div>
    ),
  },
  {
    key: "date",
    header: "Date",
    render: (item: Interview) => (
      <span className="text-sm text-foreground">
        {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
      </span>
    ),
  },
  {
    key: "difficulty",
    header: "Difficulty",
    render: (item: Interview) => (
      <StatusBadge
        label={item.difficulty}
        variant={item.difficulty === "hard" ? "destructive" : item.difficulty === "medium" ? "warning" : "success"}
      />
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (item: Interview) => (
      <StatusBadge label={item.status} variant={getInterviewStatusVariant(item.status)} />
    ),
  },
  {
    key: "score",
    header: "Score",
    render: (item: Interview) => (
      <span className="text-sm font-medium text-foreground">{item.score ? `${item.score}%` : "-"}</span>
    ),
  },
  {
    key: "actions",
    header: "",
    render: (item: Interview) => (
      <div className="flex items-center gap-2 justify-end">
        {item.status === "scheduled" && (
          <Link href={`/candidate/interview/${item.id}`}>
            <Button size="sm" variant="default" className="gap-1 text-xs">
              <Play className="h-3 w-3" /> Start
            </Button>
          </Link>
        )}
        {item.status === "completed" && (
          <Link href={`/candidate/interview/${item.id}`}>
            <Button size="sm" variant="outline" className="gap-1 text-xs">
              <RotateCcw className="h-3 w-3" /> Retry
            </Button>
          </Link>
        )}
      </div>
    ),
    className: "text-right",
  },
]

export default function InterviewsPage() {
  return (
    <>
      <PageHeader
        title="Mock Interviews"
        description="View and manage your AI-powered mock interviews."
        breadcrumbs={[
          { label: "Dashboard", href: "/candidate/dashboard" },
          { label: "Interviews" },
        ]}
      />
      <DataTable columns={columns} data={mockInterviews as unknown as Record<string, unknown>[]} />
    </>
  )
}
