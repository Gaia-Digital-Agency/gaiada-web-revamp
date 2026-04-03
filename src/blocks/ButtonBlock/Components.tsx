'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import { AppButton } from '@/components/common/AppButton'

type ButtonField = {
  label: string
  url: string
  variant?: 'default' | 'link'
  icon?: 'none' | 'arrow' | 'search'
  iconPosition?: 'left' | 'right'
  newTab?: boolean
}

type Column = {
  size?: 'full' | 'half' | 'oneThird' | 'twoThirds'
  buttons?: ButtonField[]
}

export type ButtonBlockProps = {
  columns?: Column[]
}

const colClasses = {
  full: 'lg:col-span-12',
  half: 'lg:col-span-6',
  oneThird: 'lg:col-span-4',
  twoThirds: 'lg:col-span-8',
}

export const ButtonBlock: React.FC<ButtonBlockProps> = ({ columns = [] }) => {
  return (
    <div className="container">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns.map((col, index) => {
          const { size = 'full', buttons = [] } = col

          return (
            <div
              key={index}
              className={cn('col-span-4', colClasses[size], {
                'md:col-span-2': size !== 'full',
              })}
            >
              <div className="flex flex-wrap gap-4">
                {buttons.map((btn, i) => {
                  if (!btn?.label || !btn?.url) return null

                  return (
                    <AppButton
                      key={i}
                      label={btn.label}
                      href={btn.url}
                      variant={btn.variant}
                      newTab={btn.newTab}
                      icon={btn.icon}
                      iconPosition={btn.iconPosition}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
