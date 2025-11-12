"use client"

import { Car } from "@/types/models"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { CreateCarModal } from "./create"
import { UpdateCarModal } from "./update"
import { EmptyTableState } from "../../_components/empty-table"
import { RestoreModal } from "../../_components/restore-modal"
import { DeleteModal } from "../../_components/delete-modal"
import { deleteCar, restoreCar } from "../_helpers/actions"
import { CreateCarInternalLogModal } from "./internal-logs/create-internal-log"
import { LinkBtn } from "@/components/common/button-link"
import { DollarSign, Eye, HistoryIcon } from "lucide-react"
import { routes } from "@/lib/route"
import { useUser } from "@/hooks/auth/use-user"

type Props = {
  cars: Car[]
}

export const CarsTable = ({ cars }: Props) => {
  const user = useUser()

  if (cars.length === 0) {
    return (
      <EmptyTableState>
        <CreateCarModal />
      </EmptyTableState>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Make</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Vin</TableHead>
          <TableHead>Seating Capacity</TableHead>
          <TableHead>Transmission</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cars.map((car) => (
          <TableRow key={`car-row-${car.id}`}>
            <TableCell className='font-bold'>{car.id}</TableCell>
            <TableCell>{car.make}</TableCell>
            <TableCell>{car.model}</TableCell>
            <TableCell>{car.year}</TableCell>
            <TableCell>{car.vin}</TableCell>
            <TableCell>{car.seating_capacity}</TableCell>
            <TableCell className='captalize'>{car.transmission}</TableCell>
            <TableCell className='captalize'>{car.type}</TableCell>
            <TableCell className='flex gap-2 min-w-[200px]'>
              {!car.deleted_at && (
                <>
                  {user?.role === "admin" && <UpdateCarModal car={car} />}
                  <LinkBtn variant='outline-destructive' size='icon' icon={HistoryIcon} href={routes.cars.show(car.id)} />
                </>
              )}
              {user?.role === "admin" && <>{car.deleted_at ? <RestoreModal id={car.id} action={restoreCar} /> : <DeleteModal id={car.id} action={deleteCar} />}</>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
