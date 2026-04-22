import type { CollectionAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidatePostOrdering: CollectionAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating post ordering`)

    revalidatePath('/posts')
    revalidatePath('/') // Revalidate homepage for ListingPostBlock/FeaturedBlogBlock
  }

  return doc
}
