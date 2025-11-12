import { TSearchParams } from "@/types"
import { PaginationLinks } from "../../_components/pagination"
import { SearchFilter } from "../../_components/search"
import { PageTitle } from "../../_components/title"
import { Metadata } from "next"
import { GoBack } from "../../_components/go-back"

import { getTrashedCurrencies } from "../_helpers/actions"
import { CurrenciesTable } from "../_components/table"

export const metadata: Metadata = {
  title: "Archived Currencies"
}

type Props = {
  searchParams: Promise<TSearchParams>
}

export default async function TrashedCurrenciesPage({ searchParams }: Props) {
  const sp = await searchParams
  const data = await getTrashedCurrencies(sp)

  return (
    <div>
      <PageTitle label='Archived Categories'>
        <GoBack />
      </PageTitle>

      <SearchFilter />

      <section className='mt-4'>
        <CurrenciesTable currencies={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
