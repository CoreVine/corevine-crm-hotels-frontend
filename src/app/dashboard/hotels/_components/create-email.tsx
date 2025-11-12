"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { createHotelEmailAction } from "../_helpers/actions"
import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { LoadingButton } from "@/components/common/loading-button"
import { HotelEmailSchema } from "@/schema"
import { InputField } from "@/components/common/form/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type Props = {
  hotelId: number
}

export const CreateHotelEmailModal = ({ hotelId }: Props) => {
  const [modal, setModal] = useState(false)

  const form = useForm({
    resolver: zodResolver(HotelEmailSchema)
  })

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof HotelEmailSchema>) => createHotelEmailAction(data, hotelId),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 201) {
          form.reset()
          setModal(false)
        }
      })
  })

  const handleCreate = () => {
    mutation.mutate({
      email: form.getValues("email")
    })
  }
  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={Plus} variant='outline'>
          Create Email
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Hotel Email</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
            <InputField control={form.control} name='email' label='E-mail' placeholder='example@gmail.com' />
            <LoadingButton loading={mutation.isPending} icon={Plus}>
              Create
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
