import { Meal } from "@/types/models";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { CreateMealModal } from "./create";
import { UpdateMealModal } from "./update";
import { EmptyTableState } from "../../_components/empty-table";
import { RestoreModal } from "../../_components/restore-modal";
import { DeleteModal } from "../../_components/delete-modal";

import { deleteMeal, restoreMeal } from "../_helpers/actions";

type Props = {
  meals: Meal[];
};

export const MealsTable = ({ meals }: Props) => {
  if (meals.length === 0) {
    return (
      <EmptyTableState>
        <CreateMealModal />
      </EmptyTableState>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Meal Type</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {meals.map((meal) => (
          <TableRow key={`client-row-${meal.id}`}>
            <TableCell className='font-bold'>{meal.id}</TableCell>
            <TableCell>{meal.meal_type}</TableCell>
            <TableCell className='capitalize'>{meal.state}</TableCell>
            <TableCell className='flex gap-2'>
              {!meal.deleted_at && <UpdateMealModal meal={meal} />}
              {meal.deleted_at ? (
                <RestoreModal id={meal.id} action={restoreMeal} />
              ) : (
                <DeleteModal id={meal.id} action={deleteMeal} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
