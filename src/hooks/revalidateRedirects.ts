import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

// Payload hook that triggers Next.js cache revalidation for redirects after any change
export const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`)

  revalidateTag('redirects', 'max')

  return doc
}
