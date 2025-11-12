"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EmptyTableState } from "../../../_components/empty-table"
import { InternalCarLog } from "@/types/models"
import { LinkBtn } from "@/components/common/button-link"

import { routes } from "@/lib/route"
import { UpdateCarInternalLogModal } from "./update-internal-log"
import { useUser } from "@/hooks/auth/use-user"

type Props = {
  logs: InternalCarLog[]
}

export const InternalCarLogsTable = ({ logs }: Props) => {
  const user = useUser()

  if (logs.length === 0) {
    return (
      <EmptyTableState>
        <LinkBtn href={routes.cars.internalLogs.create}>Create New Log</LinkBtn>
      </EmptyTableState>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Log ID</TableHead>
          <TableHead>Reservation ID</TableHead>
          <TableHead>Car</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Price (USD)</TableHead>
          <TableHead>Amount (Currency)</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={`car-row-${log.id}`}>
            <TableCell className='font-bold'>{log.id}</TableCell>
            <TableCell>{log.reservation_id}</TableCell>
            <TableCell>
              {log.car?.make} {log.car?.model} {log.car?.year}
            </TableCell>
            <TableCell>{log.driver?.name}</TableCell>
            <TableCell>{log.client?.name}</TableCell>
            <TableCell>{log.price_usd}</TableCell>
            <TableCell>
              {log.amount} <span className='uppercase'>({log.currency?.code})</span>
            </TableCell>
            <TableCell>{log.notes || "N/A"}</TableCell>
            <TableCell>{log.date?.toString()}</TableCell>
            <TableCell className='flex gap-2'>{user?.role === "admin" && <UpdateCarInternalLogModal car={log.car} log={log} />}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
