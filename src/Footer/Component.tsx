import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Mail, MapPin } from 'lucide-react'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as Footer | null
  const navItems = footerData?.navItems || []

  return (
    <footer className="footer">
      <div
        style={{
          backgroundImage:
            typeof footerData?.backgroundImage === 'object' && footerData.backgroundImage?.url
              ? `url(${footerData.backgroundImage.url})`
              : 'none',
          backgroundSize: '50% auto',
          backgroundPosition: 'left bottom',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container columns-2 grid grid-cols-1 md:grid-cols-2 gap-[12px] pt-16 pr-0">
          <div className="w-1/2 pt-16">
            <h2 className="pb-5">{footerData?.heading}</h2>
            <div className="flex flex-col gap-2">
              {footerData?.navItemsWithIcon?.map((item, i) => {
                const link = item.link

                return (
                  <a
                    key={i}
                    href={link.url}
                    target={link.newTab ? '_blank' : '_self'}
                    className="flex items-center gap-2 font-medium text-lg"
                  >
                    {link.icon === 'email' && <Mail strokeWidth={0.5} size={18} />}
                    {link.icon === 'map' && <MapPin strokeWidth={0.5} size={18} />}
                    {link.label}
                  </a>
                )
              })}
            </div>
          </div>
          <div className="form-wrapper py-16 h-96"></div>
        </div>
      </div>

      <div style={{ backdropFilter: 'blur(10px)' }}>
        <div className="container columns-2 grid grid-cols-1 md:grid-cols-2 gap-12 py-16">
          <div className="flex flex-row">
            {navItems.map((navItem) => (
              <CMSLink
                key={navItem.id}
                {...navItem.link}
                className="flex items-center gap-2 text-sm after:content-['|'] after:mx-2 last:after:content-['']"
              />
            ))}
          </div>
          <div className="flex flex-row justify-end gap-1">
            <p className="text-sm">{footerData?.copyright}</p>
            <p className="text-sm">{footerData?.developedBy}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
