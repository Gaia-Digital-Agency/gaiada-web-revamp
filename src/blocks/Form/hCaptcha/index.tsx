import React, { useRef } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { Controller, Control, FieldValues } from 'react-hook-form'
import { Error } from '../Error'

export const HCaptchaField: React.FC<{
  siteKey: string
  control: Control<FieldValues>
  errors: any
  name?: string // Not used by hCaptcha but passed by field mapper
}> = ({ siteKey, control, errors }) => {
  const captchaRef = useRef<HCaptcha>(null)

  return (
    <div className="flex flex-col gap-2">
      <Controller
        name="hCaptcha"
        control={control}
        rules={{ required: 'Please complete the captcha' }}
        render={({ field }) => (
          <HCaptcha
            ref={captchaRef}
            sitekey={siteKey}
            onVerify={(token) => field.onChange(token)}
            onExpire={() => field.onChange(null)}
          />
        )}
      />
      {errors.hCaptcha && <Error name="hCaptcha" />}
    </div>
  )
}
