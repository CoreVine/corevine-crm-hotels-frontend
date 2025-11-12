import { Room } from "@/types/models";
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
import { CreateRoomModal } from "./create";
import { UpdateRoomModal } from "./update";
import { deleteRoom, restoreRoom } from "../_helpers/actions";

type Props = {
  rooms: Room[];
};

export const RoomsTable = ({ rooms }: Props) => {
  if (rooms.length === 0) {
    return (
      <EmptyTableState>
        <CreateRoomModal />
      </EmptyTableState>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Room Type</TableHead>
          <TableHead>Hotel</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rooms.map((room) => (
          <TableRow key={`client-row-${room.id}`}>
            <TableCell className='font-bold'>{room.id}</TableCell>
            <TableCell>{room.room_type}</TableCell>
            <TableCell className='capitalize'>{room.hotel.name}</TableCell>
            <TableCell className='flex gap-2'>
              {!room.deleted_at && <UpdateRoomModal room={room} />}
              {room.deleted_at ? (
                <RestoreModal id={room.id} action={restoreRoom} />
              ) : (
                <DeleteModal id={room.id} action={deleteRoom} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
