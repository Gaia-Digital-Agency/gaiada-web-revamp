import { getPayload } from 'payload'
import config from '../src/payload.config'
import { toKebabCase } from '../src/utilities/toKebabCase'

const populateServiceSlugs = async () => {
  const payload = await getPayload({ config })
  const services = await payload.find({
    collection: 'services',
    limit: 100,
  })

  for (const service of services.docs) {
    if (!service.slug) {
      await payload.update({
        collection: 'services',
        id: service.id,
        data: {
          slug: toKebabCase(service.title),
        },
      })
      console.log(`Updated service ${service.title} with slug ${toKebabCase(service.title)}`)
    }
  }

  process.exit(0)
}

populateServiceSlugs()
