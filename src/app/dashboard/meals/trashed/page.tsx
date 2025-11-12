import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../../_components/pagination"
import { SearchFilter } from "../../_components/search"
import { PageTitle } from "../../_components/title"
import { Metadata } from "next"
import { GoBack } from "../../_components/go-back"
import { getTrashedMeals } from "../_helpers/actions"
import { MealsTable } from "../_components/table"

export const metadata: Metadata = {
  title: "Archived Meals"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function ClientsPage({ searchParams }: Props) {
  const { search, page } = await searchParams
  const data = await getTrashedMeals(search, page)

  return (
    <div>
      <PageTitle label='Archived Meals'>
        <GoBack />
      </PageTitle>

      <section>
        <SearchFilter />
      </section>

      <section className='mt-4'>
        <MealsTable meals={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
