import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Number: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  const isPhoneField = label?.toLowerCase().includes('phone')

  const validationRules: any = {
    required,
  }

  if (isPhoneField) {
    validationRules.minLength = {
      value: 9,
      message: 'Minimum length is 9 digits',
    }
    validationRules.maxLength = {
      value: 13,
      message: 'Maximum length is 13 digits',
    }
  }

  return (
    <Width width={width}>
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Input
        aria-describedby={errors[name] ? `error-${name}` : undefined}
        aria-invalid={!!errors[name]}
        defaultValue={defaultValue || ''}
        id={name}
        type="number"
        {...register(name, validationRules)}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
