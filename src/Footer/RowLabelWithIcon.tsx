'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<NonNullable<Footer['navItemsWithIcon']>[number]>()

  if (!data) return <div>Row</div>

  const label = data?.link?.label
    ? `Nav item ${rowNumber !== undefined ? rowNumber + 1 : ''}: ${data?.link?.label}`
    : 'Row'

  return <div>{label}</div>
}
