"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDebounce } from "use-debounce"
import { useDrivers } from "@/app/dashboard/drivers/_helpers/hooks"
import { useClients } from "@/app/dashboard/clients/_helpers/hooks"
import { useCurrencies } from "@/app/dashboard/currencies/_helpers/hooks"

import { zodResolver } from "@hookform/resolvers/zod"
import { createCar, createExternalCarLog, createInternalCarLog, updateExternalCarLog } from "../../_helpers/actions"
import { z } from "zod"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/form/input-field"
import { ExternalCarLogSchema } from "@/schema"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit, History, Plus } from "lucide-react"
import { Car, ExternalCarLog } from "@/types/models"
import { SearchableData } from "@/components/common/form/searchable-data"
import { showResponse } from "@/lib/utils"
import { toast } from "react-toastify"
import { SelectField } from "@/components/common/form/select-field"
import { internalLogStatus } from "@/lib/type-lists"
import { SelectItem } from "@/components/ui/select"

export const UpdateCarExternalLogModal = ({ car, log }: { car: Car; log: ExternalCarLog }) => {
  const [modal, setModal] = useState(false)

  const [searchClients, setSearchClientsValue] = useState(log?.client?.name)
  const [debouncedSearchClients] = useDebounce(searchClients, 500)

  const [searchDrivers, setSearchDriversValue] = useState(log?.driver?.name)
  const [debouncedSearchDrivers] = useDebounce(searchDrivers, 500)

  const { modifiedDrivers, isDriversLoading, isDriversRefetching } = useDrivers(debouncedSearchDrivers)
  const { modifiedClients, isClientsLoading, isClientsRefetching } = useClients(debouncedSearchClients)

  const form = useForm({
    resolver: zodResolver(ExternalCarLogSchema),
    defaultValues: {
      driver_id: log.driver_id,
      client_id: log.client_id,
      reservation_id: log.reservation_id,
      car_id: car.id,
      amount_egp: log.amount_egp.toString(),
      collection: log.collection.toString(),
      cost: log.cost.toString(),
      date: log.date,
      notes: log.notes || ""
    }
  })

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof ExternalCarLogSchema>) => updateExternalCarLog(car.id, log.id, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        form.reset()
        setModal(false)
      }),
    onError: (error: Error) => toast.error(error?.message || "Failed to create external car log")
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
          <DialogTitle>Update Car External Log</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
            <SearchableData label='Driver' search={searchDrivers} setSearch={setSearchDriversValue} data={modifiedDrivers} loading={isDriversRefetching || isDriversLoading} form={form} formItem='driver_id' />
            <SearchableData label='Client' search={searchClients} setSearch={setSearchClientsValue} data={modifiedClients} loading={isClientsRefetching || isClientsLoading} form={form} formItem='client_id' />

            <InputField control={form.control} name='reservation_id' label='Reservation ID' placeholder='32040' type='number' valueAsNumber />
            <InputField control={form.control} name='amount_egp' label='Amount (EGP)' placeholder='100' />
            <InputField control={form.control} name='collection' label='Collection (USD)' placeholder='100' />
            <InputField control={form.control} name='cost' label='Cost (USD)' placeholder='100' />
            <InputField control={form.control} name='date' label='Date' type='date' />
            <InputField control={form.control} name='notes' isTextarea label='Notes' placeholder='Something...' />

            <LoadingButton loading={mutation.isPending} icon={Edit}>
              Update
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
