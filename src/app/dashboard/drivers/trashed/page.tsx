import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../../_components/pagination"
import { SearchFilter } from "../../_components/search"
import { PageTitle } from "../../_components/title"
import { Metadata } from "next"
import { GoBack } from "../../_components/go-back"
import { DriversTable } from "../_components/table"

import { getTrashedDrivers } from "../_helpers/actions"

export const metadata: Metadata = {
  title: "Archived Drivers"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function ClientsPage({ searchParams }: Props) {
  const { search, page } = await searchParams
  const data = await getTrashedDrivers(search, page)

  return (
    <div>
      <PageTitle label='Archived Drivers'>
        <GoBack />
      </PageTitle>

      <SearchFilter />

      <section className='mt-4'>
        <DriversTable drivers={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
