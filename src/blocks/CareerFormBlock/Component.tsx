import React from 'react'
import { FormBlock } from '../Form/Component'

export type CareerFormBlockType = {
  blockType: 'careerFormBlock'
  title?: string
  form: any
}

export const CareerFormBlock: React.FC<CareerFormBlockType> = ({ title, form }) => {
  return (
    <section className="bg-white">
      <div className="container py-12">
        {title && <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>}
        <div className="max-w-2xl mx-auto p-8">
          <FormBlock enableIntro={false} form={form} />
        </div>
      </div>
    </section>
  )
}
