"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { createReservationPayment } from "../../../_helpers/actions"
import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { z } from "zod"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ReservationPaymentSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Plus } from "lucide-react"
import { InputField } from "@/components/common/form/input-field"
import { useDebounce } from "use-debounce"
import { SearchableData } from "@/components/common/form/searchable-data"
import { useCurrencies } from "@/app/dashboard/currencies/_helpers/hooks"
import { useCategories } from "@/app/dashboard/categories/_helpers/hooks"
import { SelectField } from "@/components/common/form/select-field"
import { SelectItem } from "@/components/ui/select"

type Props = {
  reservationId: number
}

type CreateMutation = {
  reservationId: number
  data: z.infer<typeof ReservationPaymentSchema>
}

export function CreateReservationPaymentModal({ reservationId }: Props) {
  const [modal, setModal] = useState(false)

  const [searchCurrency, setSearchCurrency] = useState("")
  const [debouncedSearchCurrency] = useDebounce(searchCurrency, 300)

  const [searchCategory, setSearchCategory] = useState("")
  const [debouncedSearchCategory] = useDebounce(searchCategory, 300)

  const { modifiedCurrencies, isCurrenciesLoading, isCurrenciesRefetching } = useCurrencies(searchCurrency)
  const { modifiedCategories, isCategoriesLoading, isCategoriesRefetching } = useCategories({ search: searchCategory })

  const mutation = useMutation({
    mutationFn: (data: CreateMutation) => createReservationPayment(data.reservationId, data.data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 201) {
          form.reset()
          setModal(false)
        }
      }),
    onError: (error: Error) => toast.error(error?.message || "Failed to create reservation payment")
  })

  const form = useForm({
    resolver: zodResolver(ReservationPaymentSchema)
  })

  const handleCreate = () => {
    const data = form.getValues()
    mutation.mutate({ reservationId, data })
  }

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={Plus}>Create</Button>
      </DialogTrigger>
      <DialogContent className='min-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Create Reservation Payment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
            <div className='grid grid-cols-2 gap-2'>
              <SearchableData error={form.formState?.errors?.currency_id?.message} label='Currency' search={searchCurrency} setSearch={setSearchCurrency} data={modifiedCurrencies} loading={isCurrenciesLoading || isCurrenciesRefetching} form={form} formItem='currency_id' />
              <SearchableData error={form.formState?.errors?.category_id?.message} label='Category' search={searchCategory} setSearch={setSearchCategory} data={modifiedCategories} loading={isCategoriesRefetching || isCategoriesLoading} form={form} formItem='category_id' />
            </div>

            <InputField name='date' label='Date' type='date' control={form.control} />

            <div className='grid grid-cols-2 gap-2'>
              <InputField name='debit' label='Debit' control={form.control} />
              <InputField name='credit' label='Credit' control={form.control} />
            </div>

            <div className='grid grid-cols-3 gap-2'>
              <InputField name='company_markup' label='Company Markup' control={form.control} />
              <InputField name='agent_commission' label='Agent Comission' control={form.control} />
              <InputField name='statement' label='Statement' control={form.control} />
            </div>

            <div className='grid grid-cols-2 gap-2'>
              <InputField name='collector_name' label='Collector Name' control={form.control} />
              <SelectField label='Collection Type' name='collection_type' control={form.control} defaultValue='cash'>
                <SelectItem value='cash'>Cash</SelectItem>
                <SelectItem value='bank_transfer'>Bank Transfer</SelectItem>
                <SelectItem value='credit_card'>Credit Card</SelectItem>
              </SelectField>
            </div>

            <InputField name='payment' label='Payment' control={form.control} />
            <InputField name='notes' label='Notes' control={form.control} isTextarea />

            <LoadingButton loading={mutation.isPending} icon={Plus}>
              Create
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
