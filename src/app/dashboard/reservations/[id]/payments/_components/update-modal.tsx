"use client"

import { useCategories } from "@/app/dashboard/categories/_helpers/hooks"
import { useCurrencies } from "@/app/dashboard/currencies/_helpers/hooks"
import { useMutation } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { updateReservationPayment } from "../../../_helpers/actions"
import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { z } from "zod"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ReservationPaymentSchema } from "@/schema"
import { ReservationPayment } from "@/types/models"
import { SearchableData } from "@/components/common/form/searchable-data"
import { LoadingButton } from "@/components/common/loading-button"
import { SelectField } from "@/components/common/form/select-field"
import { InputField } from "@/components/common/form/input-field"
import { SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit } from "lucide-react"
import { TCollectorType } from "@/types"

type Props = {
  payment: ReservationPayment
}

type UpdateMutation = {
  reservationId: number
  data: z.infer<typeof ReservationPaymentSchema>
}

export function UpdateReservationPaymentModal({ payment }: Props) {
  const [modal, setModal] = useState(false)

  const [searchCurrency, setSearchCurrency] = useState(payment.currency?.name)
  const [debouncedSearchCurrency] = useDebounce(searchCurrency, 300)

  const [searchCategory, setSearchCategory] = useState(payment.category?.name)
  const [debouncedSearchCategory] = useDebounce(searchCategory, 300)

  const { modifiedCurrencies, isCurrenciesLoading, isCurrenciesRefetching } = useCurrencies(searchCurrency)
  const { modifiedCategories, isCategoriesLoading, isCategoriesRefetching } = useCategories({ search: searchCategory })

  const mutation = useMutation({
    mutationFn: (data: UpdateMutation) => updateReservationPayment(data.reservationId, payment.id, data.data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 201) {
          form.reset()
          setModal(false)
        }
      }),
    onError: (error: Error) => toast.error(error?.message || "Failed to update reservation payment")
  })

  const form = useForm({
    resolver: zodResolver(ReservationPaymentSchema),
    defaultValues: {
      debit: payment.debit?.toString(),
      credit: payment.credit?.toString(),
      collector_name: payment.collector_name,
      collection_type: payment.collection_type as TCollectorType,
      company_markup: payment.company_markup?.toString(),
      agent_commission: payment.agent_commission?.toString(),
      payment: payment.payment?.toString(),
      notes: payment.notes,
      date: payment.date,
      statement: payment.statement || "",
      currency_id: payment.currency_id,
      category_id: payment.category_id
    }
  })

  const handleCreate = () => {
    const data = form.getValues()
    mutation.mutate({ reservationId: payment.reservation_id, data })
  }

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={Edit} variant='outline' size='icon' />
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
              <SelectField label='Collection Type' name='collection_type' control={form.control} defaultValue={payment.collection_type}>
                <SelectItem value='cash'>Cash</SelectItem>
                <SelectItem value='bank_transfer'>Bank Transfer</SelectItem>
                <SelectItem value='credit_card'>Credit Card</SelectItem>
              </SelectField>
            </div>

            <InputField name='payment' label='Payment' control={form.control} />
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
