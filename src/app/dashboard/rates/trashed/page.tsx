import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../../_components/pagination"
import { SearchFilter } from "../../_components/search"
import { PageTitle } from "../../_components/title"
import { Metadata } from "next"
import { GoBack } from "../../_components/go-back"
import { getTrashedRates } from "../_helpers/actions"
import { RatesTable } from "../_components/table"

export const metadata: Metadata = {
  title: "Archived Rates"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function TrashedRatesPage({ searchParams }: Props) {
  const { search, page } = await searchParams
  const data = await getTrashedRates(search, page)

  return (
    <div>
      <PageTitle label='Archived Rates'>
        <GoBack />
      </PageTitle>

      <section>
        <SearchFilter />
      </section>

      <section className='mt-4'>
        <RatesTable rates={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
