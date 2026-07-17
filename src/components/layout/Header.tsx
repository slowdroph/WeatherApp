import type { Unit } from "../../hooks/useSettings"
import SearchBar from "./SearchBar"

interface HeaderProps {
  unit: Unit
  onToggleUnit: () => void
  onSearch: (city: string) => void
  loading: boolean
  cityName?: string
  country?: string
}

export default function Header({ unit, onToggleUnit, onSearch, loading, cityName, country }: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
        {cityName && (
          <div className="hidden sm:block">
            <p className="text-sm font-medium">{cityName}</p>
            <p className="text-xs text-white/40">{country}</p>
          </div>
        )}
      </div>

      <SearchBar onSearch={onSearch} loading={loading} />

      <button
        onClick={onToggleUnit}
        className="flex h-8 shrink-0 items-center rounded-lg border border-white/15 bg-white/10 px-3 text-xs font-medium text-white/70 transition-colors hover:bg-white/20 hover:text-white"
        aria-label={`Switch to ${unit === "metric" ? "Fahrenheit" : "Celsius"}`}
      >
        °{unit === "metric" ? "C" : "F"}
      </button>
    </header>
  )
}
