export default function PageLoading() {
  return (
    <div className="min-h-screen bg-background animate-pulse" aria-hidden="true">
      {/* Hero skeleton */}
      <div className="bg-[#0A1628] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-5">
          <div className="h-3 w-24 bg-white/10 rounded-full" />
          <div className="h-10 w-2/3 bg-white/10 rounded-xl" />
          <div className="h-5 w-1/2 bg-white/[0.06] rounded-xl" />
        </div>
      </div>
      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 bg-muted rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
