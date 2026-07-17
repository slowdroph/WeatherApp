import type { ForecastDay } from "../../types/weather"
import type { Unit } from "../../hooks/useSettings"
import GlassCard from "../ui/GlassCard"
import { formatDay } from "../../utils/formatHelpers"

interface DailyForecastProps {
  forecast: ForecastDay[]
  unit: Unit
}

export default function DailyForecast({ forecast, unit }: DailyForecastProps) {
  return (
    <GlassCard>
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
        3-Day Forecast
      </p>
      <div className="space-y-1">
        {forecast.map((day) => {
          const max = unit === "metric" ? day.day.maxtemp_c : day.day.maxtemp_f
          const min = unit === "metric" ? day.day.mintemp_c : day.day.mintemp_f
          const chanceOfRain = day.day.daily_chance_of_rain

          return (
            <div
              key={day.date}
              className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/5"
            >
              <p className="w-20 text-sm font-medium text-white/70">
                {formatDay(day.date)}
              </p>

              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="h-7 w-7 shrink-0"
              />

              <div className="flex items-center gap-1 text-xs text-white/40">
                {chanceOfRain > 0 && (
                  <span className="text-blue-300">{chanceOfRain}%</span>
                )}
              </div>

              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm font-semibold">{Math.round(max)}°</span>
                <div className="h-1 w-16 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-400 to-orange-400"
                    style={{
                      width: `${Math.max(((max - min) / 30) * 100, 20)}%`,
                      marginLeft: `${((min + 5) / 45) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-white/40">{Math.round(min)}°</span>
              </div>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}
