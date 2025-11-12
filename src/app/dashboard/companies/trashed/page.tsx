import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../../_components/pagination"
import { SearchFilter } from "../../_components/search"
import { PageTitle } from "../../_components/title"
import { Metadata } from "next"
import { GoBack } from "../../_components/go-back"
import { getTrashedCompanies } from "../_helpers/actions"
import { CompaniesTable } from "../_components/table"

export const metadata: Metadata = {
  title: "Archived Companies"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function ClientsPage({ searchParams }: Props) {
  const { search, page } = await searchParams
  const data = await getTrashedCompanies(search, page)

  return (
    <div>
      <PageTitle label='Archived Companies'>
        <GoBack />
      </PageTitle>

      <section>
        <SearchFilter />
      </section>

      <section className='mt-4'>
        <CompaniesTable companies={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
