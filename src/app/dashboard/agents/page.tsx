import { TSearchParams } from "@/types"
import { PaginationLinks } from "../_components/pagination"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { AgentsTable } from "./_components/table"
import { SearchFilter } from "../_components/search"
import { CreateAgentModal } from "./_components/create"
import { ArchiveIcon, Trash } from "lucide-react"
import { LinkBtn } from "@/components/common/button-link"

import { getAgents } from "./_helpers/actions"
import { routes } from "@/lib/route"
import { isAdmin } from "@/actions/auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Agents"
}

type Props = {
  searchParams: Promise<TSearchParams>
}

export default async function AgentsPage({ searchParams }: Props) {
  const sp = await searchParams
  const data = await getAgents(sp)

  if (!(await isAdmin())) return redirect(routes.home)

  return (
    <div>
      <PageTitle label='Agents'>
        <CreateAgentModal />
        <LinkBtn href={routes.agents.trashed} icon={ArchiveIcon} variant='outline-warning'>
          Archived
        </LinkBtn>
      </PageTitle>
      <section>
        <SearchFilter />
      </section>
      <section className='mt-4'>
        <AgentsTable agents={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
