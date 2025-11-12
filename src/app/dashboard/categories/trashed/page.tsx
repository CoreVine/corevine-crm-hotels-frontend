import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../../_components/pagination"
import { SearchFilter } from "../../_components/search"
import { PageTitle } from "../../_components/title"
import { Metadata } from "next"
import { GoBack } from "../../_components/go-back"

import { getTrashedCategories } from "../_helpers/actions"
import { CategoriesTable } from "../_components/table"

export const metadata: Metadata = {
  title: "Archived Categories"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function TrashedCategoryPage({ searchParams }: Props) {
  const sp = await searchParams
  const data = await getTrashedCategories(sp)

  return (
    <div>
      <PageTitle label='Archived Categories'>
        <GoBack />
      </PageTitle>

      <section>
        <SearchFilter />
      </section>

      <section className='mt-4'>
        <CategoriesTable categories={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
