import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Footer as FooterType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { FooterDesktop } from './FooterDesktop'
import { FooterMobile } from './FooterMobile'
import type { Setting as SettingsType } from '@/payload-types'
import './FooterStyle.css'

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
  const settingsData = (await getCachedGlobal('settings', 1)()) as SettingsType | null

  console.log(settingsData)
  const navItems = footerData?.navItems || []
  const form = await getForm(footerData?.formId || 1)

  const bgImage =
    footerData?.backgroundImage && typeof footerData.backgroundImage !== 'number'
      ? footerData.backgroundImage.url
      : null

  return (
    <footer className="footer">
      <div className="footer-desktop hidden md:block">
        <FooterDesktop footerData={footerData} form={form} bgImage={bgImage} />
      </div>
      <div className="footer-mobile md:hidden">
        <FooterMobile
          footerData={footerData}
          form={form}
          bgImage={bgImage}
          settingsData={settingsData}
        />
      </div>

      {/* BOTTOM */}
      <div style={{ backdropFilter: 'blur(10px)' }}>
        <div className="container footer-bottom grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 py-4 md:py-16">
          <div className="flex flex-row justify-center flex-wrap gap-4">
            {navItems.map((navItem) => (
              <CMSLink
                key={navItem.id}
                {...navItem.link}
                className="flex items-center gap-4 text-sm after:content-['|'] last:after:content-['']"
              />
            ))}
          </div>

          <div className="flex flex-row justify-center md:justify-end gap-1">
            <p className="text-sm">{footerData?.copyright}</p>
            <p className="text-sm">{footerData?.developedBy}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
