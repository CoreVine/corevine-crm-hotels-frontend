import { CreateCategoryModal } from "./_components/create"
import { PaginationLinks } from "../_components/pagination"
import { CategoriesTable } from "./_components/table"
import { TSearchParams } from "@/types"
import { SearchFilter } from "../_components/search"
import { ArchiveIcon } from "lucide-react"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { LinkBtn } from "@/components/common/button-link"

import { getCategories } from "./_helpers/actions"
import { redirect } from "next/navigation"
import { isAdmin } from "@/actions/auth"
import { routes } from "@/lib/route"

type Props = {
  searchParams: Promise<TSearchParams>
}

export const metadata: Metadata = {
  title: "Categories"
}

export default async function ClientsPage({ searchParams }: Props) {
  const sp = await searchParams
  const data = await getCategories(sp)

  if (!(await isAdmin())) return redirect(routes.home)

  return (
    <div>
      <PageTitle label='Categories'>
        <CreateCategoryModal />
        <LinkBtn href={routes.categories.trashed} icon={ArchiveIcon} variant='outline-warning'>
          Archived
        </LinkBtn>
      </PageTitle>
      <SearchFilter />
      <section className='mt-4'>
        <CategoriesTable categories={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
