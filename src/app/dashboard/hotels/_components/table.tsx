import { Hotel } from "@/types/models"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { CreateHotelModal } from "./create"
import { EmptyTableState } from "../../_components/empty-table"
import { RestoreModal } from "../../_components/restore-modal"
import { DeleteModal } from "../../_components/delete-modal"

import { diffForHumans } from "@/lib/utils"
import { deleteHotel, restoreHotel } from "../_helpers/actions"
import { UpdateHotelModal } from "./update"
import { LinkBtn } from "@/components/common/button-link"
import { routes } from "@/lib/route"
import { Eye } from "lucide-react"

type Props = {
  hotels: Hotel[]
}

export const HotelsTable = ({ hotels }: Props) => {
  if (hotels.length === 0) {
    return (
      <EmptyTableState>
        <CreateHotelModal />
      </EmptyTableState>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Mobile</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {hotels.map((hotel) => (
          <TableRow key={`client-row-${hotel.id}`}>
            <TableCell className='font-bold'>{hotel.id}</TableCell>
            <TableCell>{hotel.name}</TableCell>
            <TableCell>{hotel.phone_number}</TableCell>
            <TableCell>{hotel.email}</TableCell>
            <TableCell>{hotel.city.name}</TableCell>
            <TableCell>{diffForHumans(hotel.created_at)}</TableCell>
            <TableCell className='flex gap-2 w-100'>
              <LinkBtn href={routes.hotels.show(hotel.id)} icon={Eye} size='icon' variant='outline' />
              {!hotel.deleted_at && <UpdateHotelModal hotel={hotel} />}
              {hotel.deleted_at ? <RestoreModal id={hotel.id} action={restoreHotel} /> : <DeleteModal id={hotel.id} action={deleteHotel} />}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
