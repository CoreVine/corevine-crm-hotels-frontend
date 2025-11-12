"use client"

import { FieldErrors } from "react-hook-form"

type FormErrorsProps = {
  errors: FieldErrors
}

export function ZodErrors({ errors }: FormErrorsProps) {
  const flattenErrors = (errs: FieldErrors, parentKey = ""): string[] => {
    let messages: string[] = []
    for (const key in errs) {
      const error = errs[key]
      if (!error) continue

      const path = parentKey ? `${parentKey}.${key}` : key

      if ("message" in error && error.message) {
        messages.push(error.message as string)
      }

      if ("types" in error && error.types) {
        messages.push(...(Object.values(error.types) as string[]))
      }

      if (typeof error === "object" && !("message" in error)) {
        messages.push(...flattenErrors(error as FieldErrors, path))
      }
    }
    return messages
  }

  const messages = flattenErrors(errors)

  if (messages.length === 0) return null

  return (
    <div className='mb-4 rounded-md border border-red-300 bg-red-50 px-7 py-4 text-red-700'>
      <ul className='list-disc pl-5 space-y-1'>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  )
}
