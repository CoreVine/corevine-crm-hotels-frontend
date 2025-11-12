import { Client } from "@/types/models";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { CreateClientModal } from "./create";
import { UpdateClientModal } from "./update";
import { EmptyTableState } from "../../_components/empty-table";
import { RestoreModal } from "../../_components/restore-modal";
import { DeleteModal } from "../../_components/delete-modal";

import { diffForHumans } from "@/lib/utils";
import { deleteClient, restoreClient } from "../_helpers/actions";

type Props = {
  clients: Client[];
};

export const ClientsTable = ({ clients }: Props) => {
  if (clients.length === 0) {
    return (
      <EmptyTableState>
        <CreateClientModal />
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
          <TableHead>E-mail</TableHead>
          <TableHead>Nationality</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={`client-row-${client.id}`}>
            <TableCell className='font-bold'>{client.id}</TableCell>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.phone}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.nationality}</TableCell>
            <TableCell>{diffForHumans(client.created_at)}</TableCell>
            <TableCell className='flex gap-2'>
              {!client.deleted_at && <UpdateClientModal client={client} />}
              {client.deleted_at ? (
                <RestoreModal id={client.id} action={restoreClient} />
              ) : (
                <DeleteModal id={client.id} action={deleteClient} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
