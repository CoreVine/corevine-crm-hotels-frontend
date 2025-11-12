"use client"

import { useMutation } from "@tanstack/react-query"
import { useCategories } from "../../categories/_helpers/hooks"
import { useHotels } from "../../hotels/_helpers/hooks"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { createInvoice } from "../_helpers/actions"
import { showResponse } from "@/lib/utils"
import { z } from "zod"

import { SearchableData } from "@/components/common/form/searchable-data"
import { LoadingButton } from "@/components/common/loading-button"
import { InvoiceSchema } from "@/schema"
import { Form } from "@/components/ui/form"
import { Plus } from "lucide-react"
import { InputField } from "@/components/common/form/input-field"
import { useDebounce } from "use-debounce"

export const CreateInvoiceForm = () => {
  const form = useForm({
    resolver: zodResolver(InvoiceSchema)
  })

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof InvoiceSchema>) => createInvoice(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 201) form.reset()
      })
  })

  const [searchCategories, setSearchCategories] = useState("")
  const [searchHotels, setSearchHotels] = useState("")

  const [debouncedSearchCategories] = useDebounce(searchCategories, 500)
  const [debouncedSearchHotels] = useDebounce(searchHotels, 500)

  const { modifiedHotels, isHotelsLoading, isHotelsRefetching } = useHotels(debouncedSearchHotels)
  const { modifiedCategories, isCategoriesLoading, isCategoriesRefetching } = useCategories({ search: debouncedSearchCategories })

  const handleCreate = () => {
    mutation.mutate(form.getValues())
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <SearchableData form={form} error={form.formState.errors.category_id?.message} formItem='category_id' data={modifiedCategories} search={debouncedSearchCategories} setSearch={setSearchCategories} label='Category' loading={isCategoriesLoading || isCategoriesRefetching} />
          <SearchableData form={form} error={form.formState.errors.hotel_id?.message} formItem='hotel_id' data={modifiedHotels} search={debouncedSearchHotels} setSearch={setSearchHotels} label='Hotel' loading={isHotelsLoading || isHotelsRefetching} />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <InputField name='amount' type='number' label='Amount' placeholder='Enter amount' control={form.control} />
          <InputField name='creation_date' type='date' label='Creation Date' control={form.control} />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <InputField name='from1' type='date' label='From1' control={form.control} />
          <InputField name='to1' type='date' label='To1' control={form.control} />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <InputField name='from2' type='text' label='From2' control={form.control} />
          <InputField name='to2' type='text' label='To2' control={form.control} />
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <InputField name='customer_name' type='text' label='Customer Name' control={form.control} />
          <InputField name='proxy_name' type='text' label='Proxy Name' control={form.control} />
          <InputField name='reservation_number' type='text' label='Reservation Number' control={form.control} />
        </div>

        <InputField name='nights_count' type='number' label='Nights Count' control={form.control} valueAsNumber />

        <section className='grid grid-cols-2 gap-4'>
          <div>
            <p className='border-b pb-2 text-xl font-bold mb-4'>Collection</p>
            <div className='grid grid-cols-4 gap-4'>
              <InputField name='collection.amount_egp' type='text' label='Collection (EGP)' control={form.control} />
              <InputField name='collection.amount_sar' type='text' label='Collection (SAR)' control={form.control} />
              <InputField name='collection.amount_usd' type='text' label='Collection (USD)' control={form.control} />
              <InputField name='collection.link' type='text' label='Link' control={form.control} />
            </div>
          </div>
          <div>
            <p className='border-b pb-2 text-xl font-bold mb-4'>Payments</p>
            <div className='grid grid-cols-3 gap-4'>
              <InputField name='payment.amount_egp' type='text' label='Payment (EGP)' control={form.control} />
              <InputField name='payment.amount_sar' type='text' label='Payment (SAR)' control={form.control} />
              <InputField name='payment.amount_usd' type='text' label='Payment (USD)' control={form.control} />
            </div>
          </div>
        </section>

        <LoadingButton loading={mutation.isPending} icon={Plus}>
          Create
        </LoadingButton>
      </form>
    </Form>
  )
}
