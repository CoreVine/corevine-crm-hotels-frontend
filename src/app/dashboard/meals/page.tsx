import { DefaultSearchParams } from "@/types"
import { PaginationLinks } from "../_components/pagination"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { SearchFilter } from "../_components/search"
import { ArchiveIcon, Trash } from "lucide-react"
import { LinkBtn } from "@/components/common/button-link"
import { MealsTable } from "./_components/table"
import { CreateMealModal } from "./_components/create"

import { getMeals } from "./_helpers/actions"
import { routes } from "@/lib/route"
import { redirect } from "next/navigation"
import { isAdmin } from "@/actions/auth"

export const metadata: Metadata = {
  title: "Meals"
}

type Props = {
  searchParams: Promise<DefaultSearchParams>
}

export default async function MealsPage({ searchParams }: Props) {
  const { search, page } = await searchParams

  const data = await getMeals(search, page)

  if (!(await isAdmin())) return redirect(routes.home)
  return (
    <div>
      <PageTitle label='Meals'>
        <CreateMealModal />
        <LinkBtn href={routes.meals.trashed} icon={ArchiveIcon} variant='outline-warning'>
          Archived
        </LinkBtn>
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
