import { createLocalReq, getPayload } from 'payload'
import config from '../src/payload.config'
import { seedV2 } from '../src/endpoints/seed'

const run = async () => {
  const payload = await getPayload({ config })
  const req = await createLocalReq({}, payload)
  await seedV2({ payload, req })
  console.log('Seed complete.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
