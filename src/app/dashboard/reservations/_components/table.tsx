"use client"

import * as React from "react"

import { useChangeManyHotelReservationStatus } from "../_helpers/hooks"
import { useSearchParams } from "next/navigation"
import { useRef } from "react"

import { deleteHotelReservaion, restoreHotelReservaion } from "../_helpers/actions"
import { ReservationStatus, reservationsOrder } from "@/lib/type-lists"
import { routes } from "@/lib/route"
import { toast } from "react-toastify"
import { capitalize, cn } from "@/lib/utils"

import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowRight, ArrowUpDown, DollarSign, Edit, MailIcon, Rotate3D, View, XIcon } from "lucide-react"
import { ChangeHotelReservationStatus } from "./change-status"
import { HotelReservationDetailsModal } from "./view-modal"
import { HotelReservationState } from "@/types"
import { HotelReservation } from "@/types/models"
import { EmptyTableState } from "../../_components/empty-table"
import { RestoreModal } from "../../_components/restore-modal"
import { DeleteModal } from "../../_components/delete-modal"
import { Checkbox } from "@/components/ui/checkbox"
import { LinkBtn } from "@/components/common/button-link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { LoadingButton } from "@/components/common/loading-button"
import { SendEmailModal } from "./send-email-modal"

export const columns: ColumnDef<HotelReservation>[] = [
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label='Select all' />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Select row' />,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          ID
          <ArrowUpDown />
        </Button>
      )
    },

    cell: ({ row }) => <div className='font-bold'>{row.getValue("id")}</div>
  },
  {
    accessorKey: "reservation.client.name",
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Client
          <ArrowUpDown />
        </Button>
      )
    },

    cell: ({ row }) => (
      <div className='flex gap-2 items-center w-[400px] max-w-[200px]'>
        <p>{row.original?.reservation?.client?.name ?? "N/A"}</p>
        <p>
          <MailIcon className={cn("size-4", row.original?.reservation?.has_sent_email ? "text-green-500" : "text-gray-500")} />
        </p>
      </div>
    )
  },
  {
    accessorKey: "city.name",
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          City
          <ArrowUpDown />
        </Button>
      )
    },

    cell: ({ row }) => <div>{row.original?.city?.name ?? "N/A"}</div>
  },
  {
    accessorKey: "hotel.name",
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Hotel
          <ArrowUpDown />
        </Button>
      )
    },

    cell: ({ row }) => <div>{row.original?.hotel?.name ?? "N/A"}</div>
  },
  {
    accessorKey: "check_in",
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Check In
          <ArrowUpDown />
        </Button>
      )
    },

    cell: ({ row }) => <div>{row.original?.check_in.toString()}</div>
  },
  {
    accessorKey: "check_out",
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Check Out
          <ArrowUpDown />
        </Button>
      )
    },

    cell: ({ row }) => <div>{row.original?.check_out.toString()}</div>
  },
  {
    accessorKey: "adults",
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Adults
          <ArrowUpDown />
        </Button>
      )
    },

    cell: ({ row }) => <div>{row.original?.adults}</div>
  },
  {
    accessorKey: "reservation.client.phone",
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Phone
          <ArrowUpDown />
        </Button>
      )
    },

    cell: ({ row }) => <div>{row.original?.reservation?.client?.phone ?? "N/A"}</div>
  },
  {
    accessorKey: "confirmation_number",
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Confirmation Number
          <ArrowUpDown />
        </Button>
      )
    },

    cell: ({ row }) => <div>{row.original?.confirmation_number ?? "N/A"}</div>
  },
  {
    accessorKey: "option_date",
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Option Date
          <ArrowUpDown />
        </Button>
      )
    },

    cell: ({ row }) => <div>{row.original?.option_date.toString() ?? "N/A"}</div>
  },
  {
    accessorKey: "room.meal_type",
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Meal Type
          <ArrowUpDown />
        </Button>
      )
    },

    cell: ({ row }) => <div>{row.original?.meal?.meal_type ?? "N/A"}</div>
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown />
        </Button>
      )
    },

    cell: ({ row }) => <div>{row.original?.price ?? "N/A"}</div>
  },
  {
    accessorKey: "pax_count",
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Pax Count
          <ArrowUpDown />
        </Button>
      )
    },

    cell: ({ row }) => <div>{row.original?.pax_count ?? "N/A"}</div>
  },
  {
    accessorKey: "company.name",
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Company
          <ArrowUpDown />
        </Button>
      )
    },

    cell: ({ row }) => <div>{row.original?.company?.name}</div>
  },
  {
    accessorKey: "has_airport",
    header: "Has Airport",
    cell: ({ row }) => (
      <div>
        <Badge variant={row.original?.reservation?.has_airport ? "default" : "destructive"}>{row.original?.reservation?.has_airport ? "Yes" : "No"}</Badge>
      </div>
    )
  },
  {
    accessorKey: "has_car",
    header: "Has Car",
    cell: ({ row }) => (
      <div>
        <Badge variant={row.original?.reservation?.has_airport ? "default" : "destructive"}>{row.original?.reservation?.has_airport ? "Yes" : "No"}</Badge>
      </div>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        <ChangeHotelReservationStatus id={row.original.id} defaultValue={row.original.status} />
      </div>
    )
  },

  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className='space-x-2'>
          <LinkBtn href={routes.reservations.edit(row.original.reservation_id)} variant='outline' size='icon' icon={Edit} />
          <LinkBtn href={routes.reservations.showPayments(row.original.reservation_id)} variant='outline' size='icon' icon={DollarSign} />
          <LinkBtn href={routes.hotelReservations.historyDetails(row.original.id)} variant='outline' size='icon' icon={View} />
          <HotelReservationDetailsModal reservation={row.original} />
          {row.original.deleted_at ? <RestoreModal action={restoreHotelReservaion} id={row.original.id} /> : <DeleteModal action={deleteHotelReservaion} id={row.original.id} />}
        </div>
      )
    }
  }
]

export function HotelReservationsTable({ data, label = "Reservations", status }: { label?: string; data: HotelReservation[]; status?: string }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  let selectedRows = table.getSelectedRowModel().rows
  let selectedIds = selectedRows.map((row) => row.original.id)

  const searchParams = useSearchParams()

  const currentStatus = searchParams.get("status") as ReservationStatus
  const currentIndex = reservationsOrder.indexOf(currentStatus)
  const nextStatus = reservationsOrder[currentIndex + 1] as HotelReservationState

  const mut = useChangeManyHotelReservationStatus()

  const handleCancel = () => {
    if (selectedIds.length == 0) {
      toast.error("Please select at least one reservation")
      return
    }
    console.log("selectedIds: ", selectedIds)
    mut.mutate({
      ids: selectedIds,
      status: "cancelled"
    })
  }

  const handleRefund = () => {
    if (selectedIds.length == 0) {
      toast.error("Please select at least one reservation")
      return
    }
    console.log("selectedIds: ", selectedIds)
    mut.mutate({
      ids: selectedIds,
      status: "refunded"
    })
  }

  const handleNext = () => {
    if (selectedIds.length == 0) {
      toast.error("Please select at least one reservation")
      return
    }
    console.log("selectedIds: ", selectedIds)

    mut.mutate({
      ids: selectedIds,
      status: nextStatus
    })
  }

  if (data.length === 0) {
    return (
      <EmptyTableState>
        <LinkBtn href={routes.reservations.create} icon={Plus}>
          New Reservation
        </LinkBtn>
      </EmptyTableState>
    )
  }

  return (
    <div>
      <div className='flex justify-end gap-2 mb-4'>
        {!!status && (
          <LoadingButton onClick={handleNext} variant='outline' className='text-black'>
            Next <b>({capitalize(nextStatus)})</b> <ArrowRight size={16} />
          </LoadingButton>
        )}

        <LoadingButton icon={XIcon} onClick={handleCancel} variant='outline' className='text-black'>
          Cancel
        </LoadingButton>

        <LoadingButton icon={Rotate3D} onClick={handleRefund} variant='outline' className='text-black'>
          Refund
        </LoadingButton>

        <SendEmailModal selectedIds={[]} />
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
