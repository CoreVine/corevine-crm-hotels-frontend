"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { createCurrency } from "../_helpers/actions"
import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CurrencySchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/form/input-field"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Form } from "@/components/ui/form"
import { Plus } from "lucide-react"

export const CreateCurrencyModal = () => {
  const [modal, setModal] = useState(false)

  const form = useForm({
    resolver: zodResolver(CurrencySchema)
  })

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof CurrencySchema>) => createCurrency(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 201) {
          setModal(false)
          form.reset()
        }
      })
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
          <DialogTitle>Create New Currency</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
            <InputField control={form.control} name='name' label='Name' />
            <InputField control={form.control} name='code' label='Code' />
            <InputField control={form.control} name='value' label='Value' />

            <div className='flex gap-2 items-center'>
              <Checkbox onCheckedChange={(checked) => form.setValue("is_active", !!checked)} id='is_active' />
              <Label htmlFor='is_active'>Is Active?</Label>
            </div>
            <LoadingButton loading={mutation.isPending} icon={Plus}>
              Create
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
