import { cn } from '@/utilities/ui'
import * as React from 'react'

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  type,
  ...props
}) => {
  return (
    <input
      data-slot="input"
      className={cn('w-full py-2 px-4 outline-none border-b border-[#78716C]', className)}
      type={type}
      {...props}
    />
  )
}

export { Input }
