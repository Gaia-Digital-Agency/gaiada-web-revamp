import React, { useId, useState } from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Error } from '../Error'
import { Width } from '../Width'

export const FileField: React.FC<{
  name: string
  label: string
  required?: boolean
  width?: number | string | null
  register: UseFormRegister<FieldValues>
  errors: Partial<FieldErrorsImpl<FieldValues>>
}> = ({ name, label, required, width, register, errors }) => {
  const inputId = useId()
  const [selectedFileName, setSelectedFileName] = useState('')
  const {
    onBlur,
    onChange,
    name: fieldName,
    ref,
  } = register(name, { required: required ? `${label} is required` : false })

  return (
    <Width width={width ?? undefined}>
      <Label htmlFor={inputId}>
        {label}
        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <div className="mt-2 flex flex-col gap-3">
        <input
          aria-describedby={errors[name] ? `error-${name}` : undefined}
          aria-invalid={!!errors[name]}
          accept=".pdf"
          className="sr-only"
          id={inputId}
          name={fieldName}
          onBlur={onBlur}
          onChange={(event) => {
            const fileName = event.target.files?.[0]?.name ?? ''
            setSelectedFileName(fileName)
            void onChange(event)
          }}
          ref={ref}
          type="file"
        />
        <div className="flex flex-wrap items-center gap-3">
          <Button
            aria-controls={inputId}
            aria-invalid={!!errors[name]}
            className={errors[name] ? 'border-red-500' : undefined}
            onClick={() => {
              document.getElementById(inputId)?.click()
            }}
            type="button"
            variant="outline"
          >
            Upload PDF
          </Button>
          <span className="text-sm text-[#57534E]">
            {selectedFileName || 'No file selected'}
          </span>
        </div>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
