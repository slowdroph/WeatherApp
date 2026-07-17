import { useState, useEffect } from "react"
import type { AstronomyResponse } from "../types/weather"

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const API_BASE = "https://api.weatherapi.com/v1/astronomy.json"

export function useAstronomy(query: string, date: string) {
  const [data, setData] = useState<AstronomyResponse["astronomy"]["astro"] | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query || !date) return

    const controller = new AbortController()
    setLoading(true)

    fetch(
      `${API_BASE}?key=${API_KEY}&q=${encodeURIComponent(query)}&dt=${date}`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((json: AstronomyResponse) => {
        setData(json.astronomy.astro)
        setLoading(false)
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [query, date])

  return { data, loading }
}
