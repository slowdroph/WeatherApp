import type { ReactNode } from "react"

interface StatPillProps {
  icon: ReactNode
  label: string
  value: string
}

export default function StatPill({ icon, label, value }: StatPillProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
      <span className="text-lg">{icon}</span>
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-white/50">{label}</p>
        <p className="truncate text-sm font-semibold">{value}</p>
      </div>
    </div>
  )
}
