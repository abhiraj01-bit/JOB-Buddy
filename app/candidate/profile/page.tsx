"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { useAppStore } from "@/lib/store"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Upload, Mail, Phone, Building, Sun, Moon } from "lucide-react"

export default function ProfilePage() {
  const { state } = useAppStore()
  const { theme, setTheme } = useTheme()
  const user = state.user
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const darkMode = theme === "dark"

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U"

  const toggleTheme = () => {
    setTheme(darkMode ? "light" : "dark")
  }

  return (
    <>
      <PageHeader
        title="Profile & Settings"
        description="Manage your account information and preferences."
        breadcrumbs={[
          { label: "Dashboard", href: "/candidate/dashboard" },
          { label: "Profile" },
        ]}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <Avatar className="mx-auto h-20 w-20 mb-4">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">{initials}</AvatarFallback>
          </Avatar>
          <h2 className="text-base font-semibold text-foreground">{user?.name}</h2>
          <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>

          <div className="mt-6 space-y-3 text-left">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{user?.email}</span>
            </div>
            {user?.phone && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{user.phone}</span>
              </div>
            )}
            {user?.institution && (
              <div className="flex items-center gap-3 text-sm">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{user.institution}</span>
              </div>
            )}
          </div>

          {/* Resume Upload */}
          <div className="mt-6 rounded-lg border-2 border-dashed border-border p-6">
            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium text-foreground">Upload Resume</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOC up to 5MB</p>
            <Button variant="outline" size="sm" className="mt-3 text-xs">
              Choose File
            </Button>
          </div>
        </div>

        {/* Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Full Name</Label>
                <Input defaultValue={user?.name} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Email</Label>
                <Input defaultValue={user?.email} type="email" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Phone</Label>
                <Input defaultValue={user?.phone} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Institution</Label>
                <Input defaultValue={user?.institution} />
              </div>
            </div>
            <Button size="sm" className="mt-4 text-xs">Save Changes</Button>
          </div>

          {/* Notification Settings */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive updates about interviews and exams via email</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">SMS Notifications</p>
                  <p className="text-xs text-muted-foreground">Get text alerts for upcoming deadlines</p>
                </div>
                <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Appearance</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-warning" />}
                <div>
                  <p className="text-sm font-medium text-foreground">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">Switch between light and dark theme</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={toggleTheme} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
