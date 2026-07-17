import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  noPadding?: boolean
}

export default function GlassCard({ children, className = "", noPadding = false }: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl ${noPadding ? "" : "p-6"} ${className}`}
    >
      {children}
    </div>
  )
}
