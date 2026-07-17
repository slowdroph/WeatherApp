import { useState, useEffect, useRef } from "react"

export interface SearchResult {
  id: number
  name: string
  region: string
  country: string
}

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const API_BASE = "https://api.weatherapi.com/v1/search.json"
const DEBOUNCE_MS = 300
const MIN_CHARS = 2

export function useAutocomplete(query: string) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (query.trim().length < MIN_CHARS) {
      setResults([])
      return
    }

    timerRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${API_BASE}?key=${API_KEY}&q=${encodeURIComponent(query.trim())}`
        )
        const data: SearchResult[] = await response.json()
        setResults(data)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, DEBOUNCE_MS)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query])

  return { results, loading }
}
