"use client"

import { mockExams } from "@/lib/mock-data"
import { PageHeader } from "@/components/shared/page-header"
import { DataTable } from "@/components/shared/data-table"
import { StatusBadge, getExamStatusVariant } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { Exam } from "@/lib/types"

const columns = [
  {
    key: "title",
    header: "Exam Title",
    render: (item: Exam) => (
      <div>
        <p className="text-sm font-medium text-foreground">{item.title}</p>
        <p className="text-xs text-muted-foreground">{item.subject}</p>
      </div>
    ),
  },
  {
    key: "date",
    header: "Date",
    render: (item: Exam) => (
      <span className="text-sm text-foreground">{new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
    ),
  },
  {
    key: "duration",
    header: "Duration",
    render: (item: Exam) => <span className="text-sm text-foreground">{item.duration} min</span>,
  },
  {
    key: "totalQuestions",
    header: "Questions",
    render: (item: Exam) => <span className="text-sm text-foreground">{item.totalQuestions}</span>,
  },
  {
    key: "status",
    header: "Status",
    render: (item: Exam) => (
      <StatusBadge label={item.status.replace("-", " ")} variant={getExamStatusVariant(item.status)} />
    ),
  },
]

export default function InstitutionExamsPage() {
  return (
    <>
      <PageHeader
        title="Exams Management"
        description="Create, manage, and monitor all examinations."
        breadcrumbs={[
          { label: "Dashboard", href: "/institution/dashboard" },
          { label: "Exams" },
        ]}
        actions={
          <Button size="sm" className="gap-1 text-xs">
            <Plus className="h-3 w-3" /> Create Exam
          </Button>
        }
      />
      <DataTable columns={columns} data={mockExams as unknown as Record<string, unknown>[]} />
    </>
  )
}
