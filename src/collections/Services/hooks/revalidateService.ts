import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateService: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc.slug) {
      payload.logger.info(`Revalidating service at path: /services/${doc.slug}`)
      revalidatePath(`/services/${doc.slug}`, 'page')
      revalidateTag('services-list', 'max')
    }
  }
  return doc
}

export const revalidateServiceDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc.slug) {
      payload.logger.info(`Revalidating deleted service: /services/${doc.slug}`)
      revalidatePath(`/services/${doc.slug}`, 'page')
      revalidateTag('services-list', 'max')
    }
  }
  return doc
}
