import { useState, useEffect } from "react"

interface GeolocationState {
  lat: number | null
  lon: number | null
  loading: boolean
  error: string | null
}

export function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    lat: null,
    lon: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ lat: null, lon: null, loading: false, error: "Geolocation not supported" })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          loading: false,
          error: null,
        })
      },
      () => {
        setState({ lat: null, lon: null, loading: false, error: null })
      },
      { timeout: 5000 }
    )
  }, [])

  return state
}
