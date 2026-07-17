import type { WeatherApiResponse } from "../../types/weather"
import type { Unit } from "../../hooks/useSettings"
import GlassCard from "../ui/GlassCard"
import { getUVLabel } from "../../utils/formatHelpers"

interface WeatherDetailsProps {
  data: WeatherApiResponse
  unit: Unit
}

export default function WeatherDetails({ data, unit }: WeatherDetailsProps) {
  const c = data.current
  const windSpeed = unit === "metric" ? `${Math.round(c.wind_kph)} km/h` : `${Math.round(c.wind_mph)} mph`
  const visibility = unit === "metric" ? `${Math.round(c.vis_km)} km` : `${Math.round(c.vis_km * 0.621371)} mi`
  const uvInfo = getUVLabel(c.uv)

  return (
    <GlassCard className="!p-0">
      <div className="p-6 pb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
          Weather Details
        </p>
      </div>
      <div className="grid grid-cols-2 gap-px bg-white/5 sm:grid-cols-3">
        <DetailCell
          label="Wind"
          value={windSpeed}
          sub={`${c.wind_dir} ${Math.round(c.wind_degree)}°`}
        />
        <DetailCell
          label="Humidity"
          value={`${c.humidity}%`}
          sub={`Dew point ${Math.round(unit === "metric" ? c.feelslike_c : c.feelslike_f)}°`}
        />
        <DetailCell
          label="UV Index"
          value={`${c.uv}`}
          sub={uvInfo.text}
          subColor={uvInfo.color}
        />
        <DetailCell
          label="Visibility"
          value={visibility}
          sub={c.vis_km > 10 ? "Clear" : "Reduced"}
        />
        <DetailCell
          label="Pressure"
          value={`${Math.round(c.pressure_mb)} mb`}
          sub={c.pressure_mb > 1013 ? "High" : "Low"}
        />
        <DetailCell
          label="Cloud Cover"
          value={`${c.cloud}%`}
          sub={`${Math.round(c.gust_kph)} km/h gusts`}
        />
      </div>
    </GlassCard>
  )
}

function DetailCell({
  label,
  value,
  sub,
  subColor = "text-white/40",
}: {
  label: string
  value: string
  sub: string
  subColor?: string
}) {
  return (
    <div className="flex flex-col gap-1 bg-white/5 p-4">
      <p className="text-xs font-medium text-white/40">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
      <p className={`text-xs ${subColor}`}>{sub}</p>
    </div>
  )
}
