import { Mail, MapPin } from 'lucide-react'
import Image from 'next/image'
import { FormBlock } from '@/blocks/Form/Component'
import type { Footer as FooterType } from '@/payload-types'
import type { Setting as SettingsType } from '@/payload-types'

export const FooterMobile = ({
  footerData,
  form,
  bgImage,
  settingsData,
}: {
  footerData: FooterType | null
  form: any
  bgImage: string | null | undefined
  settingsData: SettingsType | null
}) => {
  const logoUrl =
    typeof settingsData?.logo === 'object' && settingsData?.logo?.url ? settingsData.logo.url : ''

  return (
    <div className="container py-10 pb-2 !px-0">
      <div className="heading-wrapper flex flex-col px-4">
        <h2 className="heading-2">{footerData?.heading}</h2>
      </div>
      <div
        className="form-wrapper flex flex-col px-4"
        style={
          footerData?.backgroundImageMobile && typeof footerData.backgroundImageMobile !== 'number'
            ? { backgroundImage: `url(${footerData?.backgroundImageMobile?.url})` }
            : {}
        }
      >
        {form && <FormBlock form={form} enableIntro={false} />}
      </div>
      <div className="contact-wrapper flex flex-row items-center justify-center gap-2 mt-8 px-4">
        {footerData?.navItemsWithIcon?.map((item, i) => {
          const link = item.link
          return (
            <a
              key={i}
              href={link.url}
              target={link.newTab ? '_blank' : '_self'}
              className="flex text-(--gda-brand-earth)! items-center gap-1 text-sm hover:opacity-70 transition-opacity"
            >
              {link.icon === 'email' && <Mail strokeWidth={1.5} size={25} />}
              {link.icon === 'map' && <MapPin strokeWidth={1.5} size={25} />}
              {link.label}
            </a>
          )
        })}
      </div>
      <div className="flex flex-col items-center justify-center mt-12">
        {logoUrl && (
          <a href="/">
            <Image src={logoUrl} alt="Gaia Digital Agency" width={120} height={40} />
          </a>
        )}
      </div>
    </div>
  )
}
