"use client"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { zodResolver } from "@hookform/resolvers/zod"
import { showResponse } from "@/lib/utils"

import { VoucherSchema } from "@/schema"
import { Form } from "@/components/ui/form"
import { GoBack } from "@/app/dashboard/_components/go-back"
import { HotelForm } from "./hotel"

import { CreateVoucherData, updateVoucher } from "../../_helpers/actions"
import { LoadingButton } from "@/components/common/loading-button"
import { Voucher } from "@/types/models"

export const UpdateVoucherForm = ({ voucher }: { voucher: Voucher }) => {
  const form = useForm({
    resolver: zodResolver(VoucherSchema.Create),
    defaultValues: {
      meal_id: voucher.meal_id,
      hotel_id: voucher.hotel_id,
      city_id: voucher.city_id,
      company_id: voucher.company_id,
      room_id: voucher.room_id,
      client_name: voucher.client_name,
      nationality: voucher.nationality,
      pax: voucher.pax,
      rooms_count: voucher.rooms_count,
      check_in: voucher.check_in,
      check_out: voucher.check_out,
      adults: voucher.adults,
      children: voucher.children,
      view: voucher.view,
      notes: voucher?.notes,
      hcn: voucher.hcn,
      internal_confirmation: voucher.internal_confirmation
    }
  })

  const mutation = useMutation({
    mutationFn: ({ data }: { data: CreateVoucherData }) => updateVoucher(voucher.id, data),
    onSuccess: (data) => showResponse(data),
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
          <HotelForm
            form={form}
            meal={voucher.meal?.meal_type}
            room={voucher.room?.room_type}
            city={voucher.city?.name}
            company={voucher.company?.name}
            hotel={voucher.hotel?.name}
          />
          <div className='flex gap-2'>
            <LoadingButton loading={mutation.isPending} type='submit'>
              Save
            </LoadingButton>
            <GoBack />
          </div>
        </form>
      </Form>
    </div>
  )
}
