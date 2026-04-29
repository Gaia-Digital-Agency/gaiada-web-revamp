export default function Loading() {
  return (
    <div className="site-main pt-16">
      <div className="container py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-muted rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-2/3" />
                <div className="h-4 bg-muted rounded w-1/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
