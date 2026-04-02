import { getPayload } from 'payload'
import config from '../src/payload.config'

const checkHeader = async () => {
  const payload = await getPayload({ config })
  const header = await payload.findGlobal({
    slug: 'header',
  })
  console.log(JSON.stringify(header.navItems, null, 2))
  process.exit(0)
}

checkHeader()
