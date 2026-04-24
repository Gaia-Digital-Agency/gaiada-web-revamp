import React from 'react'
import { Media } from '@/components/Media'
import { ChevronDown } from 'lucide-react'
import { AppButton } from '@/components/common/AppButton'

export type ServicesDetailBlockType = {
  blockType: 'servicesDetail'
  intro: {
    title: string
    description: string
    image: any
  }
  subServices?: Array<{
    title: string
    id?: string | null
    image: any
    description: string
  }> | null
  parentSlug?: string
}

export default function SubServiceList({
  subServices,
}: {
  subServices: ServicesDetailBlockType['subServices']
}) {
  if (subServices?.length === 0) return null
  return (
    <>
      {subServices?.map((service, index) => {
        const isOdd = index % 2 !== 0 // index 0 = genap, index 1 = ganjil, dst

        return (
          <div
            key={service.id}
            className={`relative w-full h-[350px] md:h-[400px] group overflow-hidden cursor-pointer transition-all duration-500 ${
              !isOdd ? 'mt-0' : 'md:mt-20 mt-0'
            }`}
          >
            <Media
              resource={service.image}
              fill
              imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Base Overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
              style={{
                background: `linear-gradient(180deg, rgba(26, 26, 27, 0) -25%, rgba(26, 26, 27, 0.6) 100%)`,
              }}
            />
            {/* Hover Overlay */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `
                  linear-gradient(180deg,rgba(26, 26, 27, 0.5) 0%, rgba(255, 194, 44, 1) 100%),
                  linear-gradient(180deg, rgba(255, 194, 44, 0) -9.62%, #FFC22C 100%)
                `,
              }}
            />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col items-center">
              <h3 className="text-(--gda-brand-white) text-center text-xl md:text-2xl transition-transform duration-500 group-hover:-translate-y-2">
                {service.title}
              </h3>

              <div
                className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-56 group-hover:opacity-100 group-hover:overflow-y-auto transition-all duration-500 ease-in-out"
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}
              >
                <p className="text-(--gda-brand-white) text-center px-4 mt-2 text-sm md:text-base">
                  {service.description}
                </p>
              </div>

              <div className="mt-4">
                <ChevronDown
                  className="text-(--gda-brand-white) transition-transform duration-500 group-hover:rotate-180"
                  size={36}
                />
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export const ServicesDetailBlock: React.FC<ServicesDetailBlockType> = ({
  intro,
  subServices,
  parentSlug,
}) => {
  if (!intro) return null

  return (
    <section>
      <div className="bg-background w-full">
        <div className="px-0 mx-auto max-w-7xl overflow-hidden">
          <div className="py-12 md:py-20 px-4 md:px-6 lg:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="space-y-6 md:space-y-8 max-w-2xl order-2 lg:order-1 text-center lg:text-left mx-auto lg:mx-0">
                <div className="space-y-4 lg:pl-[120px] xl:pl-[100px]">
                  <h2 className="text-(--gda-brand-yellow) text-3xl md:text-4xl lg:text-5xl font-bold">
                    {intro.title}
                  </h2>
                  <div className="text-base md:text-lg leading-relaxed">{intro.description}</div>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end w-full order-1 lg:order-2">
                <div className="relative w-full max-w-[708px] aspect-[4/3] md:aspect-video overflow-hidden group">
                  <Media
                    resource={intro.image}
                    fill
                    imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>

          <div id="sub-services" className="pt-0 md:pt-16 pb-16 md:pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12 px-4 md:px-12 lg:px-20 items-start">
              <SubServiceList subServices={subServices} />
            </div>
            <div className="flex justify-center mt-12 md:mt-20 px-4 md:px-0">
              <AppButton
                href={`/portfolio/${parentSlug ? `#${parentSlug}` : ''}`}
                label="See Our Portfolio"
                icon="arrow"
                variant="default"
                iconPosition="right"
                className="w-full md:w-fit min-w-[220px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
