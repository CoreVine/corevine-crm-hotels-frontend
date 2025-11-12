import { deleteCarReservaion, restoreCarReservaion } from "../_helpers/actions"
import { diffForHumans } from "@/lib/utils"
import { routes } from "@/lib/route"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EmptyTableState } from "../../_components/empty-table"
import { CarReservation } from "@/types/models"
import { LinkBtn } from "@/components/common/button-link"
import { Edit, Plus } from "lucide-react"
import { ChangeCarReservationStatus } from "./change-status"
import { RestoreModal } from "../../_components/restore-modal"
import { DeleteModal } from "../../_components/delete-modal"

type Props = {
  carReservations: CarReservation[]
}

export const CarReservationsTable = ({ carReservations }: Props) => {
  if (carReservations.length === 0) {
    return (
      <EmptyTableState>
        <LinkBtn href={routes.carReservations.create} icon={Plus}>
          New Reservation
        </LinkBtn>
      </EmptyTableState>
    )
  }

  return (
    <div className='overflow-x-auto max-w-full'>
      <Table className='max-w-full'>
        <TableHeader className='max-w-full'>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Nationality</TableHead>
            <TableHead>Arrival Date</TableHead>
            <TableHead>Arrival Time</TableHead>
            <TableHead>Meeting point</TableHead>
            <TableHead>Airline</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='max-w-full'>
          {carReservations.map((res) => (
            <TableRow key={`res-row-${res.id}`}>
              <TableCell className='font-bold'>{res.id}</TableCell>
              <TableCell>{res?.reservation?.client?.name || "N/A"}</TableCell>
              <TableCell>{res?.reservation?.client?.phone || "N/A"}</TableCell>
              <TableCell>{res?.reservation?.client?.nationality || "N/A"}</TableCell>
              <TableCell>{diffForHumans(res.arrival_date)}</TableCell>
              <TableCell>{res.arrival_time}</TableCell>
              <TableCell>{res.meeting_point}</TableCell>
              <TableCell>{res.airline}</TableCell>
              <TableCell>{res.driver?.name}</TableCell>
              <TableCell>{res.price}</TableCell>
              <TableCell className='max-w-32 text-ellipsis truncate'>{res.comments}</TableCell>
              <TableCell>
                <ChangeCarReservationStatus defaultValue={res.status} carReservationId={res.id} />
              </TableCell>
              <TableCell className='flex gap-2'>
                <LinkBtn href={routes.carReservations.edit(res.id)} icon={Edit} variant='outline' />
                {res.deleted_at ? <RestoreModal action={restoreCarReservaion} id={res.id} /> : <DeleteModal action={deleteCarReservaion} id={res.id} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
