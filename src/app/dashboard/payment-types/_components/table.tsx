import { City, PaymentType } from "@/types/models";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { UpdatePaymentTypeModal } from "./update";
import { EmptyTableState } from "../../_components/empty-table";
import { RestoreModal } from "../../_components/restore-modal";
import { DeleteModal } from "../../_components/delete-modal";
import { CreatePaymentTypeModal } from "./create";
import { deletePaymentType, restorePaymentType } from "../_helpers/actions";

type Props = {
  paymentTypes: PaymentType[];
};

export const PaymentTypesTable = ({ paymentTypes }: Props) => {
  if (paymentTypes.length === 0) {
    return (
      <EmptyTableState>
        <CreatePaymentTypeModal />
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
        {paymentTypes.map((paymentType) => (
          <TableRow key={`pt-row-${paymentType.id}`}>
            <TableCell className='font-bold'>{paymentType.id}</TableCell>
            <TableCell>{paymentType.name}</TableCell>
            <TableCell className='capitalize'>{paymentType.state}</TableCell>
            <TableCell className='flex gap-2'>
              {!paymentType.deleted_at && <UpdatePaymentTypeModal paymentType={paymentType} />}
              {paymentType.deleted_at ? (
                <RestoreModal id={paymentType.id} action={restorePaymentType} />
              ) : (
                <DeleteModal id={paymentType.id} action={deletePaymentType} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
