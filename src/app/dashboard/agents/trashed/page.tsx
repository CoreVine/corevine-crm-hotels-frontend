import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../../_components/pagination"
import { AgentsTable } from "../_components/table"
import { SearchFilter } from "../../_components/search"
import { PageTitle } from "../../_components/title"
import { Metadata } from "next"
import { GoBack } from "../../_components/go-back"

import { getTrashedAgents } from "../_helpers/actions"

export const metadata: Metadata = {
  title: "Archived Agents"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function ClientsPage({ searchParams }: Props) {
  const sp = await searchParams
  const data = await getTrashedAgents(sp)

  return (
    <div>
      <PageTitle label='Archived Agents'>
        <GoBack />
      </PageTitle>

      <SearchFilter />

      <section className='mt-4'>
        <AgentsTable agents={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
