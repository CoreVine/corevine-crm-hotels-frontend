"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { EmptyTableState } from "../../_components/empty-table"
import { Voucher } from "@/types/models"
import { Edit, File, FileIcon, Plus } from "lucide-react"

import { routes } from "@/lib/route"

import { LinkBtn } from "@/components/common/button-link"
import { Button } from "@/components/ui/button"
import { API_URL } from "@/lib/constants"

type Props = {
  vouchers: Voucher[]
}

export const VouchersTable = ({ vouchers }: Props) => {
  if (vouchers.length === 0) {
    return (
      <EmptyTableState>
        <LinkBtn href={routes.vouchers.create} icon={Plus}>
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
            <TableHead>City</TableHead>
            <TableHead>Hotel</TableHead>
            <TableHead>Room Type</TableHead>
            <TableHead>Meal Type</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Nationality</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Check-out</TableHead>
            <TableHead>Rooms Count</TableHead>
            <TableHead>View</TableHead>
            <TableHead>Pax</TableHead>
            <TableHead>Internal Confirm</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='max-w-full'>
          {vouchers.map((voucher) => (
            <TableRow key={`res-row-${voucher.id}`}>
              <TableCell className='font-bold'>{voucher.id}</TableCell>
              <TableCell>{voucher.city?.name ?? "N/A"}</TableCell>
              <TableCell>{voucher.hotel?.name ?? "N/A"}</TableCell>
              <TableCell>{voucher.room?.room_type ?? "N/A"}</TableCell>
              <TableCell>{voucher.meal?.meal_type ?? "N/A"}</TableCell>
              <TableCell>{voucher.client_name ?? "N/A"}</TableCell>
              <TableCell>{voucher.nationality ?? "N/A"}</TableCell>
              <TableCell>{voucher.check_in ? voucher.check_in.toString() : "N/A"}</TableCell>
              <TableCell>{voucher.check_out ? voucher.check_out.toString() : "N/A"}</TableCell>
              <TableCell>{voucher.rooms_count ?? 0}</TableCell>
              <TableCell>{voucher.view ?? "N/A"}</TableCell>
              <TableCell>{voucher.pax ?? "N/A"}</TableCell>
              <TableCell>{voucher.internal_confirmation ?? "N/A"}</TableCell>
              <TableCell>{voucher.company?.name ?? "N/A"}</TableCell>
              <TableCell>{voucher.notes ?? "N/A"}</TableCell>
              <TableCell className='space-x-2'>
                <LinkBtn
                  href={routes.vouchers.edit(voucher.id)}
                  variant='outline'
                  size='icon'
                  icon={Edit}
                />
                <a href={`${API_URL}/vouchers/${voucher.id}/pdf`} target='_blank' download>
                  <Button icon={FileIcon} variant='outline' size='icon' />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
