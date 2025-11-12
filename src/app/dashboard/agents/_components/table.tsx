import { User } from "@/types/models"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { CreateAgentModal } from "./create"
import { UpdateAgentModal } from "./update"
import { EmptyTableState } from "../../_components/empty-table"
import { RestoreModal } from "../../_components/restore-modal"
import { DeleteModal } from "../../_components/delete-modal"

import { diffForHumans } from "@/lib/utils"
import { deleteAgent, restoreAgent } from "../_helpers/actions"

type Props = {
  agents: User[]
}

export const AgentsTable = ({ agents }: Props) => {
  if (agents.length === 0) {
    return (
      <EmptyTableState>
        <CreateAgentModal />
      </EmptyTableState>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Mobile</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agents.map((agent) => (
          <TableRow key={`client-row-${agent.id}`}>
            <TableCell className='font-bold'>{agent.id}</TableCell>
            <TableCell>{agent.name}</TableCell>
            <TableCell>{agent.contact_number}</TableCell>
            <TableCell>{agent.email}</TableCell>
            <TableCell className='captilize'>{agent.role}</TableCell>
            <TableCell>{diffForHumans(agent.created_at)}</TableCell>
            <TableCell className='flex gap-2'>
              {!!!agent.deleted_at && <UpdateAgentModal agent={agent} />}
              {!!agent.deleted_at ? <RestoreModal id={agent.id} action={restoreAgent} /> : <DeleteModal id={agent.id} action={deleteAgent} />}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
