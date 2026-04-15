import React from 'react'
import { Media } from '@/components/Media'
import { ChevronDown, ChevronUp } from 'lucide-react'
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
            className={`relative w-full h-[400px] group overflow-hidden cursor-pointer ${isOdd ? 'md:mt-0 mt-0' : 'md:mt-20 mt-0'}`}
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

            <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center">
              <h3 className="text-(--gda-brand-white) text-center transition-transform duration-500 group-hover:-translate-y-2">
                {service.title}
              </h3>

              <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                <p className="text-(--gda-brand-white) text-center px-4 mt-2">
                  {service.description}
                </p>
              </div>

              <div className="mt-4">
                <ChevronDown
                  className="text-(--gda-brand-white) transition-transform duration-500 group-hover:rotate-180"
                  size={40}
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
          <div className="py-8 md:py-5 md:pr-0 px-4 md:px-0">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-center">
              <div className="space-y-8 max-w-2xl">
                <div className="space-y-4 md:pl-[180px] pl-0">
                  <h2 className="text-(--gda-brand-yellow)">{intro.title}</h2>
                  <div>{intro.description}</div>
                </div>
              </div>

              {intro.image && (
                <div className="flex justify-end w-full lg:w-[708px]">
                  <div className="relative w-full max-w-[708px] aspect-video overflow-hidden group">
                    <Media
                      resource={intro.image}
                      fill
                      imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div id="sub-services" className="pt-0 md:pt-16 pb-[40px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 px-4 md:px-20 items-center">
              <SubServiceList subServices={subServices} />
            </div>
            <div className="flex justify-center mt-8 md:mt-12 px-4 md:px-0">
              <AppButton
                // href={`/portfolio/#${parentSlug || ''}`}
                // aku ingin href nya /portfolio/#(slug)}
                href={`/portfolio/${'#' + parentSlug || ''}`}
                label="See Our Portfolio"
                icon="arrow"
                variant="default"
                iconPosition="right"
                // ketika di layar mobile tombol full screen
                className="w-full md:w-fit"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
