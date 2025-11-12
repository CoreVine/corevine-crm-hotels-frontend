"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { LoadingButton } from "@/components/common/loading-button"
import { RoomSchema } from "@/schema"
import { InputField } from "@/components/common/form/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { showResponse } from "@/lib/utils"
import { z } from "zod"
import { Room } from "@/types/models"

import { updateRoom } from "../_helpers/actions"
import { useHotels } from "../../hotels/_helpers/hooks"
import { FilterBySearch } from "@/components/common/form/searchable-field"

export const UpdateRoomModal = ({ room }: { room: Room }) => {
  const [modal, setModal] = useState(false)

  const form = useForm({
    resolver: zodResolver(RoomSchema.Update),
    defaultValues: {
      room_type: room.room_type,
      hotel_id: room.hotel_id
    }
  })

  const [searchHotels, setSearchHotels] = useState("")
  const [selectedHotel, setSelectedHotel] = useState("")
  const [hotelId, setHotelId] = useState<number>()

  const { hotels, isHotelsLoading, isHotelsRefetching } = useHotels(searchHotels)

  const hotelsValues = hotels?.map((hotel) => ({
    id: hotel.id,
    label: hotel.name,
    value: hotel.name
  }))

  const onCommandSelect = (currentValue: string, id: number) => {
    setSelectedHotel(currentValue)
    form.setValue("hotel_id", id)
    setHotelId(id)
  }

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof RoomSchema.Update>) => updateRoom(room.id, data),
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
            Update Room - <b>{room.room_type}</b>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
            <InputField control={form.control} name='room_type' label='Room Type' defaultValue={room.room_type} />

            <FilterBySearch formLabel='Hotel' value={selectedHotel} setValue={setSearchHotels} isLoading={isHotelsLoading || isHotelsRefetching} onCommandSelect={onCommandSelect} error={form.formState.errors.hotel_id?.message} data={hotelsValues} />

            <LoadingButton loading={mutation.isPending} icon={Edit}>
              Update
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
