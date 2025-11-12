import { TSearchParams } from "@/types"
import { PaginationLinks } from "../_components/pagination"
import { PageTitle } from "../_components/title"
import { Metadata } from "next"
import { SearchFilter } from "../_components/search"
import { ArchiveIcon } from "lucide-react"
import { LinkBtn } from "@/components/common/button-link"
import { CreateCarModal } from "./_components/create"
import { CarsTable } from "./_components/table"

import { redirect } from "next/navigation"
import { isAdmin } from "@/actions/auth"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { getCarsPaginated } from "./_helpers/actions"

export const metadata: Metadata = {
  title: "Cars"
}

type Props = {
  searchParams: Promise<TSearchParams>
}

export default async function CarsPage({ searchParams }: Props) {
  const sp = await searchParams
  const query = build(sp)
  const data = await getCarsPaginated(query)

  if (!(await isAdmin())) return redirect(routes.home)

  return (
    <div>
      <PageTitle label='Cars'>
        <CreateCarModal />
        <LinkBtn href={routes.cars.trashed} icon={ArchiveIcon} variant='outline-warning'>
          Archived
        </LinkBtn>
      </PageTitle>
      <section>
        <SearchFilter />
      </section>
      <section className='mt-4'>
        <CarsTable cars={data.data} />
        <PaginationLinks pagination={data} />
      </section>
    </div>
  )
}
