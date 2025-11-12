import { Driver } from "@/types/models";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { EmptyTableState } from "../../_components/empty-table";
import { RestoreModal } from "../../_components/restore-modal";
import { DeleteModal } from "../../_components/delete-modal";

import { diffForHumans } from "@/lib/utils";
import { CreateDriverModal } from "./create";
import { UpdateDriverModal } from "./update";
import { deleteDriver, restoreDriver } from "../_helpers/actions";

type Props = {
  drivers: Driver[];
};

export const DriversTable = ({ drivers }: Props) => {
  if (drivers.length === 0) {
    return (
      <EmptyTableState>
        <CreateDriverModal />
      </EmptyTableState>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Mobile</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {drivers.map((driver) => (
          <TableRow key={`client-row-${driver.id}`}>
            <TableCell className='font-bold'>{driver.id}</TableCell>
            <TableCell>{driver.name}</TableCell>
            <TableCell>{driver.phone}</TableCell>
            <TableCell>{diffForHumans(driver.created_at)}</TableCell>
            <TableCell className='flex gap-2'>
              {!driver.deleted_at && <UpdateDriverModal driver={driver} />}
              {driver.deleted_at ? (
                <RestoreModal id={driver.id} action={restoreDriver} />
              ) : (
                <DeleteModal id={driver.id} action={deleteDriver} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
