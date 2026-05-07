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
  } catch {
    return null
  }
}

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as FooterType | null
  const settingsData = (await getCachedGlobal('settings', 1)()) as SettingsType | null

  const navItems = footerData?.navItems || []
  const form = await getForm(footerData?.formId || 1)

  const bgImage =
    footerData?.backgroundImage && typeof footerData.backgroundImage !== 'number'
      ? footerData.backgroundImage.url
      : null

  return (
    <footer className="footer h-auto lg:h-screen flex flex-col">
      <div className="footer-desktop hidden md:flex flex-grow w-full">
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
      <div style={{ backdropFilter: 'blur(10px)' }} className="shrink-0">
        <div className="container footer-bottom grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 py-4 md:py-16">
          <div className="flex flex-row flex-start justify-center md:justify-start flex-wrap gap-4">
            {navItems.map((navItem) => (
              <CMSLink
                key={navItem.id}
                {...navItem.link}
                className="flex items-center text-[var(--gda-brand-earth)] md:text-[var(--gda-brand-black)] underline gap-4 text-sm md:text-base after:content-['|'] last:after:content-[''] last:gap-0"
              />
            ))}
          </div>

          <div className="flex flex-row justify-center md:justify-end gap-1">
            <p className="text-sm md:text-base text-[var(--gda-brand-earth)] md:text-[var(--gda-brand-black)]">
              {footerData?.copyright}
            </p>
            <p className="text-sm md:text-base text-[var(--gda-brand-earth)] md:text-[var(--gda-brand-black)]">
              {footerData?.developedBy}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
