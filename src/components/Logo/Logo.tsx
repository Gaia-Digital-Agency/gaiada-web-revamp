import clsx from 'clsx'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  src?: string | null
  alt?: string | null
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, src, alt } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <img
      alt={alt || 'Gaiada Logo'}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('object-contain', className)}
      src={src || '/gaia-logo.webp'}
    />
  )
}
