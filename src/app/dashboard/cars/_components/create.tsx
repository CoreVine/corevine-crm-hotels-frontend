"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { carTransmission, carType } from "@/lib/type-lists"
import { zodResolver } from "@hookform/resolvers/zod"
import { createCar } from "../_helpers/actions"
import { z } from "zod"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/common/loading-button"
import { SelectField } from "@/components/common/form/select-field"
import { SelectItem } from "@/components/ui/select"
import { InputField } from "@/components/common/form/input-field"
import { CarSchema } from "@/schema"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Plus } from "lucide-react"
import { toast } from "react-toastify"
import { showResponse } from "@/lib/utils"

export const CreateCarModal = () => {
  const [modal, setModal] = useState(false)

  const form = useForm({
    resolver: zodResolver(CarSchema),
    defaultValues: {
      type: "internal",
      transmission: "automatic"
    }
  })

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof CarSchema>) => createCar(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status == 201) {
          form.reset()
          setModal(false)
        }
      }),
    onError: (data: Error) => toast.error(data?.message)
  })

  const handleCreate = () => {
    mutation.mutate(form.getValues())
  }

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={Plus}>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Car</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
            <InputField control={form.control} name='make' label='Make' placeholder='Toyota' />
            <InputField control={form.control} name='model' label='Model' placeholder='Corolla' />
            <InputField control={form.control} name='year' label='Year' placeholder='2002' type='number' valueAsNumber />
            <InputField control={form.control} name='code' label='Code' placeholder='Code' />
            <InputField control={form.control} name='vin' label='Vechile Regestration Number' placeholder='DK3-0003' />
            <InputField control={form.control} name='seating_capacity' label='Seating Capacity' placeholder='4' type='number' valueAsNumber />

            <SelectField control={form.control} name='type' label='Type' defaultValue='internal'>
              {carType.map((state, idx) => (
                <SelectItem key={`type-${state.value}-${idx}`} value={state.value}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectField>

            <SelectField control={form.control} name='transmission' label='Transmission' defaultValue='automatic'>
              {carTransmission.map((state, idx) => (
                <SelectItem key={`transmission-${state.value}-${idx}`} value={state.value}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectField>

            <LoadingButton loading={mutation.isPending} icon={Plus}>
              Create
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
