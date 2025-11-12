"use client"

import { useCurrencies } from "@/app/dashboard/currencies/_helpers/hooks"
import { useCategories } from "@/app/dashboard/categories/_helpers/hooks"
import { useMutation } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import { useHotels } from "../../_helpers/hooks"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { updateHotelAging } from "../../_helpers/actions"
import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { z } from "zod"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { HotelAgingStatus, PaymentMethods } from "@/lib/type-lists"
import { HotelAgingSchema } from "@/schema"
import { SearchableData } from "@/components/common/form/searchable-data"
import { LoadingButton } from "@/components/common/loading-button"
import { SelectField } from "@/components/common/form/select-field"
import { Edit, Plus } from "lucide-react"
import { HotelAging } from "@/types/models"
import { InputField } from "@/components/common/form/input-field"
import { SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

type Props = {
  hotelId: number
  aging: HotelAging
}

type UpdateMutation = {
  data: z.infer<typeof HotelAgingSchema>
}

export function UpdateHotelAgingModal({ hotelId, aging }: Props) {
  const [modal, setModal] = useState(false)

  const [searchCurrency, setSearchCurrency] = useState(aging.currency?.name)
  const [debouncedSearchCurrency] = useDebounce(searchCurrency, 300)

  const [searchCategory, setSearchCategory] = useState(aging.category?.name)
  const [debouncedSearchCategory] = useDebounce(searchCategory, 300)

  const [searchHotel, setSearchHotel] = useState(aging.hotel?.name)
  const [debouncedSearchHotel] = useDebounce(searchHotel, 300)

  const { modifiedCurrencies, isCurrenciesLoading, isCurrenciesRefetching } = useCurrencies(debouncedSearchCurrency)
  const { modifiedCategories, isCategoriesLoading, isCategoriesRefetching } = useCategories({ search: debouncedSearchCategory })
  const { modifiedHotels, isHotelsLoading, isHotelsRefetching } = useHotels(debouncedSearchHotel)

  const mutation = useMutation({
    mutationFn: (data: UpdateMutation) => updateHotelAging(hotelId, aging.id, data.data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 200) {
          setModal(false)
        }
      }),
    onError: (error: Error) => toast.error(error?.message || "Failed to update hotel aging")
  })

  const form = useForm({
    resolver: zodResolver(HotelAgingSchema),
    defaultValues: {
      payment_method: aging.payment_method || "cash",
      status: aging.status || "pending",
      currency_id: aging.currency_id,
      category_id: aging.category_id,
      hotel_id: aging.hotel_id,
      reservation_id: aging.reservation_id,
      amount: aging.amount.toString(),
      due_date: aging.due_date,
      notes: aging.notes || "",
      paid_date: aging.paid_date || ""
    }
  })

  const handleUpdate = () => {
    mutation.mutate({ data: form.getValues() })
  }

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={Edit} size='icon' variant='outline' />
      </DialogTrigger>
      <DialogContent className='min-w-[800px] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>
            Update Hotel Aging for Hotel - <b>{hotelId}</b>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
            <div className='grid grid-cols-2 gap-2'>
              <SearchableData error={form.formState?.errors?.currency_id?.message} label='Currency' search={searchCurrency} setSearch={setSearchCurrency} data={modifiedCurrencies} loading={isCurrenciesLoading || isCurrenciesRefetching} form={form} formItem='currency_id' />
              <SearchableData error={form.formState?.errors?.category_id?.message} label='Category' search={searchCategory} setSearch={setSearchCategory} data={modifiedCategories} loading={isCategoriesRefetching || isCategoriesLoading} form={form} formItem='category_id' />
            </div>
            <SearchableData error={form.formState?.errors?.hotel_id?.message} label='Hotel' search={searchHotel} setSearch={setSearchHotel} data={modifiedHotels} loading={isHotelsRefetching || isHotelsLoading} form={form} formItem='hotel_id' />

            <InputField name='reservation_id' label='Reservation ID' type='number' control={form.control} valueAsNumber />
            <InputField name='due_date' label='Due Date' type='date' control={form.control} />
            <InputField name='amount' label='Amount' control={form.control} />

            <div className='grid grid-cols-2 gap-2'>
              <SelectField label='Status' name='status' control={form.control} defaultValue='cash'>
                {HotelAgingStatus.map((item) => (
                  <SelectItem value={item.value}>{item.name}</SelectItem>
                ))}
              </SelectField>

              <SelectField label='Payment Method' name='payment_method' control={form.control} defaultValue='cash'>
                {PaymentMethods.map((item) => (
                  <SelectItem value={item.value}>{item.name}</SelectItem>
                ))}
              </SelectField>
            </div>

            <InputField name='paid_date' label='Paid Date' type='date' control={form.control} />
            <InputField name='notes' label='Notes' control={form.control} isTextarea />

            <LoadingButton loading={mutation.isPending} icon={Edit}>
              Save
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
