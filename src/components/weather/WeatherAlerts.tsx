import type { WeatherAlert } from "../../types/weather"
import GlassCard from "../ui/GlassCard"

interface WeatherAlertsProps {
  alerts: WeatherAlert[]
}

function getSeverityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case "extreme":
      return "border-red-500/50 bg-red-500/15 text-red-300"
    case "severe":
      return "border-orange-500/50 bg-orange-500/15 text-orange-300"
    case "moderate":
      return "border-yellow-500/50 bg-yellow-500/15 text-yellow-300"
    default:
      return "border-white/20 bg-white/10 text-white/70"
  }
}

export default function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  return (
    <div className="space-y-3">
      {alerts.map((alert, i) => (
        <GlassCard key={i} className={`border ${getSeverityColor(alert.severity)}`}>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-lg">⚠️</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{alert.event}</p>
              <p className="mt-1 text-xs text-white/50">{alert.headline}</p>
              {alert.instruction && (
                <p className="mt-2 text-xs text-white/40">{alert.instruction}</p>
              )}
              <div className="mt-2 flex items-center gap-3 text-[10px] text-white/30">
                <span>Severity: {alert.severity}</span>
                <span>Expires: {alert.expires}</span>
              </div>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  )
}
