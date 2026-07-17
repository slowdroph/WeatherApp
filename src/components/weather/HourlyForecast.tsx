import type { HourlyForecast } from "../../types/weather"
import type { Unit } from "../../hooks/useSettings"
import GlassCard from "../ui/GlassCard"
import { formatHour } from "../../utils/formatHelpers"

interface HourlyForecastProps {
  hours: HourlyForecast[]
  unit: Unit
}

export default function HourlyForecast({ hours, unit }: HourlyForecastProps) {
  const now = new Date()
  const currentHour = now.getHours()

  const upcoming = hours.filter((h) => {
    const hour = new Date(h.time.replace(" ", "T")).getHours()
    return hour >= currentHour
  })

  const displayHours = upcoming.length > 0 ? upcoming : hours.slice(0, 12)

  return (
    <GlassCard>
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
        Hourly Forecast
      </p>
      <div className="flex gap-1 overflow-x-auto">
        {displayHours.slice(0, 12).map((h, i) => {
          const temp = unit === "metric" ? h.temp_c : h.temp_f
          return (
            <div
              key={i}
              className="flex flex-col items-center gap-2 rounded-xl px-3 py-3 transition-colors hover:bg-white/5 min-w-[64px]"
            >
              <p className="text-xs font-medium text-white/50">
                {formatHour(h.time)}
              </p>
              <img
                src={h.condition.icon}
                alt={h.condition.text}
                className="h-7 w-7"
              />
              <p className="text-sm font-semibold">{Math.round(temp)}°</p>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}
