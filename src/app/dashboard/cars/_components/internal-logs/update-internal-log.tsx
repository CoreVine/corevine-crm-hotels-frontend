"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDebounce } from "use-debounce"
import { useDrivers } from "@/app/dashboard/drivers/_helpers/hooks"
import { useClients } from "@/app/dashboard/clients/_helpers/hooks"
import { useCurrencies } from "@/app/dashboard/currencies/_helpers/hooks"

import { zodResolver } from "@hookform/resolvers/zod"
import { createCar, createInternalCarLog, updateInternalCarLog } from "../../_helpers/actions"
import { z } from "zod"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/form/input-field"
import { InternalCarLogSchema } from "@/schema"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit, History, Plus } from "lucide-react"
import { Car, InternalCarLog } from "@/types/models"
import { SearchableData } from "@/components/common/form/searchable-data"
import { showResponse } from "@/lib/utils"
import { toast } from "react-toastify"
import { SelectField } from "@/components/common/form/select-field"
import { internalLogStatus } from "@/lib/type-lists"
import { SelectItem } from "@/components/ui/select"
import { TInternalCarLogStatus } from "@/types"

export const UpdateCarInternalLogModal = ({ car, log }: { car: Car; log: InternalCarLog }) => {
  const [modal, setModal] = useState(false)

  const [searchClients, setSearchClientsValue] = useState(log.client?.name)
  const [debouncedSearchClients] = useDebounce(searchClients, 500)

  const [searchDrivers, setSearchDriversValue] = useState(log.driver?.name)
  const [debouncedSearchDrivers] = useDebounce(searchDrivers, 500)

  const [searchCurrencies, setSearchCurrenciesValue] = useState(log.currency?.code)
  const [debouncedSearchCurrencies] = useDebounce(searchCurrencies, 500)

  const { modifiedDrivers, isDriversLoading, isDriversRefetching } = useDrivers(debouncedSearchDrivers)
  const { modifiedClients, isClientsLoading, isClientsRefetching } = useClients(debouncedSearchClients)
  const { modifiedCurrencies, isCurrenciesLoading, isCurrenciesRefetching } = useCurrencies(debouncedSearchCurrencies)

  const form = useForm({
    resolver: zodResolver(InternalCarLogSchema),
    defaultValues: {
      driver_id: log.driver_id,
      client_id: log.client_id,
      reservation_id: log.reservation_id,
      amount_currency_id: log.amount_currency_id,
      car_id: car.id,
      price_usd: log.price_usd.toString(),
      amount: log.amount.toString(),
      date: log.date,
      status: log.status as TInternalCarLogStatus
    }
  })

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof InternalCarLogSchema>) => updateInternalCarLog(car.id, log.id, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        form.reset()
        setModal(false)
      }),
    onError: (error: Error) => toast.error(error?.message || "Failed to update car log")
  })

  const handleCreate = () => {
    mutation.mutate(form.getValues())
  }

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={Edit} variant='outline-primary' size='icon' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update Car Log - <b>#{log.id}</b>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
            <SearchableData label='Driver' search={searchDrivers} setSearch={setSearchDriversValue} data={modifiedDrivers} loading={isDriversRefetching || isDriversLoading} form={form} formItem='driver_id' />
            <SearchableData label='Client' search={searchClients} setSearch={setSearchClientsValue} data={modifiedClients} loading={isClientsRefetching || isClientsLoading} form={form} formItem='client_id' />

            <InputField control={form.control} name='reservation_id' label='Reservation ID' placeholder='32040' type='number' valueAsNumber />
            <InputField control={form.control} name='price_usd' label='Price(USD)' placeholder='100' />
            <div className='grid grid-cols-5 gap-2'>
              <InputField control={form.control} name='amount' label='Amount' placeholder='Amount' />
              <div className='col-span-4'>
                <SearchableData label='Currency' search={searchCurrencies} setSearch={setSearchCurrenciesValue} data={modifiedCurrencies} loading={isCurrenciesRefetching || isCurrenciesLoading} form={form} formItem='amount_currency_id' />
              </div>
            </div>
            <InputField control={form.control} name='date' label='Date' type='date' />
            <SelectField name='status' control={form.control} label='Status' defaultValue='completed'>
              {internalLogStatus.map((item) => (
                <SelectItem value={item.value}>{item.name}</SelectItem>
              ))}
            </SelectField>
            <InputField control={form.control} name='notes' isTextarea label='Notes' placeholder='Something...' />

            <LoadingButton loading={mutation.isPending} icon={Plus}>
              Update
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
