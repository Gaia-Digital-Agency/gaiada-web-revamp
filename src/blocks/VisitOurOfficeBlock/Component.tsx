import React from 'react'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

type Props = {
  title?: string
  richText?: any
}

export const VisitOurOfficeBlock: React.FC<Props> = ({ title, richText }) => {
  return (
    <section className="bg-white py-32">
      <div className="container">
        <div className="grid grid-cols-1 gap-2">
          {title && <h2 className="heading-2 text-center">{title}</h2>}
          {richText && (
            <RichText
              data={richText}
              enableGutter={false}
              className="text-center max-w-2xl mx-auto"
            />
          )}
        </div>
      </div>
    </section>
  )
}
