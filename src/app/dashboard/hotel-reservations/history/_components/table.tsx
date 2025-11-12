import { HotelReservationLog, User } from "@/types/models"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { diffForHumans } from "@/lib/utils"
import { LinkBtn } from "@/components/common/button-link"
import { routes } from "@/lib/route"
import { Eye } from "lucide-react"
import { EmptyTableState } from "@/app/dashboard/_components/empty-table"

type Props = {
  logs: HotelReservationLog[]
}

export const HotelReservationLogsTable = ({ logs }: Props) => {
  if (logs.length === 0) return <EmptyTableState />

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Log ID</TableHead>
          <TableHead>Reservation ID</TableHead>

          <TableHead>Client Name</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Hotel</TableHead>
          <TableHead>Check In</TableHead>
          <TableHead>Check Out</TableHead>
          <TableHead>Mobile No</TableHead>
          <TableHead>Confirmation No</TableHead>
          <TableHead>Option Date</TableHead>
          <TableHead>Room Type</TableHead>
          <TableHead>Meal</TableHead>
          <TableHead>View</TableHead>
          <TableHead>Total Price</TableHead>

          <TableHead>By</TableHead>
          <TableHead>At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={`log-row-${log.id}`}>
            <TableCell className='font-bold'>{log.id}</TableCell>
            <TableCell>{log.subject_id}</TableCell>

            <TableCell>{log.subject?.reservation?.client?.name || "N/A"}</TableCell>
            <TableCell>{log.subject?.city?.name}</TableCell>
            <TableCell>{log.subject?.hotel?.name}</TableCell>
            <TableCell>{log.subject?.check_in.toString()}</TableCell>
            <TableCell>{log.subject?.check_out.toString()}</TableCell>
            <TableCell>{log.subject?.reservation?.client?.phone}</TableCell>
            <TableCell>{log.subject.confirmation_number}</TableCell>
            <TableCell>{log.subject.option_date.toString()}</TableCell>
            <TableCell>{log.subject?.room?.room_type}</TableCell>
            <TableCell>{log.subject?.meal?.meal_type}</TableCell>
            <TableCell>{log.subject.view}</TableCell>
            <TableCell>{log.subject.price}</TableCell>

            <TableCell>{log?.causer?.name}</TableCell>
            <TableCell>{diffForHumans(log.created_at)}</TableCell>
            <TableCell>
              <LinkBtn href={routes.hotelReservations.historySingleDetail(log.subject_id, log.id)} variant='outline' size='icon' icon={Eye} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
