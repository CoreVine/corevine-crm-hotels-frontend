"use client"

import { useCurrencies } from "@/app/dashboard/currencies/_helpers/hooks"
import { useCategories } from "@/app/dashboard/categories/_helpers/hooks"
import { useMutation } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { createExpense, updateExpense } from "@/app/dashboard/expenses/_helpers/actions"
import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { z } from "zod"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { HotelAgingStatus, PaymentMethods } from "@/lib/type-lists"
import { SearchableData } from "@/components/common/form/searchable-data"
import { ExpenseSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { SelectField } from "@/components/common/form/select-field"
import { InputField } from "@/components/common/form/input-field"
import { SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit, Plus, Save } from "lucide-react"
import { Expense } from "@/types/models"

type Props = {
  expense: Expense
}

type UpdateMutation = {
  data: z.infer<typeof ExpenseSchema>
}

export function UpdateExpenseModal({ expense }: Props) {
  const [modal, setModal] = useState(false)

  const [searchCurrency, setSearchCurrency] = useState(expense.currency?.name || "")
  const [debouncedSearchCurrency] = useDebounce(searchCurrency, 300)

  const [searchCategory, setSearchCategory] = useState(expense.category?.name || "")
  const [debouncedSearchCategory] = useDebounce(searchCategory, 300)

  const { modifiedCurrencies, isCurrenciesLoading, isCurrenciesRefetching } = useCurrencies(debouncedSearchCurrency)
  const { modifiedCategories, isCategoriesLoading, isCategoriesRefetching } = useCategories({ search: debouncedSearchCategory })

  const mutation = useMutation({
    mutationFn: (data: UpdateMutation) => updateExpense(expense.id, data.data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 201) {
          form.reset()
          setModal(false)
        }
      }),
    onError: (error: Error) => toast.error(error?.message || "Failed to create hotel aging")
  })

  const form = useForm({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      currency_id: expense.currency_id,
      category_id: expense.category_id,
      receipt_number: expense.receipt_number,
      statement: expense.statement || "",
      status: expense.status,
      payment_method: expense.payment_method,
      notes: expense.notes || "",
      date: expense.date,
      amount: expense.amount.toString()
    }
  })

  const handleUpdate = () => {
    mutation.mutate({ data: form.getValues() })
  }

  const showErrors = () => {
    const errors = form.formState.errors
    console.log({ errors })
  }

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={Edit} size='icon' variant='outline' />
      </DialogTrigger>
      <DialogContent className='min-w-[800px] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Update Expense</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
            <div className='grid grid-cols-2 gap-2'>
              <SearchableData error={form.formState?.errors?.currency_id?.message} label='Currency' search={searchCurrency} setSearch={setSearchCurrency} data={modifiedCurrencies} loading={isCurrenciesLoading || isCurrenciesRefetching} form={form} formItem='currency_id' />
              <SearchableData error={form.formState?.errors?.category_id?.message} label='Category' search={searchCategory} setSearch={setSearchCategory} data={modifiedCategories} loading={isCategoriesRefetching || isCategoriesLoading} form={form} formItem='category_id' />
            </div>

            <InputField name='date' label='Date' type='date' control={form.control} />
            <InputField name='receipt_number' label='Receipt Number' control={form.control} />
            <InputField name='statement' label='Statement' control={form.control} />
            <InputField name='amount' label='Amount' control={form.control} />

            <div className='grid grid-cols-2 gap-2'>
              <SelectField label='Status' name='status' control={form.control} defaultValue={expense.status}>
                {HotelAgingStatus.map((item) => (
                  <SelectItem value={item.value}>{item.name}</SelectItem>
                ))}
              </SelectField>

              <SelectField label='Payment Method' name='payment_method' control={form.control} defaultValue={expense.payment_method}>
                {PaymentMethods.map((item) => (
                  <SelectItem value={item.value}>{item.name}</SelectItem>
                ))}
              </SelectField>
            </div>

            <InputField name='notes' label='Notes' control={form.control} isTextarea />

            <LoadingButton loading={mutation.isPending} icon={Save}>
              Save
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
