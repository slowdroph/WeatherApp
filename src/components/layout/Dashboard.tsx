import type { ReactNode } from "react"

interface DashboardProps {
  children: ReactNode
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <main className="mx-auto w-full max-w-2xl space-y-4 px-4 pb-8 sm:px-6">
      {children}
    </main>
  )
}
