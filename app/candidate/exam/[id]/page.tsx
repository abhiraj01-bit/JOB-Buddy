"use client"

import { use } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { ShieldAlert, ExternalLink } from "lucide-react"

export default function ExamAttemptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const handleLaunchExam = () => {
    // Open the proctoring room in a new window outside the dashboard auth layout
    const roomUrl = `/exam-session/${id}/room`
    window.open(roomUrl, "exam-proctor-window", "noopener,noreferrer,width=1280,height=800")
  }

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <ShieldAlert className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">Secure Exam Environment</h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          This exam requires AI proctoring. When you are ready, launch the secure environment.
          It will open in a new window where you will meet your AI proctor and access the quiz.
        </p>

        <Button size="lg" onClick={handleLaunchExam} className="gap-2 font-medium">
          Launch Secure Exam <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </DashboardLayout>
  )
}
