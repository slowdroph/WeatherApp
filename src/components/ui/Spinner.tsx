export default function Spinner() {
  return (
    <div className="flex items-center justify-center py-16" role="status" aria-label="Loading weather data">
      <div className="relative h-16 w-16">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border-[4px] border-transparent"
            style={{
              borderTopColor: "rgba(255,255,255,0.3)",
              borderRightColor: i === 0 ? "rgba(255,255,255,0.3)" : "transparent",
              animation: `ring-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
              animationDelay: `${-i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
