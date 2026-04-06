import { cn } from '@/utilities/ui'
import * as React from 'react'

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn('w-full py-2 px-0 outline-none border-b border-[#78716C]', className)}
      {...props}
    />
  )
}

export { Textarea }
