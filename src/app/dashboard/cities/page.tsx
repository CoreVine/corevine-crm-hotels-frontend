import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../_components/pagination"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { SearchFilter } from "../_components/search"
import { ArchiveIcon } from "lucide-react"
import { LinkBtn } from "@/components/common/button-link"

import { routes } from "@/lib/route"
import { getCities } from "./_helpers/actions"
import { CreateCityModal } from "./_components/create"
import { CitiesTable } from "./_components/table"
import { isAdmin } from "@/actions/auth"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Cities"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function ClientsPage({ searchParams }: Props) {
  const { search, page } = await searchParams
  const data = await getCities(search, page)

  if (!(await isAdmin())) return redirect(routes.home)

  return (
    <div>
      <PageTitle label='Cities'>
        <CreateCityModal />
        <LinkBtn href={routes.cities.trashed} icon={ArchiveIcon} variant='outline-warning'>
          Archived
        </LinkBtn>
      </PageTitle>
      <section>
        <SearchFilter />
      </section>
      <section className='mt-4'>
        <CitiesTable cities={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
