"use client"

import { use } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { App as ProctoringApp } from "@/components/proctoring/app"
import { APP_CONFIG_DEFAULTS } from "@/app-config"

export default function ExamAttemptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-100px)] w-full overflow-hidden rounded-xl border border-border bg-card">
        <ProctoringApp appConfig={APP_CONFIG_DEFAULTS} />
      </div>
    </DashboardLayout>
  )
}
