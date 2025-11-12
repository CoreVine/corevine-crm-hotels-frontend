"use client"

import { Room } from "@/types/models"
import { EmptyTableState } from "../../_components/empty-table"
import { UpdateRoomModal } from "../../rooms/_components/update"
import { DeleteModal } from "../../_components/delete-modal"
import { deleteRoom } from "../../rooms/_helpers/actions"
import { CreateRoomModal } from "../../rooms/_components/create"

type Props = {
  rooms: Room[]
  hotelName: string
}

export const HotelRooms = ({ rooms }: Props) => {
  if (rooms.length === 0) return <EmptyTableState />
  return (
    <div className='p-4 rounded-md border'>
      <div className='flex gap-2 items-center justify-between mb-4'>
        <h2 className='font-medium text-lg'>Hotel Rooms</h2>
        <CreateRoomModal />
      </div>
      <div className='divide-y space-y-2'>
        {rooms.map((room) => (
          <div key={`single-room-${room.id}`} className='py-1 flex items-center justify-between border px-4 rounded-md'>
            <div>{room.room_type}</div>
            <div className='flex gap-2 items-center'>
              <UpdateRoomModal room={room} />
              <DeleteModal id={room.id} action={deleteRoom} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
