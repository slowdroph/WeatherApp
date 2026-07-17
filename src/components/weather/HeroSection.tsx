import type { WeatherApiResponse } from "../../types/weather"
import type { Unit } from "../../hooks/useSettings"

interface HeroSectionProps {
  data: WeatherApiResponse
  unit: Unit
}

export default function HeroSection({ data, unit }: HeroSectionProps) {
  const temp = unit === "metric" ? data.current.temp_c : data.current.temp_f
  const feelsLike = unit === "metric" ? data.current.feelslike_c : data.current.feelslike_f
  const today = data.forecast.forecastday[0]
  const max = today ? (unit === "metric" ? today.day.maxtemp_c : today.day.maxtemp_f) : null
  const min = today ? (unit === "metric" ? today.day.mintemp_c : today.day.mintemp_f) : null

  return (
    <section className="flex flex-col items-center py-6 text-center animate-fade-in-up">
      <img
        src={data.current.condition.icon}
        alt={data.current.condition.text}
        className="mb-2 h-20 w-20 sm:h-24 sm:w-24"
      />

      <p className="text-7xl font-light tracking-tight sm:text-8xl">
        {Math.round(temp)}°
      </p>

      <p className="mt-2 text-lg font-medium text-white/80">
        {data.current.condition.text}
      </p>

      <div className="mt-2 flex items-center gap-3 text-sm text-white/50">
        <span>Feels like {Math.round(feelsLike)}°</span>
        {max !== null && min !== null && (
          <>
            <span className="text-white/20">·</span>
            <span>H:{Math.round(max)}°</span>
            <span>L:{Math.round(min)}°</span>
          </>
        )}
      </div>
    </section>
  )
}
