import { CMSLink } from '@/components/Link'
import { Mail, MapPin } from 'lucide-react'
import { FormBlock } from '@/blocks/Form/Component'
import type { Footer as FooterType } from '@/payload-types'

export const FooterDesktop = ({
  footerData,
  form,
  bgImage,
}: {
  footerData: FooterType | null
  form: any
  bgImage: string | null | undefined
}) => {
  return (
    <div
      className="w-full grid grid-cols-2 pt-20"
      style={{
        backgroundColor: '#F9F9F9',
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundSize: 'contain',
        backgroundPosition: 'left bottom',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="flex justify-end items-start py-20">
        <div className="w-full px-14 lg:max-w-xl py-8">
          <h2 className="heading-1 max-w-md">{footerData?.heading}</h2>
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

      <div className="bg-[#C6C6C633] backdrop-blur-[12px] flex items-center justify-start py-20 px-16 lg:px-24">
        <div className="w-full max-w-md">
          {form && <FormBlock form={form} enableIntro={false} />}
        </div>
      </div>
    </div>
  )
}
