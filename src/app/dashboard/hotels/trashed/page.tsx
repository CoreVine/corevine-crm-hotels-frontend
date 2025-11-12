import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../../_components/pagination"
import { SearchFilter } from "../../_components/search"
import { PageTitle } from "../../_components/title"
import { Metadata } from "next"
import { GoBack } from "../../_components/go-back"
import { HotelsTable } from "../_components/table"

import { getTrashedHotels } from "../_helpers/actions"

export const metadata: Metadata = {
  title: "Archived Hotels"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function ClientsPage({ searchParams }: Props) {
  const { search, page } = await searchParams
  const data = await getTrashedHotels(search, page)

  return (
    <div>
      <PageTitle label='Archived Hotels'>
        <GoBack />
      </PageTitle>

      <SearchFilter />

      <section className='mt-4'>
        <HotelsTable hotels={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
