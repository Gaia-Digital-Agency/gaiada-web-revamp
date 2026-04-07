import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Footer as FooterType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Mail, MapPin } from 'lucide-react'
import { FormBlock } from '@/blocks/Form/Component'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function getForm(formId: number) {
  const payload = await getPayload({ config: configPromise })

  try {
    const form = await payload.findByID({
      collection: 'forms',
      id: formId,
    })

    return form
  } catch (error) {
    console.error('Error fetching form:', error)
    return null
  }
}

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as FooterType | null
  const navItems = footerData?.navItems || []
  const form = await getForm(footerData?.formId || 1)

  const bgImage =
    footerData?.backgroundImage && typeof footerData.backgroundImage !== 'number'
      ? footerData.backgroundImage.url
      : null

  return (
    <footer className="footer">
      <div
        className="w-full grid grid-cols-1 md:grid-cols-2 pt-20"
        style={{
          backgroundColor: '#F9F9F9',
          backgroundImage: bgImage ? `url(${bgImage})` : 'none',
          backgroundSize: '50% 100%',
          backgroundPosition: 'left bottom',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex justify-end items-start py-20">
          <div className="w-full px-4 lg:max-w-2xl py-8">
            <h2 className="w-full md:w-1/2">{footerData?.heading}</h2>
            <div className="flex flex-col gap-4 mt-8">
              {footerData?.navItemsWithIcon?.map((item, i) => {
                const link = item.link
                return (
                  <a
                    key={i}
                    href={link.url}
                    target={link.newTab ? '_blank' : '_self'}
                    className="flex items-center gap-4 text-lg font-medium hover:opacity-70 transition-opacity"
                  >
                    {link.icon === 'email' && <Mail strokeWidth={1.5} size={20} />}
                    {link.icon === 'map' && <MapPin strokeWidth={1.5} size={20} />}
                    {link.label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="bg-[#F2F2F2] flex items-center justify-start py-20 px-8 md:px-16 lg:px-24">
          <div className="w-full max-w-md">
            {form && <FormBlock form={form as any} enableIntro={false} />}
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div style={{ backdropFilter: 'blur(10px)' }}>
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 py-16">
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
