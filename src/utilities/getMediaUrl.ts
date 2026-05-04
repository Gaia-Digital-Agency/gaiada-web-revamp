/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 *
 * Same-origin absolute URLs are rewritten to relative paths so Next.js
 * image optimization treats them as local and does not fetch through the
 * server-side image optimizer using `127.0.0.1`.
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  let finalUrl = url

  try {
    const parsedUrl = new URL(url, process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000')
    const serverUrl = new URL(
      process.env.NEXT_PUBLIC_SERVER_URL ||
        (process.env.VERCEL_PROJECT_PRODUCTION_URL
          ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
          : 'http://localhost:3000'),
    )

    if (parsedUrl.origin === serverUrl.origin || parsedUrl.hostname === 'localhost') {
      finalUrl = `${parsedUrl.pathname}${parsedUrl.search}`
    } else {
      finalUrl = parsedUrl.toString()
    }
  } catch {
    finalUrl = url
  }

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  return cacheTag ? `${finalUrl}?${cacheTag}` : finalUrl
}
