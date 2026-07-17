import { useState } from "react"
import type { KeyboardEvent } from "react"
import { useAutocomplete } from "../../hooks/useAutocomplete"

interface SearchBarProps {
  onSearch: (city: string) => void
  loading: boolean
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const { results } = useAutocomplete(query)

  function handleSearch(value?: string) {
    const searchValue = value ?? query
    if (!searchValue.trim()) return
    onSearch(searchValue)
    setShowDropdown(false)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch()
    if (e.key === "Escape") setShowDropdown(false)
  }

  function handleSelect(name: string) {
    setQuery(name)
    handleSearch(name)
  }

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative flex items-center">
        <svg
          className="absolute left-3 h-4 w-4 text-white/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowDropdown(true)
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          placeholder="Search city..."
          spellCheck={false}
          disabled={loading}
          aria-label="Search for a city"
          aria-autocomplete="list"
          aria-expanded={showDropdown && results.length > 0}
          className="w-full rounded-xl border border-white/10 bg-white/10 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/25 focus:bg-white/15 disabled:opacity-50"
        />
      </div>

      {showDropdown && results.length > 0 && (
        <ul
          role="listbox"
          className="absolute top-full left-0 z-30 mt-1 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur-xl"
        >
          {results.slice(0, 5).map((result) => (
            <li
              key={result.id}
              role="option"
              onMouseDown={() => handleSelect(result.name)}
              className="cursor-pointer px-4 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <span className="font-medium">{result.name}</span>
              {result.region && (
                <span className="text-white/40">, {result.region}</span>
              )}
              <span className="text-white/40">, {result.country}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
