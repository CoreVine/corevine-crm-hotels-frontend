"use client"

import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useCities } from "../../cities/_helpers/hooks"

import { zodResolver } from "@hookform/resolvers/zod"

import { LoadingButton } from "@/components/common/loading-button"
import { HotelEmailSchema } from "@/schema"
import { InputField } from "@/components/common/form/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { createHotel, createHotelEmailAction, updateHotelEmailAction } from "../_helpers/actions"
import { showResponse } from "@/lib/utils"
import { z } from "zod"
import { FilterBySearch } from "@/components/common/form/searchable-field"
import { HotelEmail } from "@/types/models"

type Props = {
  email: HotelEmail
}

export const UpdateHotelEmailModal = ({ email }: Props) => {
  const [modal, setModal] = useState(false)

  const form = useForm({
    resolver: zodResolver(HotelEmailSchema),
    defaultValues: email
  })

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof HotelEmailSchema>) => updateHotelEmailAction(email.id, data),
    onSuccess: (data) => showResponse(data)
  })

  const handleCreate = () => {
    mutation.mutate(form.getValues())
  }
  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={Edit} size='icon' variant='outline' />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Hotel Email</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
            <InputField control={form.control} name='email' label='E-mail' placeholder='example@gmail.com' />
            <LoadingButton loading={mutation.isPending} icon={Edit}>
              Update
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
