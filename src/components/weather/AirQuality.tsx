import type { AirQuality as AirQualityType } from "../../types/weather"
import GlassCard from "../ui/GlassCard"
import { getEPALabel } from "../../utils/formatHelpers"

interface AirQualityProps {
  airQuality: AirQualityType
}

export default function AirQuality({ airQuality }: AirQualityProps) {
  const epaIndex = airQuality["us-epa-index"]
  const epaInfo = getEPALabel(epaIndex)

  return (
    <GlassCard>
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
        Air Quality
      </p>

      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-light ${epaInfo.color}`}>{epaIndex}</span>
          <span className={`text-sm font-medium ${epaInfo.color}`}>{epaInfo.text}</span>
        </div>
        <p className="mt-1 text-xs text-white/40">US EPA Index</p>
      </div>

      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 transition-all duration-500"
          style={{ width: `${(epaIndex / 6) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <PollutantCell label="PM2.5" value={airQuality.pm2_5} unit="µg/m³" />
        <PollutantCell label="PM10" value={airQuality.pm10} unit="µg/m³" />
        <PollutantCell label="O₃" value={airQuality.o3} unit="µg/m³" />
        <PollutantCell label="NO₂" value={airQuality.no2} unit="µg/m³" />
        <PollutantCell label="SO₂" value={airQuality.so2} unit="µg/m³" />
        <PollutantCell label="CO" value={airQuality.co} unit="µg/m³" />
      </div>
    </GlassCard>
  )
}

function PollutantCell({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="rounded-lg bg-white/5 px-3 py-2">
      <p className="text-[10px] font-medium text-white/40">{label}</p>
      <p className="text-sm font-semibold">{value.toFixed(1)}</p>
      <p className="text-[10px] text-white/30">{unit}</p>
    </div>
  )
}
