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
  const isPhoneField =
    name?.toLowerCase().includes('phone') || label?.toLowerCase().includes('phone')

  const validationRules: any = {
    required: required ? `${label} is required` : false,
  }

  if (isPhoneField) {
    validationRules.minLength = {
      value: 9,
      message: 'Phone number must be at least 9 digits',
    }
    validationRules.maxLength = {
      value: 15,
      message: 'Phone number must be at most 15 digits',
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
