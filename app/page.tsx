"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"

export default function Home() {
  const { state } = useAppStore()
  const router = useRouter()

  useEffect(() => {
    if (!state.hydrated) return
    if (state.isAuthenticated && state.user) {
      router.replace(`/${state.user.role}/dashboard`)
    } else {
      router.replace("/login")
    }
  }, [state.hydrated, state.isAuthenticated, state.user, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}
