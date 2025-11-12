"use client"

import { routes } from "@/lib/route"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UpdateReservationPaymentModal } from "./update-modal"
import { ReservationPayment } from "@/types/models"
import { EmptyTableState } from "../../../../_components/empty-table"
import { LinkBtn } from "@/components/common/button-link"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { CreateReservationPaymentModal } from "./create-modal"
import { ViewReservationPaymentModal } from "./view-modal"
import { useUser } from "@/hooks/auth/use-user"

type Props = {
  data: ReservationPayment[]
  reservationId: number
}

export function ReservationPaymentsTable({ data, reservationId }: Props) {
  const user = useUser()
  if (data.length === 0) return <TableEmptyState reservationId={reservationId} />

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Payment ID</TableHead>
          <TableHead>Reservation ID</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Hotel</TableHead>
          <TableHead>Check-in</TableHead>
          <TableHead>Check-out</TableHead>
          <TableHead>Adults</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Confirmation Number</TableHead>
          <TableHead>Option Date</TableHead>
          <TableHead>Meal</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Has Airport</TableHead>
          <TableHead>Has Car</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Debit</TableHead>
          <TableHead>Credit</TableHead>
          <TableHead>Profit</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={`reservation-payment-row-${item.id}`}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.reservation_id}</TableCell>
            <TableCell>{item.reservation?.client?.name}</TableCell>
            <TableCell>{item.reservation?.hotel?.city?.name}</TableCell>
            <TableCell>{item.reservation?.hotel?.hotel?.name}</TableCell>
            <TableCell>{item.reservation?.hotel?.check_in?.toString()}</TableCell>
            <TableCell>{item.reservation?.hotel?.check_out?.toString()}</TableCell>
            <TableCell>{item.reservation?.hotel?.adults}</TableCell>
            <TableCell>{item.reservation?.client?.phone}</TableCell>
            <TableCell>{item.reservation?.hotel?.confirmation_number}</TableCell>
            <TableCell>{item.reservation?.hotel?.option_date?.toString()}</TableCell>
            <TableCell>{item.reservation?.hotel?.meal?.meal_type}</TableCell>
            <TableCell>{item.reservation?.hotel?.company?.name}</TableCell>
            <TableCell>
              <Badge variant={item?.reservation?.has_airport ? "default" : "destructive"}>{item?.reservation?.has_airport ? "Yes" : "No"}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={item?.reservation?.has_car ? "default" : "destructive"}>{item?.reservation?.has_car ? "Yes" : "No"}</Badge>
            </TableCell>
            <TableCell>{item?.category?.name}</TableCell>
            <TableCell className='uppercase font-bold'>
              {item.debit} {item?.currency?.code}
            </TableCell>
            <TableCell className='uppercase font-bold'>
              {item.credit} {item?.currency?.code}
            </TableCell>
            <TableCell className='uppercase font-bold'>
              {item.profit} {item?.currency?.code}
            </TableCell>
            <TableCell className='flex gap-2'>
              {["finance", "admin"].includes(user?.role!) && <UpdateReservationPaymentModal payment={item} />}
              <ViewReservationPaymentModal payment={item} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function TableEmptyState({ reservationId }: { reservationId: number }) {
  return (
    <EmptyTableState>
      <CreateReservationPaymentModal reservationId={+reservationId} />
    </EmptyTableState>
  )
}
