import { useState, useCallback } from "react"

export type Unit = "metric" | "imperial"

interface UseSettingsReturn {
  unit: Unit
  toggleUnit: () => void
}

const STORAGE_KEY = "weather-app-unit"

function getStoredUnit(): Unit {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "metric" || stored === "imperial") return stored
  } catch {
    // localStorage unavailable
  }
  return "metric"
}

export function useSettings(): UseSettingsReturn {
  const [unit, setUnit] = useState<Unit>(getStoredUnit)

  const toggleUnit = useCallback(() => {
    setUnit((prev) => {
      const next = prev === "metric" ? "imperial" : "metric"
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // localStorage unavailable
      }
      return next
    })
  }, [])

  return { unit, toggleUnit }
}
