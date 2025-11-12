"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDebounce } from "use-debounce"
import { useDrivers } from "@/app/dashboard/drivers/_helpers/hooks"
import { useClients } from "@/app/dashboard/clients/_helpers/hooks"
import { useCurrencies } from "@/app/dashboard/currencies/_helpers/hooks"

import { zodResolver } from "@hookform/resolvers/zod"
import { createCar, createInternalCarLog } from "../../_helpers/actions"
import { z } from "zod"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/form/input-field"
import { InternalCarLogSchema } from "@/schema"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { History, Plus } from "lucide-react"
import { Car } from "@/types/models"
import { SearchableData } from "@/components/common/form/searchable-data"
import { showResponse } from "@/lib/utils"
import { toast } from "react-toastify"
import { SelectField } from "@/components/common/form/select-field"
import { internalLogStatus } from "@/lib/type-lists"
import { SelectItem } from "@/components/ui/select"

export const CreateCarInternalLogModal = ({ car }: { car: Car }) => {
  const [modal, setModal] = useState(false)

  const [searchCars, setSearchCarsValue] = useState("")
  const [debouncedSearchCars] = useDebounce(searchCars, 500)

  const [searchClients, setSearchClientsValue] = useState("")
  const [debouncedSearchClients] = useDebounce(searchClients, 500)

  const [searchDrivers, setSearchDriversValue] = useState("")
  const [debouncedSearchDrivers] = useDebounce(searchDrivers, 500)

  const [searchCurrencies, setSearchCurrenciesValue] = useState("")

  const { modifiedDrivers, isDriversLoading, isDriversRefetching } = useDrivers(debouncedSearchDrivers)
  const { modifiedClients, isClientsLoading, isClientsRefetching } = useClients(debouncedSearchClients)
  const { modifiedCurrencies, isCurrenciesLoading, isCurrenciesRefetching } = useCurrencies()

  const form = useForm({
    resolver: zodResolver(InternalCarLogSchema),
    defaultValues: {
      car_id: car.id
    }
  })

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof InternalCarLogSchema>) => createInternalCarLog(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        form.reset()
        setModal(false)
      }),
    onError: (error: Error) => toast.error(error?.message || "Failed to create car log")
  })

  const handleCreate = () => {
    mutation.mutate(form.getValues())
  }

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={History} variant='outline-primary'>
          Internal Car Sheet
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Car Log</DialogTitle>
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
              Create
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
