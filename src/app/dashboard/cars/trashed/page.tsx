import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../../_components/pagination"
import { SearchFilter } from "../../_components/search"
import { PageTitle } from "../../_components/title"
import { Metadata } from "next"
import { GoBack } from "../../_components/go-back"
import { getTrashedCars } from "../_helpers/actions"
import { CarsTable } from "../_components/table"
import { build } from "search-params"

export const metadata: Metadata = {
  title: "Archived Cars"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function ClientsPage({ searchParams }: Props) {
  const sp = build(await searchParams)
  const data = await getTrashedCars(sp)
  return (
    <div>
      <PageTitle label='Archived Cars'>
        <GoBack />
      </PageTitle>

      <SearchFilter />

      <section className='mt-4'>
        <CarsTable cars={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
