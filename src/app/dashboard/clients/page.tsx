import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../_components/pagination"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { ClientsTable } from "./_components/table"
import { SearchFilter } from "../_components/search"
import { CreateClientModal } from "./_components/create"

import { LinkBtn } from "@/components/common/button-link"
import { ArchiveIcon } from "lucide-react"
import { getClients } from "./_helpers/actions"
import { routes } from "@/lib/route"

export const metadata: Metadata = {
  title: "Clients"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function ClientsPage({ searchParams }: Props) {
  const { search, page } = await searchParams

  const data = await getClients(search, page)

  return (
    <div>
      <PageTitle label='Clients'>
        <CreateClientModal />
        <LinkBtn href={routes.clients.trashed} icon={ArchiveIcon} variant='outline-warning'>
          Archived
        </LinkBtn>
      </PageTitle>
      <section>
        <SearchFilter />
      </section>
      <section className='mt-4'>
        <ClientsTable clients={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
