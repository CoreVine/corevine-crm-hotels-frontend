import { City } from "@/types/models";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { CreateCityModal } from "./create";
import { UpdateCityModal } from "./update";
import { EmptyTableState } from "../../_components/empty-table";
import { RestoreModal } from "../../_components/restore-modal";
import { DeleteModal } from "../../_components/delete-modal";

import { deleteCity, restoreCity } from "../_helpers/actions";

type Props = {
  cities: City[];
};

export const CitiesTable = ({ cities }: Props) => {
  if (cities.length === 0) {
    return (
      <EmptyTableState>
        <CreateCityModal />
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
        {cities.map((city) => (
          <TableRow key={`client-row-${city.id}`}>
            <TableCell className='font-bold'>{city.id}</TableCell>
            <TableCell>{city.name}</TableCell>
            <TableCell className='capitalize'>{city.state}</TableCell>
            <TableCell className='flex gap-2'>
              {!city.deleted_at && <UpdateCityModal city={city} />}
              {city.deleted_at ? (
                <RestoreModal id={city.id} action={restoreCity} />
              ) : (
                <DeleteModal id={city.id} action={deleteCity} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
