"use client"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { zodResolver } from "@hookform/resolvers/zod"
import { showResponse } from "@/lib/utils"

import { VoucherSchema } from "@/schema"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { GoBack } from "@/app/dashboard/_components/go-back"
import { HotelForm } from "./hotel"

import { CreateVoucherData, createVoucher } from "../../_helpers/actions"
import { LoadingButton } from "@/components/common/loading-button"

export const CreateVoucherForm = () => {
  const form = useForm({
    resolver: zodResolver(VoucherSchema.Create)
  })

  const mutation = useMutation({
    mutationFn: ({ data }: { data: CreateVoucherData }) => createVoucher(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 201) {
          form.reset()
        }
      }),
    onError: (error: any) => showResponse(error)
  })

  const onSubmit = () => {
    mutation.mutate({
      data: form.getValues()
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <HotelForm form={form} />
          <div className='flex gap-2'>
            <LoadingButton loading={mutation.isPending} type='submit'>
              Submit Reservation
            </LoadingButton>
            <GoBack />
          </div>
        </form>
      </Form>
    </div>
  )
}
