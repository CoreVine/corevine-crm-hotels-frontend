"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { Expense } from "@/types/models"

type Props = {
  expense: Expense
}

export function ViewExpenseModal({ expense }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button icon={Eye} size='icon' variant='outline' />
      </DialogTrigger>
      <DialogContent className='min-w-[800px] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>View Expense</DialogTitle>
        </DialogHeader>
        <ul className='space-y-2'>
          <li className='flex justify-between items-center'>
            <span className='text-lg'>Expense ID: </span>
            <span className='text-lg font-semibold'>{expense.id}</span>
          </li>
          <li className='flex justify-between items-center'>
            <span className='text-lg'>Category: </span>
            <span className='text-lg font-semibold'>{expense.category?.name}</span>
          </li>
          <li className='flex justify-between items-center'>
            <span className='text-lg'>Amount: </span>
            <span className='text-lg font-semibold'>
              {expense.amount} {expense.currency?.name}
            </span>
          </li>
          <li className='flex justify-between items-center'>
            <span className='text-lg'>Receipt Number: </span>
            <span className='text-lg font-semibold'>{expense.receipt_number}</span>
          </li>
          <li className='flex justify-between items-center'>
            <span className='text-lg'>Statement: </span>
            <span className='text-lg font-semibold'>{expense.statement || "N/A"}</span>
          </li>
          <li className='flex justify-between items-center'>
            <span className='text-lg'>Date: </span>
            <span className='text-lg font-semibold'>{expense.date.toString()}</span>
          </li>
          <li className='flex justify-between items-center'>
            <span className='text-lg'>Notes: </span>
            <span className='text-lg font-semibold'>{expense.notes || "N/A"}</span>
          </li>
          <li>
            <span className='text-lg'>Status: </span>
            <span className='text-lg font-semibold'>{expense.status}</span>
          </li>

          <li className='flex justify-between items-center'>
            <span className='text-lg'>Payment Method: </span>
            <span className='text-lg font-semibold'>{expense.payment_method}</span>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  )
}
