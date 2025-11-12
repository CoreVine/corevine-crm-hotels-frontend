"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreateHotelAgingModal } from "./create-modal"
import { EmptyTableState } from "@/app/dashboard/_components/empty-table"
import { HotelAging } from "@/types/models"
import { UpdateHotelAgingModal } from "./update-modal"
import { capitalize } from "@/lib/utils"

type Props = {
  data: HotelAging[]
  hotelId: number
}

export function HotelAgingTable({ data, hotelId }: Props) {
  if (data.length === 0) return <TableEmptyState hotelId={hotelId} />

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reference ID</TableHead>
          <TableHead>Reservation ID</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Hotel</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={`hotel-aging-row-${item.id}`}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.reservation_id}</TableCell>
            <TableCell>{item.category.name}</TableCell>
            <TableCell>{item.due_date.toString()}</TableCell>
            <TableCell className='captalize'>
              {item.amount} {item?.currency?.code}
            </TableCell>
            <TableCell>{capitalize(item.status)}</TableCell>
            <TableCell>{capitalize(item.payment_method)}</TableCell>
            <TableCell>{item?.hotel?.name}</TableCell>
            <TableCell>{item?.notes || "N/A"}</TableCell>
            <TableCell className='flex gap-2'>
              <UpdateHotelAgingModal hotelId={hotelId} aging={item} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function TableEmptyState({ hotelId }: { hotelId: number }) {
  return (
    <EmptyTableState>
      <CreateHotelAgingModal hotelId={hotelId} />
    </EmptyTableState>
  )
}
