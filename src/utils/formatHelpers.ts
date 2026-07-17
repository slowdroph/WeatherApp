export function getBackgroundGradient(isDay: boolean): string {
  if (isDay) {
    return "from-sky-400 via-blue-500 to-indigo-600"
  }
  return "from-slate-900 via-indigo-950 to-blue-950"
}

export function formatHour(timeStr: string): string {
  const date = new Date(timeStr.replace(" ", "T"))
  const now = new Date()
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    const diff = date.getTime() - now.getTime()
    if (Math.abs(diff) < 60 * 60 * 1000) return "Now"
  }
  return date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true })
}

export function formatDay(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00")
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = date.getTime() - today.getTime()
  const dayDiff = Math.round(diff / (1000 * 60 * 60 * 24))
  if (dayDiff === 0) return "Today"
  if (dayDiff === 1) return "Tomorrow"
  return date.toLocaleDateString("en-US", { weekday: "short" })
}

export function getUVLabel(uv: number): { text: string; color: string } {
  if (uv <= 2) return { text: "Low", color: "text-green-400" }
  if (uv <= 5) return { text: "Moderate", color: "text-yellow-400" }
  if (uv <= 7) return { text: "High", color: "text-orange-400" }
  if (uv <= 10) return { text: "Very High", color: "text-red-400" }
  return { text: "Extreme", color: "text-purple-400" }
}

export function getEPALabel(index: number): { text: string; color: string } {
  const labels: Record<number, { text: string; color: string }> = {
    1: { text: "Good", color: "text-green-400" },
    2: { text: "Moderate", color: "text-yellow-400" },
    3: { text: "Unhealthy for Sensitive", color: "text-orange-400" },
    4: { text: "Unhealthy", color: "text-red-400" },
    5: { text: "Very Unhealthy", color: "text-purple-400" },
    6: { text: "Hazardous", color: "text-red-600" },
  }
  return labels[index] ?? { text: "Unknown", color: "text-white/50" }
}

export function getWindDirection(deg: number): string {
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
  return dirs[Math.round(deg / 22.5) % 16]
}
