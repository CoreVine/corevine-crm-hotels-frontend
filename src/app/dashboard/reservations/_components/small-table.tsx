import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HotelReservation } from "@/types/models"
import { EmptyTableState } from "../../_components/empty-table"
import { LinkBtn } from "@/components/common/button-link"
import { Plus } from "lucide-react"

import { routes } from "@/lib/route"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Props = {
  reservations: HotelReservation[]
  headerBg?: string
  headerColor?: string
  headerLabel?: string
  status?: string
}

export const SmallHotelReservationsTable = ({ reservations, headerLabel, headerBg, headerColor, status }: Props) => {
  if (reservations.length === 0) {
    return (
      <EmptyTableState>
        <LinkBtn href={routes.reservations.create} icon={Plus}>
          New Reservation
        </LinkBtn>
      </EmptyTableState>
    )
  }

  return (
    <Card className='p-2 gap-0'>
      <CardHeader className='p-2 flex items-center justify-between'>
        <CardTitle>{headerLabel}</CardTitle>
        <LinkBtn variant='outline' size='sm' href={status ? routes.hotelReservations.indexWithStatus(status) : routes.hotelReservations.index}>
          View All
        </LinkBtn>
      </CardHeader>
      <CardContent className='p-2'>
        <div className='overflow-x-auto max-w-full'>
          <Table className='max-w-full'>
            <TableHeader className={cn("max-w-full", headerBg, headerColor)}>
              <TableRow>
                <TableHead className={headerColor}>Client</TableHead>
                <TableHead className={headerColor}>Check-in</TableHead>
                <TableHead className={headerColor}>Check-out</TableHead>
                <TableHead className={headerColor}>Agent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='max-w-full'>
              {reservations.map((res) => (
                <TableRow key={`res-row-${res.id}`}>
                  <TableCell>{res.reservation?.client?.name}</TableCell>
                  <TableCell>{res.check_in.toString()}</TableCell>
                  <TableCell>{res.check_in.toString()}</TableCell>
                  <TableCell>{res.reservation?.agent?.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
