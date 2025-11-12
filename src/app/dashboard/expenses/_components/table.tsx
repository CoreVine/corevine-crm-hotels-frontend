"use client"

import { Expense } from "@/types/models"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { UpdateExpenseModal } from "./update-modal"
import { CreateExpenseModal } from "./create-modal"
import { EmptyTableState } from "../../_components/empty-table"
import { RestoreModal } from "../../_components/restore-modal"
import { DeleteModal } from "../../_components/delete-modal"

import { diffForHumans } from "@/lib/utils"
import { deleteExpense, restoreExpense } from "../_helpers/actions"
import { useUser } from "@/hooks/auth/use-user"
import { ViewExpenseModal } from "./view-modal"

type Props = {
  data: Expense[]
}

export const ExpensesTable = ({ data }: Props) => {
  const user = useUser()

  if (data.length === 0) {
    return (
      <EmptyTableState>
        <CreateExpenseModal />
      </EmptyTableState>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Receipt Number</TableHead>
          <TableHead>Statement</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead>Created Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={`expense-row-${item.id}`}>
            <TableCell className='font-bold'>{item.id}</TableCell>
            <TableCell>{item?.category?.name}</TableCell>
            <TableCell>
              {item.amount} {item?.currency?.name}
            </TableCell>
            <TableCell>{item.receipt_number}</TableCell>
            <TableCell>{item.statement || "N/A"}</TableCell>
            <TableCell>{item.date.toString()}</TableCell>
            <TableCell>{item.notes || "N/A"}</TableCell>
            <TableCell>{diffForHumans(item.created_at)}</TableCell>
            <TableCell className='flex gap-2 w-100'>
              <ViewExpenseModal expense={item} />
              {(user?.role === "finance" || user?.role === "admin") && <UpdateExpenseModal expense={item} />}
              {user?.role === "admin" && (
                <>
                  <DeleteModal action={deleteExpense} id={item.id} />
                  <RestoreModal action={restoreExpense} id={item.id} />
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
