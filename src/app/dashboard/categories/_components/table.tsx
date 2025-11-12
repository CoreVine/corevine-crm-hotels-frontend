import { Category } from "@/types/models"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { CreateCategoryModal } from "./create"
import { UpdateCategoryModal } from "./update"
import { EmptyTableState } from "../../_components/empty-table"
import { RestoreModal } from "../../_components/restore-modal"
import { DeleteModal } from "../../_components/delete-modal"

import { deleteCategory, restoreCategory } from "../_helpers/actions"
import { Badge } from "@/components/ui/badge"

type Props = {
  categories: Category[]
}

export const CategoriesTable = ({ categories }: Props) => {
  if (categories.length === 0) {
    return (
      <EmptyTableState>
        <CreateCategoryModal />
      </EmptyTableState>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Is Active?</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={`client-row-${category.id}`}>
            <TableCell className='font-bold'>{category.id}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell className='capitalize'>{category.type}</TableCell>
            <TableCell>{category.is_active ? <Badge variant='outline'>Yes</Badge> : <Badge variant='destructive'>No</Badge>}</TableCell>
            <TableCell className='flex gap-2'>
              {!category.deleted_at && <UpdateCategoryModal category={category} />}
              {category.deleted_at ? <RestoreModal id={category.id} action={restoreCategory} /> : <DeleteModal id={category.id} action={deleteCategory} />}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
