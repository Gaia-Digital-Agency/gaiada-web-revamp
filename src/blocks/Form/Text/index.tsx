import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    control: Control
    contactMethod?: string
  }
> = ({ name, defaultValue, errors, label, required, width, control, contactMethod }) => {
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
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue || ''}
        rules={{
          required: required ? `${label} is required` : false,
          validate: (value) => {
            if (name === 'contact') {
              if (contactMethod === 'email') {
                const emailRegex = /^\S[^\s@]*@\S+$/
                return emailRegex.test(value) || 'Invalid email address'
              }
              if (contactMethod === 'whatsapp') {
                const whatsappRegex = /^\d+$/
                if (!whatsappRegex.test(value)) return 'WhatsApp number must contain only numbers'
                if (value.length < 9) return 'WhatsApp number must be at least 9 characters'
                if (value.length > 13) return 'WhatsApp number must be at most 13 characters'
              }
            }

            const isPhoneField =
              name?.toLowerCase().includes('phone') || label?.toLowerCase().includes('phone')
            if (isPhoneField && value) {
              const digitsOnly = value.replace(/\D/g, '')
              if (digitsOnly.length < 9) return 'Phone number must be at least 9 digits'
              if (digitsOnly.length > 15) return 'Phone number must be at most 15 digits'
            }
            return true
          },
        }}
        render={({ field }) => (
          <Input
            aria-describedby={errors[name] ? `error-${name}` : undefined}
            aria-invalid={!!errors[name]}
            id={name}
            type="text"
            {...field}
          />
        )}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
