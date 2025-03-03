import type { ReactNode } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@cuhacking/shared/ui/form'
import { GlassmorphicCard } from '@cuhacking/shared/ui/glassmorphic-card'
import { PhoneInput } from '@cuhacking/shared/ui/phone-number'
import { Typography } from '@cuhacking/shared/ui/typography/typgoraphy'

interface PhoneNumberFieldProps {
  form: UseFormReturn<any>
  name: string
  label: string
  isRequired?: boolean
  info?: ReactNode
}

export function PhoneNumberField({
  form,
  name,
  label,
  isRequired = false,
  info,
}: PhoneNumberFieldProps) {
  return (
    <GlassmorphicCard className="p-2 w-full" info={info} variant={info ? 'info' : 'default'}>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full flex-col justify-start  items-start inline-flex">
            <div className="flex-col w-full justify-start items-start gap-2.5 flex">
              <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                <div className="flex gap-1">
                  <FormLabel className="text-white font-normal font-mono leading-tight">
                    <Typography variant="paragraph-base">
                      <p>
                        {label}
                        <span className="text-red-600 text-sm font-normal font-mono leading-tight ml-1">
                          {isRequired ? '*' : null}
                        </span>
                      </p>
                    </Typography>
                  </FormLabel>
                </div>
                <FormControl>
                  <Typography variant="paragraph-base">
                    <PhoneInput
                      placeholder="+X XXX XXX XXXX"
                      className="p-1.5 gap-x-3 w-full h-9 bg-[#383838]/40 rounded-md border border-white/20 text-white font-mono"
                      {...field}
                    />
                  </Typography>

                </FormControl>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </GlassmorphicCard>
  )
}
