import type { Metadata } from 'next'

import type { Media, Page, Post, Config, Setting } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { getCachedGlobal } from './getGlobals'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

// Generates metadata for a document, including title, description, and OpenGraph tags
export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args
  const settings = (await getCachedGlobal('settings', 1)()) as Setting | null
  const siteTitle = settings?.siteTitle || 'Gaiada Digital Agency'

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title ? doc.meta.title : siteTitle

  return {
    description: doc?.meta?.description || settings?.tagline,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || settings?.tagline || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
