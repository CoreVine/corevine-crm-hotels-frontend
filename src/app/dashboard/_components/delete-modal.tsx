"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { showResponse } from "@/lib/utils"

import { LoadingButton } from "@/components/common/loading-button"
import { ApiResponse } from "@/types"
import { Button } from "@/components/ui/button"
import { ArchiveIcon, Trash } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

interface Props {
  id: number
  dialogTitle?: string
  dialogDescription?: string
  children?: React.ReactNode
  asChild?: boolean
  action: (id: number) => Promise<ApiResponse<any>>
}

export const DeleteModal = ({
  dialogTitle = "Archive Action",
  dialogDescription = "Are you sure that you want to archive this item?",
  id,
  children,
  asChild = true,
  action
}: Props) => {
  const [open, setOpen] = useState(false)

  const forceDeleteMutation = useMutation({
    mutationFn: () => action(id),
    onSuccess: (data) =>
      showResponse(data, () => {
        setOpen(false)
      })
  })

  const handleDelete = () => {
    forceDeleteMutation.mutate()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>
        {children ? (
          children
        ) : (
          <Button variant='outline-warning' size='icon'>
            <ArchiveIcon className='size-4' />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Close</Button>
          </DialogClose>
          <LoadingButton
            loading={forceDeleteMutation.isPending}
            variant='outline-warning'
            onClick={handleDelete}
          >
            Archive
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
