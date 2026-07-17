export default function Skeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero skeleton */}
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="h-20 w-20 rounded-full bg-white/10" />
        <div className="h-16 w-40 rounded-lg bg-white/10" />
        <div className="h-5 w-24 rounded bg-white/5" />
        <div className="h-4 w-32 rounded bg-white/5" />
      </div>

      {/* Hourly skeleton */}
      <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
        <div className="mb-4 h-4 w-32 rounded bg-white/10" />
        <div className="flex gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="h-3 w-10 rounded bg-white/5" />
              <div className="h-8 w-8 rounded bg-white/10" />
              <div className="h-4 w-8 rounded bg-white/5" />
            </div>
          ))}
        </div>
      </div>

      {/* Details skeleton */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <div className="mb-2 h-3 w-16 rounded bg-white/5" />
            <div className="h-5 w-20 rounded bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  )
}
