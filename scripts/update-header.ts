import { getPayload } from 'payload'
import config from '../src/payload.config'

const updateHeader = async () => {
  const payload = await getPayload({ config })
  
  const navItems = [
    { link: { type: 'custom', url: '/', label: 'Home' } },
    { link: { type: 'custom', url: '/services', label: 'Services' } },
    { link: { type: 'custom', url: '/portfolio', label: 'Portfolio' } },
    { link: { type: 'custom', url: '/about', label: 'About' } },
    { link: { type: 'custom', url: '/careers', label: 'Careers' } },
    { link: { type: 'custom', url: '/blog', label: 'Blog' } },
    { link: { type: 'custom', url: '/contact', label: 'Contact' } },
  ]

  await payload.updateGlobal({
    slug: 'header',
    context: { disableRevalidate: true },
    data: {
      navItems,
    },
  })
  
  console.log('Header updated successfully')
  process.exit(0)
}

updateHeader()
