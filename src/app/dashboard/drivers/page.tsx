import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../_components/pagination"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { SearchFilter } from "../_components/search"
import { ArchiveIcon, Trash } from "lucide-react"
import { LinkBtn } from "@/components/common/button-link"

import { routes } from "@/lib/route"
import { getDrivers } from "./_helpers/actions"
import { CreateDriverModal } from "./_components/create"
import { DriversTable } from "./_components/table"
import { isAdmin } from "@/actions/auth"
import { redirect } from "next/navigation"
import { getCompanies } from "../companies/_helpers/actions"

export const metadata: Metadata = {
  title: "Drivers"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function ClientsPage({ searchParams }: Props) {
  const { search, page } = await searchParams

  const data = await getDrivers(search, page)
  if (!(await isAdmin())) return redirect(routes.home)

  return (
    <div>
      <PageTitle label='Drivers'>
        <CreateDriverModal />
        <LinkBtn href={routes.drivers.trashed} icon={ArchiveIcon} variant='outline-warning'>
          Archived
        </LinkBtn>
      </PageTitle>

      <SearchFilter />

      <section className='mt-4'>
        <DriversTable drivers={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
