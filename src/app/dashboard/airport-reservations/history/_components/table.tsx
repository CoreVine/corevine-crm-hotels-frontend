import { AirportReservationLog } from "@/types/models"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { diffForHumans } from "@/lib/utils"

import { EmptyTableState } from "@/app/dashboard/_components/empty-table"
import { LinkBtn } from "@/components/common/button-link"
import { routes } from "@/lib/route"
import { Eye } from "lucide-react"

type Props = {
  logs: AirportReservationLog[]
}

export const AirportReservationLogsTable = ({ logs }: Props) => {
  if (logs.length === 0) return <EmptyTableState />

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Log ID</TableHead>
          <TableHead>Subject ID</TableHead>

          <TableHead>Client Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Nationality</TableHead>
          <TableHead>Arrival Date</TableHead>
          <TableHead>Arrival Time</TableHead>
          <TableHead>Runner</TableHead>
          <TableHead>Airline</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>

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

            <TableCell>{log?.subject?.reservation?.client?.name}</TableCell>
            <TableCell>{log?.subject?.reservation?.client?.phone}</TableCell>
            <TableCell>{log?.subject?.reservation?.client?.nationality}</TableCell>
            <TableCell>{diffForHumans(log?.subject?.arrival_date)}</TableCell>
            <TableCell>{log.subject?.arrival_time}</TableCell>
            <TableCell>{log.subject?.runner}</TableCell>
            <TableCell>{log.subject?.airline}</TableCell>
            <TableCell>{log.subject?.price}</TableCell>
            <TableCell>{log.subject?.status}</TableCell>

            <TableCell>{log?.causer?.name}</TableCell>
            <TableCell>{diffForHumans(log.created_at)}</TableCell>
            <TableCell>
              <LinkBtn href={routes.airportReservations.historySingleDetail(log.subject_id, log.id)} variant='outline' icon={Eye} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
