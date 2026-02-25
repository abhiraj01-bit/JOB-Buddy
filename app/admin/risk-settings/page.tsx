"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ShieldCheck, Save, AlertTriangle, Eye, Keyboard, Monitor, Globe } from "lucide-react"

interface RiskRule {
  id: string
  name: string
  description: string
  icon: React.ElementType
  enabled: boolean
  weight: number
}

const initialRules: RiskRule[] = [
  { id: "r1", name: "Tab Switch Detection", description: "Detect when candidate switches browser tabs during exam", icon: Monitor, enabled: true, weight: 30 },
  { id: "r2", name: "Face Detection", description: "Monitor candidate face visibility and verify identity", icon: Eye, enabled: true, weight: 25 },
  { id: "r3", name: "Copy-Paste Detection", description: "Detect copy-paste actions during exam", icon: Keyboard, enabled: true, weight: 15 },
  { id: "r4", name: "Multiple Person Detection", description: "Alert when multiple persons are detected in frame", icon: AlertTriangle, enabled: true, weight: 20 },
  { id: "r5", name: "External Device Detection", description: "Detect use of external devices like phones", icon: Globe, enabled: false, weight: 10 },
]

export default function RiskSettingsPage() {
  const [rules, setRules] = useState(initialRules)
  const [globalThreshold, setGlobalThreshold] = useState([70])
  const [autoTerminate, setAutoTerminate] = useState([90])

  const toggleRule = (id: string) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)))
  }

  const updateWeight = (id: string, value: number[]) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, weight: value[0] } : r)))
  }

  return (
    <>
      <PageHeader
        title="Risk Settings"
        description="Configure risk scoring thresholds and violation detection rules."
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Risk Settings" },
        ]}
        actions={
          <Button size="sm" className="gap-1 text-xs">
            <Save className="h-3 w-3" /> Save Settings
          </Button>
        }
      />

      {/* Global Thresholds */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Risk Alert Threshold</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Candidates with risk scores above this threshold will trigger alerts.
          </p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Threshold</span>
            <span className="text-sm font-semibold text-foreground">{globalThreshold[0]}%</span>
          </div>
          <Slider value={globalThreshold} onValueChange={setGlobalThreshold} max={100} step={5} />
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>Sensitive</span>
            <span>Balanced</span>
            <span>Lenient</span>
          </div>

          <div className="mt-4 rounded-lg p-3" style={{
            backgroundColor: globalThreshold[0] > 80 ? "var(--success)" : globalThreshold[0] > 50 ? "var(--warning)" : "var(--destructive)",
            opacity: 0.1,
          }}>
            <p className="text-xs font-medium" style={{
              color: globalThreshold[0] > 80 ? "var(--success)" : globalThreshold[0] > 50 ? "var(--warning-foreground)" : "var(--destructive)",
            }}>
              {globalThreshold[0] > 80 ? "Lenient - Fewer alerts, more tolerance" : globalThreshold[0] > 50 ? "Balanced - Moderate sensitivity" : "Strict - Many alerts, low tolerance"}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <h3 className="text-sm font-semibold text-foreground">Auto-Terminate Threshold</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Exams will be automatically terminated when risk score exceeds this value.
          </p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Threshold</span>
            <span className="text-sm font-semibold text-foreground">{autoTerminate[0]}%</span>
          </div>
          <Slider value={autoTerminate} onValueChange={setAutoTerminate} max={100} min={50} step={5} />
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Risk Rules */}
      <h3 className="mb-4 text-sm font-semibold text-foreground">Detection Rules</h3>
      <div className="space-y-3">
        {rules.map((rule) => {
          const Icon = rule.icon
          return (
            <div key={rule.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{rule.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{rule.description}</p>
                  </div>
                </div>
                <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
              </div>

              {rule.enabled && (
                <div className="mt-4 pt-3 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Weight in risk score</span>
                    <span className="text-xs font-medium text-foreground">{rule.weight}%</span>
                  </div>
                  <Slider
                    value={[rule.weight]}
                    onValueChange={(v) => updateWeight(rule.id, v)}
                    max={50}
                    step={5}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
