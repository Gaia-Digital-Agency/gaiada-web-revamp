export default function Loading() {
  return (
    <div className="site-main pt-16">
      <div className="container py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-muted rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3 p-6 border border-border rounded">
                <div className="h-6 bg-muted rounded w-1/2" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
