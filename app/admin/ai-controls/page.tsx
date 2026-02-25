"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Cpu, RefreshCw, Settings, Zap, Eye, Ear, Brain, Shield } from "lucide-react"

const initialModels = [
  { id: "m1", name: "Proctor Vision v2.3", type: "Video Analysis", enabled: true, sensitivity: 75, icon: Eye },
  { id: "m2", name: "Speech Analyzer v1.8", type: "Audio Analysis", enabled: true, sensitivity: 60, icon: Ear },
  { id: "m3", name: "Risk Scorer v3.1", type: "Risk Assessment", enabled: true, sensitivity: 80, icon: Shield },
  { id: "m4", name: "Answer Evaluator v2.0", type: "NLP", enabled: false, sensitivity: 70, icon: Brain },
  { id: "m5", name: "Behavioral Detector v1.5", type: "Anomaly Detection", enabled: true, sensitivity: 65, icon: Zap },
]

export default function AIControlsPage() {
  const [models, setModels] = useState(initialModels)

  const toggleModel = (id: string) => {
    setModels((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    )
  }

  const updateSensitivity = (id: string, value: number[]) => {
    setModels((prev) =>
      prev.map((m) => (m.id === id ? { ...m, sensitivity: value[0] } : m))
    )
  }

  return (
    <>
      <PageHeader
        title="AI Controls"
        description="Configure and manage AI proctoring models and their parameters."
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "AI Controls" },
        ]}
        actions={
          <Button variant="outline" size="sm" className="gap-1 text-xs">
            <RefreshCw className="h-3 w-3" /> Sync Models
          </Button>
        }
      />

      {/* Global Settings */}
      <div className="mb-6 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Global AI Settings</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium text-foreground">Auto-Flag Violations</p>
              <p className="text-xs text-muted-foreground">Automatically flag suspicious activity</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium text-foreground">Real-Time Alerts</p>
              <p className="text-xs text-muted-foreground">Send alerts to proctors instantly</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-medium text-foreground">Auto-Terminate</p>
              <p className="text-xs text-muted-foreground">End exams on critical violations</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Model Cards */}
      <div className="space-y-4">
        {models.map((model) => {
          const Icon = model.icon
          return (
            <div key={model.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-foreground">{model.name}</h4>
                      <StatusBadge label={model.enabled ? "Active" : "Disabled"} variant={model.enabled ? "success" : "default"} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{model.type}</p>
                  </div>
                </div>
                <Switch checked={model.enabled} onCheckedChange={() => toggleModel(model.id)} />
              </div>

              {model.enabled && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Sensitivity</span>
                    <span className="text-xs font-medium text-foreground">{model.sensitivity}%</span>
                  </div>
                  <Slider
                    value={[model.sensitivity]}
                    onValueChange={(v) => updateSensitivity(model.id, v)}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
