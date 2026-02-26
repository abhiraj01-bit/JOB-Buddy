"use client"

import { APP_CONFIG_DEFAULTS } from "@/app-config"
import { App as ProctoringApp } from "@/components/proctoring/app"

export default function ProctoringRoomPage() {
    return (
        <div className="h-screen w-screen overflow-hidden bg-background">
            <ProctoringApp appConfig={APP_CONFIG_DEFAULTS} />
        </div>
    )
}
