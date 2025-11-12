import { Company } from "@/types/models";
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
import { CreateCompanyModal } from "./create";
import { deleteCompany, restoreCompany } from "../_helpers/actions";
import { UpdateCompanyModal } from "./update";

type Props = {
  companies: Company[];
};

export const CompaniesTable = ({ companies }: Props) => {
  if (companies.length === 0) {
    return (
      <EmptyTableState>
        <CreateCompanyModal />
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
        {companies.map((company) => (
          <TableRow key={`client-row-${company.id}`}>
            <TableCell className='font-bold'>{company.id}</TableCell>
            <TableCell>{company.name}</TableCell>
            <TableCell className='capitalize'>{company.state}</TableCell>
            <TableCell className='flex gap-2'>
              {!company.deleted_at && <UpdateCompanyModal company={company} />}
              {company.deleted_at ? (
                <RestoreModal id={company.id} action={restoreCompany} />
              ) : (
                <DeleteModal id={company.id} action={deleteCompany} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
