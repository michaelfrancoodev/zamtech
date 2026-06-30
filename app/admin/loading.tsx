export default function AdminLoading() {
  return (
    <div className="flex-1 p-8 animate-pulse space-y-6" aria-hidden="true">
      <div className="h-8 w-48 bg-white/[0.06] rounded-lg" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 bg-white/[0.04] rounded-xl border border-white/[0.06]" />
        ))}
      </div>
      <div className="h-96 bg-white/[0.04] rounded-xl border border-white/[0.06]" />
    </div>
  )
}
