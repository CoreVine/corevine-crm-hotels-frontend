import { City, Rate } from "@/types/models";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { UpdateRateModal } from "./update";
import { EmptyTableState } from "../../_components/empty-table";
import { RestoreModal } from "../../_components/restore-modal";
import { DeleteModal } from "../../_components/delete-modal";
import { CreateRateModal } from "./create";
import { deleteRate, restoreRate } from "../_helpers/actions";

type Props = {
  rates: Rate[];
};

export const RatesTable = ({ rates }: Props) => {
  if (rates.length === 0) {
    return (
      <EmptyTableState>
        <CreateRateModal />
      </EmptyTableState>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rates.map((rate) => (
          <TableRow key={`client-row-${rate.id}`}>
            <TableCell className='font-bold'>{rate.id}</TableCell>
            <TableCell>{rate.name}</TableCell>
            <TableCell className='capitalize'>{rate.state}</TableCell>
            <TableCell className='flex gap-2'>
              {!rate.deleted_at && <UpdateRateModal rate={rate} />}
              {rate.deleted_at ? (
                <RestoreModal id={rate.id} action={restoreRate} />
              ) : (
                <DeleteModal id={rate.id} action={deleteRate} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
