import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

// Represents a valid global configuration name from Payload
type Global = keyof Config['globals']

// Retrieves a single global document by its slug
async function getGlobal(slug: Global, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  try {
    const global = await payload.findGlobal({
      slug,
      depth,
    })
    return global
  } catch {
    return null
  }
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (slug: Global, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })
