"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { LoadingButton } from "@/components/common/loading-button"
import { CurrencySchema } from "@/schema"
import { InputField } from "@/components/common/form/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { updateCurrency } from "../_helpers/actions"
import { showResponse } from "@/lib/utils"
import { z } from "zod"
import { Currency } from "@/types/models"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export const UpdateCurrencyModal = ({ currency }: { currency: Currency }) => {
  const [modal, setModal] = useState(false)

  const form = useForm({
    resolver: zodResolver(CurrencySchema),
    defaultValues: {
      name: currency.name,
      code: currency.code,
      value: parseFloat(currency.value),
      is_active: currency.is_active
    }
  })

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof CurrencySchema>) => updateCurrency(currency.id, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 200) setModal(false)
      })
  })

  const handleUpdate = () => {
    mutation.mutate(form.getValues())
  }

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={Edit} variant='outline' size='icon' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update Currency - <b>{currency.name}</b>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
            <InputField control={form.control} name='name' label='Name' />
            <InputField control={form.control} name='code' label='Code' />
            <InputField control={form.control} name='value' label='Value' />

            <div className='flex gap-2 items-center'>
              <Checkbox defaultChecked={currency.is_active} onCheckedChange={(checked) => form.setValue("is_active", !!checked)} id='is_active' />
              <Label htmlFor='is_active'>Is Active?</Label>
            </div>

            <LoadingButton loading={mutation.isPending} icon={Edit}>
              Update
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
