"use client"

import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from "react"
import type { User, UserRole, Notification } from "./types"
import { mockUsers, mockNotifications } from "./mock-data"

interface AppState {
  user: User | null
  isAuthenticated: boolean
  sidebarCollapsed: boolean
  notifications: Notification[]
  hydrated: boolean
}

type AppAction =
  | { type: "LOGIN"; payload: UserRole }
  | { type: "LOGOUT" }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
  | { type: "MARK_ALL_NOTIFICATIONS_READ" }
  | { type: "HYDRATE"; payload: { role: UserRole } }
  | { type: "HYDRATE_ONLY" }

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  sidebarCollapsed: false,
  notifications: mockNotifications,
  hydrated: false,
}

function persistRole(role: UserRole | null) {
  try {
    if (role) {
      localStorage.setItem("proctorai_role", role)
    } else {
      localStorage.removeItem("proctorai_role")
    }
  } catch { }
}

function getPersistedRole(): UserRole | null {
  try {
    const role = localStorage.getItem("proctorai_role")
    if (role === "candidate" || role === "institution" || role === "admin") return role
  } catch { }
  return null
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "LOGIN": {
      persistRole(action.payload)
      return {
        ...state,
        user: mockUsers[action.payload],
        isAuthenticated: true,
        hydrated: true,
      }
    }
    case "LOGOUT": {
      persistRole(null)
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }
    }
    case "HYDRATE": {
      return {
        ...state,
        user: mockUsers[action.payload.role],
        isAuthenticated: true,
        hydrated: true,
      }
    }
    case "HYDRATE_ONLY":
      return {
        ...state,
        hydrated: true,
      }
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      }
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      }
    case "MARK_ALL_NOTIFICATIONS_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    const role = getPersistedRole()
    if (role) {
      dispatch({ type: "HYDRATE", payload: { role } })
    } else {
      // No persisted role - just mark as hydrated without logging in
      dispatch({ type: "HYDRATE_ONLY" })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppStore() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useAppStore must be used within AppProvider")
  return context
}
