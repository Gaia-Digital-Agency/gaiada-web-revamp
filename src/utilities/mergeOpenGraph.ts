import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

// Default OpenGraph metadata configuration
const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Gaia Digital Agency — Strategy, Design, and Technology for your brand.',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: 'Gaia Digital Agency',
  title: 'Gaia Digital Agency',
}

// Merges provided OpenGraph metadata with the default configuration
export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
