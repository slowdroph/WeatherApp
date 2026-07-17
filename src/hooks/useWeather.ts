import { useState, useCallback, useRef } from "react"
import type { WeatherApiResponse, UseWeatherReturn } from "../types/weather"

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const API_BASE = "https://api.weatherapi.com/v1/forecast.json"

export function useWeather(): UseWeatherReturn {
  const [state, setState] = useState<{
    data: WeatherApiResponse | null
    loading: boolean
    error: string | null
  }>({
    data: null,
    loading: false,
    error: null,
  })

  const controllerRef = useRef<AbortController | null>(null)

  const searchWeather = useCallback(async (city: string) => {
    const trimmed = city.trim()
    if (!trimmed) {
      setState((prev) => ({ ...prev, error: "Please enter a city name" }))
      return
    }

    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    setState({ data: null, loading: true, error: null })

    try {
      const response = await fetch(
        `${API_BASE}?key=${API_KEY}&q=${encodeURIComponent(trimmed)}&days=3&aqi=yes&alerts=yes`,
        { signal: controller.signal }
      )

      const json: WeatherApiResponse = await response.json()

      if (!response.ok) {
        const errorMsg =
          "error" in json
            ? (json as { error: { message: string } }).error.message
            : "City not found"
        setState({ data: null, loading: false, error: errorMsg })
        return
      }

      setState({ data: json, loading: false, error: null })
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return
      setState({
        data: null,
        loading: false,
        error: "Failed to fetch weather data. Check your connection.",
      })
    }
  }, [])

  return { ...state, searchWeather }
}
