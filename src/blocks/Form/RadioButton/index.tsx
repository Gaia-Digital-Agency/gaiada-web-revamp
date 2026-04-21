import type { Control, FieldErrorsImpl } from 'react-hook-form'
import React from 'react'
import { Controller } from 'react-hook-form'
import { Error } from '../Error'
import { Width } from '../Width'

type RadioOption = {
  label: string
  value: string
}

type RadioButtonFieldProps = {
  name: string
  label?: string
  options?: RadioOption[]
  required?: boolean
  width?: number
  control: Control
  errors: Partial<FieldErrorsImpl>
}

export const RadioButton: React.FC<RadioButtonFieldProps> = ({
  name,
  label,
  options = [],
  required,
  width,
  control,
  errors,
}) => {
  return (
    <Width width={width}>
      {label && (
        <p className="block mb-5 text-sm">
          {label}
          {required && (
            <span className="required">
              {' '}
              *<span className="sr-only"> (required)</span>
            </span>
          )}
        </p>
      )}
      <Controller
        control={control}
        name={name}
        rules={{ required: required ? `${label} is required` : false }}
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-row gap-8">
            {options.map((option) => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                {/* Visual Container for the Radio */}
                <div className="relative flex items-center justify-center h-6 w-6">
                  <input
                    aria-describedby={errors[name] ? `error-${name}` : undefined}
                    aria-invalid={!!errors[name]}
                    id={`${name}-${option.value}`}
                    type="radio"
                    value={option.value}
                    checked={value === option.value}
                    onChange={() => onChange(option.value)}
                    className="sr-only peer text-sm"
                  />

                  <div
                    className="
                    absolute inset-0 rounded-full border-2 border-gray-300 
                    peer-checked:border-[#EAB308] peer-checked:border-[3px] 
                    transition-all duration-200
                  "
                  />

                  <div
                    className="
                    h-2.5 w-2.5 rounded-full bg-transparent 
                    peer-checked:bg-[#EAB308] 
                    transition-all duration-200
                  "
                  />
                </div>

                <span className="text-sm font-bold text-black select-none">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
