import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { ChangeAirportReservationStatus } from "./change-status"
import { EmptyTableState } from "../../_components/empty-table"
import { AirportReservation } from "@/types/models"
import { LinkBtn } from "@/components/common/button-link"
import { Edit, Plus } from "lucide-react"

import { routes } from "@/lib/route"
import { diffForHumans } from "@/lib/utils"
import { DeleteModal } from "../../_components/delete-modal"
import { deleteAirportReservaion, restoreAirportReservaion } from "../_helpers/actions"
import { RestoreModal } from "../../_components/restore-modal"

type Props = {
  airportReservations: AirportReservation[]
}

export const AirportReservationsTable = ({ airportReservations }: Props) => {
  if (airportReservations.length === 0) {
    return (
      <EmptyTableState>
        <LinkBtn href={routes.airportReservations.create} icon={Plus}>
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
            <TableHead>Runner</TableHead>
            <TableHead>Airline</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='max-w-full'>
          {airportReservations.map((res) => (
            <TableRow key={`res-row-${res.id}`}>
              <TableCell className='font-bold'>{res.id}</TableCell>
              <TableCell>{res?.reservation?.client?.name}</TableCell>
              <TableCell>{res?.reservation?.client?.phone}</TableCell>
              <TableCell>{res?.reservation?.client?.nationality}</TableCell>
              <TableCell>{diffForHumans(res.arrival_date)}</TableCell>
              <TableCell>{res.arrival_time}</TableCell>
              <TableCell>{res.runner}</TableCell>
              <TableCell>{res.airline}</TableCell>
              <TableCell>{res.price}</TableCell>
              <TableCell>
                <ChangeAirportReservationStatus
                  defaultValue={res.status}
                  airportReservationId={res.id}
                />
              </TableCell>
              <TableCell className='flex gap-2'>
                <LinkBtn
                  href={routes.airportReservations.edit(res.id)}
                  icon={Edit}
                  variant='outline'
                />
                {res.deleted_at ? (
                  <RestoreModal action={restoreAirportReservaion} id={res.id} />
                ) : (
                  <DeleteModal action={deleteAirportReservaion} id={res.id} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
