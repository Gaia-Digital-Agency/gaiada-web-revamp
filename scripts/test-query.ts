import { getPayload } from 'payload'
import config from '../src/payload.config'

const testQuery = async () => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'services',
    limit: 1,
    where: {
      slug: {
        equals: 'branding',
      },
    },
  })
  console.log(JSON.stringify(result.docs, null, 2))
  process.exit(0)
}

testQuery()
