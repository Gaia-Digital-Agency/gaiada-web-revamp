import { getPayload } from 'payload'
import config from '../src/payload.config'

const testQuery = async () => {
  const payload = await getPayload({ config })
  const result = await payload.findGlobal({
    slug: 'footer',
  })
  console.log(JSON.stringify(result, null, 2))
  process.exit(0)
}

testQuery()
