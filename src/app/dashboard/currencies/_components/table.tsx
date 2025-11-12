import { Category, Currency } from "@/types/models"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { CreateCurrencyModal } from "./create"
import { UpdateCurrencyModal } from "./update"
import { EmptyTableState } from "../../_components/empty-table"
import { RestoreModal } from "../../_components/restore-modal"
import { DeleteModal } from "../../_components/delete-modal"

import { deleteCurrency, restoreCurrency } from "../_helpers/actions"
import { Badge } from "@/components/ui/badge"

type Props = {
  currencies: Currency[]
}

export const CurrenciesTable = ({ currencies }: Props) => {
  if (currencies.length === 0) {
    return (
      <EmptyTableState>
        <CreateCurrencyModal />
      </EmptyTableState>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Is Active?</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currencies.map((currency) => (
          <TableRow key={`client-row-${currency.id}`}>
            <TableCell className='font-bold'>{currency.id}</TableCell>
            <TableCell>{currency.name}</TableCell>
            <TableCell className='capitalize'>{currency.code}</TableCell>
            <TableCell>{currency.value}</TableCell>
            <TableCell>{currency.is_active ? <Badge variant='outline'>Yes</Badge> : <Badge variant='destructive'>No</Badge>}</TableCell>
            <TableCell className='flex gap-2'>
              {!currency.deleted_at && <UpdateCurrencyModal currency={currency} />}
              {currency.deleted_at ? <RestoreModal id={currency.id} action={restoreCurrency} /> : <DeleteModal id={currency.id} action={deleteCurrency} />}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
