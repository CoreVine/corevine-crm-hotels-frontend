"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useHotels } from "../../hotels/_helpers/hooks"

import { zodResolver } from "@hookform/resolvers/zod"

import { LoadingButton } from "@/components/common/loading-button"
import { RoomSchema } from "@/schema"
import { InputField } from "@/components/common/form/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Plus } from "lucide-react"
import { FilterBySearch } from "@/components/common/form/searchable-field"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { showResponse } from "@/lib/utils"
import { createRoom } from "../_helpers/actions"
import { z } from "zod"
import { useDebounce } from "use-debounce"
import { SearchableData } from "@/components/common/form/searchable-data"

export const CreateRoomModal = () => {
  const [modal, setModal] = useState(false)

  const form = useForm({
    resolver: zodResolver(RoomSchema.Create)
  })

  const [searchHotels, setSearchHotels] = useState<string>("")
  const [debouncedSearchHotels] = useDebounce(searchHotels, 500)

  const { modifiedHotels, hotels, isHotelsLoading, isHotelsRefetching } = useHotels(debouncedSearchHotels)

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof RoomSchema.Create>) => createRoom(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 201) setModal(false)
      })
  })

  const handleUpdate = () => {
    mutation.mutate(form.getValues())
  }

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={Plus} variant='outline'>
          Create Room
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Room</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
            <InputField control={form.control} name='room_type' label='Room Type' />
            <SearchableData loading={isHotelsLoading || isHotelsRefetching} data={modifiedHotels} search={searchHotels} setSearch={setSearchHotels} label='Hotels' formItem='hotel_id' form={form} error={form.formState.errors?.hotel_id?.message} />

            <LoadingButton loading={mutation.isPending} icon={Plus}>
              Create
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
