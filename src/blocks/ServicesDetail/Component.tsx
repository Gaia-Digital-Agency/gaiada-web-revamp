import React from 'react'
import { Media } from '@/components/Media'

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
  }> | null
}

export const ServicesDetailBlock: React.FC<ServicesDetailBlockType> = ({ intro, subServices }) => {
  if (!intro) return null

  return (
    <section className="bg-(--gda-brand-white) overflow-hidden">
      <div className="container py-16 md:py-24 pr-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          <div className="space-y-8 max-w-2xl">
            <div className="space-y-4 pl-[180px]">
              <h2 className="text-(--gda-brand-yellow)">{intro.title}</h2>
              <div>{intro.description}</div>
            </div>

            {/* {subServices && subServices.length > 0 && (
              <div className="space-y-6 pt-4">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary/80">
                  What we provide
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {subServices.map((sub, i) => (
                    <li key={i} className="flex items-center gap-4 group">
                      <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors flex-shrink-0" />
                      <span className="text-lg font-medium text-foreground/70 group-hover:text-foreground transition-colors leading-tight">
                        {sub.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>

          {intro.image && (
            <div className="flex justify-end w-full lg:w-[708px]">
              <div className="relative w-full max-w-[708px] aspect-[708/422] overflow-hidden group">
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
    </section>
  )
}
