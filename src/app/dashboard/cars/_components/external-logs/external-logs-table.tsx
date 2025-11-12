"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EmptyTableState } from "../../../_components/empty-table"
import { ExternalCarLog } from "@/types/models"
import { UpdateCarExternalLogModal } from "./update-external-log"
import { useUser } from "@/hooks/auth/use-user"

type Props = {
  logs: ExternalCarLog[]
}

export const ExternalCarLogsTable = ({ logs }: Props) => {
  const user = useUser()
  if (logs.length === 0) return <EmptyTableState />

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Log ID</TableHead>
          <TableHead>Reservation ID</TableHead>
          <TableHead>Car</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Cost (USD)</TableHead>
          <TableHead>Collection (USD)</TableHead>
          <TableHead>Profit (USD)</TableHead>
          <TableHead>Amount (EGP)</TableHead>
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
            <TableCell>{log.cost} USD</TableCell>
            <TableCell>{log.collection} USD</TableCell>
            <TableCell>{log.profit} USD</TableCell>
            <TableCell>{log.amount_egp} EGP</TableCell>
            <TableCell>{log.notes || "N/A"}</TableCell>
            <TableCell>{log?.date?.toString()}</TableCell>
            <TableCell className='flex gap-2'>{user?.role === "admin" && <UpdateCarExternalLogModal car={log.car} log={log} />}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
