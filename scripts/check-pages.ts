import { getPayload } from 'payload'
import config from '../src/payload.config'

const checkPages = async () => {
  const payload = await getPayload({ config })
  const pages = await payload.find({
    collection: 'pages',
  })
  console.log(pages.docs.map(d => ({ title: d.title, slug: d.slug })))
  process.exit(0)
}

checkPages()
